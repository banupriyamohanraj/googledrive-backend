const router = require('express').Router();
const {MongoClient,ObjectID}=require('mongodb');

const dbUrl = process.env.DB_URL ||'mongodb://localhost:27017'


router.post('/register',async(req,res)=>{
try {
    
    let client = await MongoClient.connect(dbUrl);
    let db = client.db('user');
    let data = await db.collection('logininfo').findOne({email:req.body.email})
    if(!data){
        await db.collection('logininfo').insertOne(req.body)
        res.status(200).json({message:"user successfully registered"})        
    }else{
        res.status(404).json({message:"User already registered"})
    }
} catch (error) {
    console.log(error)
    res.sendStatus(500)
}

})

module.exports= router