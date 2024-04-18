const mongoose =require('mongoose');
const config =require('./utils/config');
const app = require('./app');
console.log('Connecting to MongoDB');
mongoose.connect(config.MONGODB_URI)
  .then(()=> {
    console.log('Connected to MongoDB');
 
    app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
   });
}) 
  .catch((error)=> {
    console.log('Error connecting to MongoDB:', error.message);
   })