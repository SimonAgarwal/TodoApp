var express= require('express');

var bodyParser=require('body-parser');
require('dotenv').config();
var cors=require('cors');
const path=require('path');
var mongoose= require('mongoose');
var passport=require("passport");
var LocalStrategy=require("passport-local");
var app=express();
var routes=require('./routes');
const config=require("./config/mongoose");
mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
    console.log("Connected to database"+config.database);
})
mongoose.connection.on('error',(err)=>{
    console.log("Not connected"+err);
})

//models
var User=require('./users');
//config other
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({credentials:true,origin:'http://localhost:4200'}));
app.use(express.static('public'));


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
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT,function(req,res){
    console.log("Server Started");
})
