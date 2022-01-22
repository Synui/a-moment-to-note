const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes/indexAPI');
const htmlRoutes = require('./routes/htmlRoutes/indexHTML');

// Middleware that makes certain files readily available and to not gate it behind a server endpoint
app.use(express.static('public'));
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);;

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})

