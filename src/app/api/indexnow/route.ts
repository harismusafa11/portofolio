import { NextResponse } from "next/server";

const INDEXNOW_KEY = "4a8f9c2d1e3b5a7f6c8d9e0f1a2b3c4d";
const HOST_DOMAIN = "arjunadev.com";

const DEFAULT_URLS = [
  "https://arjunadev.com",
  "https://arjunadev.com/portofolio",
  "https://arjunadev.com/layanan",
  "https://arjunadev.com/blog",
  "https://arjunadev.com/blog/biaya-pembuatan-website-umkm-2026",
  "https://arjunadev.com/blog/perbedaan-landing-page-dan-website-perusahaan",
  "https://arjunadev.com/blog/strategi-seo-lokal-google-maps-bisnis",
  "https://arjunadev.com/blog/kenapa-kecepatan-website-mempengaruhi-penjualan",
  "https://arjunadev.com/blog/tips-memilih-jasa-pembuatan-website-terpercaya",
  "https://arjunadev.com/blog/wordpress-vs-custom-website-nextjs-bisnis",
  "https://arjunadev.com/blog/cara-membuat-website-toko-online-konversi-tinggi",
  "https://arjunadev.com/blog/tanda-website-perlu-redesign-update-modern",
  "https://arjunadev.com/blog/anatomi-landing-page-tingkatkan-chat-whatsapp",
  "https://arjunadev.com/blog/timeline-dan-tahapan-pembuatan-website-profesional",
  "https://arjunadev.com/tentang",
  "https://arjunadev.com/kontak",
];

const SEARCH_ENGINE_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export async function POST(request: Request) {
  try {
    let customUrls: string[] = [];
    try {
      const body = await request.json();
      if (Array.isArray(body.urls) && body.urls.length > 0) {
        customUrls = body.urls;
      }
    } catch {
      // Fallback to default URLs if no JSON body
    }

    const urlList = customUrls.length > 0 ? customUrls : DEFAULT_URLS;

    const payload = {
      host: HOST_DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST_DOMAIN}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const results = await Promise.allSettled(
      SEARCH_ENGINE_ENDPOINTS.map(async (endpoint) => {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        return {
          endpoint,
          status: res.status,
          statusText: res.statusText,
          ok: res.ok || res.status === 200 || res.status === 202,
        };
      })
    );

    const formattedResults = results.map((res, index) => {
      if (res.status === "fulfilled") {
        return res.value;
      } else {
        return {
          endpoint: SEARCH_ENGINE_ENDPOINTS[index],
          status: 500,
          statusText: (res as PromiseRejectedResult).reason?.message || "Failed to reach endpoint",
          ok: false,
        };
      }
    });

    return NextResponse.json({
      success: true,
      message: "IndexNow submission triggered across search engine network",
      submittedUrlsCount: urlList.length,
      urlList,
      endpoints: formattedResults,
    });
  } catch (err: any) {
    console.error("IndexNow submission error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to trigger IndexNow submission" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    protocol: "IndexNow v1.0",
    domain: HOST_DOMAIN,
    keyLocation: `https://${HOST_DOMAIN}/${INDEXNOW_KEY}.txt`,
    defaultUrlsSubmitted: DEFAULT_URLS.length,
  });
}
