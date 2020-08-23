const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MDB-Atlas
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Atlas'))
    .catch(err => console.log('Error connecting to Atlas', err));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ALLOW CORS
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS')
        res.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Backend Routes

app.use('/auth', require('./routes/auth-routes'));

app.use('/user', require('./routes/user-routes'));

app.use('/images', require('./routes/image-routes'));

// Api routes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));


