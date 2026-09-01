import { NextResponse } from "next/server";

export const revalidate = 21600;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
};

export async function GET(): Promise<NextResponse> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "serenity-ui-site",
      "X-GitHub-Api-Version": "2026-03-10",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    let allSupporters: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 10) {
      const response = await fetch(
        `https://api.github.com/repos/ayushmxxn/serenity-ui/stargazers?page=${page}&per_page=100`,
        { headers, signal: AbortSignal.timeout(8000) }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403 || response.status === 404) {
          // If unauthenticated or rate limited, return whatever supporters were collected or empty array
          if (allSupporters.length > 0) {
            return NextResponse.json(allSupporters, { headers: CACHE_HEADERS });
          }
          return NextResponse.json([], { status: 200, headers: CACHE_HEADERS });
        }
        break;
      }

      let data: any;
      try {
        data = await response.json();
      } catch {
        break;
      }

      if (!Array.isArray(data) || data.length === 0) {
        break;
      }

      allSupporters = [...allSupporters, ...data];

      const linkHeader = response.headers.get("Link");
      hasMore = linkHeader ? linkHeader.includes('rel="next"') : false;
      page += 1;
    }

    return NextResponse.json(allSupporters, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json([], { status: 200, headers: CACHE_HEADERS });
  }
}

