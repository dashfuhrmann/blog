import { draftMode } from "next/headers";

export function GET(request: Request) {
  draftMode().disable();
  return new Response("Draft mode is enabled");
}
