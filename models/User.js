const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    role:{
        type: String,
        required: true,
        default: 'public',
        enum: ['admin', 'employee', 'public']
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;