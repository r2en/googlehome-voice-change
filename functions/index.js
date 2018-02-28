'use strict'

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

var VoiceText = require('voicetext');

var fs = require('fs');

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const bucketName = 'voicetextwebapi.appspot.com';

const _VoiceTextWriter = require('./VoiceTextWriter');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://voicetextwebapi.firebaseio.com",
    storageBucket: bucketName
});

const NAME_ACTION = "main"
const VOICE_TYPE = "VoiceType";
const TEXT_SPEECH = "TextSpeech";

// your WebTextAPI key
const VoiceKey = '';
const VoiceTextWriter = new _VoiceTextWriter(VoiceKey);

exports.VoiceWebText = functions.https.onRequest((request, response) => {
    const app = new App({ request, response });

    function calcMojuro(app) {
        console.time('処理時間：');
        //console.log('VoiceTextWriter: ' + JSON.stringify(VoiceTextWriter, null, '\t'));
        console.log('ver.34 平均と標準偏差');
        let VoiceType = app.getArgument(VOICE_TYPE);
        let TextSpeech = app.getArgument(TEXT_SPEECH);
        console.log('VoiceType: ' + VoiceType);
        console.log('TextSpeech: ' + TextSpeech);
        
        var Result = VoiceTextWriter.convertToTextBinary(TextSpeech, VoiceType)
            .then(function(buf){
                console.log('BUFFER');
                var bucket = admin.storage().bucket();
                //const file = bucket.file('voice.ogg');
                //const file = bucket.file('voice.mp3');
                const file = bucket.file('voice.wav');
                const stream = file.createWriteStream({
                    metadata: {
                      //contentType: "audio/mpeg"
                      //contentType: "audio/ogg"
                      contentType: "audio/x-wav"
                    }
                });
                stream.write(buf, function(err) {
                    if (err) {
                        console.error('ERROR:', err.message);
                    }
                });
                stream.on('error', (err) => {
                    console.error('ERROR:', err.message);
                    next(err);
                });
                stream.on('finish', () => {
                    console.log('finish!');
                });
                stream.end(buf, () => {
                    console.log('end');
                    let play_mp3 = '<speak>'
                    //+ '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.mp3">再生中...</audio>.'
                    //+ '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.ogg">再生中...</audio>.'
                    + '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.wav">再生中...</audio>.'
                    + '</speak>'
                    console.timeEnd('処理時間：');
                app.ask(play_mp3); 
                });
            });
    }

    let actionMap = new Map();
    actionMap.set(NAME_ACTION, calcMojuro);

    app.handleRequest(actionMap);
});
