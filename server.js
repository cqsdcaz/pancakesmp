const express = require('express');
const stripe = require('stripe')('pk_test_51Tf8eRCr0FNHIRbF6MshvGxS7xC0pHNTctbBUEwTnxK6dThSYkSMkr7jvyhPyEzmQ9NSqgUJTczDDbavDhjhr32S00m8coqRp6');
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
