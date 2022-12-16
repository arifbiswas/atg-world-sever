# 1. Register
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/register
Local Registration API: http://localhost:5000/v1/register
Method: Post
Get Warning : 3
message : "Email already exists"

message: "Registration successfully"

message: "Registration failed"

Need data like this (JSON):
{
    "firstName" : "Demo",
    "lastName" : " Name",
    "email" : "demo@gamil.com",
    "password" : "demoPassword"
}

# 2. Login
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/login
Local Registration API: http://localhost:5000/v1/login
Method: Post
Get warning : 4
message : "Successfully"

message : "Password is correct"

message : "'User Not Found'. Please Create a new account"

message : "Password have not found"

Need data like this (JSON):
{
    "email" : "demo@gamil.com",
    "password" : "demoPassword"
}

# 3. Forget Password
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/forgetPassword
Local Registration API: http://localhost:5000/v1/forgetPassword
Method: Post
Get warning : 2
message:`forget your password don't worry your password is ${dbUsers.password}`

message : "incorrect email address"

Need data like this (JSON):
{
    "email" : "demo@gamil.com"
}   


End Login Part 

CRUD
# 4.Create: Add New Post
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/addPost
Local Registration API: http://localhost:5000/v1/addPost
Method: Post
Get warning : 2
 message : "Post add successfully"

 message : "Post add failed"

Need data like this (JSON):
{
    "title": "Demo is Ready to Test",
    "description": "This is an example of how to test the application."
}



# 5. Read: Get all post

Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/allPost
Local Registration API: http://localhost:5000/v1/allPost
Method: Get

# 6. Delete: Delete post by id
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/delete/:id
Local Registration API: http://localhost:5000/v1/delete/:id
Method: Delete

# 7. Update: Update post by id
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/updatePost/:id
Local Registration API: http://localhost:5000/v1/updatePost/:id
Method: Patch
Need data like this (JSON):
{
    "title": "Demo is Ready to Test",
    "description": "This is an example of how to test the application."
}


# 8. Like: Like post by id
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/like/:id?email=demo@gmail.com
Local Registration API: http://localhost:5000/v1/like/:id?email=demo@gmail.com
Method: Post

# 9. Comment:Add new Comment 
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/comments
Local Registration API: http://localhost:5000/v1/comments
Method: Post



Need data like this (JSON):
{
    "postId": "",
    "comments": "text and comments"
}

# 10. Comment: GET All Comment particular posts by id
Online Registration API: https://atg-world-sever-arifbiswas.vercel.app/v1/comments/:postId
Local Registration API: http://localhost:5000/v1/comments/:postId
Method: GET

Done 
Please give my feedback
