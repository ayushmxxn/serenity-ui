import handler from "vinext/server/app-router-entry";

export default {
  async fetch(request: Request, env: Record<string, unknown>, ctx: unknown) {
    if (env && typeof env === "object") {
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string" && !process.env[key]) {
          process.env[key] = value;
        }
      }
    }
    return (handler as any).fetch(request, env, ctx);
  },
};
