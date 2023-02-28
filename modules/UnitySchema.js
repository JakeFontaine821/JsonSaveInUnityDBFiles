var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    screenName:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    dateJoined:{
        type:String,
        require:true
    },
    score:{
        type:Number,
        require:true
    }
});

mongoose.model("unitySave", Schema);