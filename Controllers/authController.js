//lets import neccasary schema's and lib to ensure security of our app

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";


//register 
export const register = async (req, res) => {

  //this field allows us to give an input i.e request body
  const { username, password } = req.body;

  //this hashes our passport for security purposes
  const hashedPassword = await bcrypt.hash(password, 10);

  //saves the users to the user collection in mongo
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};


//login
export const login = async (req, res) => {

    //this field allows us to give an input i.e request body
  const { username, password } = req.body;

  //searches for the user in the mongo db. 
  //if exist then logs in succesfully
  const user = await User.findOne({ username });

  //if not then returns error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  //generates jwt token to carry out the CRUD operations or retrieve restaurants
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
