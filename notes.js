const fs = require('fs');
const chalk = require("chalk");

const getNote = () => {
    return "Your notes...";
}

// string + string -> null
// addNotes(title, body) -> null
// adds note to a file called notes.json
const addNote = (title, body) => {
    let data = loadNotes();

    let duplicate = data.filter((note) => note.title === title);

    debugger 

    if(duplicate.length === 0) {
        data.push({title: title,
            body: body   
        });
        saveNote(data);
        console.log(chalk.green.inverse("Note added!"));
    } else {
        console.log(chalk.red.inverse("Title taken!"));   
    }
    
}

// string -> null
// removeNote(title) -> null
// remove a note from notes.json
const removeNote = (title) => {
    var notes = loadNotes();
    if(notes.length === 0) {
        console.log(chalk.bgYellow("Notes is empty"));
        return;
    }

    titleNote = notes.find((note) => note.title === title);
    if(!titleNote) {
        console.log(chalk.bgRed("Title not present"));
        return;
    }
    
    newNotes = notes.filter((note) => note.title !== title);
    saveNote(newNotes);
    console.log(chalk.bgGreen("Note removed!"));
}

// null -> null
// listNotes() -> null
// lists all notes in notes.json
const listNotes = () => {
    let notesList = loadNotes();

    if(notesList.length === 0) {
        console.log(chalk.red.inverse("No notes available!"));
        return;
    }

    console.log("Your notes!");
    notesList.forEach(element => {
        console.log(element.title);
    });
}

// string -> null
// readNote(title) -> null
// reads a note of given title from notes.json
const readNote = (title) => {
    let notesList = loadNotes();
    let titleNote =  notesList.find((note) => note.title === title);
    if(titleNote) {
        console.log(chalk.blue(titleNote.title));
        console.log(titleNote.body);
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

// array -> null
// saveNotes(data, title, body) -> null
// adds note to notes.json
const saveNote = (data) => {
    dataJSON = JSON.stringify(data);
    fs.writeFileSync('notes.json', dataJsON);
}

// null -> array
// loadNotes() -> notes
// returns the array containing note objects
const loadNotes = () => {
    try {
        let dataBuffer = fs.readFileSync('notes.json');
        let dataJSON = dataBuffer.toString();
        let data = JSON.parse(dataJSON);
        return data;
    } catch(e) {
        return [];
    }
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}