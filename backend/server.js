const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
// const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');
const inputsRouter = require('./routes/inputs');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);
app.use('/inputs', inputsRouter);

app.listen(5000, () => {
    console.log(`Server is running on port: `+ 5000);
});
// ${port}