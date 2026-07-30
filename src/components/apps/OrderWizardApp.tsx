"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  CheckCircle2,
  Copy,
  Upload,
  Globe,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Building2,
  Palette,
  Layout,
  Layers,
  Zap,
  FileText,
  CreditCard,
  QrCode,
  Lock,
  RefreshCw,
  ShoppingBag,
  Cpu,
  User as UserIcon,
  Link as LinkIcon,
  Clock,
  Check,
  HelpCircle,
  AlertCircle,
  PhoneCall,
  Brush,
} from "lucide-react";
import { auth, onAuthStateChanged, User, loginWithGoogle } from "@/lib/firebase";
import { useWindowStore } from "@/store/windowStore";
import { PaywuzPaymentModal } from "@/components/modals/PaywuzPaymentModal";
import { OrderInvoiceModal } from "@/components/modals/OrderInvoiceModal";

interface OrderWizardProps {
  initialPackageId?: string;
}

export const OrderWizardApp: React.FC<OrderWizardProps> = ({ initialPackageId }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const addToast = useWindowStore((state) => state.addToast);
  const storePackageId = useWindowStore((state) => state.orderWizardPackageId);

  const [currentStep, setCurrentStep] = useState(1);
  const [packageId, setPackageId] = useState(initialPackageId || storePackageId || "basic");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState(false);
  const [upgradeBanner, setUpgradeBanner] = useState<string | null>(null);
  const [isPaywuzModalOpen, setIsPaywuzModalOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(true);
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [uniqueCode, setUniqueCode] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (storePackageId) {
      setPackageId(storePackageId);
    }
  }, [storePackageId]);

  useEffect(() => {
    setUniqueCode(Math.floor(100 + Math.random() * 900));

    // Restore draft from localStorage if present
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("arjuna_order_wizard_draft");
        if (saved) {
          const p = JSON.parse(saved);
          if (p.businessName) setBusinessName(p.businessName);
          if (p.ownerName) setOwnerName(p.ownerName);
          if (p.email) setEmail(p.email);
          if (p.phone) setPhone(p.phone);
          if (p.brandName) setBrandName(p.brandName);
          if (p.businessStory) setBusinessStory(p.businessStory);
          if (p.notes) setNotes(p.notes);
          if (p.packageId) setPackageId(p.packageId);
          if (p.existingDomain) setExistingDomain(p.existingDomain);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // 1. Informasi Bisnis State
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [operatingHours, setOperatingHours] = useState("");

  // 2. Branding State
  const [brandName, setBrandName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [brandGuideUrl, setBrandGuideUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0284c7");
  const [secondaryColor, setSecondaryColor] = useState("#0f172a");
  const [favoriteFont, setFavoriteFont] = useState("");

  // 3. Tentang Bisnis State (Textarea Besar)
  const [businessStory, setBusinessStory] = useState("");
  const [competitorDiff, setCompetitorDiff] = useState("");
  const [visionMission, setVisionMission] = useState("");

  // 4. Target Website State
  const [targetType, setTargetType] = useState<string[]>(["Company Profile"]);

  // 5. Halaman yang Dibutuhkan State
  const [neededPages, setNeededPages] = useState<string[]>([
    "Home",
    "Tentang Kami",
    "Layanan",
    "Kontak",
  ]);

  // 6. Upload Asset State (Multiple Asset Vault)
  const [uploadedAssets, setUploadedAssets] = useState<{ category: string; url: string; name: string }[]>([]);

  // 7. Konten State
  const [hasCopywriting, setHasCopywriting] = useState("belum");

  // 8. Domain State
  const [hasDomain, setHasDomain] = useState("tidak");
  const [existingDomain, setExistingDomain] = useState("");

  // 9. Hosting State
  const [hostingChoice, setHostingChoice] = useState("arjuna_dev");

  // 10. Fitur Tambahan State (Full 13 Checkboxes)
  const [neededFeatures, setNeededFeatures] = useState<string[]>([
    "WhatsApp",
    "Google Maps",
  ]);

  // 11. Referensi Website State
  const [referenceUrl1, setReferenceUrl1] = useState("");
  const [referenceUrl2, setReferenceUrl2] = useState("");
  const [referenceLikeReason, setReferenceLikeReason] = useState("");

  // 12. Catatan State
  const [notes, setNotes] = useState("");

  // 13. Timeline State
  const [timeline, setTimeline] = useState("2 minggu");

  // 14. Payment & Verification State
  const [paymentMethod, setPaymentMethod] = useState<"manual_transfer" | "paywuz">("manual_transfer");
  const [manualPaymentStep, setManualPaymentStep] = useState<1 | 2>(1);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

  // Auto-save form draft to localStorage on input changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const draft = {
          packageId,
          businessName,
          ownerName,
          email,
          phone,
          brandName,
          businessStory,
          notes,
          existingDomain,
        };
        localStorage.setItem("arjuna_order_wizard_draft", JSON.stringify(draft));
      } catch {
        // ignore
      }
    }
  }, [packageId, businessName, ownerName, email, phone, brandName, businessStory, notes, existingDomain]);

  // Prices Dictionary
  const PACKAGE_PRICES: Record<string, { name: string; total: number; dp: number; totalSteps: number }> = {
    basic: { name: "Paket Basic", total: 500000, dp: 250000, totalSteps: 5 },
    advanced: { name: "Paket Advanced", total: 900000, dp: 450000, totalSteps: 5 },
    business: { name: "Paket Business", total: 1500000, dp: 750000, totalSteps: 5 },
    ecommerce: { name: "Paket E-Commerce", total: 5000000, dp: 2500000, totalSteps: 5 },
  };

  const selectedPkg = PACKAGE_PRICES[packageId] || PACKAGE_PRICES.basic;
  const maxSteps = selectedPkg.totalSteps;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setOwnerName(user.displayName || "");
        setEmail(user.email || "");
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Cloudinary File Upload Helper
  const handleFileUpload = async (
    file: File,
    categoryName: string,
    onSuccessUrl: (url: string) => void
  ) => {
    setUploadingAsset(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onSuccessUrl(data.secure_url);
        setUploadedAssets((prev) => [
          ...prev,
          { category: categoryName, url: data.secure_url, name: file.name },
        ]);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploadingAsset(false);
    }
  };

  // Submit Order
  const handleSubmitOrder = async () => {
    if (!currentUser) return;
    setSubmitting(true);

    const finalDpAmount = selectedPkg.dp + (paymentMethod === "manual_transfer" ? uniqueCode : 0);

    try {
      const orderPayload = {
        userId: currentUser.uid,
        userName: ownerName || currentUser.displayName || currentUser.email?.split("@")[0] || "Klien",
        userEmail: currentUser.email || email,
        userPhoto: currentUser.photoURL || "",
        packageId,
        packageName: selectedPkg.name,
        totalPrice: selectedPkg.total,
        dpAmount: finalDpAmount,
        uniqueCode: paymentMethod === "manual_transfer" ? uniqueCode : 0,
        paymentMethod,
        receiptUrl,
        formData: {
          businessName,
          ownerName,
          email,
          phone,
          address,
          city,
          industry,
          establishedYear,
          operatingHours,
          brandName,
          logoUrl,
          faviconUrl,
          brandGuideUrl,
          primaryColor,
          secondaryColor,
          favoriteFont,
          businessStory,
          competitorDiff,
          visionMission,
          targetType,
          neededPages,
          uploadedAssets,
          hasCopywriting,
          hasDomain,
          existingDomain,
          hostingChoice,
          neededFeatures,
          referenceUrl1,
          referenceUrl2,
          referenceLikeReason,
          notes,
          timeline,
        },
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      const finalOrderId = data.orderId || data.order?.id;
      if (data.success && finalOrderId) {
        setCreatedOrderId(finalOrderId);

        if (paymentMethod === "paywuz") {
          // Direct user immediately to Payment Gateway Modal (No WhatsApp redirect yet)
          setIsPaywuzModalOpen(true);
        } else {
          // For manual transfer, open WhatsApp with transfer info and open project tracker
          const waNumber = "6285693366142";
          const formattedTotal = selectedPkg.total.toLocaleString("id-ID");
          const formattedDp = (selectedPkg.dp + uniqueCode).toLocaleString("id-ID");

          const waMsg = `Halo Haris Musafa (Arjuna Dev),\n\nSaya telah melakukan Pembayaran DP 50% via Transfer Bank Jago & Mengunggah Bukti Pembayaran.\n\n*Detail Pesanan:*\n- *ID Order:* ${finalOrderId}\n- *Nama Bisnis:* ${businessName || "-"}\n- *Pemilik:* ${ownerName}\n- *Paket:* ${selectedPkg.name}\n- *Total Biaya:* Rp ${formattedTotal}\n- *Nominal DP (+Kode Unik):* Rp ${formattedDp}\n${receiptUrl ? `- *Bukti Transfer:* ${receiptUrl}\n` : ""}\n*Status Pembayaran:* ⏳ Menunggu Verifikasi Admin.\n\nMohon segera dikonfirmasi agar pengerjaan proyek bisa dimulai. Terima kasih!`;

          const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;
          window.open(waUrl, "_blank");

          openWindow("project_tracker");
          focusWindow("project_tracker");
        }
      }
    } catch (err) {
      console.error("Submit order error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0d111a] text-gray-400 font-mono text-xs select-none">
        <RefreshCw className="w-5 h-5 animate-spin text-sky-400 mr-2" />
        <span>Memuat Sesi Form Pemesanan...</span>
      </div>
    );
  }

  // MANDATORY LOGIN GUARD
  if (!currentUser) {
    return (
      <div className="h-full w-full bg-gradient-to-b from-[#0d111a] via-[#121724] to-[#0a0d14] text-gray-100 font-sans flex flex-col justify-between p-6 select-none relative">
        <div className="max-w-md mx-auto w-full my-auto space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20 border border-white/20">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-white">Login Wajib Sebelum Order</h2>
            <p className="text-xs text-gray-300 max-w-xs mx-auto mt-2 leading-relaxed">
              Untuk mengamankan data bisnis, aset logo, dan akses ke Dashboard Proyek Anda, silakan login via akun Google terlebih dahulu.
            </p>
          </div>

          <button
            onClick={() => loginWithGoogle()}
            className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-gray-100 text-gray-900 font-black text-xs shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer border border-white/50"
          >
            <span>Lanjutkan dengan Akun Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#0d111a] text-gray-100 font-sans flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header Stepper */}
      {/* Top Header Labeled Stepper */}
      <div className="p-3.5 sm:p-4 bg-[#141924] border-b border-white/10 shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-black text-white tracking-tight flex items-center gap-2">
              <span>Form Order Website — {selectedPkg.name}</span>
            </h2>
            <p className="text-[10px] text-sky-400 font-mono mt-0.5">
              Klien Terverifikasi: {currentUser.displayName || currentUser.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("arjuna_order_wizard_draft");
                  window.location.reload();
                }
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-mono border border-white/10 transition-all cursor-pointer"
              title="Reset data formulir ke awal"
            >
              Reset Draft
            </button>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Langkah {currentStep} dari {maxSteps}
            </span>
          </div>
        </div>

        {/* Labeled Step Navigation Bar */}
        <div className="grid grid-cols-5 gap-1 pt-1">
          {[
            { num: 1, label: "Paket" },
            { num: 2, label: "Bisnis" },
            { num: 3, label: "Desain" },
            { num: 4, label: "Add-on" },
            { num: 5, label: "DP & WA" },
          ].map((s) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;

            return (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num <= currentStep) setCurrentStep(s.num);
                }}
                className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-sky-500/20 border-sky-400 text-white shadow-md shadow-sky-500/10 font-bold"
                    : isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-white/5 border-white/10 text-gray-500"
                }`}
              >
                <div className="text-[9px] sm:text-[10px] font-mono font-bold">
                  {isCompleted ? "✓" : `Step ${s.num}`}
                </div>
                <div className="text-[10px] sm:text-xs font-extrabold truncate">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Stepper Progress Bar Line */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${(currentStep / maxSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Canvas Scroll View */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar bg-gradient-to-b from-[#0d111a] to-[#111624]">
        
        {/* STEP 1: PILIH & KONFIRMASI PAKET LAYANAN WEBSITE */}
        {currentStep === 1 && (
          <div className="space-y-5 max-w-2xl mx-auto animate-in fade-in duration-200">
            <div className="pb-2 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  1. Pilih &amp; Konfirmasi Paket Layanan Website
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Pilih paket yang paling sesuai dengan skala usaha dan target pertumbuhan bisnis Anda.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                DP 50% &bull; Garansi 90 Hari Bug-Free
              </span>
            </div>

            {/* Grid 4 Kartu Paket (Responsive: 1 kolom di Mobile HP, 2 kolom di Tablet/Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  id: "basic",
                  title: "Paket Basic",
                  badge: "Landing Page",
                  price: "Rp 500.000",
                  dp: "Rp 250.000",
                  days: "3-5 Hari Kerja",
                  bullets: [
                    "1 Halaman Landing Page Utama",
                    "Section Konten Tidak Terbatas",
                    "Desain Responsive Mobile & Desktop",
                    "Free Hosting (Tanpa Iuran Bulanan)",
                    "Tombol WhatsApp Direct Chat",
                    "Garansi 90 Hari Bug-Free",
                  ],
                },
                {
                  id: "advanced",
                  title: "Paket Advanced",
                  badge: "CMS & SEO",
                  price: "Rp 900.000",
                  dp: "Rp 450.000",
                  days: "5-7 Hari Kerja",
                  bullets: [
                    "Hingga 5 Halaman Utama",
                    "Dashboard Admin Panel (CMS Edit Sendiri)",
                    "SEO On-Page Optimization",
                    "Google Search Console Indexing",
                    "Free Hosting & Responsive Mobile",
                    "Garansi 90 Hari Bug-Free",
                  ],
                },
                {
                  id: "business",
                  title: "Paket Business",
                  badge: "PALING POPULER",
                  isPopular: true,
                  price: "Rp 1.500.000",
                  dp: "Rp 750.000",
                  days: "7-10 Hari Kerja",
                  bullets: [
                    "Hingga 5-10 Halaman Utama",
                    "GRATIS DOMAIN .COM 1 TAHUN",
                    "Katalog Produk Dinamis + Sync Sheets",
                    "CMS & Dashboard Admin Lengkap",
                    "SEO Complete & Indexing Google",
                    "Garansi 90 Hari Bug-Free",
                  ],
                },
                {
                  id: "ecommerce",
                  title: "Paket E-Commerce",
                  badge: "Toko Online Full",
                  price: "Rp 5.000.000",
                  dp: "Rp 2.500.000",
                  days: "14-21 Hari Kerja",
                  bullets: [
                    "Web Toko Online Full-Stack",
                    "Sistem Member & Login User",
                    "Payment Gateway Otomatis (QRIS & VA)",
                    "Dashboard Penjualan/Stok/Laporan",
                    "Free VPS 1 Bulan & Server Config",
                    "Garansi 90 Hari Bug-Free",
                  ],
                },
              ].map((pkg) => {
                const isSelected = packageId === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setPackageId(pkg.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between select-none ${
                      isSelected
                        ? "bg-[#141d2e] border-sky-400 shadow-lg shadow-sky-500/15 ring-2 ring-sky-500/30"
                        : "bg-[#131722] border-white/10 hover:border-white/20 hover:bg-[#181e2c]"
                    }`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow">
                        PALING POPULER
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              isSelected
                                ? "border-sky-400 bg-sky-500 text-white font-bold"
                                : "border-gray-500 bg-transparent"
                            }`}
                          >
                            {isSelected ? "✓" : ""}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-white">{pkg.title}</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-gray-300 border border-white/10">
                          {pkg.badge}
                        </span>
                      </div>

                      <div className="my-2.5 p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                        <div className="text-xs sm:text-sm font-black text-sky-300">{pkg.price}</div>
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          DP 50%: {pkg.dp}
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-3">
                        {pkg.bullets.map((b, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-300">
                            <span className="text-sky-400 font-bold shrink-0">&bull;</span>
                            <span className="leading-tight">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Estimasi: <strong className="text-white">{pkg.days}</strong></span>
                      <span className={`font-bold ${isSelected ? "text-sky-400" : "text-gray-500"}`}>
                        {isSelected ? "Paket Terpilih ✓" : "Klik untuk Pilih"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Package Banner Summary */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-blue-950/60 to-slate-900/60 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-extrabold text-white">
                    Paket Terpilih: <span className="text-sky-300">{selectedPkg.name}</span> (Rp {selectedPkg.total.toLocaleString("id-ID")})
                  </div>
                  <div className="text-[11px] text-gray-300">
                    DP 50% yang dibayarkan: <span className="text-emerald-400 font-bold font-mono">Rp {selectedPkg.dp.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                Lanjutkan Isi Data Bisnis &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INFORMASI BISNIS & BRANDING */}
        {currentStep === 2 && (
          <div className="space-y-5 max-w-xl mx-auto animate-in fade-in duration-200">
            {/* 1. INFORMASI BISNIS */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-sky-400" />
                  2. Informasi Bisnis <span className="text-rose-400 text-xs font-bold ml-1">* (Wajib Isi)</span>
                </h3>
                <p className="text-[11px] text-gray-400">Data resmi pemilik dan operasional usaha Anda.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Nama Bisnis / Perusahaan <span className="text-rose-400 font-bold">* (Wajib)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Contoh: Kopi Nusantara / PT Maju Jaya"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Nama Pemilik / Penanggung Jawab <span className="text-rose-400 font-bold">* (Wajib)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Nama Lengkap Anda"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Email Resmi <span className="text-rose-400 font-bold">* (Wajib)</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@bisnisanda.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Nomor WhatsApp Direct <span className="text-rose-400 font-bold">* (Wajib)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Kota / Domisili Usaha <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional - Boleh Dilewati)</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Jakarta / Surabaya / Bandung"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Bidang Usaha / Industri <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional - Boleh Dilewati)</span>
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Kuliner / Fashion / Konsultan / Konstruksi"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. BRANDING */}
            <div className="space-y-3 pt-2">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-400" />
                  Branding &amp; Identitas Visual <span className="text-gray-400 text-xs font-normal ml-1">(Opsional)</span>
                </h3>
                <p className="text-[11px] text-gray-400">Atur logo, skema warna, dan font favorit brand Anda.</p>
              </div>

              {/* Logo Upload Cloudinary */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <label className="block text-[11px] font-mono text-gray-300">
                  Upload Logo Bisnis <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional - Boleh Dilewati)</span>
                </label>
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-14 h-14 rounded-xl object-contain bg-black/40 border border-white/20 p-1" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-black/40 border border-dashed border-white/20 flex items-center justify-center text-gray-500 text-xs">
                      No Logo
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "Logo Utama", setLogoUrl);
                      }}
                      className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-500/20 file:text-sky-300 hover:file:bg-sky-500/30 cursor-pointer"
                    />
                    {uploadingAsset && <p className="text-[10px] text-sky-400 font-mono mt-1 animate-pulse">Memproses & mengunggah berkas...</p>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Warna Utama Website <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-9 h-9 rounded-lg bg-transparent cursor-pointer" />
                    <span className="text-xs font-mono text-gray-300">{primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">
                    Warna Sekunder <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-9 h-9 rounded-lg bg-transparent cursor-pointer" />
                    <span className="text-xs font-mono text-gray-300">{secondaryColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: 3. TENTANG BISNIS (TEXTAREA BESAR) & 4. TARGET WEBSITE */}
        {currentStep === 3 && (
          <div className="space-y-5 max-w-xl mx-auto animate-in fade-in duration-200">
            {/* 3. TENTANG BISNIS (TEXTAREA BESAR) */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  3. Tentang Bisnis &amp; Profil Produk <span className="text-gray-400 text-xs font-normal ml-1">(Opsional - Boleh Dilewati)</span>
                </h3>
                <p className="text-[11px] text-gray-400">Jelaskan mengenai latar belakang dan keunggulan bisnis Anda (boleh disusulkan belakangan).</p>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1">
                  Ceritakan Bisnis Anda <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                </label>
                <textarea
                  rows={4}
                  value={businessStory}
                  onChange={(e) => setBusinessStory(e.target.value)}
                  placeholder="Ceritakan sejarah singkat, produk utama, dan layanan bisnis Anda..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1">
                  Keunggulan dari Kompetitor <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={competitorDiff}
                  onChange={(e) => setCompetitorDiff(e.target.value)}
                  placeholder="Keunggulan unik, garansi, kualitas, atau pelayanan terbaik Anda..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1">
                  Visi &amp; Misi Bisnis <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={visionMission}
                  onChange={(e) => setVisionMission(e.target.value)}
                  placeholder="Visi jangka panjang dan misi utama perusahaan Anda..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* 4. TARGET WEBSITE */}
            <div className="space-y-3 pt-2">
              <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-400" />
                    4. Target Jenis Website <span className="text-rose-400 text-xs font-bold ml-1">* (Wajib Pilih)</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {packageId === "basic" ? "Paket Basic: Pilih 1 Jenis Website Utama" : "Pilih jenis website yang ingin dibangun."}
                  </p>
                </div>
                {packageId === "basic" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Maks 1 Pilihan
                  </span>
                )}
              </div>

              {/* Upgrade Banner Notice for Step 2 */}
              {upgradeBanner && (
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-mono flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{upgradeBanner}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      openWindow("services");
                      focusWindow("services");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-[10px] transition-all shrink-0 cursor-pointer"
                  >
                    Pilih Paket Business / E-Commerce
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Company Profile", "Landing Page", "Toko Online", "Booking Engine", "Portfolio", "Blog", "Custom App"].map((t) => {
                  const checked = targetType.includes(t);
                  const isTokoOnline = t === "Toko Online";
                  const isBooking = t === "Booking Engine";
                  const isCustomApp = t === "Custom App";
                  const isBasicOrAdvanced = packageId === "basic" || packageId === "advanced";

                  const isLocked =
                    (isTokoOnline && isBasicOrAdvanced) ||
                    (isBooking && isBasicOrAdvanced) ||
                    (isCustomApp && packageId !== "ecommerce");

                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        if (isLocked) {
                          const reqPkg = isTokoOnline ? "Business (Rp 1.500.000) atau E-Commerce" : "Business atau E-Commerce";
                          const msg = `Fitur ${t} membutuhkan ${reqPkg}. Silakan tingkatkan paket Anda.`;
                          addToast(`Pilih Paket ${isTokoOnline ? "Business / E-Commerce" : "Lanjutan"} 🚀`, msg);
                          setUpgradeBanner(msg);
                          setTimeout(() => setUpgradeBanner(null), 6000);
                          return;
                        }

                        if (packageId === "basic") {
                          setTargetType([t]);
                        } else {
                          setTargetType(checked ? targetType.filter((i) => i !== t) : [...targetType, t]);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-xs text-left font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        checked
                          ? "bg-sky-500/20 border-sky-400 text-sky-200"
                          : isLocked
                          ? "bg-white/5 border-white/5 text-gray-500 hover:border-amber-400/40 hover:text-gray-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{t}</span>
                        {isLocked && (
                          <span className="text-[9px] font-mono font-bold text-amber-400/80 bg-amber-400/10 px-1 py-0.2 rounded">
                            {isTokoOnline ? "BUSINESS+" : "PRO"}
                          </span>
                        )}
                      </div>
                      {checked && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: HALAMAN, UPLOAD ASSET & FITUR TAMBAHAN */}
        {currentStep === 4 && (
          <div className="space-y-5 max-w-xl mx-auto animate-in fade-in duration-200">
            {/* 5. HALAMAN DIBUTUHKAN */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Layout className="w-4 h-4 text-amber-400" />
                    5. Halaman yang Dibutuhkan <span className="text-rose-400 text-xs font-bold ml-1">* (Wajib Pilih)</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {packageId === "basic"
                      ? "Paket Basic: Pilih 1 Halaman Utama"
                      : packageId === "advanced" || packageId === "business"
                      ? "Pilih hingga maksimal 5 Halaman Utama"
                      : "Tentukan daftar menu halaman yang harus ada di website Anda."}
                  </p>
                </div>
                {packageId === "basic" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Maks 1 Halaman
                  </span>
                )}
                {(packageId === "advanced" || packageId === "business") && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Maks 5 Halaman
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Home", "Tentang Kami", "Layanan", "Produk", "Portfolio", "Blog", "FAQ", "Kontak"].map((p) => {
                  const checked = neededPages.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        if (packageId === "basic") {
                          setNeededPages([p]);
                        } else if ((packageId === "advanced" || packageId === "business") && !checked && neededPages.length >= 5) {
                          addToast("Batas Halaman Utama 🚀", "Paket Advanced & Business dibatasi maksimal 5 halaman utama.");
                        } else {
                          setNeededPages(checked ? neededPages.filter((item) => item !== p) : [...neededPages, p]);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-xs text-left font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        checked ? "bg-amber-500/20 border-amber-400 text-amber-200" : "bg-white/5 border-white/10 text-gray-400"
                      }`}
                    >
                      <span>{p}</span>
                      {checked && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. UPLOAD ASSET VAULT */}
            <div className="space-y-3 pt-2">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  6. Upload Asset Vault <span className="text-gray-400 text-xs font-normal ml-1">(Opsional - Bisa Disusulkan Vía WA/Drive)</span>
                </h3>
                <p className="text-[11px] text-gray-400">Unggah foto produk, foto tim, banner, PDF, atau dokumen pendukung (boleh dilewati jika belum ada).</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Foto Produk",
                  "Foto Tim",
                  "Video Promo",
                  "Banner",
                  "File PDF Catalog",
                  "Dokumen Perusahaan",
                  "Brand Guideline",
                ].map((assetCat) => (
                  <div key={assetCat} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-300">{assetCat}</span>
                    <input
                      type="file"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, assetCat, () => {});
                      }}
                      className="text-[10px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-indigo-500/20 file:text-indigo-300 hover:file:bg-indigo-500/30 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* 🎨 OPSIONAL: CANVAS PAINT STUDIO WIREFRAME */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/40 border border-purple-500/30 space-y-3 mt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                      <Brush className="w-4 h-4 text-purple-400" />
                      🎨 Punya Ide Tata Letak / Wireframe Sendiri? (Opsional)
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      Gunakan Paint Studio interaktif untuk mencoret-coret posisi banner, menu, &amp; tombol impian Anda. <strong className="text-purple-300 font-mono">Bebas dilewati jika Anda menyerahkan sepenuhnya desain kepada desainer Arjuna Dev.</strong>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0 ml-2">
                    100% Opsional
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    openWindow("paint");
                    focusWindow("paint");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-400/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <Brush className="w-4 h-4 text-purple-300" />
                  <span>🎨 Buka Paint Studio Canvas untuk Menggambar Wireframe ➔</span>
                </button>
              </div>

              {/* Uploaded Assets List */}
              {uploadedAssets.length > 0 && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
                  <div className="text-[10px] text-sky-400 font-bold">Daftar Asset Terupload ({uploadedAssets.length}):</div>
                  {uploadedAssets.map((ast, idx) => (
                    <div key={idx} className="flex items-center justify-between text-gray-300 text-[11px]">
                      <span>&bull; {ast.category}: {ast.name}</span>
                      <a href={ast.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Lihat</a>
                    </div>
                  ))}
                </div>
              )}
              {/* 10. FITUR TAMBAHAN (FULL 13 CHECKBOXES) */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    7. Fitur Tambahan <span className="text-gray-400 text-xs font-normal ml-1">(Opsional)</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {packageId === "basic"
                      ? "Paket Basic: Gratis WhatsApp & Google Maps"
                      : "Pilih fitur tambahan interaktif yang ingin dipasang."}
                  </p>
                </div>
                {packageId === "basic" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Paket Basic (Maks 2 Fitur)
                  </span>
                )}
              </div>

              {/* Upgrade Banner Notice */}
              {upgradeBanner && (
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-mono flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{upgradeBanner}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      openWindow("services");
                      focusWindow("services");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-[10px] transition-all shrink-0 cursor-pointer"
                  >
                    Pilih Paket Advanced / Business / E-Commerce
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "WhatsApp",
                  "Google Maps",
                  "Instagram Feed",
                  "Facebook Pixel",
                  "Google Analytics",
                  "Chat Widget",
                  "Payment Gateway",
                  "Live Chat",
                  "Multi Bahasa",
                  "Blog",
                  "Membership",
                  "Booking Engine",
                  "Newsletter",
                ].map((feat) => {
                  const checked = neededFeatures.includes(feat);
                  const isBasic = packageId === "basic";
                  const isAllowedBasic = feat === "WhatsApp" || feat === "Google Maps";
                  const isLockedForBasic = isBasic && !isAllowedBasic;

                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => {
                        if (isLockedForBasic) {
                          const msg = `Fitur '${feat}' tersedia pada Paket Advanced, Business, atau E-Commerce.`;
                          addToast("Pilih Paket Advanced / Business / E-Commerce 🚀", msg);
                          setUpgradeBanner(msg);
                          setTimeout(() => setUpgradeBanner(null), 6000);
                          return;
                        }
                        setNeededFeatures(checked ? neededFeatures.filter((i) => i !== feat) : [...neededFeatures, feat]);
                      }}
                      className={`p-2.5 rounded-xl border text-xs text-left font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        checked
                          ? "bg-purple-500/20 border-purple-400 text-purple-200"
                          : isLockedForBasic
                          ? "bg-white/5 border-white/5 text-gray-500 hover:border-amber-400/40 hover:text-gray-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{feat}</span>
                        {isLockedForBasic && (
                          <span className="text-[9px] font-mono font-bold text-amber-400/80 bg-amber-400/10 px-1 py-0.2 rounded">PRO</span>
                        )}
                      </div>
                      {checked && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 11. REFERENSI WEBSITE */}
            <div className="space-y-3 pt-2">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-sky-400" />
                  8. Referensi Website <span className="text-gray-400 text-xs font-normal ml-1">(Opsional - Boleh Dilewati)</span>
                </h3>
                <p className="text-[11px] text-gray-400">Link website yang Anda sukai sebagai acuan inspirasi desain.</p>
              </div>

              <div className="space-y-2">
                <input
                  type="url"
                  value={referenceUrl1}
                  onChange={(e) => setReferenceUrl1(e.target.value)}
                  placeholder="https://contoh-website-1.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                />
                <input
                  type="url"
                  value={referenceUrl2}
                  onChange={(e) => setReferenceUrl2(e.target.value)}
                  placeholder="https://contoh-website-2.com (Opsional)"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1">
                  Apa yang Anda Sukai dari Website Tersebut? <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                </label>
                <input
                  type="text"
                  value={referenceLikeReason}
                  onChange={(e) => setReferenceLikeReason(e.target.value)}
                  placeholder="Contoh: Warna layoutnya bersih, navigasinya cepat..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* 12. CATATAN & 13. TIMELINE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1">
                  9. Catatan Tambahan <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional)</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Hal lain yang ingin disampaikan kepada tim Arjuna Dev..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1">
                  10. Timeline Target Selesai <span className="text-gray-400 font-normal text-[10px] ml-1">(Opsional - Default Fleksibel)</span>
                </label>
                <div className="space-y-1.5">
                  {["1 minggu", "2 minggu", "1 bulan", "Fleksibel"].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-xs font-mono text-gray-300 cursor-pointer p-1.5 rounded-lg hover:bg-white/5">
                      <input
                        type="radio"
                        name="timeline"
                        value={t}
                        checked={timeline === t}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="text-sky-500 focus:ring-sky-400"
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* STEP 5: 14. REVIEW & PEMBAYARAN DP 50% */}
        {currentStep === maxSteps && (
          <div className="space-y-4 max-w-xl mx-auto animate-in fade-in duration-200">
            <div className="pb-2 border-b border-white/10">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                14. Review Ringkasan Data &amp; Pembayaran DP 50%
              </h3>
              <p className="text-[11px] text-gray-400">Tinjau seluruh data order Anda sebelum dikirim ke Dashboard Proyek.</p>
            </div>

            {/* Summary Review Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
              <div className="text-sky-300 font-bold border-b border-white/10 pb-1">Ringkasan Data Order:</div>
              <div>&bull; Nama Bisnis: <span className="text-white font-bold">{businessName || "-"}</span></div>
              <div>&bull; Pemilik / Email: <span className="text-white">{ownerName} ({email})</span></div>
              <div>&bull; Paket Dipilih: <span className="text-emerald-400 font-bold">{selectedPkg.name}</span></div>
              <div>&bull; Halaman: <span className="text-gray-300">{neededPages.join(", ")}</span></div>
              <div>&bull; Fitur: <span className="text-gray-300">{neededFeatures.join(", ")}</span></div>
              <div>&bull; Asset Upload: <span className="text-gray-300">{uploadedAssets.length} File Terupload</span></div>
              <div>&bull; Target Timeline: <span className="text-amber-300 font-bold">{timeline}</span></div>
            </div>

            {/* Price Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-900/40 to-blue-900/40 border border-sky-400/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-300">Total Biaya Paket:</span>
                <span className="text-white font-bold">Rp {selectedPkg.total.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold pt-2 border-t border-white/10">
                <span className="text-emerald-400">Uang Muka (DP 50%):</span>
                <span className="text-emerald-300">Rp {selectedPkg.dp.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("manual_transfer")}
                className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === "manual_transfer"
                    ? "bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                <QrCode className="w-5 h-5 text-sky-400 mb-1" />
                <div className="text-white text-xs font-extrabold">Transfer Bank Jago / QRIS</div>
                <div className="text-[10px] text-gray-400 font-mono font-normal">Manual &bull; Upload Bukti</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paywuz")}
                className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === "paywuz"
                    ? "bg-purple-500/20 border-purple-400 text-white shadow-lg shadow-purple-500/10"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                <Zap className="w-5 h-5 text-purple-400 mb-1" />
                <div className="text-white text-xs font-extrabold">Pembayaran Otomatis</div>
                <div className="text-[10px] text-gray-400 font-mono font-normal">Instant &bull; QRIS &amp; VA</div>
              </button>
            </div>

            {/* Manual Bank Details with Unique Code */}
            {paymentMethod === "manual_transfer" && (
              <div className="space-y-4">
                {/* Sub-step indicator bar for manual bank transfer */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs">
                  <div className="flex items-center gap-2 font-mono font-bold">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${manualPaymentStep === 1 ? "bg-sky-500 text-white" : "bg-emerald-500 text-white"}`}>
                      {manualPaymentStep === 1 ? "1" : "✓"}
                    </span>
                    <span className={manualPaymentStep === 1 ? "text-sky-300" : "text-gray-400"}>1. Transfer Dulu</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${manualPaymentStep === 2 ? "bg-sky-500 text-white" : "bg-white/10 text-gray-400"}`}>
                      2
                    </span>
                    <span className={manualPaymentStep === 2 ? "text-sky-300" : "text-gray-400"}>2. Upload Bukti &amp; Selesai</span>
                  </div>
                </div>

                {/* HALAMAN 1: TAMPILAN PEMBAYARAN REKENING & NOMINAL */}
                {manualPaymentStep === 1 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#141b2d] border border-sky-500/30 space-y-4 shadow-xl animate-in fade-in duration-200">
                    {/* Top Row: Bank Info */}
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div className="space-y-1.5 flex-1 w-full">
                        <div className="text-sky-300 font-bold text-xs flex items-center justify-between sm:justify-start gap-2">
                          <span className="font-mono text-sm text-sky-200 font-bold">Bank Tujuan: Bank Jago</span>
                          <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/30">Manual Transfer</span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-start gap-2 pt-1 flex-wrap">
                          <span className="text-white font-extrabold text-base sm:text-lg tracking-wider font-mono select-all">103965597312</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("103965597312", "rekening")}
                            className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-mono font-bold transition-all cursor-pointer border border-sky-400/30 active:scale-95 shrink-0 flex items-center gap-1.5"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedKey === "rekening" ? "Tersalin!" : "Salin Rekening"}</span>
                          </button>
                        </div>

                        <div className="text-gray-300 text-xs font-mono">A.N: <strong className="text-white">Haris Musafa</strong></div>
                      </div>

                      {/* Unique Code Box */}
                      <div className="w-full sm:w-auto p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 flex sm:flex-col justify-between sm:justify-center items-center text-left sm:text-right shrink-0">
                        <div className="text-[11px] font-mono text-amber-300">Kode Unik Transfer</div>
                        <div className="text-base sm:text-lg font-mono font-black text-amber-400">+{uniqueCode}</div>
                      </div>
                    </div>

                    {/* Total Amount Box with 1-Click Copy */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/30 to-teal-950/40 border border-emerald-400/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg">
                      <div>
                        <div className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">Total Yang Harus Ditransfer:</div>
                        <div className="text-xl sm:text-2xl font-mono font-black text-emerald-300 mt-0.5">
                          Rp {(selectedPkg.dp + uniqueCode).toLocaleString("id-ID")}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">DP 50% Rp {selectedPkg.dp.toLocaleString("id-ID")} + Kode Unik +{uniqueCode}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard((selectedPkg.dp + uniqueCode).toString(), "total_dp")}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-emerald-400/30 active:scale-95 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedKey === "total_dp" ? "Nominal Tersalin!" : "Salin Nominal Tepat"}</span>
                      </button>
                    </div>

                    {/* Warning Callout Box */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2.5 text-xs text-amber-200 font-sans leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-amber-300">INSTRUKSI:</span> Silakan buka m-banking atau ATM Anda, lalu transfer sejumlah <strong className="text-amber-300 font-mono underline decoration-amber-400/50">Rp {(selectedPkg.dp + uniqueCode).toLocaleString("id-ID")}</strong> ke rekening Bank Jago di atas. Setelah selesai transfer, klik tombol di bawah.
                      </div>
                    </div>

                    {/* Action Button: Konfirmasi Sudah Transfer */}
                    <button
                      type="button"
                      onClick={() => setManualPaymentStep(2)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20 transition-all border border-white/20 active:scale-95"
                    >
                      <span>Saya Sudah Transfer / Lanjut Upload Bukti ➔</span>
                    </button>
                  </div>
                )}

                {/* HALAMAN 2: UPLOAD BUKTI PEMBAYARAN */}
                {manualPaymentStep === 2 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#141b2d] border border-sky-500/30 space-y-4 shadow-xl animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                          <Upload className="w-4 h-4 text-emerald-400" />
                          Unggah Struk Bukti Transfer
                        </h4>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                          Nominal Transfer: Rp {(selectedPkg.dp + uniqueCode).toLocaleString("id-ID")} (Bank Jago)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setManualPaymentStep(1)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sky-300 text-[10px] font-mono border border-white/10 transition-all cursor-pointer"
                      >
                        &larr; Lihat Rekening
                      </button>
                    </div>

                    {/* Upload Struk Area */}
                    <div className="space-y-3">
                      <label className="block text-xs font-mono text-gray-200 font-bold">
                        Upload Foto Struk / Screenshot Bukti Transfer <span className="text-emerald-400">*</span>
                      </label>

                      {receiptUrl ? (
                        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={receiptUrl} alt="Bukti Transfer" className="w-14 h-14 object-cover rounded-xl border border-emerald-400/30 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Bukti Transfer Ter-upload!</span>
                              </div>
                              <p className="text-[10px] text-gray-400 font-mono truncate mt-0.5">{receiptUrl}</p>
                            </div>
                          </div>
                          <label className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-mono font-bold cursor-pointer transition-all shrink-0">
                            Ganti Foto
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleFileUpload(f, "Bukti Transfer DP", setReceiptUrl);
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-5 rounded-2xl bg-white/5 border-2 border-dashed border-sky-500/30 hover:border-sky-400 text-center space-y-3 transition-colors">
                          <Upload className="w-8 h-8 text-sky-400 mx-auto" />
                          <div>
                            <p className="text-xs font-bold text-white">Pilih Foto Struk atau Drop File di Sini</p>
                            <p className="text-[10px] text-gray-400 font-mono mt-1">Mendukung format JPG, PNG, atau Mobile Banking Screenshot</p>
                          </div>
                          <label className="inline-block px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold text-xs border border-sky-400/30 cursor-pointer transition-all active:scale-95">
                            <span>Browse File Struk</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleFileUpload(f, "Bukti Transfer DP", setReceiptUrl);
                              }}
                            />
                          </label>
                        </div>
                      )}

                      {uploadingReceipt && (
                        <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 font-mono flex items-center justify-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                          <span>Mengunggah foto bukti transfer ke server...</span>
                        </div>
                      )}
                    </div>

                    {/* Download Invoice Button & Agreement */}
                    <div className="pt-3 border-t border-white/10 space-y-3">
                      <button
                        type="button"
                        onClick={() => setIsInvoiceOpen(true)}
                        className="w-full p-3 rounded-xl bg-gradient-to-r from-sky-600/30 via-blue-600/30 to-indigo-600/30 hover:bg-sky-600/40 border border-sky-500/40 text-sky-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
                      >
                        <FileText className="w-4 h-4 text-sky-400" />
                        <span>📄 Lihat &amp; Download Kwitansi / Invoice Resmi PDF</span>
                      </button>

                      <label className="flex items-start gap-2 text-xs text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAgreementAccepted}
                          onChange={(e) => setIsAgreementAccepted(e.target.checked)}
                          className="w-4 h-4 rounded text-sky-500 bg-white/10 border-white/20 mt-0.5"
                        />
                        <span className="leading-snug text-[11px]">
                          Saya menyetujui Syarat &amp; Ketentuan Layanan Arjuna Dev, <strong className="text-emerald-400">Garansi 90 Hari Bug-Free</strong>, dan Garansi Pengerjaan Tepat Waktu.
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* WhatsApp Instant Quick Help Floating Bar */}
      <div className="px-3.5 sm:px-4 py-2 bg-[#121826] border-t border-white/10 flex items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center gap-2 text-gray-300 min-w-0">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
          <span className="text-[11px] truncate">Butuh bantuan mengisi brief atau bingung memilih paket?</span>
        </div>
        <a
          href="https://wa.me/6285693366142?text=Halo%20Haris%20Musafa,%20saya%20sedang%20mengisi%20Form%20Order%20dan%20butuh%20bantuan."
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
        >
          <span>Chat Haris WA</span>
        </a>
      </div>

      {/* Navigation Footer Controls */}
      <div className="p-3.5 sm:p-4 bg-[#141924] border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
        {currentStep > 1 ? (
          <button
            onClick={() => {
              if (paymentMethod === "manual_transfer" && manualPaymentStep === 2) {
                setManualPaymentStep(1);
              } else {
                setCurrentStep(currentStep - 1);
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all border border-white/10 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < maxSteps ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-sky-500/20 transition-all border border-white/20 active:scale-95 shrink-0"
          >
            <span>Lanjut</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : paymentMethod === "manual_transfer" && manualPaymentStep === 1 ? (
          <button
            onClick={() => setManualPaymentStep(2)}
            className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-sky-500/25 transition-all border border-white/20 active:scale-95 text-center leading-snug"
          >
            <span>Saya Sudah Transfer ➔</span>
          </button>
        ) : (
          <button
            onClick={handleSubmitOrder}
            disabled={submitting || !isAgreementAccepted}
            className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/25 transition-all border border-white/20 active:scale-95 disabled:opacity-50 text-center leading-snug"
          >
            {submitting ? "Memproses Order..." : "Kirim Bukti & Selesaikan Order ➔"}
          </button>
        )}
      </div>

      {/* Paywuz.id Payment Gateway Modal */}
      <PaywuzPaymentModal
        isOpen={isPaywuzModalOpen}
        onClose={() => setIsPaywuzModalOpen(false)}
        orderId={createdOrderId}
        amount={selectedPkg.dp}
        packageName={selectedPkg.name}
        clientName={ownerName || currentUser.displayName || "Klien"}
        clientEmail={currentUser.email || email}
        onPaymentSuccess={() => {
          openWindow("project_tracker");
          focusWindow("project_tracker");
        }}
      />

      {/* Printable Branded Official Invoice Modal */}
      <OrderInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        data={{
          orderId: createdOrderId || "ORD-2026-X91",
          createdAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          userName: ownerName || currentUser?.displayName || "Klien Arjuna Dev",
          userEmail: currentUser?.email || email || "klien@gmail.com",
          userPhone: phone || "085693366142",
          businessName: businessName || "Proyek Bisnis Klien",
          domainRequest: hasDomain ? existingDomain : ".com / .id",
          packageName: selectedPkg.name,
          totalPrice: selectedPkg.total,
          dpAmount: selectedPkg.dp,
          uniqueCode: paymentMethod === "manual_transfer" ? uniqueCode : 0,
          paymentMethod,
          receiptUrl,
          status: "paid_dp",
        }}
      />
    </div>
  );
};
