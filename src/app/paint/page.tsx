import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Paint Canvas & Sketsa Ide — Arjuna Dev",
  description: "Kanvas sketsa ide dan catatan interaktif di Arjuna Dev OS.",
  alternates: {
    canonical: "https://arjunadev.com/paint",
  },
};

export default function PaintPage() {
  return <MainEnvironment initialApp="paint" />;
}
