const express = require("express");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/greenmileDB", { useNewUrlParser: true ,  useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
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

const Data = mongoose.model("dustbin", dataSchema);
app.get("/", function(req, res){
    res.sendFile(__dirname + "/landPage.html");
});

app.get("/data", function(req, res){
    Data.find(function(err, items){
        if(err)
        console.log(err);
        else
        res.send(items);
    });
})

app.get("/signup", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.get("/signin", function(req, res){
    res.sendFile(__dirname + "/signin.html");
});

app.get("/map", function(req, res){
    res.sendFile(__dirname + "/map.html");
});

app.listen(3000, function(){
    console.log("Server is up and running");
});