const express = require('express');
const connectaccount = require('./databases/Account');
const connectrequest = require('./databases/Requestbed');
const app = express();

//port
const port = process.env.PORT || 5000

connectaccount();
// connectrequest();


//middleware for json req
app.use(express.json())
//Routes
app.use('/auth/',require('./routes/Account.js'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


//server listening 
app.listen(port, function(){
  console.log(`http://localhost:${port}`);
});