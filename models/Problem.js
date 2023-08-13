const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
    },
    resolved: {
        type: Boolean,
        default: false
    },
    resolvedMsg:{
        type: String
    },
    address:{
        street: {
            type: String,
            required: true
        },
        taluk: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;