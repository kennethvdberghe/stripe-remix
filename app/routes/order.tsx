import { useLoaderData } from "@remix-run/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { Stripe } from "stripe";
import CheckoutForm from "~/components/CheckoutForm";
import { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } from "~/constants";

export const loader = async () => {
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "eur",
    payment_method_types: ["card", "bancontact"],
  });
  return {
    clientSecret: paymentIntent.client_secret,
    publicKey: STRIPE_PUBLIC_KEY,
  };
};

export default function Order() {
  const { clientSecret, publicKey } = useLoaderData<typeof loader>();
  const [random, setRandom] = useState(0);
  const stripePromise = useMemo(() => loadStripe(publicKey), [publicKey]);
  if (!clientSecret) {
    return <div>Woops, no clientSecret</div>;
  }
  return (
    <div style={{ maxWidth: "50%", margin: "0 auto" }}>
      <Elements
        options={{
          clientSecret,
          appearance: { theme: "stripe" },
        }}
        stripe={stripePromise}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
}
