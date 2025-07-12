import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "prepAI",
  eventKey: process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY,
  signingKey: process.env.NEXT_PUBLIC_INNGEST_SIGNING_KEY,
});
