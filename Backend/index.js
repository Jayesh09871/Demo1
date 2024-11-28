const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const AuthRouter = require('./Routes/AuthRouter');
 
const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3005;
app.use('/auth', AuthRouter);
 
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

app.listen(PORT, () => {
    console.log("server is running.. 3005")
})