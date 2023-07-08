import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

import usersRoutes from './handlers/users';
import vehiclesRoutes from './handlers/vehicles';
import transactionsRoutes from './handlers/transactions';
import { transactionStore } from '../src/models/transactions';




const operations = new transactionStore();


const stripe = require('stripe')(process.env.STRIPE_SECRET);
// const bodyParser=require('body-parser')


const port = process.env.PORT;

const app: express.Application = express();
const address = `0.0.0.0:${port as string}`;



const cors = require("cors")
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH'],
}))

// to make transactions file allow access..
//app.use(express.static(Path.join(__dirname, 'transactions')));


app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/vehicles', vehiclesRoutes);
app.use('/transactions', transactionsRoutes);
// const endpointSecret = "whsec_7d39fde1103999538026af246603797255e54c3784eb32daf6e24ef7aabc2579";

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();

// This example uses Express to receive webhooks
// const express = require('express');
// const app = express();

// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app.post('/webhook', express.json({ type: 'application/json' }), async (request, response) => {
  const event = request.body;
  const transactionId2 = event.data.object.client_reference_id;
  console.log(`${transactionId2}`)
  switch (event.type) {
    case 'checkout.session.completed':
      const transactionId = event.data.object.client_reference_id;
      const paymentIntent = event.data.object;
      console.log(`checkout.session.completed +++          ${transactionId}`)
      try {
        const users = await operations.paidId(transactionId);
        // response.status(200).json(users);
        console.log(`payment_intent.succeeded  ++ ${transactionId} +++ ${users}`);
      } catch (err) {
        // response.status(400).send(`Get paid error: ${err}`);
        console.log(`Get paid error: ${err}`)
      }

      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_intent.succeeded':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });















  // Handle the event
  // // switch () {
  //   if(event.type=="checkout.session.completed"){
  //       const transactionId=event.data.object.client_reference_id;
  //     console.log(`${transactionId}  ++     ${event.data.object.client_reference_id}`);
  //   }
  //   if(event.type=="payment_intent.succeeded"){
  //   // case 'payment_intent.succeeded':
  //     // const paymentIntent = event.data.object;
  // // console.log("payment_intent.succeeded");
  //     // Then define and call a method to handle the successful payment intent.
  //     // handlePaymentIntentSucceeded(paymentIntent);
  //     try{
  //               // const users = await operations.paidId(transactionId);
  //               // response.status(200).json(users);
  //             }catch(err)
  //       {
  //         response.status(400).send(`Get paid error: ${err}`);
  //       }  
  //     }
  //     response.json({received: true});
}

  // Return a response to acknowledge receipt of the event
  // response.json({received: true});
  // }
);

// app.listen(8000, () => console.log('Running on port 8000'));
/////////////////////////////////////////////////////////////////////////////////////////////
// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_7d39fde1103999538026af246603797255e54c3784eb32daf6e24ef7aabc2579";

// app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     // const payloadString = JSON.stringify(request.body, null, 2);
//     event = await stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//           try{
//         const users = await operations.paidId(event.data.object.client_reference_id);
//         response.status(200).json(users);
//       }catch(err)
// {
//   response.status(400).send(`Get paid error: ${err}`);
// }  
//   } catch (err) {
//     console.log(`Webhook Error: ${err}`);
//     response.status(400).send(`Webhook Error: ${err}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       console.log("payment_intent.succeeded");
//       try{
//         const users = await operations.paidId(event.data.object.client_reference_id);
//         response.status(200).json(users);
//       }catch(err)
// {
//   response.status(400).send(`Get paid error: ${err}`);
// }      // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//       case 'payment_intent.created':
//       const paymentIntentCreated = event.data.object;
//       console.log("payment_intent.created");
//       try{
//         const users = await operations.paidId(event.data.object.client_reference_id);
//         response.status(200).json(users);
//       }catch(err)
// {
//   response.status(400).send(`Get paid error: ${err}`);
// }      // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });
///////////////////////////////////////////////////////////////////////////////////////////////////
// app.listen(4242, () => console.log('Running on port 4242'));






// app.post('/webhook',express.raw({type: 'application/json'}),(request, response) => {
//   const sig = request.headers['stripe-signature'];
//   const userString=JSON.stringify(request.body);
//   const payload = JSON.parse(userString);
//   let event;
//   // console.log(`${payload}, ${sig}, ${endpointSecret}`);
//   // response.status(400).json(`${request.body}, ${sig}, ${endpointSecret}`);


//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     console.log(`${request.body}, ${sig}, ${endpointSecret}`);
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         console.log(`Payment successed`);
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
//   } catch (err) {
//     response.status(400).json(`Webhook Error: ........`);
//     return;
//   }





// Handle the event


// Return a 200 response to acknowledge receipt of the event
// response.send();
// });

// app.get('/webhook',express.raw({type: 'application/json'}),async(req,res)=>{
// let signingsecret="whsec_7d39fde1103999538026af246603797255e54c3784eb32daf6e24ef7aabc2579";
// const payload=req.body;
// const sig=req.headers['stripe-signature'];
// let event;
// try{
// event = await stripe.webhooks.constructEvent(payload,sig,signingsecret);
// // console.log(event.type);
// // console.log(event.data.object);
// // console.log(event.data.object.id);
// res.status(200).json("webhook succeed");
// }catch (error){
// res.status(400).json("failed in webhook............");
// }
// console.log(event.type);
// console.log(event.data.object);
// console.log(event.data.object.id);
// });


app.get('/test-api', (req, res) => {
  res.send('Server Works!');
});
app.get('/successed', (req, res) => {
  const html = fs.readFileSync('./src/public/success.html', 'utf8')
  // res.render('test', { html: html })
  res.send(html)
});
app.get('/failed', (req, res) => {
  const html = fs.readFileSync('./src/public/failed.html', 'utf8')
  // res.render('test', { html: html })
  res.send(html)
});
app.listen(port || 3000, () => {
  console.log(`server started at localhost:${address}`);
});

export default app;










  // server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_7d39fde1103999538026af246603797255e54c3784eb32daf6e24ef7aabc2579";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));

























