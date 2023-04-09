const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        bookname: {
            type: String,
            required: true,
        },

        author: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true,
        },

        rent: {
            type: Number,
            required: true,
        },

        buy: {
            type: Number,
            required: true,
        },

        imgaddress: {
            type: String,
            required: true,
        },
    },
    { collection: "roomone" }
);

const RoomModel = mongoose.model("roomone", roomSchema);

module.exports = RoomModel;
