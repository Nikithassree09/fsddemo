const express = require('express');
const cors = require('cors');
const gascompanyRouter = require('./routes/companyRoutes')
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
//enable express application to parse json
app.use(express.json());
app.use('/api/gascompanies', gascompanyRouter);
app.use('/api/users', userRouter);
module.exports=app;