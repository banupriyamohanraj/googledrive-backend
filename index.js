require ("dotenv").config();
const express = require ('express')
const {MongoClient,ObjectID}= require('mongodb')
const fs = require('fs')
const cors = require('cors')


const port = process.env.PORT ||3000
const dbUrl = process.env.DB_URL ||'mongodb://localhost:27017'

const app= express();
app.use(express.json());
app.use(cors())


app.get('/',async(req,res)=>{
try{
    let client = await MongoClient.connect(dbUrl);
    let db = client.db('user');
    let data = await db.collection('logininfo').find().toArray();
    if(data)
    {
        res.status(200).json(data);
    }else{
        res.status(404).json({message:"Data not found"})
    }
    client.close();
}
catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"})
}

});



app.listen(port,()=>console.log( `app runs with ${port}`));