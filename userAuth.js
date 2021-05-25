const router = require('express').Router();
const {MongoClient,ObjectID}=require('mongodb');

const dbUrl = process.env.DB_URL ||'mongodb://localhost:27017'
const successmessage = {message:"user successfully registered"};
const registeredmessage = {message:"User already registered"};
const loginsuccess = {message:"Login Successful"};
const errormessage = {message:"Account does not exist,Kindly Register"}

router.post('/register',async(req,res)=>{
try {
    
    let client = await MongoClient.connect(dbUrl);
    let db = client.db('user');
    let data = await db.collection('logininfo').findOne({email:req.body.email})
    if(!data){
        await db.collection('logininfo').insertOne(req.body)
        res.status(200).json(req.body)        
    }else if(data){
        console.log(data)
        res.status(404).json(registeredmessage)
    }
} catch (error) {
    console.log(error)
    res.sendStatus(500)
}

})

router.post("/login",async (req,res)=>{
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('user');
        let data = await db.collection('logininfo').findOne({email:req.body.email,password:req.body.password})
        if(data){
            console.log(data)
            res.status(200).json(data)
        }else{
            res.status(404).json(errormessage)
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({message:"Internal Server Error"})
        
    }
})

module.exports= router;