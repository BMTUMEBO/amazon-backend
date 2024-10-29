

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config() 
const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express ()
app.use(cors({origin:true}))

app.use (express.json())
app.get ('/', (req,res)=>{
    res.status(200).json({
        message:'success', 
    });
});


// app.listen(5050)

app.post('/payment/create', async(req, res)=>{
    const total = req.query.total 
    if (total > 0) {
        // console.log ('payment recived', total);
        // res.send(total); 
        const paymentIntent = await stripe.paymentIntents.create({
            amount : total,
            currency:'usd'
        }); 
        res.status(201).json({
            clientSeceret:paymentIntent.client_secret, 
        });
    } else {
        res.statusMessage(401).json({
            message:'total must be greater than 0', 
        });
    }
}); 

app.listen(5000, (err)=>{
    if (err) throw err
    console.log("Running on port 5000")
});
