import Stripe from 'stripe';
import prisma from '../config/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

export const createCheckoutSession = async (req, res, next) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.body.listingId } });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (!process.env.STRIPE_SECRET_KEY) {
      const order = await prisma.order.create({
        data: { listingId: listing.id, buyerId: req.user.id, amount: listing.price, status: 'PAID' },
      });
      return res.json({ mode: 'mock', orderId: order.id, message: 'Mock payment completed.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: listing.name },
            unit_amount: Math.round(listing.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });

    await prisma.order.create({
      data: {
        listingId: listing.id,
        buyerId: req.user.id,
        amount: listing.price,
        stripeSessionId: session.id,
      },
    });

    return res.json({ id: session.id, url: session.url });
  } catch (error) {
    return next(error);
  }
};
