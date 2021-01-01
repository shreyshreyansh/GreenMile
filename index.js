const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
require('dotenv').config();
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/greenmileDB", { useNewUrlParser: true ,  useUnifiedTopology: true });

var activeUserID;
const dustbinSchema = mongoose.Schema({
    _dustbinID : String,
    driverID: String,
    driverName : String,
    driverPhoneNo : Number,
    driverLisenceNo : Number,
    driverPhotoLink : String,
    driverMunipalHeadName : String,
    driverMunipalHeadPhoneNo : Number,
    lat : Number, 
    lng : Number,
    lastPickup : Date,
    percentFilled : Number,
    graphLink : String
});

const dustbinData = mongoose.model("dustbin", dustbinSchema);

const driverLoginSchema =  mongoose.Schema({
    _driverID : String,
    name : String,
    email : String,
    password : String
});

const driverLoginData = mongoose.model("driverLogin", driverLoginSchema);

const driverInfoSchema = mongoose.Schema({
    driverID : String,
    name : String,
    email : String,
    phoneNo : Number,
    head : String,
    lisenceNo : Number,
    dustbin : Array
});

const driverInfoData = mongoose.model("driverInfo", driverInfoSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/landPage.html");
});

app.get("/data", function(req, res){
    dustbinData.find(function(err, items){
        if(err)
        console.log(err);
        else
        res.send(items);
    });
})


app.get("/signin", function(req, res){
    res.sendFile(__dirname + "/signin.html");
});

app.get("/map", function(req, res){
    res.sendFile(__dirname + "/map.html");
});

app.get("/mainframe", function(req, res){
    res.sendFile(__dirname + "/mainframe.html");
})

app.get("/activeUserData", function(req, res){
    console.log(driverInfoData.collection.collectionName);
    driverInfoData.findOne({ driverID : activeUserID }, function(err, doc){
        if(err)
            console.log(err);
        else{
            res.send(doc);
        }
    });
})

app.post("/", function(req, res){
    console.log(driverLoginData.collection.collectionName);
    driverLoginData.findOne({ _driverID: req.body.userID }, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            if(docs.email===req.body.email && docs.password===req.body.password){
                activeUserID = req.body.userID;
                res.redirect("/mainframe");
            }
            else
            console.log("NOT FOUND");
        } 
    });
});


app.listen(3000, function(){
    console.log("Server is up and running");
});