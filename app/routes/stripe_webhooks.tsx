import type { ActionArgs } from "@remix-run/node";
import { STRIPE_WEBHOOK_SECRET } from "~/constants";
import { stripe } from "~/stripe.server";

export const action = async ({ request }: ActionArgs) => {
  const headers = request.headers;
  const signature = headers.get("stripe-signature");
  if (!signature) {
    return { status: 400, body: "Missing signature" };
  }
  const body = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
    console.log(event);
    return event;
  } catch (e) {
    console.error(e);
    return { status: 400, body: "Invalid signature" };
  }
};
