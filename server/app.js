const express = require('express');
const connecttomongo = require('./databases/Database');
const app = express();

//port
const port = process.env.PORT || 5000

connecttomongo();



//middleware for json req
app.use(express.json())
//Routes
app.use('/auth/',require('./routes/Account.js'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/hospitals/',require('./routes/Hospital.js'))
app.use('/beds/',require('./routes/Bed.js'))


//server listening 
app.listen(port, function(){
  console.log(`http://localhost:${port}`);
});