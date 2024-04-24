const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(cookieParser());
//enable express application to parse json
app.use(express.json());
app.use('/api/users',userRouter);

module.exports=app;