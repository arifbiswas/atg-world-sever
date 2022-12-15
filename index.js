const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors());

const uri = process.env.DB_SECRET_KEY;
const Client = new MongoClient(uri)

async function run(){
    try {
        const UserCollection = Client.db("AtgWorld").collection('users');

        app.post('/v1/users',async(req,res)=>{
            // console.log(req.body);
            try {
                const result = await UserCollection.insertOne(req.body)
                res.send(result)
            } catch (error) {
                console.log(error.message);
            }
        })
        app.get('/v1/users',async(req,res)=>{
            try {
                const users = await UserCollection.find().toArray()
                res.send(users)
            } catch (error) {
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
run().catch(error => console.log(error));

app.get('/', (req, res) => res.send('Atg World server is running'))
app.listen(port, () => console.log(`Atg World app listening on port ${port}!`))