const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// Database Connection
mongoose.connect("mongodb://localhost:27017/greenmileDB", { useNewUrlParser: true ,  useUnifiedTopology: true });

// For identifying the current active user
var activeUserID;

//Scheme and model for three collections in the greenMile DB
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
    channelID : Number,
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
    dustbin : [dustbinSchema]
});
const driverInfoData = mongoose.model("driverInfo", driverInfoSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/landPage.html");
});

// send dustbin info data to /data route so can we can read in the map through frontend 
// javascript using XML mainframe.js
app.get("/data", function(req, res){
    dustbinData.find(function(err, items){
        if(err)
        console.log(err);
        else
        res.send(items);
    });
})

app.get("/map", function(req, res){
    res.sendFile(__dirname + "/map.html");
});

// if the user refreshes the mainframe page he will be taken to the home page
app.get("/mainframe", function(req, res){
    if(activeUserID!==''){
        res.sendFile(__dirname + "/mainframe.html");
    }else{
        res.redirect("/");
    }
});

// posting active user data to the route to be used by frontend js mainframe.js
app.get("/activeUserData", function(req, res){
    driverInfoData.findOne({ driverID : activeUserID }, function(err, doc){
        if(err)
            console.log(err);
        else{
            res.send(doc);
        }
    });
})

app.get("/change/:channelID/:field1", function(req, res){
    const channel_id = req.params.channelID;
    const field = req.params.field1;

    dustbinData.updateOne({ channelID : channel_id }, {$set : { percentFilled : field } }, function(err, doc){
        if(err)
            console.log(err);
        else{
            res.send("1");
        }
    });
    console.log(channel_id);
    if(activeUserID!=='') {
        driverInfoData.updateOne( {
            'driverID' : activeUserID,
            'dustbin.channelID': channel_id 
          },
          { $set: { "dustbin.$.percentFilled" : field } },
        function(err, c){
            if(err)
            console.log(err);
            else
            console.log(c);
        });
        }
});

app.get("/logout", function(req, res){
    activeUserID = "";
    res.redirect("/");
})

// check the login credentials
app.post("/", function(req, res){
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


//An attempt to add dustbin which hasn't been picked in 3 days
// app.post("/pickup", function(req, res){
//     console.log(req.body);
//     console.log(activeUserID);
//     function toISOStringLocal(d) {
//     function z(n){return (n<10?'0':'') + n}
//     return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
//         z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
//         z(d.getMinutes()) + ':' + z(d.getSeconds())
//     }
//     driverInfoData.updateOne( { "driverID" : activeUserID , 'dustbin.dustbinID' : req.body.dustbinID }, {'$set': {
//         'dustbin.$.lastPickup': toISOStringLocal(new Date())
//     }});
// })

app.listen(3000, function(){
    console.log("Server is up and running");
});