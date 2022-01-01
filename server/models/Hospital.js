const mongoose= require('mongoose')
const { Schema } = mongoose;

const requestmodel = new Schema({
    name: String,
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    beds: 
    {
        type: String
    },
    approve:
    {
        type: Boolean,
        required: true
    },
    contact:
    {
        type:Number,
        required: true,
        unique: true
    },
    location:
    {
        type:String,
        required: true
    }
});

module.exports=mongoose.model('hospitals',requestmodel);