var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());
// var url = "mongodb://localhost:27017/";
var url =
  "mongodb+srv://diwakar:diwakar84@cluster0.arcyh.mongodb.net/<dbname>?retryWrites=true&w=majority";
var db;
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) throw err;
  console.log("DB connected");
  db = client.db("resume");
});

app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;

app.get("/", (req, res) => {
  res.json("hello");
});
app.get("/getinfo", (req, res) => {
  db.collection("detail")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
app.post("/postinfo", (req, res) => {
  console.log(req.body);
  db.collection("detail").insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result.ops);
  });
});

app.listen(5000);
