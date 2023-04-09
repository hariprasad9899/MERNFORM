const express = require("express");
const app = express();
const mongoose = require("mongoose");
const RoomModel = require("./models/RoomModel");
require("dotenv").config();

const cors = require("cors");
app.use(cors());

// mongodb+srv://hariprasadsoundararajan:kvf6KrNmcIdXOxPX@cluster0.4grd3ac.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://hariprasadsoundararajan:kvf6KrNmcIdXOxPX@cluster0.4grd3ac.mongodb.net/library?retryWrites=true&w=majority

app.use(express.json());
mongoose.connect(
    // "mongodb+srv://hariprasadsoundararajan:kvf6KrNmcIdXOxPX@cluster0.4grd3ac.mongodb.net/library?retryWrites=true&w=majority"
   "mongodb+srv://hariprasadsoundararajan:kvf6KrNmcIdXOxPX@cluster0.4grd3ac.mongodb.net/library?retryWrites=true&w=majority"
);

app.get("/getBooks", (req, res) => {
    RoomModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Server is started!!");
});
