const mongoose = require('mongoose');

const govtSchemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
});

const GovtScheme = mongoose.model("GovtScheme", govtSchemeSchema);
module.exports = GovtScheme;