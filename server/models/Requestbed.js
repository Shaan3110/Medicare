const mongoose= require('mongoose')

const requestmodel = new Schema({
    name: String,
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    hospitalid: 
    {
        type: String,
        required: true,
        unique: true
    },
    date:
    {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('requests',requestmodel);