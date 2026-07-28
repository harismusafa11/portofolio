import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Terminal Interaktif CLI — Arjuna Dev OS",
  description: "Interaktif command line interface (CLI) terminal untuk menjelajahi profil, skill teknis, dan perintah sistem Arjuna Dev.",
};

export default function TerminalPage() {
  return <MainEnvironment initialApp="terminal" />;
}
