import { z } from "zod";
import { quoteSchema } from "@/lib/schemas/quote";

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) ?? {};
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots get a normal-looking success so they don't learn to skip it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the highlighted fields", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  console.info("[quote]", JSON.stringify(parsed.data));
  // TODO(resend): email the request to the team inbox and send the client an acknowledgement.

  return Response.json({ ok: true });
}
