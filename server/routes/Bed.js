const express = require('express');

//all module imports
const Bed = require('../models/Bed');


//middleware for token
const Userdata= require('../mIddleware/Userdata');


const router = express.Router();




//all beds showing route
router.get('/showtickets',
    async (req, res) => {
        const ticket=await Bed.find();
        res.send(ticket);
    });





//adding new ticket of bed route
router.post('/addticket/:hid',
    Userdata,
    async (req, res) => {
        try {
            console.log(req.user.id);
            console.log(req.params.hid)
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                "errors": [{
                "value": "no-value",
                "msg": "Sorry for the inconvinience some internal server error occurred",
                "param": "no-param",
                "location": "server"
                }]
            });
        }
    });

module.exports = router;