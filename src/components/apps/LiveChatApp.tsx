"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  Lock,
  ShieldCheck,
  RefreshCw,
  Mail,
  Key,
  Globe,
  Clock,
  ChevronRight,
  Check,
  CheckCheck,
  Cpu,
  Image as ImageIcon,
  Paperclip,
  X,
  Maximize2,
  Loader2,
} from "lucide-react";
import {
  auth,
  db,
  loginWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  User,
} from "@/lib/firebase";

import { soundEngine } from "@/utils/soundEngine";

interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "user" | "admin" | "ai";
  text: string;
  imageUrl?: string;
  type?: "text" | "image";
  isRead?: boolean;
  createdAt: any;
}

const GoogleLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const LiveChatApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"google" | "email">("google");

  // Email/Password Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Chat Room Mode: "ai" (Arjuna AI 24/7) vs "admin" (Human Admin)
  const [chatMode, setChatMode] = useState<"ai" | "admin">("ai");
  const [aiTyping, setAiTyping] = useState(false);

  // AI Chat local session messages
  const [aiMessages, setAiMessages] = useState<MessageItem[]>([
    {
      id: "ai-welcome",
      senderId: "arjuna-ai-bot",
      senderName: "Arjuna AI",
      senderRole: "ai",
      text: "Selamat datang di Arjuna Dev Studio. Saya Arjuna AI, asisten konsultan yang siap membantu Anda berkonsultasi seputar rincian harga paket pembuatan website, garansi 90 hari, teknologi, maupun alur pemesanan. Ada yang bisa saya bantu?",
      createdAt: new Date(),
    },
  ]);

  // Chat Room State (Human Admin)
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Image Upload & Lightbox State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstLoadRef = useRef(true);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Pilih file berupa gambar (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }
    setSelectedFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedImage = () => {
    setSelectedFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 1. Listen for Firebase Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Listen for Real-Time Messages in Firestore for Current User
  useEffect(() => {
    if (!currentUser) return;
    isFirstLoadRef.current = true;

    // Store user session profile metadata
    const userDocRef = doc(db, "chat_sessions", currentUser.uid);
    setDoc(
      userDocRef,
      {
        uid: currentUser.uid,
        displayName: currentUser.displayName || email.split("@")[0] || "Pengunjung Web",
        email: currentUser.email || "",
        photoURL: currentUser.photoURL || "",
        lastActive: serverTimestamp(),
      },
      { merge: true }
    ).catch(() => {});

    // Listen to messages subcollection
    const messagesRef = collection(db, "chat_sessions", currentUser.uid, "messages");
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
          if (lastMsg && lastMsg.senderRole === "admin") {
            soundEngine.playNotification();
          }
        }

        // Foolproof isRead Resolution:
        // If there is any admin message in the conversation, or data.isRead is true,
        // mark user messages before/around admin replies as read
        const hasAdminMessage = list.some((m) => m.senderRole === "admin");

        const processedList = list.map((msg, idx) => {
          if (msg.senderRole === "user") {
            const adminRepliedAfter = list.slice(idx).some((m) => m.senderRole === "admin") || hasAdminMessage;
            if (adminRepliedAfter || msg.isRead) {
              if (!msg.isRead) {
                const msgDocRef = doc(db, "chat_sessions", currentUser.uid, "messages", msg.id);
                setDoc(msgDocRef, { isRead: true }, { merge: true }).catch(() => {});
              }
              return { ...msg, isRead: true };
            }
          }
          return msg;
        });

        // Mark any unread admin messages as read by user in real-time
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.senderRole === "admin" && data.isRead !== true) {
            const msgDocRef = doc(db, "chat_sessions", currentUser.uid, "messages", docSnap.id);
            setDoc(msgDocRef, { isRead: true }, { merge: true }).catch(() => {});
          }
        });

        isFirstLoadRef.current = false;
        setMessages(processedList);
      },
      (err) => {
        console.warn("Firestore Chat Permission Notice:", err.message);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Scroll to bottom helper
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
    }, 60);
  };

  // Scroll to bottom when messages or mode change
  useEffect(() => {
    scrollToBottom(isFirstLoadRef.current ? "instant" : "smooth");
  }, [messages, aiMessages, chatMode]);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setSubmittingAuth(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setAuthError(err?.message || "Gagal login dengan akun Google.");
    } finally {
      setSubmittingAuth(false);
    }
  };

  // Handle Email Auth
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSubmittingAuth(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setAuthError(err?.message || "Gagal autentikasi email. Periksa kembali password Anda.");
    } finally {
      setSubmittingAuth(false);
    }
  };

  // Handle Send AI Chat Message
  const handleSendAiMessage = async (textCustom?: string) => {
    const textToSend = (textCustom || inputText).trim();
    if (!textToSend || aiTyping) return;

    if (!textCustom) setInputText("");

    const userMsgObj: MessageItem = {
      id: `user-${Date.now()}`,
      senderId: currentUser?.uid || "guest-user",
      senderName: currentUser?.displayName || currentUser?.email?.split("@")[0] || "Pengunjung Web",
      senderRole: "user",
      text: textToSend,
      createdAt: new Date(),
    };

    setAiMessages((prev) => [...prev, userMsgObj]);
    setAiTyping(true);

    try {
      // Build conversation history format for API
      const historyPayload = aiMessages
        .filter((m) => m.id !== "ai-welcome")
        .map((m) => ({
          role: m.senderRole === "ai" ? "assistant" : "user",
          text: m.text,
        }));

      const res = await fetch("/api/chat/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: textToSend,
          conversationHistory: historyPayload,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Maaf Kak, ada kendala koneksi AI.";

      const aiMsgObj: MessageItem = {
        id: `ai-${Date.now()}`,
        senderId: "arjuna-ai-bot",
        senderName: "Arjuna AI",
        senderRole: "ai",
        text: replyText,
        createdAt: new Date(),
      };

      setAiMessages((prev) => [...prev, aiMsgObj]);
      soundEngine.playNotification();
    } catch (err) {
      console.error("AI chat error:", err);
    } finally {
      setAiTyping(false);
    }
  };

  // Handle Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMode === "ai") {
      handleSendAiMessage();
      return;
    }
    if ((!inputText.trim() && !selectedFile) || !currentUser || sendingMessage) return;

    const textToSend = inputText.trim();
    const currentFile = selectedFile;

    setInputText("");
    setSendingMessage(true);

    try {
      let uploadedImageUrl: string | undefined = undefined;

      if (currentFile) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", currentFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.secure_url) {
          uploadedImageUrl = uploadData.secure_url;
        } else {
          console.error("Failed uploading image:", uploadData);
        }
      }

      clearSelectedImage();

      const messagesRef = collection(db, "chat_sessions", currentUser.uid, "messages");
      await addDoc(messagesRef, {
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email?.split("@")[0] || "Pengunjung Web",
        senderRole: "user",
        text: textToSend || (uploadedImageUrl ? "📷 Kiriman Gambar" : ""),
        imageUrl: uploadedImageUrl || null,
        type: uploadedImageUrl ? "image" : "text",
        isRead: false,
        createdAt: serverTimestamp(),
      });

      // Update session last message
      const sessionDocRef = doc(db, "chat_sessions", currentUser.uid);
      await setDoc(
        sessionDocRef,
        {
          lastMessage: uploadedImageUrl ? "📷 Kiriman Gambar" : textToSend,
          lastMessageTime: serverTimestamp(),
          unreadByAdmin: true,
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error sending chat message:", err);
    } finally {
      setSendingMessage(false);
      setUploadingImage(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  if (authLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0d111a] text-gray-400 font-mono text-xs select-none">
        <RefreshCw className="w-5 h-5 animate-spin text-sky-400 mr-2" />
        <span>Memuat Sesi Autentikasi...</span>
      </div>
    );
  }

  // --- MAIN CHAT ROOM VIEW (GUEST AI BY DEFAULT) ---
  const activeMessagesList = chatMode === "ai" ? aiMessages : messages;

  return (
    <div className="h-full w-full bg-[#0b0e14] text-gray-100 font-sans flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="p-3 sm:p-3.5 bg-[#121620] border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          {currentUser ? (
            currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || "Avatar"}
                className="w-8 h-8 rounded-full border border-white/20 object-cover shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-sky-600 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {currentUser.displayName?.[0] || currentUser.email?.[0]?.toUpperCase() || "U"}
              </div>
            )
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-600/80 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
              <Cpu className="w-4 h-4 text-sky-300" />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <h3 className="text-xs font-bold text-white truncate">
                {currentUser
                  ? currentUser.displayName || currentUser.email?.split("@")[0]
                  : "Pengunjung Web (Guest)"}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Online" />
            </div>
            <p className="text-[10px] text-gray-400 font-mono truncate">
              {chatMode === "ai"
                ? "Arjuna AI 24/7 (Bebas tanpa login)"
                : currentUser
                ? "Mode Human Admin (Terverifikasi)"
                : "Mode Human Admin (Wajib Login)"}
            </p>
          </div>
        </div>

        {/* Mode Switcher & Logout */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="p-0.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-0.5">
            <button
              onClick={() => setChatMode("ai")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                chatMode === "ai"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🤖 Arjuna AI (Guest)
            </button>

            <button
              onClick={() => setChatMode("admin")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                chatMode === "admin"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              👤 Human Admin
            </button>
          </div>

          {currentUser && (
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 text-gray-400 transition-all border border-white/10 cursor-pointer shrink-0"
              title="Keluar / Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 custom-scrollbar bg-[#0b0e14]">
        {chatMode === "admin" && !currentUser ? (
          <div className="max-w-sm mx-auto my-auto py-8 px-4 space-y-5 text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-extrabold text-white">Mode Chat Admin Membutuhkan Login</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Untuk berkonsultasi langsung secara personal dengan <strong className="text-white font-bold">Haris Musafa (Human Admin)</strong>, silakan login terlebih dahulu agar riwayat pesan tersimpan aman.
              </p>
            </div>

            {/* Auth Error Alert */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
                {authError}
              </div>
            )}

            {/* Fast 1-Click Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={submittingAuth}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-xs shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0">
                <GoogleLogo className="w-3.5 h-3.5" />
              </div>
              <span>{submittingAuth ? "Menghubungkan Akun..." : "Login Cepat via Google"}</span>
            </button>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2 text-xs">
              <button
                type="button"
                onClick={() => setChatMode("ai")}
                className="text-sky-400 hover:text-sky-300 font-mono text-[11px] font-bold hover:underline cursor-pointer"
              >
                &larr; Atau Tetap Chat Bebas Tanpa Login via Arjuna AI 24/7
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeMessagesList.map((msg) => {
              const isMe = msg.senderRole === "user" || (currentUser && msg.senderId === currentUser.uid);
              const isAi = msg.senderRole === "ai";

              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed font-sans border ${
                      isMe
                        ? "bg-sky-600 border-sky-500 text-white rounded-br-none"
                        : isAi
                        ? "bg-[#141824] border-white/10 text-gray-200 rounded-bl-none"
                        : "bg-[#141824] border-white/10 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold mb-1.5 opacity-80 flex items-center justify-between gap-2 border-b border-white/5 pb-1">
                      <span>
                        {isAi ? (
                          <span className="text-sky-400 font-bold">Arjuna AI</span>
                        ) : msg.senderRole === "admin" ? (
                          <span className="text-emerald-400 font-bold">Admin Arjuna Dev</span>
                        ) : (
                          msg.senderName
                        )}
                      </span>
                      {isMe && (
                        <span className="flex items-center gap-0.5" title={msg.isRead ? "Sudah Dibaca" : "Terkirim"}>
                          {msg.isRead ? (
                            <CheckCheck className="w-3.5 h-3.5 text-sky-200" />
                          ) : (
                            <Check className="w-3 h-3 text-white/70" />
                          )}
                        </span>
                      )}
                    </div>

                    {/* Image Attachment Rendering */}
                    {msg.imageUrl && (
                      <div
                        onClick={() => setLightboxUrl(msg.imageUrl || null)}
                        className="mb-2 relative group rounded-xl overflow-hidden cursor-pointer border border-white/10 max-w-xs"
                      >
                        <img
                          src={msg.imageUrl}
                          alt="Lampiran Chat"
                          onLoad={() => scrollToBottom("smooth")}
                          className="w-full max-h-56 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                          <Maximize2 className="w-4 h-4" />
                          <span>Perbesar</span>
                        </div>
                      </div>
                    )}

                    {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {chatMode === "ai" && aiTyping && (
              <div className="flex items-start">
                <div className="px-3.5 py-2.5 rounded-2xl bg-[#141824] border border-white/10 text-gray-300 text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  <span>Arjuna AI sedang mengetik...</span>
                </div>
              </div>
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips (AI Mode Only) */}
      {chatMode === "ai" && (
        <div className="px-3 py-2 bg-[#121620] border-t border-white/10 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
          {[
            "Tutorial & Alur Cara Order",
            "Kontak WA & IG Official",
            "Nomor Rekening & Payment",
            "Estimasi Waktu Pengerjaan",
            "Garansi 90 Hari Bug-Free",
            "Rekomendasi Paket Website",
            "Apakah Domain & Hosting Gratis?",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSendAiMessage(chip)}
              disabled={aiTyping}
              className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Selected Image Preview Bar */}
      {imagePreviewUrl && (
        <div className="px-3.5 py-2 bg-[#171d2b] border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-sky-400/40 shrink-0">
              <img src={imagePreviewUrl} alt="Preview Upload" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate font-mono">
                {selectedFile?.name || "Gambar terpilih"}
              </p>
              <p className="text-[10px] text-sky-400 font-mono">
                {uploadingImage ? "Mengirim..." : "Siap dikirim"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearSelectedImage}
            disabled={uploadingImage}
            className="p-1 rounded-lg bg-white/10 hover:bg-rose-500/20 text-gray-300 hover:text-rose-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-[#121620] flex items-center gap-2 shrink-0 border-t border-white/10"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        {chatMode === "admin" && currentUser && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={sendingMessage || uploadingImage}
            title="Lampirkan Gambar"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
          >
            <ImageIcon className="w-4 h-4 text-sky-400" />
          </button>
        )}

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            chatMode === "ai"
              ? "Tanyakan hal seputar paket / cara order..."
              : "Tulis pesan atau lampirkan foto..."
          }
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
        />

        <button
          type="submit"
          disabled={
            (!inputText.trim() && !selectedFile) ||
            (chatMode === "ai" ? aiTyping : sendingMessage || uploadingImage)
          }
          className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs disabled:opacity-40 cursor-pointer active:scale-95 transition-all shrink-0 shadow-sm flex items-center justify-center gap-1.5"
        >
          {uploadingImage || sendingMessage ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>

      {/* Lightbox Fullscreen Modal */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxUrl}
            alt="Perbesar Gambar Chat"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
};
