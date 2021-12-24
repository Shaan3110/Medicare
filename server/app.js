const express = require('express');
const connectaccount = require('./databases/Account');
const connectrequest = require('./databases/Requestbed');
const app = express();

//port
const port = process.env.PORT || 3001

// connectaccount();
connectrequest();

//Routes
// app.use('/auth/',require('./routes/Account.js'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//server listening 
app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});