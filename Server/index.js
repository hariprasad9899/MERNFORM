const express = require("express");
const app = express();
const mongoose = require("mongoose");
const RoomModel = require("./models/RoomModel");
const { getQuery } = require("./helpers/getQuery");
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

app.delete("/deleteBook/", (req, res) => {
    // Method 1: Passing id using body
    const deleteId = req.query.id;

    // Method 2: Getting id using url
    // const deleteId = req.params.id;
    // For method 2, the url should be "/deleteBook/:id"

    RoomModel.findOneAndDelete({ _id: deleteId }, (err, docs) => {
        if (err) {
            res.send({ error: true });
        } else {
            if (docs) {
                res.send(docs);
            } else {
                res.send({ error: true });
            }
        }
    });
});

app.put("/updateBook/:id", async (req, res) => {
    const _id = req.params.id;
    const update = req.query;
    try {
        const updatedModel = await RoomModel.findByIdAndUpdate(_id, update, { new: true });
        res.send(updatedModel);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/filterBooks/", async (req, res) => {
    const queryObj = req.query;
    const queryVal = getQuery(queryObj);
    RoomModel.find(queryVal, (err, result) => {
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
