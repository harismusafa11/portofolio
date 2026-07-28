import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Settings & Wallpaper System — Arjuna Dev",
  description: "Pengaturan sistem, pilihan wallpaper desktop, dan toggle efek suara antarmuka Arjuna Dev OS.",
};

export default function SettingsPage() {
  return <MainEnvironment initialApp="settings" />;
}
