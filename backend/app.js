require('dotenv').config();
const express = require('express');
const DB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/uploads"));

// MongoDB connection...
DB();

// Routes
app.use('/api/post', require('./routes/post-route'));
app.use('/api/user', require('./routes/user-route'));
app.use('/api/auth', require('./routes/auth-route'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));