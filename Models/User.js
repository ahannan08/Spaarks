import mongoose from "mongoose";


//create schema with username and password
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


//create User model
const User = mongoose.model('User', userSchema);

export default User;
