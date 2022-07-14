const express = require('express');
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const taskRoute = require('./routes/tasks');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api', taskRoute);


var HTTP_PORT = 5000
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});