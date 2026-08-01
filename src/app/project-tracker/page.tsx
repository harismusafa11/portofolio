import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Dashboard Progress Proyek Klien — Arjuna Dev",
  description: "Pantau perkembangan pengerjaan website & proyek Anda secara real-time di Dashboard Klien Arjuna Dev.",
  alternates: {
    canonical: "https://arjunadev.com/project-tracker",
  },
  openGraph: {
    title: "Dashboard Progress Proyek Klien — Arjuna Dev",
    description: "Pantau perkembangan pengerjaan website & proyek Anda secara real-time di Dashboard Klien Arjuna Dev.",
    url: "https://arjunadev.com/project-tracker",
  },
};

export default function ProjectTrackerPage() {
  return <MainEnvironment initialApp="project_tracker" />;
}
