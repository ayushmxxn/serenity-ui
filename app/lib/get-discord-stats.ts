export interface DiscordStats {
  presenceCount: number;
  instantInvite?: string;
}

export async function getDiscordStats(): Promise<DiscordStats | null> {
  try {
    const res = await fetch(
      "https://discord.com/api/guilds/1278780582481891339/widget.json",
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(4000),
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (data && typeof data.presence_count === "number") {
      return {
        presenceCount: data.presence_count,
        instantInvite:
          data.instant_invite || "https://discord.com/invite/kzk6uWey3g",
      };
    }
    return null;
  } catch {
    return null;
  }
}
