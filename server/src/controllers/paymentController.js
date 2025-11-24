const { createPaymentIntent } = require('../services/stripeService');

const createIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    const intent = await createPaymentIntent({
      amount: Math.round(Number(amount) * 100),
      metadata: { userId: req.user.id },
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIntent,
};

