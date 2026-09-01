export interface Stargazer {
  login: string;
  avatar_url: string;
}

export async function getStargazers(): Promise<Stargazer[] | null> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "serenity-ui-site",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      "https://api.github.com/repos/ayushmxxn/serenity-ui/stargazers?per_page=24&page=1",
      {
        next: { revalidate: 21600 },
        signal: AbortSignal.timeout(5000),
        headers,
      },
    );

    if (!res.ok) return null;

    const data: Stargazer[] = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}
