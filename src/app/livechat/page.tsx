import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Live Chat & Konsultasi Real-Time — Arjuna Dev",
  description: "Konsultasi pembuatan website langsung dengan Haris Musafa (Founder Arjuna Dev) via Live Chat.",
  alternates: {
    canonical: "https://arjunadev.com/livechat",
  },
};

export default function LiveChatPage() {
  return <MainEnvironment initialApp="livechat" />;
}
