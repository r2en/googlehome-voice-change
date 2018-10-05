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

// construct voice text の生成が前と異なる配列を組んでいる可能性がある
const construct_ssml = (conv, message, url) => {
    let screen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
//const construct_ssml = (message, url) => {
    console.log(`🌲 conv : ${ JSON.stringify(conv) } 🌲`);
    console.log(`🌲 message : ${ JSON.stringify(message) } 🌲`);
    console.log(`🌲 url : ${ JSON.stringify(url) } 🌲`);
    var displayArray = '';
    var speech = new ssml();
    var speak = new ssml();
    console.log(`🌲 とりあえず入れてる？ 🌲`);
    for (var i = 0; i < message.length; i++){
        var index = getRandomNum(message[i]);
        displayArray += getStaticItem(message[i], index) + '  \n';
        console.log(`🌲 index : ${ index } 🌲`);
        console.log(`🌲 displayArray : ${ displayArray } 🌲`);
        console.log(`🌲 audioURL : ${ audioURL } 🌲`);
        var audioURL = HOSTING.AUDIO_URL + getStaticItem(url[i], index);
        speech.audio(audioURL);
        speech.pause('1s');

        if(i === message.length - 1){
            let redisplay = getStaticItem(message[i], index);
            let respeech = speak.audio(audioURL);
            let obj;
            if(screen){
                obj = {
                    text: redisplay,
                    speech: respeech.ssml()
                } 
            }else{
                obj = respeech.ssml()
            }
            conv.data.ssml = obj;
        }
        console.log(`🌲 conv.data.ssml : ${ JSON.stringify(conv.data.ssml) } 🌲`);

    }
    if(screen){
        return {
            text: displayArray,
            speech: speech.ssml()
        } 
    }else{
        return speech.ssml()
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