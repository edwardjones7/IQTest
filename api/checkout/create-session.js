'use strict';

const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const clientUrl = process.env.CLIENT_URL || 'https://your-vercel-domain.vercel.app';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'IQ Assessment Results',
              description: 'Full results report — IQ score, domain breakdown, percentile, and in-depth analysis.',
            },
            unit_amount: 199,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${clientUrl}/results?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/results?cancelled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
