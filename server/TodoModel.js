var mongoose=require("mongoose");
var todoSchema=mongoose.Schema({
    text:String
})
module.exports=mongoose.model("todo",todoSchema);