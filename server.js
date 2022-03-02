const express = require('express');
const api = require('./routes/index.js');
const path = require('path');

// setting up port for heroku with local alternative
const PORT = process.env.PORT || 3001;

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
app.get('*', (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'public/404.html'));
});

app.listen(PORT, () => {
    console.log('Server is Up!');
});