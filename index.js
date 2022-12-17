const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors());

const uri = process.env.DB_SECRET_KEY;
const Client = new MongoClient(uri)

async function run(){
    try {
        const UserCollection = Client.db("AtgWorld").collection('users');
        const PostsCollection = Client.db("AtgWorld").collection('posts');
        const CommentsCollection = Client.db("AtgWorld").collection('comments');

        // Logs Methods of Login and registration or Forgot Password
        // registration
        app.post('/v1/register',async(req,res)=>{
            try {
                const dbUsers = await UserCollection.findOne({email : req.body.email})
                if(dbUsers) {
                     res.status(400).json({
                        message : "Email already exists"})
                }
                const result = await UserCollection.insertOne(req.body)
               if(result.acknowledged){
                res.send({message: "Registration successfully"})
               }
               else{
                res.send({message: "Registration failed"})
               }
                
            } catch (error) {
                console.log(error.message);
            }
        })
        // Login
        app.post('/v1/login',async(req,res)=>{
            try {
                const email = req.body.email;
                const password = req.body.password;
                // console.log(email, password);
                const dbUsers = await UserCollection.findOne({email : email})
                console.log(dbUsers);
                if(password){
                    if(dbUsers){
                        const dbPassword = dbUsers.password;
                        if(dbPassword === password) {
                            res.send({message : "Successfully"});
                        } else{
                            res.send({message : "Password is correct"});
                        }
    
                    } else{
                        res.send({message : "'User Not Found'. Please Create a new account"});
                    }
                   } else{
                res.send({message : "Password have not found"});
               }
            } catch (error) {
            }
        })
        // Forgot Password
        app.post('/v1/forgetPassword',async(req,res)=>{
            try {
                const email = req.body.email;
            const dbUsers = await UserCollection.findOne({email : email})
           if(dbUsers?.email === email){
                res.send({message:`Your password is ${dbUsers.password}`});
               
           }
            res.send({message : "incorrect email address"});
            } catch (error) {
                console.log(error);
            }
        })

        // Post Curd operations
        // Read 
        app.get('/v1/allPost', async (req, res) => {
            try {
                const posts = await PostsCollection.find().toArray();
                res.send(posts);
            } catch (error) {
                console.log(error.message);
            }
        })
        // Create 
        app.post('/v1/addPost',async(req,res)=>{
          try {
            const post = req.body;
            const result = await PostsCollection.insertOne(post);
            if(result.acknowledged){

                res.send({  message : "Post add successfully"})
            }
            else{
                res.send({  message : "Post add failed"});
            }
          } catch (error) {
            console.log(error.message);
          }
        })
        // Delete 
        app.delete("/v1/delete/:id", async(req, res) => {
            try {
                const id = req.params.id;
                const result = await PostsCollection.deleteOne({_id : ObjectId(id)});
                if(result.deletedCount > 0){
                    res.send({  message : "Post delete successfully"});
                }
               else{
                res.send({ message : "Post delete failed"});
               }
            } catch (error) {
                
            }
        })
        // Update 
        app.patch('/v1/updatePost/:id',async(req,res)=>{
            try {
                const id = req.params.id;
                const query = {_id : ObjectId(id)}
                const result = await PostsCollection.updateOne(query,{$set:{
                    title : req.body.title,
                    description : req.body.description
                }})
                if(result.modifiedCount > 0){
                    res.send({  message : "Post update successfully"});
                }
                else{
                    res.send({  message : "Post update failed"});
                }
                
            } catch (error) {
                
            }
        })
        // Post like 
        app.patch('/v1/like/:id', async (req, res) => {
            try {
                const id = req.params.id;
                console.log(req.query.email);
                const query = {_id : ObjectId(id)}
                const dbPost = await PostsCollection.findOne(query);
                if(!dbPost.like){
                    const result = await PostsCollection.updateOne(query,{$set:{
                        likedEmail : [req.query?.email],
                        like : 1
                    }})
                    if(result.modifiedCount > 0){
                        res.send({  message : "liked successfully"});
                    }
                    else{
                        res.send({  message : "failed"});
                    }
                }
                else{
                   if(dbPost?.likedEmail && dbPost?.likedEmail.includes(req?.query?.email)){
                    res.send({  message : "already liked"});
                   }
                   else{
                    const like = dbPost.like;

                    const result = await PostsCollection.updateOne(query,{$set:{
                        likedEmail : [...dbPost?.likedEmail,req.query?.email],
                        like : like + 1
                    }})
                    if(result.modifiedCount > 0){
                        res.send({  message : "liked successfully"});
                    }
                    else{
                        res.send({  message : "failed"});
                    }
                   }
                }
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        })

          // Comment 
          app.get('/v1/comments/:postId', async (req, res) => {
            try {
                const id = req.params.postId;
                const query = {postId : id}
                const comments = await CommentsCollection.find(query).toArray();
                 res.send(comments);
            } catch (error) {
                console.log(error);
            }
        })
        app.post("/v1/comments", async(req , res)=>{
         try {
            const comment = await CommentsCollection.insertOne(req.body);
            if(comment.acknowledged){
                res.send({  message : "Comment added successfully"});
            }else{
                res.send({  message : "Comment added failed"});
            }
         } catch (error) {
            console.log(error);
         }
        })
      

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
run().catch(error => console.log(error));

app.get('/', (req, res) => res.send('Atg World server is running'))
app.listen(port, () => console.log(`Atg World app listening on port ${port}!`))