import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "~/constants";

export const loader = async ({ request }: LoaderArgs) => {
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
  const url = new URL(request.url);
  const paymentIntentId = url.searchParams.get("payment_intent");
  if (!paymentIntentId) {
    return { redirect: "/order" };
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent.status;
};

export default function Confirm() {
  const status = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Confirm</h1>
      <p>{JSON.stringify(status)}</p>
    </div>
  );
}
