const commandLineArgs = require('command-line-args');
const fetch = require('node-fetch');
const fs = require('fs');

const optionDefinitions = [
    {
        name: 'value',
        alias: 'h',
        type: Number,
        description: 'Display this guide man'
    },
    {
        name: 'output',
        alias: 'o',
        type: String,
        description: 'File to store fetched content'
    },
    {
        name: 'asci',
        alias: 'a',
        type: String,
        description: 'Write text in ASCII art'
    }
]

const options = commandLineArgs(optionDefinitions, {stopAtFirstUnknown: true});
if(options.asci){
    let baseURL = 'https://artii.herokuapp.com/make?text=';
    let wordsToConvert = '';
    if(options._unknown){
        wordsToConvert = options.asci + '++' + options._unknown.join('++');
    } else {
        wordsToConvert = options.asci
    }
    
    fetch(baseURL + wordsToConvert)
        .then(res => res.text())
        .then(body => console.log(body))
        .catch(err => console.log(`Im sure its not your fault but...\n${err}`))
}
if(options.output){
    fetch(options._unknown[0])
        .then(res => res.text())
        .then(body => fs.promises.writeFile(options.output, body))
        .catch(err => console.log(err))
    
}



