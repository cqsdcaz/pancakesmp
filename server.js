const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_ACTUAL_SECRET_KEY');
const app = express();
app.use(express.json());

app.post('/process-payment', async (req, res) => {
    try {
        const { token, amount, description } = req.body;
        // Create the charge using the token from the frontend
        const charge = await stripe.charges.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            source: token,
            description: description
        });
        res.json({ success: true, chargeId: charge.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
