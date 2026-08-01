import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Task Manager & System Metrics — Arjuna Dev",
  description: "Lihat metrik performa sistem, diagnostik kualitas, dan status server Arjuna Dev.",
  alternates: {
    canonical: "https://arjunadev.com/taskmanager",
  },
};

export default function TaskManagerPage() {
  return <MainEnvironment initialApp="taskmanager" />;
}
