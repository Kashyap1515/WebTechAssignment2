const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Create HTTP server
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = 'mongodb+srv://kashyapkalathiya654:iCoKGaEwaI9Ro958@assignment2.9ky9xmu.mongodb.net/?retryWrites=true&w=majority&appName=assignment2';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const UserModel = require('./schemas/user-model');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Listen Server on Specific PORT
const PORT = 8080;
server.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});
