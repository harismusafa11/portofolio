import { NextResponse } from "next/server";

const INDEXNOW_KEY = "4a8f9c2d1e3b5a7f6c8d9e0f1a2b3c4d";
const HOST_DOMAIN = "arjunadev.com";

const DEFAULT_URLS = [
  "https://arjunadev.com",
  "https://arjunadev.com/services",
  "https://arjunadev.com/portfolio",
  "https://arjunadev.com/order",
  "https://arjunadev.com/project-tracker",
  "https://arjunadev.com/blog",
  "https://arjunadev.com/faq",
  "https://arjunadev.com/about",
  "https://arjunadev.com/contact",
  "https://arjunadev.com/terminal",
  "https://arjunadev.com/settings",
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
      // If no JSON body, fallback to default URLs
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
          statusText: res.reason?.message || "Failed to reach endpoint",
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
