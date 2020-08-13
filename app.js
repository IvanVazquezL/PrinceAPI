const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/princeDB",{ useNewUrlParser: true, useUnifiedTopology: true});

const json = require("./data");

const quoteSchema = new mongoose.Schema({
  _id: Number,
  chapter: Number,
  en: String,
  es: String,
  fr: String
});

const Quote = mongoose.model("quote", quoteSchema);

//Just use it when you want to upload the database
// Quote.insertMany(json, function(err,result) {
//    if (err) {
//      console.log("Database could not be uploaded")
//    } else {
//      console.log("Database uploaded");
//    }
// });

app.get("/",function(req,res){
  res.render("index");
});

app.post("/",function(req,res){
  console.log("apiLink: "+req.body.apiLink);
  res.redirect(req.body.apiLink);
});

app.get("/quotes",function(req,res){
    Quote.find({},{__v:0},function(err, data){
    res.send(data);
    })
});

app.get("/quotes/lang=:lang",function(req,res){
  console.log(req.params.lang);
  const lang = req.params.lang;

  if(lang==="fr"){
    fields = {
      fr: 1,
      _id: 0
    }
  }

  if(lang==="es"){
    fields = {
      es: 1,
      _id: 0
    }
  }

  if(lang==="en"){
    fields = {
      en: 1,
      _id: 0
    }
  }

    Quote.find({},fields,function(err, data){
    console.log(data);
    res.send(data);
    })
});

app.get("/quotes/chapter=:chapter",function(req,res){
    Quote.find({chapter: req.params.chapter},{__v:0},function(err, data){
    res.send(data);
    })
});

app.get("/quotes/chapter=:chapter/lang=:lang",function(req,res){
  const lang = req.params.lang;
 console.log("hello")
  if(lang==="fr"){
    fields = {
      fr: 1,
      _id: 0
    }
  }

  if(lang==="es"){
    fields = {
      es: 1,
      _id: 0
    }
  }

  if(lang==="en"){
    fields = {
      en: 1,
      _id: 0
    }
  }
    Quote.find({chapter: req.params.chapter},fields,function(err, data){
    res.send(data);
    console.log(data);
    })
});

app.listen(8080, function() {
  console.log("Server started on port 8080");
});
