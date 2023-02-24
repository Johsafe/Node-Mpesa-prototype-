const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const stkRouter = require('./routes/stkPush.js');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running Server Successfully on ${port}.....`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Mpesa App Integration In progress<h1>');
});


app.use('/stkpush', stkRouter);
