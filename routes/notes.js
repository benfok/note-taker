const notes = require('express').Router();
// module to generate unique ID numbers
const { v4: uuidv4 } = require('uuid');
// call in helper functions
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/utils');

// GET route: read from db.json file
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route: Confirm request body contains data that is needed, add unique id and then append to db.json. Return note in response.
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.send(`The following note was added successfully!\n\n ${JSON.stringify(newNote)}`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);
      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted.`);
    })
    .catch((err) => {
      console.log(`Error in deleting note\n${err}`);
    })
});

module.exports = notes;