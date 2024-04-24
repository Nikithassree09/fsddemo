const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
//enable express application to parse json
app.use(express.json());
app.use('/api/users',userRouter);

module.exports=app;