import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Form Pemesanan Website — Arjuna Dev",
  description: "Formulir resmi pemesanan layanan pembuatan website profesional Arjuna Dev.",
  alternates: {
    canonical: "https://arjunadev.com/order_wizard",
  },
};

export default function OrderWizardUnderscorePage() {
  return <MainEnvironment initialApp="order_wizard" />;
}
