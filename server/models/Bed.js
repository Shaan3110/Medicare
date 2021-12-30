const mongoose= require('mongoose')
const { Schema } = mongoose;

const accountmodel = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals'
    },
    approve:{
        type: Boolean,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('beds',accountmodel);