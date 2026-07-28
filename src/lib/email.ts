import nodemailer from "nodemailer";

interface EmailOrderData {
  orderId: string;
  userName: string;
  userEmail: string;
  packageName: string;
  totalPrice: number;
  dpAmount: number;
  paymentMethod: string;
  receiptUrl?: string;
}

// Nodemailer Transporter Instance
const createTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.ADMIN_DEFAULT_EMAIL || "admin@arjunadev.com";
  const pass = process.env.SMTP_PASS || "";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });
};

// 1. HTML Email Template: Order Baru Created (Invoice / Ringkasan Pesanan)
export function getOrderCreatedEmailHtml(data: EmailOrderData): string {
  const formattedTotal = Number(data.totalPrice).toLocaleString("id-ID");
  const formattedDp = Number(data.dpAmount).toLocaleString("id-ID");
  const paymentMethodLabel = data.paymentMethod === "manual_transfer" ? "Transfer Bank Jago / QRIS Manual" : "Pembayaran Otomatis Paywuz (QRIS / VA)";

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Konfirmasi Order Baru — Arjuna Dev Studio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121826; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-bottom: 1px solid rgba(255,255,255,0.1);">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">⚡ ARJUNA DEV STUDIO</h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #38bdf8; font-family: monospace;">INVOICE & KONFIRMASI PESANAN BARU</p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; font-size: 11px; font-family: monospace; color: #38bdf8; font-weight: 700;">
                      ${data.orderId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #f1f5f9; line-height: 1.6;">
                Halo <strong>${data.userName}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                Terima kasih telah mempercayakan pembuatan website bisnis Anda kepada Arjuna Dev Studio. Pesanan Anda telah berhasil terdaftar di sistem kami.
              </p>

              <!-- Order Summary Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1a2234; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 24px; padding: 16px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-family: monospace; color: #38bdf8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Rincian Pesanan Website</p>
                    
                    <table width="100%" cellspacing="0" cellpadding="6" style="font-size: 13px;">
                      <tr>
                        <td style="color: #94a3b8; width: 40%;">ID Order:</td>
                        <td style="color: #ffffff; font-weight: 700; font-family: monospace;">${data.orderId}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8;">Paket Layanan:</td>
                        <td style="color: #38bdf8; font-weight: 700;">${data.packageName}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8;">Total Biaya:</td>
                        <td style="color: #ffffff;">Rp ${formattedTotal}</td>
                      </tr>
                      <tr style="border-top: 1px dashed rgba(255,255,255,0.1);">
                        <td style="color: #34d399; font-weight: 700;">DP 50% Harus Dibayar:</td>
                        <td style="color: #34d399; font-weight: 800; font-size: 15px;">Rp ${formattedDp}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8;">Metode Bayar:</td>
                        <td style="color: #cbd5e1;">${paymentMethodLabel}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Call to Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://arjunadev.com" target="_blank" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff; font-size: 13px; font-weight: 800; text-decoration: none; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(2, 132, 199, 0.4);">
                      🚀 Buka Dashboard Progress Proyek Saya
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
                Butuh bantuan langsung? Balas email ini atau hubungi tim kami via WhatsApp di <a href="https://wa.me/6285693366142" style="color: #34d399; text-decoration: none;">0856-9336-6142</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #0d121f; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #475569; font-family: monospace;">
                © 2026 Arjuna Dev Web Studio · Enkripsi SSL 256-bit · All Rights Reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// 2. HTML Email Template: Pembayaran DP Verified & Lunas (Kwitansi Lunas DP)
export function getPaymentVerifiedEmailHtml(data: EmailOrderData): string {
  const formattedDp = Number(data.dpAmount).toLocaleString("id-ID");

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pembayaran DP Terverifikasi — Arjuna Dev Studio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121826; border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Green Verified -->
          <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); border-bottom: 1px solid rgba(52, 211, 153, 0.2);">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">✅ PEMBAYARAN DP TERVERIFIKASI</h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #34d399; font-family: monospace;">ARJUNA DEV STUDIO — LUNAS DP 50%</p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(52, 211, 153, 0.2); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 20px; font-size: 11px; font-family: monospace; color: #34d399; font-weight: 700;">
                      VERIFIED
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #f1f5f9; line-height: 1.6;">
                Halo <strong>${data.userName}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                Kabar baik! Pembayaran DP 50% Anda sebesar <strong style="color: #34d399;">Rp ${formattedDp}</strong> untuk order <strong>#${data.orderId} (${data.packageName})</strong> telah berhasil diverifikasi oleh tim keuangan kami.
              </p>

              <!-- Progress Phase Info Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #142823; border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 12px; margin-bottom: 24px; padding: 16px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #34d399; font-weight: 700;">🎨 Tahap Pengerjaan Proyek Resmi Dimulai!</p>
                    <p style="margin: 0; font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                      Tim Full-Stack Engineer Arjuna Dev sedang menyusun arsitektur sistem, desain UI/UX, dan coding website Anda. Anda dapat memantau perkembangan secara real-time kapan saja melalui dashboard proyek.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://arjunadev.com" target="_blank" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; font-size: 13px; font-weight: 800; text-decoration: none; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.4);">
                      📄 Pantau Progress & Download Kwitansi PDF
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
                Terima kasih atas kepercayaan Anda bermitra bersama Arjuna Dev Web Studio.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #0d121f; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #475569; font-family: monospace;">
                © 2026 Arjuna Dev Web Studio · Garansi Bug-Free 90 Hari · All Rights Reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// 3. Main Sender Function
export async function sendTransactionalEmail(
  type: "order_created" | "payment_verified",
  data: EmailOrderData
): Promise<boolean> {
  try {
    const pass = process.env.SMTP_PASS;
    const fromAddress = process.env.SMTP_USER || "admin@arjunadev.com";

    console.log(`[Email System] Preparing to send '${type}' email to: ${data.userEmail}`);

    // If no SMTP password provided, log graceful notification & skip network call
    if (!pass) {
      console.log(`[Email System] ℹ️ SMTP credentials pending in .env.local — Transactional Email payload for '${type}' generated successfully:`);
      console.log(`[Email System] Target: ${data.userEmail} | Order ID: ${data.orderId} | DP: Rp ${data.dpAmount}`);
      return true;
    }

    const transporter = createTransporter();

    let subject = "";
    let html = "";

    if (type === "order_created") {
      subject = `[Arjuna Dev] Invoice & Konfirmasi Pesanan Baru #${data.orderId}`;
      html = getOrderCreatedEmailHtml(data);
    } else {
      subject = `[Arjuna Dev] ✅ Pembayaran DP 50% Terverifikasi #${data.orderId}`;
      html = getPaymentVerifiedEmailHtml(data);
    }

    const info = await transporter.sendMail({
      from: `"Arjuna Dev Studio" <${fromAddress}>`,
      to: data.userEmail,
      subject,
      html,
    });

    console.log(`[Email System] ✅ Email '${type}' sent successfully! MessageId: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error("[Email System] ❌ Failed to send transactional email:", err);
    return false;
  }
}
