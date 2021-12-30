const express = require('express');
const connectaccount = require('./databases/Account');
const connecthospital = require('./databases/Hospital');
const app = express();

//port
const port = process.env.PORT || 5000

// connectaccount();
connecthospital();



//middleware for json req
app.use(express.json())
//Routes
app.use('/auth/',require('./routes/Account.js'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/hospitals/',require('./routes/Hospital.js'))


//server listening 
app.listen(port, function(){
  console.log(`http://localhost:${port}`);
});