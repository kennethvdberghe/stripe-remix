import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "./constants";

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
