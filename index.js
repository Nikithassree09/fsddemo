const mongoose =require('mongoose');
const config =require('./utils/config');
console.log('Connecting to MongoDB:', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
  .then(()=> {
    console.log('Connected to MongoDB');
  })
  .catch((error)=> {
    console.log('Error connecting to MongoDB:', error.message);
   })