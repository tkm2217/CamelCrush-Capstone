const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.BT_DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const trackerRouter = require('./routes/tracker');
const usersRouter = require('./routes/users');

app.use('./tracker', trackerRouter);
app.use('./users', usersRouter);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});