import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.error("Error: GITHUB_TOKEN is missing in .env.local");
      return NextResponse.json(
        { error: "Server configuration error: GitHub token missing." },
        { status: 500 }
      );
    }

    console.log("Using token:", token.substring(0, 10) + "...");
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    };

    let allSupporters: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/repos/ayushmxxn/serenity-ui/stargazers?page=${page}&per_page=100`,
        { headers }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData: { message?: string; error?: string };
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }
        console.log("Error details:", errorData);

        if (response.status === 401) {
          return NextResponse.json(
            { error: "Unauthorized: Invalid or expired GitHub token." },
            { status: 401 }
          );
        }
        if (response.status === 403) {
          return NextResponse.json(
            { error: "Forbidden: Check rate limits or token permissions." },
            { status: 403 }
          );
        }
        if (response.status === 404) {
          return NextResponse.json(
            { error: "Repository not found. Verify the repository URL." },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { error: `Failed to fetch supporters: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      allSupporters = [...allSupporters, ...data];

      const linkHeader = response.headers.get("Link");
      hasMore = linkHeader ? linkHeader.includes('rel="next"') : false;
      page += 1;
    }

    return NextResponse.json(allSupporters);
  } catch (err: unknown) {
    console.error("Fetch error:", err);
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
