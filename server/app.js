const express = require('express')
const app = express()
const port = 3001
const mongoose=require('mongoose');


//database address
const dbaddress='mongodb+srv://mediocareteam:mediocareteam@cluster0.6dm6o.mongodb.net/Account?retryWrites=true&w=majority';

//connection
mongoose.connect(dbaddress).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })