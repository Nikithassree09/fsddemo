const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config")
const userController = {
   register: async (request, response) => {
    try {
       //get user inputs from req body
       const { email, password, username, location } = request.body;
       console.log(request.body)
       // check if the user already exists in the database
       const user = await User.findOne({ username });
       // if the user exists, return an error
       if (user) {
         return response.status(400).json({ message: 'User already exists' });
       }
       // hash the password
       const passwordHash = await bcrypt.hash(password, 10);
       // if the user does not exist, create a new user
       const newUser  = new User({
         email,
         passwordHash,
         username,
         location
       });
       // save the user to the database
       const savedUser = await newUser.save();

       // return the saved user
       response.status(201).json({
         message: 'User created successfully',
         user: savedUser
       });
      } catch (error) {
       response.status(500).json({ message: error.message });
    }
   },

   login: async (request,response) => {
      try{
         //get username and password from request body
         //authentication
         const { email, password } = request.body

         // check if user exists in database
         const user = await User.findOne({ email });
         //if does not exist return error
         if (!user) {
            return response.status(400).json({ message: 'User not found' });
         }

         //if user exists, check if the password is correct
         const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        
         //if the password is incorrect, return a statement
         if (!isPasswordCorrect) {
            return response.status(400).json({ message: 'Invalid credentials' });
         }

         //if the password is correct, generate a token
         const token = jwt.sign({
            username: user.username,
            id: user._id,
            name: user.name,
         }, config.JWT_SECRET);

         // set a cookie with the token
         response.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: true,
         });

         //return the token
         response.json({ message: 'Login successful', token });
      } catch (error) {
         response.status(500).json({ message: error.message });
      }
   },
   getUser: async (request, response) => {
      try {
          const userId = request.userId;
          // find the user by id from the database
          const user = await User.findById(userId).select('-passwordHash -__v -_id');
          // if user doesnt exist, return the user
          if (!user) {
            return response.status(404).json({ message: 'User doesnt exist' });
          }
          // if user exists, return the user
          response.json({ message: 'User found', user });
      } catch (error) {
         response.status(500).json({ message: error.message });
      }
   },

   updateUser: async (request, response) => {
      try{
          const userId = request.userId;
          //get the user inputs from the request body and user can update those inputs
          const { email, username, location } = request.body;

          const user = await User.findById(userId);

          if (!user) {
            return response.status(404).json({ message: 'User not found' });
          }
          // update the user
          if (email) user.name = email;
          if (location) user.location = location;
          if (username) user.username = username

          //save the updated user to the database
          const updatedUser = await user.save();
         
          //return the updated user
          response.json({ message: 'User updated successfully', user: updatedUser});
      } catch (error) {
         response.status(500).json({ message: error.message });
      }
   },

   deleteUser: async (request, response) => {
      try{
         const userId = request.userId;

         const user = await User.findById(userId);

         if (!user) {
            return response.status(404).json({ message: 'User not found' });
         }

         //delete the user
         await user.remove();

         //return
         response.json({ message: 'User deleted successfully'});
      } catch (error) {
         response.status(500).json({ message: error.message });
      }
   },

   logout: async (request, response) => {
      try{
         //clear the token cookie
         response.clearCookie('token');
         //return a success message
         response.json({ message: 'Logout successful' });
      } catch (error) {
         response.status(500).json({ message: error.message });
      }
   }
}
module.exports = userController;