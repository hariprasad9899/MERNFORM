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

app.get("/findBooks", (req, res) => {
    let queryObj = {
        [req.query.type]: [req.query.value],
    };
    RoomModel.find(queryObj, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/addBook", async (req, res) => {
    const book = req.body;
    const newBook = new RoomModel(book);
    await newBook.save();

    res.json(book);
});

app.listen(3001, () => {
    console.log("Server is started!!");
});
