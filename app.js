var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");
const { Console } = require("console");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./modules/UnitySchema");
var UnitySave = mongoose.model("unitySave");

//Unity Routes
app.post("/newUnitySave", function(req, res){
    //add a .find to make all usernames unique, if username exits, dont add it
    var newData = {
        "screenName" : req.body.screenName,
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "dateJoined" : req.body.dateJoined,
        "score" : req.body.score
    }
    console.log(newData);

    new UnitySave(newData).save();
})

app.get("/saveListUnity", function(req, res){
    // Send all data to Unity
    UnitySave.find({}).sort({"screenName":1}).then(function(saves){
        res.send({saves});
    })
})

app.post("/deleteSave", function(req, res){
    console.log(`Save deleted at ${req.body.variable}`);
    
    UnitySave.findByIdAndDelete(req.body.variable).exec();
})

app.post("/searchSaves", function(req, res){
    UnitySave.find({"screenName":req.body.variable}).then(function(saves){
        res.send({saves});
    })
})

app.post("/update", function(req, res){
    console.log(req.body);
    UnitySave.findByIdAndUpdate(req.body.id, {score:req.body.score}).exec()
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})
