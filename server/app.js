const express = require('express');
const connectaccount = require('./databases/Account');
const connectrequest = require('./databases/Requestbed');
const app = express();

//port
const port = process.env.port || 3001

// connectaccount();
connectrequest();

//Routes
app.use('/auth/',require('./routes/Account.js'))


//server listening 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })