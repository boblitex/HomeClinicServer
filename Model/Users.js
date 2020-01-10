const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    idno:{
        type: String,
        required: true
    },  
    email:{
        type: String,
        required: true,
        unique: true
    },  
    password:{
        type: String,
        required: true
    },      
});

module.exports = mongoose.model('User', usersSchema);