const mongooose = require('mongoose');

const uri = process.env.MONGO_URI

const connection = async () =>{
    try{
        // connect to database
        const connection  =  await mongooose.connect(uri)
        console.log("connection successfull !")
    }catch(error){
        console.log(error)
        await mongooose.disconnect()
    }
}

module.exports = connection