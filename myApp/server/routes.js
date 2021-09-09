var express=require('express');
var router=express.Router();
var passport=require("passport");
var Todo=require('./TodoModel');
var User=require('./users');

router.get("/todos",isLoggedIn,function(req,res){
    console.log(req.user);
    Todo.find({},function(err,items){
        if(err){
            console.log(err);
        }
        else{
            res.send(items);
        }
    })
})

router.post("/todos",isLoggedIn,function(req,res){
  
    var text=req.body.text;
    var newTodo={
        text:text,
    }
    Todo.create(newTodo,function(err,newlyTodo){
        if(err){
            console.log(err);
            res.send("Error")
        }
       else{

           res.send(newlyTodo);
       }
    
    })
})

router.put("/todos/:id",isLoggedIn,function(req,res){
    var text=req.body.text;
    var updatedTodo={
        text:text
    }
    Todo.findByIdAndUpdate(req.params.id,updatedTodo,function(err,updated){
            if(err){
                     console.log(err);
                     res.send("something went wrong :(")
                    
                   }
            else{
               
                     res.send(updatedTodo);
                }
            })
        })

    router.delete("/todos/:id",isLoggedIn,function(req,res){
        Todo.findByIdAndRemove(req.params.id,function(err,msg){
            if(err){
                res.send("Something Went Wrong :(");
            }
            else{
                res.send("Successfully Deleted!");
            }
        })
    }) 

    //auth routes
    router.post("/todos/register",function(req,res){
        var newUser={
            username:req.body.username,
        }
       User.register(newUser,req.body.password,function(err,user){
           if(err){
               console.log(err);
           }
           passport.authenticate("local")(req,res,function(){
               res.send("Signed up :)");
           })
       })
    })

    router.post("/todos/login",passport.authenticate("local",{
    }),function(req,res){
        if(!req.user){
            res.send("invalid");
        }
        else{
           console.log(req.user);
            return res.json(req.user);
        }
      

    })
   
   router.get("/todos/logout",isLoggedIn,function(req,res){
       req.logout();
       res.send("logged out")

   })

   function isLoggedIn(req,res,next){
       if(req.isAuthenticated){
           console.log(req.user);
         return next();
       }
      
       res.redirect('/todos/login');

   }

module.exports=router;