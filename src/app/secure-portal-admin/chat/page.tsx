"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  User as UserIcon,
  Clock,
  CheckCircle2,
  Bell,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Check,
  CheckCheck,
} from "lucide-react";
import {
  db,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  requestFCMPermission,
} from "@/lib/firebase";

import { soundEngine } from "@/utils/soundEngine";

interface ChatSession {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  lastMessage?: string;
  lastMessageTime?: any;
  unreadByAdmin?: boolean;
}

interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "user" | "admin";
  text: string;
  isRead?: boolean;
  createdAt: any;
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstLoadRef = useRef(true);

  // 1. Listen for All Active Chat Sessions in Real-Time
  useEffect(() => {
    const sessionsRef = collection(db, "chat_sessions");
    const q = query(sessionsRef, orderBy("lastMessageTime", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ChatSession[] = snapshot.docs.map((docSnap) => ({
          uid: docSnap.id,
          ...docSnap.data(),
        })) as ChatSession[];

        setSessions(list);
        setLoadingSessions(false);

        // Auto-select first session if none selected
        if (list.length > 0 && !activeSessionId) {
          setActiveSessionId(list[0].uid);
        }
      },
      () => {
        setLoadingSessions(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Listen for Real-Time Messages of Selected Chat Session
  useEffect(() => {
    if (!activeSessionId) return;
    isFirstLoadRef.current = true;

    // Mark as read by admin
    const sessionDocRef = doc(db, "chat_sessions", activeSessionId);
    setDoc(sessionDocRef, { unreadByAdmin: false }, { merge: true }).catch(() => {});

    const messagesRef = collection(db, "chat_sessions", activeSessionId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: MessageItem[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as MessageItem[];

        if (!isFirstLoadRef.current && list.length > messages.length) {
          const lastMsg = list[list.length - 1];
          if (lastMsg && lastMsg.senderRole === "user") {
            // 1. Play Sound Chime
            soundEngine.playNotification();

            // 2. Trigger Browser Desktop Notification
            if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
              new Notification(`💬 Chat Baru dari ${lastMsg.senderName || "Klien"}`, {
                body: lastMsg.text,
                icon: "/favicon.ico",
              });
            }
          }
        }

        // Mark any unread user messages as read by admin in real-time
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.senderRole === "user" && data.isRead !== true) {
            const msgDocRef = doc(db, "chat_sessions", activeSessionId, "messages", docSnap.id);
            setDoc(msgDocRef, { isRead: true }, { merge: true }).catch(() => {});
          }
        });

        isFirstLoadRef.current = false;
        setMessages(list);
      },
      (err) => {
        console.warn("Firestore Admin Chat Permission Notice:", err.message);
      }
    );

    return () => unsubscribe();
  }, [activeSessionId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Request Push Notification Permission
  const handleEnableNotifications = async () => {
    const token = await requestFCMPermission();
    if (token) {
      setFcmToken(token);
      alert("✅ Notifikasi Push HP berhasil diaktifkan!");
    } else {
      alert("ℹ️ Izin notifikasi ditolak atau tidak didukung di browser ini.");
    }
  };

  // Handle Admin Send Reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeSessionId || sendingReply) return;

    const textToSend = replyText.trim();
    setReplyText("");
    setSendingReply(true);

    try {
      // Mark all existing user messages in this session as read
      messages.forEach((m) => {
        if (m.senderRole === "user" && !m.isRead) {
          const msgDocRef = doc(db, "chat_sessions", activeSessionId, "messages", m.id);
          setDoc(msgDocRef, { isRead: true }, { merge: true }).catch(() => {});
        }
      });

      const messagesRef = collection(db, "chat_sessions", activeSessionId, "messages");
      await addDoc(messagesRef, {
        senderId: "admin-arjuna",
        senderName: "Haris Musafa (Admin)",
        senderRole: "admin",
        text: textToSend,
        isRead: false,
        createdAt: serverTimestamp(),
      });

      // Update session last message
      const sessionDocRef = doc(db, "chat_sessions", activeSessionId);
      await setDoc(
        sessionDocRef,
        {
          lastMessage: textToSend,
          lastMessageTime: serverTimestamp(),
          unreadByAdmin: false,
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error sending admin reply:", err);
    } finally {
      setSendingReply(false);
    }
  };

  const activeSession = sessions.find((s) => s.uid === activeSessionId);
  const filteredSessions = sessions.filter(
    (s) =>
      s.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col font-sans select-none space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141924] border border-white/10 shadow-lg shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-400" />
            <h1 className="text-lg font-extrabold text-white">Center Live Chat Klien (Real-Time System)</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Balas pesan konsultasi pengunjung terautentikasi (Google / Email) secara *real-time* &amp; terima notifikasi HP.
          </p>
        </div>

        <button
          onClick={handleEnableNotifications}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow flex items-center gap-2 cursor-pointer active:scale-95 transition-all shrink-0"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{fcmToken ? "Notifikasi HP Aktif 🔔" : "Aktifkan Push Notif HP"}</span>
        </button>
      </div>

      {/* Main Grid: Sessions List & Chat Thread */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0 overflow-hidden">
        {/* Left Column: Chat Sessions List */}
        <div className="p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-xl flex flex-col justify-between overflow-hidden">
          <div className="space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                Daftar Chat Klien ({sessions.length})
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau email klien..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Sessions List Scroll Box */}
          <div className="flex-1 overflow-y-auto my-3 space-y-2 custom-scrollbar">
            {loadingSessions ? (
              <div className="py-12 text-center text-xs font-mono text-gray-400">
                Memuat sesi chat Firebase...
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-gray-400">
                Belum ada percakapan chat aktif.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isActive = session.uid === activeSessionId;
                return (
                  <div
                    key={session.uid}
                    onClick={() => setActiveSessionId(session.uid)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center gap-3 ${
                      isActive
                        ? "bg-sky-500/20 border-sky-500/50 shadow-md"
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {session.photoURL ? (
                      <img
                        src={session.photoURL}
                        alt={session.displayName}
                        className="w-9 h-9 rounded-full border border-white/20 object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-xs shrink-0">
                        {session.displayName[0] || "U"}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">
                          {session.displayName}
                        </h4>
                        {session.unreadByAdmin && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">
                        {session.lastMessage || session.email || "Sesi baru dimulai"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Thread & Reply Form */}
        <div className="md:col-span-2 p-4 rounded-2xl bg-[#141924] border border-white/10 shadow-xl flex flex-col justify-between overflow-hidden">
          {!activeSession ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-xs font-mono space-y-2">
              <MessageSquare className="w-8 h-8 text-sky-400" />
              <span>Pilih sesi chat klien di sebelah kiri untuk mulai membalas.</span>
            </div>
          ) : (
            <>
              {/* Active Client Top Header */}
              <div className="pb-3 mb-3 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  {activeSession.photoURL ? (
                    <img
                      src={activeSession.photoURL}
                      alt={activeSession.displayName}
                      className="w-9 h-9 rounded-full border border-sky-400/40 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold text-xs shrink-0">
                      {activeSession.displayName[0] || "U"}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                      <span>{activeSession.displayName}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        TERVERIFIKASI
                      </span>
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {activeSession.email || "Login via Google Account"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Thread Messages Scroll Canvas */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar my-2">
                {messages.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-gray-400">
                    Memuat percakapan...
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isAdmin = msg.senderRole === "admin";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed font-sans shadow ${
                            isAdmin
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-br-none"
                              : "bg-[#1f2636] border border-white/10 text-gray-200 rounded-bl-none"
                          }`}
                        >
                          <div className="text-[9px] font-mono font-bold mb-1 opacity-75 flex items-center justify-between gap-2">
                            <span>{isAdmin ? "💬 Admin (Haris Musafa)" : msg.senderName}</span>
                            {isAdmin && (
                              <span className="flex items-center gap-0.5" title={msg.isRead ? "Sudah Dibaca Klien (✓✓)" : "Terkirim (✓)"}>
                                {msg.isRead ? (
                                  <CheckCheck className="w-3.5 h-3.5 text-sky-200" />
                                ) : (
                                  <Check className="w-3.5 h-3.5 text-white/70" />
                                )}
                              </span>
                            )}
                          </div>
                          <div>{msg.text}</div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Admin Reply Form */}
              <form
                onSubmit={handleSendReply}
                className="pt-3 border-t border-white/10 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Balas pesan ke ${activeSession.displayName}...`}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  disabled={!replyText.trim() || sendingReply}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg disabled:opacity-40 cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Balasan</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
