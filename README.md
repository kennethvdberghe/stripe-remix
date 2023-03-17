# POC Stripe payments with Stripe Elements

## Getting started

Create `.env` file to set environment variables:

- STRIPE_SECRET_KEY
- STRIPE_PUBLIC_KEY

These keys can be found [here](https://dashboard.stripe.com/apikeys).

- STRIPE_WEBHOOK_SECRET

This secret either is provided by stripe CLI when testing locally, or can be found on the stripe dashboard in the webhook details:

!["Stripe webhook details"](/webhook.png)

## Start payment

Go to `/order` to start making an payment of 1Eur.

After payment is made website will go to `/confirm` and display the status of payment.

## Resources

### PaymentIntent

> Asynchronous payment flows are complex to manage because they depend on customer interactions that happen outside of your application. PaymentIntents simplify this by keeping track of the status of the payment flow. The PaymentIntent objects act as the single source of truth in the lifecycle of the flow.

[Read more about PaymentIntent](https://stripe.com/docs/payments/intents)

### Webhooks

> Stripe uses webhooks to notify your application when an event happens in your account. Webhooks are particularly useful for asynchronous events like when a customer’s bank confirms a payment, a customer disputes a charge, a recurring payment succeeds, or when collecting subscription payments.

[Read more about Webhooks](https://stripe.com/docs/webhooks)

`/stripe_webhooks` endpoint [verifies the signature](https://stripe.com/docs/webhooks/signatures) of incomming events before logging its content.

[Read more about developing webhooks locally](https://stripe.com/docs/webhooks/test)
