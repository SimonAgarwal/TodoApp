var express= require('express');

var bodyParser=require('body-parser');
var cors=require('cors');
var mongoose= require('mongoose');
var passport=require("passport");
var LocalStrategy=require("passport-local");
var app=express();
var routes=require('./routes');
mongoose.connect('mongodb://localhost:27017/Todo');

//models
var User=require('./users');
//config other
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({credentials:true,origin:'http://localhost:4200'}))
//session
app.use(require("express-session")({
    secret:"anything",
    resave:true,
    saveUninitialized:true,
}));
//passport
passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use(routes);

app.listen(3000,function(req,res){
    console.log("Server Started");
})
