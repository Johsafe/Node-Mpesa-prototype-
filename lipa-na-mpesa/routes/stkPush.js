const express = require('express');
const axios = require('axios');
const stkRouter = express.Router();

// const generateToken = require('./middleware/createToken');

stkRouter.get('/token', (req, res) => {
  generateToken();
});

const generateToken = async(req, res, next) => {
  const secret = process.env.CONSUMER_SECRET;
  const consumer = process.env.CONSUMER_KEY;

  const auth = new Buffer.from(`${consumer}:${secret}`).toString('base64');

  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    .then((response) => {
      console.log(response) 
      // console.log(response.data.access_token);
      // token = response.data.access_token
      next();
    })
    .catch((err) => {
      console.log(err);
      //   res.status(400).json(err.message);
    });
};

stkRouter.post('/', generateToken, async (req, res) => {
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;

  // res.json({ phone, amount });

  // generating time stamp
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    ('0' + date.getDate()).slice(-2) +
    ('0' + date.getHours()).slice(-2) +
    ('0' + date.getMinutes()).slice(-2) +
    ('0' + date.getSeconds()).slice(-2);

  const shortcode = process.env.PAYBILL;
  const passkey = process.env.PASS_KEY;

  const password = new Buffer.from(shortcode + passkey + timestamp).toString(
    'base64'
  );
  // res.json(password)

  await axios
    .post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline', //for-till = CustomerBuyGoodsOnline
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortcode,
        PhoneNumber: `254${phone}`,
        CallBackURL: 'https://505e-105-161-222-75.eu.ngrok.io/callback',
        AccountReference: `254${phone}`,
        TransactionDesc: 'Test',
      },
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization:"Bearer OAaElZCDBzeEKoGVr5kPP7vXdGtT",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json(err.message);
    });
});

// response from saf
stkRouter.post('/callback' ,(req,res)=>{
  const callbackData = req.body;
  console.log(callbackData)

})

module.exports = stkRouter;
