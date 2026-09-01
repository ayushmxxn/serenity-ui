export async function getGithubStars(): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "serenity-ui-site",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      "https://api.github.com/repos/ayushmxxn/serenity-ui",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
        headers,
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (typeof data.stargazers_count === "number") {
      const count = data.stargazers_count;
      if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
      }
      return count.toString();
    }
    return null;
  } catch {
    return null;
  }
}
