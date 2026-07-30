import { create } from "zustand";
import { soundEngine } from "@/utils/soundEngine";

export type WallpaperType = "video-auto" | "video-aesthetic" | "video-aesthetic-2" | "bloom-dark" | "bloom-light" | "sunset-glow" | "emerald-forest" | "retro-xp" | "cyberpunk-blueprint";

export interface WindowState {
  id: string;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  time: string;
}

const DEFAULT_WINDOWS: Record<string, WindowState> = {
  about: {
    id: "about",
    title: "Haris Musafa — Developer Profile & Portfolio",
    iconName: "FileText",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 70, y: 25 },
    size: { width: 1020, height: 680 },
  },
  taskmanager: {
    id: "taskmanager",
    title: "Task_Manager.exe — Diagnostics & Quality Metrics",
    iconName: "Activity",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 105, y: 40 },
    size: { width: 880, height: 600 },
  },
  livechat: {
    id: "livechat",
    title: "LiveChat_Auth.exe — Konsultasi Real-Time",
    iconName: "MessageSquare",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 125, y: 30 },
    size: { width: 440, height: 600 },
  },
  order_wizard: {
    id: "order_wizard",
    title: "Order_Wizard.exe — Form Pemesanan Website",
    iconName: "CreditCard",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 110, y: 25 },
    size: { width: 680, height: 640 },
  },
  project_tracker: {
    id: "project_tracker",
    title: "Project_Tracker.exe — Dashboard Progress Klien",
    iconName: "TrendingUp",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 115, y: 30 },
    size: { width: 880, height: 620 },
  },
  paint: {
    id: "paint",
    title: "Paint_Notes.exe — Kanvas Sketsa Ide Proyek",
    iconName: "Brush",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 115, y: 45 },
    size: { width: 900, height: 620 },
  },
  services: {
    id: "services",
    title: "Services & Pricing — Arjuna Dev",
    iconName: "Briefcase",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 100, y: 30 },
    size: { width: 960, height: 650 },
  },
  portfolio: {
    id: "portfolio",
    title: "Portfolio Showcase — Selected Works & Live Demo",
    iconName: "Folder",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 90, y: 30 },
    size: { width: 1020, height: 680 },
  },
  contact: {
    id: "contact",
    title: "Contact_Haris.exe",
    iconName: "PhoneCall",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 140, y: 50 },
    size: { width: 760, height: 540 },
  },
  terminal: {
    id: "terminal",
    title: "Terminal Command Prompt — Arjuna Dev OS",
    iconName: "Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 130, y: 60 },
    size: { width: 780, height: 500 },
  },
  settings: {
    id: "settings",
    title: "Settings — System & Wallpaper",
    iconName: "Settings",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 150, y: 45 },
    size: { width: 780, height: 520 },
  },
  blog: {
    id: "blog",
    title: "Blog & Insight Bisnis — Arjuna Dev",
    iconName: "BookOpen",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 110, y: 45 },
    size: { width: 900, height: 620 },
  },
  faq: {
    id: "faq",
    title: "FAQ — Pertanyaan Sering Ditanyakan",
    iconName: "HelpCircle",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 135, y: 55 },
    size: { width: 840, height: 580 },
  },
};

interface WindowStore {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  selectedDesktopIconId: string | null;
  maxZIndex: number;
  isStartMenuOpen: boolean;
  isQuickSettingsOpen: boolean;
  isWidgetsOpen: boolean;
  isCalendarOpen: boolean;
  isTaskSwitcherOpen: boolean;
  isLocked: boolean;
  soundEnabled: boolean;
  wallpaper: WallpaperType;
  toasts: ToastItem[];

  orderWizardPackageId: string;
  openOrderWizard: (pkgId?: string) => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  snapWindow: (id: string, layout: "left" | "right" | "full") => void;
  focusWindow: (id: string) => void;
  selectDesktopIcon: (id: string | null) => void;
  updateWindowPosition: (id: string, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;

  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  toggleQuickSettings: () => void;
  closeQuickSettings: () => void;
  toggleWidgets: () => void;
  closeWidgets: () => void;
  toggleCalendar: () => void;
  closeCalendar: () => void;
  toggleTaskSwitcher: () => void;
  closeTaskSwitcher: () => void;
  toggleLock: () => void;
  toggleSound: () => void;
  setWallpaper: (wp: WallpaperType) => void;
  addToast: (title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const syncUrlSlug = (appId: string | null) => {
  if (typeof window === "undefined") return;
  const currentPath = window.location.pathname;
  const targetPath = appId ? `/${appId}` : "/";
  if (currentPath !== targetPath) {
    window.history.pushState(null, "", targetPath);
  }
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: DEFAULT_WINDOWS,
  activeWindowId: "about",
  selectedDesktopIconId: null,
  maxZIndex: 10,
  isStartMenuOpen: false,
  isQuickSettingsOpen: false,
  isWidgetsOpen: false,
  isCalendarOpen: false,
  isTaskSwitcherOpen: false,
  isLocked: false,
  soundEnabled: true,
  wallpaper: "video-auto",
  toasts: [],
  orderWizardPackageId: "basic",
  openOrderWizard: (pkgId?: string) => {
    const targetPkg = pkgId || "basic";
    set({ orderWizardPackageId: targetPkg });
    get().openWindow("order_wizard");
    get().focusWindow("order_wizard");
  },

  openWindow: (id: string) => {
    const state = get();
    if (!state.windows[id]) return;

    const currentMaxZ = Math.max(
      state.maxZIndex,
      ...Object.values(state.windows).map((w) => w.zIndex || 0)
    );
    const nextZIndex = currentMaxZ + 1;
    if (state.soundEnabled) soundEngine.playWindowOpen();

    syncUrlSlug(id);

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZIndex,
        },
      },
      activeWindowId: id,
      maxZIndex: nextZIndex,
      selectedDesktopIconId: null,
      isStartMenuOpen: false,
      isQuickSettingsOpen: false,
      isWidgetsOpen: false,
      isCalendarOpen: false,
      isTaskSwitcherOpen: false,
    });
  },

  closeWindow: (id: string) => {
    const state = get();
    if (!state.windows[id]) return;

    if (state.soundEnabled) soundEngine.playWindowClose();

    const updatedWindows = {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isOpen: false,
        isMinimized: false,
      },
    };

    let nextActiveId: string | null = null;
    let highestZ = -1;
    Object.values(updatedWindows).forEach((w) => {
      if (w.isOpen && !w.isMinimized && w.zIndex > highestZ) {
        highestZ = w.zIndex;
        nextActiveId = w.id;
      }
    });

    syncUrlSlug(nextActiveId);

    set({
      windows: updatedWindows,
      activeWindowId: nextActiveId,
    });
  },

  minimizeWindow: (id: string) => {
    const state = get();
    if (!state.windows[id]) return;

    if (state.soundEnabled) soundEngine.playWindowMinimize();

    const updatedWindows = {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isMinimized: true,
      },
    };

    let nextActiveId: string | null = null;
    let highestZ = -1;
    Object.values(updatedWindows).forEach((w) => {
      if (w.isOpen && !w.isMinimized && w.zIndex > highestZ) {
        highestZ = w.zIndex;
        nextActiveId = w.id;
      }
    });

    syncUrlSlug(nextActiveId);

    set({
      windows: updatedWindows,
      activeWindowId: nextActiveId,
    });
  },

  toggleMaximizeWindow: (id: string) => {
    const state = get();
    if (!state.windows[id]) return;

    const willMaximize = !state.windows[id].isMaximized;
    if (state.soundEnabled) {
      if (willMaximize) soundEngine.playWindowMaximize();
      else soundEngine.playWindowRestore();
    }

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMaximized: willMaximize,
        },
      },
    });
  },

  snapWindow: (id: string, layout: "left" | "right" | "full") => {
    const state = get();
    if (!state.windows[id]) return;

    if (state.soundEnabled) soundEngine.playWindowMaximize();

    const screenW = typeof window !== "undefined" ? window.innerWidth : 1280;
    const screenH = typeof window !== "undefined" ? window.innerHeight - 48 : 800;

    let nextPos = { x: 0, y: 0 };
    let nextSize = { width: screenW, height: screenH };
    let isMaximized = false;

    if (layout === "left") {
      nextPos = { x: 0, y: 0 };
      nextSize = { width: Math.floor(screenW / 2), height: screenH };
    } else if (layout === "right") {
      nextPos = { x: Math.floor(screenW / 2), y: 0 };
      nextSize = { width: Math.floor(screenW / 2), height: screenH };
    } else {
      isMaximized = true;
    }

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          position: nextPos,
          size: nextSize,
          isMaximized,
          isMinimized: false,
        },
      },
    });
  },

  focusWindow: (id: string) => {
    const state = get();
    if (!state.windows[id] || !state.windows[id].isOpen) return;

    const currentMaxZ = Math.max(
      state.maxZIndex,
      ...Object.values(state.windows).map((w) => w.zIndex || 0)
    );

    // If it's already the active window with the highest zIndex and not minimized, do nothing
    if (
      state.activeWindowId === id &&
      !state.windows[id].isMinimized &&
      state.windows[id].zIndex === currentMaxZ
    ) {
      return;
    }

    const nextZIndex = currentMaxZ + 1;
    if (state.soundEnabled) soundEngine.playClick();
    
    syncUrlSlug(id);

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: false,
          zIndex: nextZIndex,
        },
      },
      activeWindowId: id,
      maxZIndex: nextZIndex,
      selectedDesktopIconId: null,
      isStartMenuOpen: false,
      isQuickSettingsOpen: false,
      isWidgetsOpen: false,
      isCalendarOpen: false,
      isTaskSwitcherOpen: false,
    });
  },

  selectDesktopIcon: (id: string | null) => {
    const state = get();
    if (state.soundEnabled && id !== null && state.selectedDesktopIconId !== id) {
      soundEngine.playClick();
    }
    set({ selectedDesktopIconId: id });
  },

  updateWindowPosition: (id: string, pos: { x: number; y: number }) => {
    const state = get();
    if (!state.windows[id]) return;
    set({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          position: pos,
        },
      },
    });
  },

  updateWindowSize: (id: string, size: { width: number; height: number }) => {
    const state = get();
    if (!state.windows[id]) return;
    set({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          size,
        },
      },
    });
  },

  toggleStartMenu: () => {
    const state = get();
    if (state.soundEnabled) soundEngine.playStartMenu();
    set({
      isStartMenuOpen: !state.isStartMenuOpen,
      selectedDesktopIconId: null,
      isQuickSettingsOpen: false,
      isWidgetsOpen: false,
      isCalendarOpen: false,
      isTaskSwitcherOpen: false,
    });
  },

  closeStartMenu: () => set({ isStartMenuOpen: false }),

  toggleQuickSettings: () => {
    const state = get();
    if (state.soundEnabled) soundEngine.playQuickSettings();
    set({
      isQuickSettingsOpen: !state.isQuickSettingsOpen,
      selectedDesktopIconId: null,
      isStartMenuOpen: false,
      isWidgetsOpen: false,
      isCalendarOpen: false,
      isTaskSwitcherOpen: false,
    });
  },

  closeQuickSettings: () => set({ isQuickSettingsOpen: false }),

  toggleWidgets: () => {
    const state = get();
    if (state.soundEnabled) soundEngine.playQuickSettings();
    set({
      isWidgetsOpen: !state.isWidgetsOpen,
      selectedDesktopIconId: null,
      isStartMenuOpen: false,
      isQuickSettingsOpen: false,
      isCalendarOpen: false,
      isTaskSwitcherOpen: false,
    });
  },

  closeWidgets: () => set({ isWidgetsOpen: false }),

  toggleCalendar: () => {
    const state = get();
    if (state.soundEnabled) soundEngine.playQuickSettings();
    set({
      isCalendarOpen: !state.isCalendarOpen,
      selectedDesktopIconId: null,
      isStartMenuOpen: false,
      isQuickSettingsOpen: false,
      isWidgetsOpen: false,
      isTaskSwitcherOpen: false,
    });
  },

  closeCalendar: () => set({ isCalendarOpen: false }),

  toggleTaskSwitcher: () => {
    const state = get();
    if (state.soundEnabled) soundEngine.playStartMenu();
    set({
      isTaskSwitcherOpen: !state.isTaskSwitcherOpen,
      selectedDesktopIconId: null,
      isStartMenuOpen: false,
      isQuickSettingsOpen: false,
      isWidgetsOpen: false,
      isCalendarOpen: false,
    });
  },

  closeTaskSwitcher: () => set({ isTaskSwitcherOpen: false }),

  toggleLock: () => {
    const state = get();
    if (state.soundEnabled) soundEngine.playLockSound();
    set({ isLocked: !state.isLocked });
  },

  toggleSound: () => {
    const state = get();
    const nextSound = !state.soundEnabled;
    if (nextSound) soundEngine.playClick();
    set({ soundEnabled: nextSound });
  },

  setWallpaper: (wp: WallpaperType) => {
    const state = get();
    if (state.soundEnabled) soundEngine.playWallpaperChange();
    set({ wallpaper: wp });
  },

  addToast: (title: string, message: string) => {
    const state = get();
    if (state.toasts.some((t) => t.title === title)) return;
    const id = Math.random().toString(36).substring(2, 9);
    const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    if (state.soundEnabled) soundEngine.playNotification();
    set({
      toasts: [...state.toasts, { id, title, message, time }],
    });
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
