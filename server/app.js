const express = require('express');
const connectaccount = require('./databases/Account');
const connectrequest = require('./databases/Requestbed');
const app = express()
const port = 3001

// connectaccount();
connectrequest();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })