import { draftMode } from "next/headers";

export function GET(request: Request) {
  draftMode().enable();
  return new Response("Draft mode is enabled");
}
