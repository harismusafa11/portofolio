"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  Briefcase,
  Folder,
  BookOpen,
  HelpCircle,
  PhoneCall,
  LogOut,
  ShieldCheck,
  ChevronRight,
  User,
  Activity,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/secure-portal-admin", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/secure-portal-admin/orders", label: "Order & Project Klien 📦", icon: Briefcase },
  { href: "/secure-portal-admin/chat", label: "Live Chat Klien 🟢", icon: MessageSquare },
  { href: "/secure-portal-admin/promos", label: "Banner & Voucher Promo", icon: Tag },
  { href: "/secure-portal-admin/services", label: "Layanan & Paket Harga", icon: Briefcase },
  { href: "/secure-portal-admin/portfolio", label: "Portfolio Proyek", icon: Folder },
  { href: "/secure-portal-admin/blog", label: "Artikel Blog & Insight", icon: BookOpen },
  { href: "/secure-portal-admin/testimonials", label: "Testimonial Klien", icon: Activity },
  { href: "/secure-portal-admin/faq", label: "FAQ & Tanya Jawab", icon: HelpCircle },
  { href: "/secure-portal-admin/leads", label: "Log Order WA / Leads", icon: PhoneCall },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If on login page, skip admin layout frame
  if (pathname === "/secure-portal-admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.push("/secure-portal-admin/login");
    router.refresh();
  };

  const currentNav = NAV_ITEMS.find((item) => item.href === pathname) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-[#0b0e17] text-gray-100 font-sans flex">
      {/* Left Navigation Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#121622] border-r border-white/10 flex flex-col justify-between transition-transform duration-200 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Top Brand Logo */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-tight">Arjuna Dev</div>
                <div className="text-[10px] text-sky-400 font-mono">Admin Portal v2026</div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
            <div className="px-3 pb-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
              Modul Konten
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600/30 to-blue-600/20 text-white border border-sky-500/40 shadow-sm"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Profile / Logout */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Administrator</div>
                <div className="text-[10px] text-emerald-400 font-mono truncate">Neon DB Connected</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 transition-colors cursor-pointer"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 px-4 sm:px-6 bg-[#121622]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono truncate">
              <span>Admin Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-white font-semibold truncate">{currentNav.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <Activity className="w-3.5 h-3.5" />
              <span>Neon Postgres Live</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-600/30 hover:text-rose-200 text-xs font-semibold text-gray-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
