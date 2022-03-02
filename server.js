const express = require('express');
const api = require('./routes/index.js');
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', api);

// Routes

// GET Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Wildcard route to direct users to a 404 page

// build this page with a link back to home
app.get('*', (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'public/404.html'));
});




app.listen(3001, () => {
    console.log('Server is Up!');
});