/**
 * ARJUNA WEBDEV — Interactive Engine
 * Persis Sesuai Gambar Referensi 1 (Beranda) & Gambar 2 (Portofolio)
 *
 * Fitur:
 * - GSAP ScrollTrigger: Efek Stagger (30-40px translateY, 0.6s durasi, 0.15s stagger, once: true)
 * - Hero Avatar Parallax (Foto Arjuna bergerak halus saat discroll)
 * - Counter Statistik (Berhitung naik dari 0 ke target saat masuk viewport)
 * - Animated Skill Progress Bars (Bertambah dari 0% ke target)
 * - Filter Portofolio Kategori (All, Website, E-Commerce, App Design, UI/UX)
 * - Modal Pop-Up Detail Proyek (Preview, Deskripsi, Fitur, Tech Tags)
 * - Formulir Kontak Interaktif (Validasi, Loading, Toast, Integrasi WhatsApp)
 * - Mobile Navigation Drawer
 */

// Data Detail Proyek untuk Modal
const portfolioData = {
  1: {
    title: "Website Toko Online (E-Commerce)",
    category: "E-Commerce",
    year: "Tahun 2026",
    img: "assets/project_ecommerce.jpg",
    desc: "Platform toko online modern dengan tata letak visual mewah, performa kilat, dan checkout instan. Dilengkapi integrasi kalkulator ongkir kurir nasional (JNE, SiCepat, J&T) serta manajemen katalog dinamis.",
    features: [
      "Katalog produk responsif dengan filter kategori real-time",
      "Keranjang belanja interaktif & checkout terhubung otomatis",
      "Panel admin kelola produk, stok, dan rekap pesanan",
      "Tampilan 100% responsif optimal di layar ponsel"
    ],
    tech: ["React.js", "Tailwind CSS", "Node.js", "Payment API", "PWA Ready"]
  },
  2: {
    title: "Company Profile Arjuna Corp",
    category: "Website Bisnis",
    year: "Tahun 2026",
    img: "assets/project_corporate.jpg",
    desc: "Website profil perusahaan korporat berskala global bernuansa biru metalik dan perak elegan. Dirancang untuk memperkuat kredibilitas brand, memamerkan portofolio klien, dan menjaring calon mitra B2B.",
    features: [
      "Arsitektur visual korporat modern berstandar enterprise",
      "Struktur SEO teroptimasi untuk pencarian Google",
      "Halaman layanan komprehensif & unduh profil perusahaan PDF",
      "Formulir penawaran kerja sama terenkripsi aman"
    ],
    tech: ["Next.js", "TypeScript", "CSS Glassmorphism", "SEO Pro", "Analytics"]
  },
  3: {
    title: "Landing Page Startup SaaS",
    category: "Landing Page",
    year: "Tahun 2026",
    img: "assets/project_startup.jpg",
    desc: "Halaman pendaratan berfokus konversi tinggi untuk produk digital SaaS. Dilengkapi visual tiruan dashboard analitik, animasi mikro GSAP interaktif, dan alur pendaftaran uji coba yang mulus.",
    features: [
      "Hero section futuristik dengan visual mock UI modern",
      "Tabel komparasi fitur & kalkulator biaya langganan",
      "Skor kecepatan PageSpeed 98/100 tanpa hambatan",
      "Integrasi formulir newsletter dan leads capture"
    ],
    tech: ["HTML5", "Modern ES6+", "GSAP Motion", "Figma Design System"]
  },
  4: {
    title: "Sistem Manajemen Sekolah (EduFlow)",
    category: "Sistem Web",
    year: "Tahun 2026",
    img: "assets/project_school.jpg",
    desc: "Aplikasi portal berbasis web untuk administrasi akademik sekolah terpadu. Memudahkan rekap absensi guru dan siswa, input nilai rapor berkala, dan akses laporan bagi wali murid.",
    features: [
      "Multi-role user authentication (Admin, Guru, Siswa, Wali)",
      "Grafik analitik kehadiran dan distribusi nilai kelas",
      "Cetak & unduh rekap nilai rapor otomatis format PDF",
      "Keamanan enkripsi data dan pencadangan awan harian"
    ],
    tech: ["Fullstack Web App", "PostgreSQL", "Tailwind UI", "Auth Security"]
  },
  5: {
    title: "Website Travel Agent & Tour Booking",
    category: "Website Bisnis",
    year: "Tahun 2026",
    img: "assets/project_travel.jpg",
    desc: "Situs agen perjalanan dan paket wisata dengan galeri destinasi memukau. Dilengkapi modul pemilihan tanggal liburan, detail itinerari perjalanan, dan tombol konfirmasi instan ke WhatsApp pemesanan.",
    features: [
      "Pencarian paket wisata berdasarkan destinasi & lama hari",
      "Galeri foto resolusi tinggi & ulasan wisatawan",
      "Form reservasi tiket & paket liburan private/open trip",
      "Panduan tips wisata dan artikel blog teroptimasi SEO"
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Booking Engine", "Speed Cache"]
  },
  6: {
    title: "ARJUNA WEBDEV Official Site",
    category: "Landing Page",
    year: "Tahun 2026",
    img: "assets/ref_home.png",
    desc: "Website portofolio dan penawaran jasa pembuatan website resmi ARJUNA WEBDEV. Mengusung konsep dual-tone sci-fi (light tech di kiri, cyber navy di kanan) dengan animasi interaktif GSAP kelas dunia.",
    features: [
      "Scroll trigger stagger 0.15s & durasi animasi 0.6s",
      "Parallax hero avatar dengan lingkaran cyber HUD konsentris",
      "Rak melengkung portofolio dengan kartu mockup laptop",
      "Ringan tanpa build tools rumit, siap diunggah ke hosting mana pun"
    ],
    tech: ["HTML5", "CSS3 Split Architecture", "GSAP ScrollTrigger", "Mobile First"]
  }
};

// Inisialisasi setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {

  // ---------------- 1. NAVBAR SCROLL EFFECT ----------------
  const header = document.getElementById('main-header');
  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---------------- 2. MOBILE MENU DRAWER ----------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-drawer-cta a');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ---------------- 3. ACTIVE NAV LINK ON SCROLL ----------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-item');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ---------------- 4. GSAP & SCROLLTRIGGER ANIMATIONS ----------------
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // A. Hero HUD & Avatar ScrollTrigger Parallax
    const heroSection = document.getElementById('beranda');
    const hudOuter = document.getElementById('hud-outer-rings');
    const hudMid = document.getElementById('hud-mid-rings');
    const hudInner = document.getElementById('hud-inner-rings');
    const heroAvatar = document.querySelector('.hero-avatar-wrapper');
    const floatingCard = document.querySelector('.floating-portfolio-card');

    if (heroSection) {
      if (hudOuter) {
        gsap.to(hudOuter, {
          rotation: 180,
          transformOrigin: '1060px 380px',
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      if (hudMid) {
        gsap.to(hudMid, {
          rotation: -240,
          transformOrigin: '1060px 380px',
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      if (hudInner) {
        gsap.to(hudInner, {
          rotation: 360,
          transformOrigin: '1060px 380px',
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      // Interactive 3D Holographic Mouse Parallax on Hero Canvas
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
        const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

        if (heroAvatar) gsap.to(heroAvatar, { x: xNorm * 14, y: yNorm * 8, duration: 0.9, ease: 'power2.out' });
        if (floatingCard) gsap.to(floatingCard, { x: xNorm * 20, y: yNorm * 12, rotationY: xNorm * 12, rotationX: -yNorm * 10, duration: 0.9, ease: 'power2.out' });
      });
    }

    // B. Scroll Trigger di SEMUA Bagian:
    // • Elemen muncul bertahap: naik 30–40px + memudar
    // • Jeda antar elemen: 0.15 detik
    // • Kecepatan animasi: 0.6 detik
    // • Hanya muncul sekali saat pertama kali terlihat (once: true)
    const animSections = document.querySelectorAll('.hero-split-section, .section, .portfolio-showcase-section');
    animSections.forEach(sec => {
      const items = sec.querySelectorAll('[data-scroll-item]');
      if (items.length > 0) {
        gsap.from(items, {
          y: 35,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%',
            once: true
          }
        });
      }
    });

    // B2. Portfolio Section Parallax & Stagger ScrollTriggers
    const pfSection = document.getElementById('portofolio');
    const pfAvatar = document.querySelector('.shelf-avatar-img');
    const pfRing = document.querySelector('.shelf-cyber-ring');
    const pfTriangle = document.querySelector('.shelf-cyber-triangle');
    const pfCardsRow = document.querySelector('.shelf-cards-row');
    const pfCards = document.querySelectorAll('.shelf-card');

    if (pfSection) {
      if (pfAvatar) {
        gsap.to(pfAvatar, {
          y: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: pfSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      if (pfRing) {
        gsap.to(pfRing, {
          y: 25,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: pfSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      if (pfTriangle) {
        gsap.to(pfTriangle, {
          y: 20,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: pfSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4
          }
        });
      }

      if (pfCardsRow && pfCards.length > 0) {
        gsap.from(pfCards, {
          y: 55,
          opacity: 0,
          scale: 0.94,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: pfCardsRow,
            start: 'top 85%',
            once: true
          }
        });
      }
    }

    // 3D Card Tilt & Interactive Mouse Glow for Portfolio Shelf Cards (Smooth GSAP Interpolation)
    if (pfCards && pfCards.length > 0) {
      pfCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xNorm = (x / rect.width - 0.5) * 2;
          const yNorm = (y / rect.height - 0.5) * 2;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          gsap.to(card, {
            rotationY: xNorm * 7,
            rotationX: -yNorm * 7,
            y: -6,
            transformPerspective: 900,
            duration: 0.25,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        });

        card.addEventListener('mouseleave', () => {
          if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

          card.style.removeProperty('--mouse-x');
          card.style.removeProperty('--mouse-y');

          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
            clearProps: 'transform'
          });
        });
      });
    }

    // C. Bagian Statistik: Angka berhitung naik dari 0 ke nilai target saat terlihat
    const statsSection = document.querySelector('.stats-banner-section');
    const counters = document.querySelectorAll('.stat-counter');
    
    if (statsSection && counters.length > 0 && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: statsSection,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = Math.floor(obj.val);
              }
            });
          });
        }
      });
    }

    // D. Bagian Keahlian: Garis kemajuan bertambah dari 0 ke angka persentase saat terlihat
    const aboutSection = document.querySelector('#tentang');
    const skillFills = document.querySelectorAll('.skill-bar-fill');

    if (aboutSection && skillFills.length > 0 && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '.skills-wrapper',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          skillFills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            fill.style.width = progress;
          });
        }
      });
    }

  } else {
    // Fallback jika CDN tidak tersedia
    document.querySelectorAll('[data-scroll-item]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.stat-counter').forEach(c => {
      c.textContent = c.getAttribute('data-target');
    });
    document.querySelectorAll('.skill-bar-fill').forEach(f => {
      f.style.width = f.getAttribute('data-progress');
    });
  }

  // ---------------- 5. PORTOFOLIO CATEGORY FILTER (PERSIS GAMBAR 2) ----------------
  const filterPills = document.querySelectorAll('.pf-pill-btn');
  const shelfCards = document.querySelectorAll('.shelf-card');

  filterPills.forEach(btn => {
    btn.addEventListener('click', () => {
      filterPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      shelfCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });

  // Modal backdrop click close
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // ESC key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

});

// ---------------- 6. MODAL DETAIL PORTOFOLIO ----------------
function openProjectModal(id) {
  const data = portfolioData[id];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTech = document.getElementById('modalTech');

  modalImg.src = data.img;
  modalImg.alt = data.title;
  modalCategory.textContent = data.category;
  modalYear.textContent = data.year;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;

  // Features list
  modalFeatures.innerHTML = '';
  data.features.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    modalFeatures.appendChild(li);
  });

  // Tech tags
  modalTech.innerHTML = '';
  data.tech.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    modalTech.appendChild(span);
  });

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// ---------------- 7. STUDIO INQUIRY SHORTCUTS ----------------
function selectServicePill(btnElement, serviceName) {
  const input = document.getElementById('serviceType');
  if (input) input.value = serviceName;

  const parent = btnElement.parentElement;
  if (parent) {
    const pills = parent.querySelectorAll('.inquiry-pill');
    pills.forEach(pill => pill.classList.remove('selected'));
  }
  btnElement.classList.add('selected');
}

function selectBudgetPill(btnElement, budgetRange) {
  const input = document.getElementById('budgetRange');
  if (input) input.value = budgetRange;

  const parent = btnElement.parentElement;
  if (parent) {
    const pills = parent.querySelectorAll('.inquiry-pill');
    pills.forEach(pill => pill.classList.remove('selected'));
  }
  btnElement.classList.add('selected');
}

function selectPricing(packageName) {
  let mappedService = "Website Bisnis";

  if (packageName.toLowerCase().includes("landing") || packageName.toLowerCase().includes("dasar")) {
    mappedService = "Landing Page";
  } else if (packageName.toLowerCase().includes("premium") || packageName.toLowerCase().includes("toko")) {
    mappedService = "Toko Online / Katalog";
  }

  const pills = document.querySelectorAll('.inquiry-pills-wrap .inquiry-pill');
  pills.forEach(pill => {
    if (pill.textContent.trim().toLowerCase().includes(mappedService.toLowerCase())) {
      selectServicePill(pill, mappedService);
    }
  });

  const notes = document.getElementById('projectNotes');
  if (notes && !notes.value) {
    notes.value = `Halo Arjuna, saya tertarik berdiskusi mengenai ${packageName}.`;
  }

  const contactSection = document.getElementById('kontak');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ---------------- 8. FORM SUBMIT & TOAST NOTIFICATION ----------------
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientWhatsapp').value.trim();
  const service = document.getElementById('serviceType') ? document.getElementById('serviceType').value : "Website Bisnis";
  const budget = document.getElementById('budgetRange') ? document.getElementById('budgetRange').value : "Rp 3 - 6 Juta";
  const notes = document.getElementById('projectNotes') ? document.getElementById('projectNotes').value.trim() : "";
  const submitBtn = document.getElementById('submitBtn');

  if (!name || !phone) {
    showToast("Perhatian", "Mohon lengkapi Nama Lengkap dan Nomor WhatsApp Anda.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      <span>Menyiapkan Rincian...</span>
    `;
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <i class="fa-brands fa-whatsapp"></i>
        <span>Mulai Konsultasi via WhatsApp</span>
      `;
    }

    showToast(
      "Rincian Siap Dikirim",
      `Terima kasih ${name}, rincian proyek Anda telah disiapkan untuk WhatsApp Arjuna.`
    );

    const waText = encodeURIComponent(
      `Halo Arjuna,\n\nSaya ingin konsultasi proyek website:\n• Nama: ${name}\n• WhatsApp: ${phone}\n• Jenis Layanan: ${service}\n• Perkiraan Anggaran: ${budget}\n• Kebutuhan: ${notes || "Diskusi awal"}\n\nTerima kasih.`
    );
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');

    const form = document.getElementById('contactForm');
    if (form) form.reset();
  }, 400);
}

// Toast helper
let toastTimer = null;
function showToast(title, message) {
  const toast = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}
