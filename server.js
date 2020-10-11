const http = require('http');
const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const asyncHandler = require("express-async-handler")
const colors = require('colors');

dotenv.config()


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/sms', asyncHandler(async (req, res)=>{
  const accountSid = 'ACcd25aec9decc3b95a52c0bad23d63cb7';
  const authToken = process.env.AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const body = await req.body.body
  if(body){
    client.messages
    .create({
       body: req.body.body,
       from: '+15014303941',
       to: req.body.number
     }) .then(message => res.send(`the message to ${message.to} and body`));
  } else {
      res.status(404)
      throw new Error('message was not proccessed')
  }  
}))



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running on port ${PORT}`.yellow.bold))