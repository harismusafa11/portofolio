import { Metadata } from "next";
import { MainEnvironment } from "@/components/MainEnvironment";

export const metadata: Metadata = {
  title: "Form Pemesanan Website — Arjuna Dev",
  description: "Formulir resmi pemesanan layanan pembuatan website profesional Arjuna Dev.",
  alternates: {
    canonical: "https://arjunadev.com/order-wizard",
  },
};

export default function OrderWizardPage() {
  return <MainEnvironment initialApp="order_wizard" />;
}
