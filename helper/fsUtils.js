const fs = require('fs');
const util = require('node:util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const readAndDelete = (note_id, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data);
            parsedData.pop();
            writeToFile(file, parsedData)
        }
    });
};

module.exports = { readAndAppend, writeToFile, readFromFile, readAndDelete };