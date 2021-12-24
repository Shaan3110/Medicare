const express = require('express');
const connectaccount = require('./databases/Account');
const connectrequest = require('./databases/Requestbed');
const app = express();

//port
const port = process.env.PORT || 3001

// connectaccount();
connectrequest();

//Routes
app.use('/auth/',require('./routes/Account.js'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


//server listening 
app.listen(port, function(){
  console.log("Server is live on "+port);
});