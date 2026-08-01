import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Dashboard Progress Proyek Klien — Arjuna Dev",
  description: "Pantau perkembangan pengerjaan website & proyek Anda secara real-time di Dashboard Klien Arjuna Dev.",
  alternates: {
    canonical: "https://arjunadev.com/project_tracker",
  },
};

export default function ProjectTrackerUnderscorePage() {
  return <MainEnvironment initialApp="project_tracker" />;
}
