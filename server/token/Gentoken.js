//jsonwebtoken(jwt) is used to generate a token for the user on register or login and verification of it it consists of 3 parts written on documentation
const jwt = require('jsonwebtoken');
const JWT_SECRET="trialsecretkey"

//this function taken the user id from the module and as id is indexed in mongodb so we are using it to create a data which the jwt.sign
//function will use to generate a token in the variable jwtdata and return it to the main js file for sending it as response
function token(id){
    const data={
        user:{
            id:id
        }
    }
    const jwtdata= jwt.sign(data, JWT_SECRET);
    return jwtdata;
}

//exporting the function to be used by the other js modules
module.exports=token;
