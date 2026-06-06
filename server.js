const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Tf8eRCr0FNHIRbFSZZIuJJ3KDJZnh752LVl0ZYNNfQLlf6IMGQ8hc04g87UswcmfhudTAtSflaweCkSxGPrLsAx00MVaqMxMH');

const app = express();

// Allow requests from any origin (GitHub Pages site)
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, item, username, discord } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe uses cents
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            description: `Item: ${item} | User: ${username} | Discord: ${discord}`
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Stripe Error:", err);
        res.status(500).send({ error: err.message });
    }
});

// Use the dynamic port assigned by Render or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
