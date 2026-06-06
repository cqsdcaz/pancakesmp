const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Tf8eRCr0FNHIRbFSZZIuJJ3KDJZnh752LVl0ZYNNfQLlf6IMGQ8hc04g87UswcmfhudTAtSflaweCkSxGPrLsAx00MVaqMxMH');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {

    try {

        const {
            amount,
            item,
            username,
            discord
        } = req.body;

        const paymentIntent =
            await stripe.paymentIntents.create({

                amount: Math.round(amount * 100),

                currency: 'usd',

                automatic_payment_methods: {
                    enabled: true
                },

                description:
                    `${item} | MC: ${username} | Discord: ${discord}`
            });

        res.send({
            clientSecret: paymentIntent.client_secret
        });

    } catch (err) {

        console.error(err);

        res.status(500).send({
            error: err.message
        });

    }

});

app.listen(3000, () => {

    console.log('Server running on port 3000');

});
```
