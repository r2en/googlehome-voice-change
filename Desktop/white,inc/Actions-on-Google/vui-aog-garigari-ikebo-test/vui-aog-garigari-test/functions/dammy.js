const ssml = require('ssml-builder');
const HOSTING = require('./defines').HOSTING;


const constructDisplaySSML = (conv, message) => {
    displayArray = '';

    console.log(`🌲 display message : ${ message } 🌲`);
    for (var i = 0; i < message.length; i++) {
        //var index = getRandomNum(text[message[i]]);
        var index = getRandomNum(message[i]);
        console.log(`🌲 text index : ${ index } 🌲`);
        //displayArray += getStaticItem(text[message[i]], index) + '  \n';
        displayArray += getStaticItem(message[i], index) + '  \n';
    }
    console.log(`🌲 displayArray : ${ displayArray } 🌲`);
    return displayArray;
}

const constructVoiceSSML = (conv, message) => {
    var speech = new ssml();
    var pauseTime = '0.5s';

    console.log(`🌲 voice message : ${ message } 🌲`);
    for (var i = 0; i < message.length; i++) {
        //console.log(`🌲 voice word : ${ message[i] } 🌲`);
        var index = getRandomNum(message[i]);
        //console.log(`🌲 voice index : ${ index } 🌲`);
        var audioURL = HOSTING.AUDIO_URL + getStaticItem(message[i], index)
        speech.audio(audioURL);
        speech.pause(pauseTime);
        console.log('audioURL: ', audioURL);
    }
    return speech.ssml();
}

const construct_ssml = (conv, message, url) => {
    var displayArray = '';
    var speech = new ssml();
    var speak = new ssml();
    for (var i = 0; i < message.length; i++){
        var index = getRandomNum(message[i]);
        displayArray += getStaticItem(message[i], index) + '  \n';
        var audioURL = HOSTING.AUDIO_URL + getStaticItem(url[i], index);
        speech.audio(audioURL);
        speech.pause('1s');

        if(i === message.length - 1){
            let redisplay = getStaticItem(message[i], index);
            let respeech = speak.audio(audioURL);
            let ssml = {
                text: redisplay,
                speech: respeech.ssml()
            }
            conv.data.ssml = ssml;
        }
    }
    return {
        text: displayArray,
        speech: speech.ssml()
    }
}

const getRandomNum = (array) => {
    return Math.floor(Math.random() * (array.length));
}

const getStaticItem = (message, index) => {
    if (message.length <= index) {
        console.log('ERROR: getStatic: return message[0]');
        return message[0];
    } else {
        return message[index];
    }
}

module.exports = {
    construct_ssml: construct_ssml,
    getRandomNum: getRandomNum,
    getStaticItem: getStaticItem,
    constructDisplaySSML: constructDisplaySSML,
    constructVoiceSSML: constructVoiceSSML
};