const express = require('express');

//all module imports
const Bed = require('../models/Bed');


//middleware for token
const Userdata= require('../middleware/Userdata');


const router = express.Router();




//all beds showing route
router.get('/user/showtickets',
    Userdata,
    async (req, res) => {
        try {

            //find command returns all the rows of the database
            const ticket=await Bed.find();
            res.send(ticket);
            
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





//adding new ticket of bed route
router.post('/addticket/:hid',
    Userdata,
    async (req, res) => {
        try {


            //creating a new record with user id , hospital id and approve
            //another way to create a data other than the create function used in Account
            const bed=new Bed({
                user:req.user.id,
                hospital:req.params.hid,
                approve:false,
                //date is save in unix timestamp so that it can be changed to local time and showed how many days earlier the request is being
                //made using the moment.js
                date: Math.floor((new Date()).getTime() / 1000)
            })

            //saves the data on the database 
            const details=await bed.save();
            res.json(details);
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