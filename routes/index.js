// file to collect routes and pass to server.js. Probably not needed for this project due to scope, but allows for further expansion.
const express = require('express');
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;