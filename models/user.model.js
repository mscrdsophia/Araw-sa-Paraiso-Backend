const { Schema , model } = require('mongoose');

const userSchema = new Schema({
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    phoneNumber:{ type: Number, required: true },
    role:{ type: String, enum: ["admin","user"], required: true },
}); 

const User = model('User', userSchema);

module.exports = User;