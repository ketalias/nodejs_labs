const express = require('express');
const mongoose = require('mongoose');
const { port } = require('./config');
const usersRouter = require('./routes/users.route');
const coworkersRouter = require('./routes/coworkers.route');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/coworkersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/users', usersRouter);
app.use('/coworkers', coworkersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});