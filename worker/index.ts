import handler from "vinext/server/app-router-entry";

interface FetchHandler {
  fetch: (request: Request, env: Record<string, unknown>, ctx: unknown) => Promise<Response>;
}

const worker = {
  async fetch(request: Request, env: Record<string, unknown>, ctx: unknown): Promise<Response> {
    if (env && typeof env === "object") {
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
    }
    return (handler as unknown as FetchHandler).fetch(request, env, ctx);
  },
};

export default worker;
