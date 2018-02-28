var fs = require('fs');
var VoiceText = require('voicetext');
//var admin = require("firebase-admin");

//var serviceAccount = require("./serviceAccountKey.json");
//const bucketName = 'voicetextwebapi.appspot.com';

// your WebTextAPI key
const voiceKey = '';


/*
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://voicetextwebapi.firebaseio.com",
    storageBucket: bucketName
});

var bucket = admin.storage().bucket();
const file = bucket.file('voice.mp3');
const stream = file.createWriteStream({
    metadata: {
        contentType: 'audio/mpeg'
    }
});
*/

module.exports = {
    constructor(VoiceKey){
        voice = new VoiceText(VoiceKey);
    },
    convertToTextBinary: function (VoiceKey, TextSpeech, VoiceType){
        voice = new VoiceText(VoiceKey);
        //console.log(voice);
        console.log('convertToTextBinary: ' + JSON.stringify(voice, null, '\t'));
        console.log('VoiceKey: ' + VoiceKey);
        console.log('TextSpeech: ' + TextSpeech);
        console.log('VoiceType: ' + VoiceType);
        
        return new Promise(function(resolve, reject){
            voice
                .speaker(voice.SPEAKER.HIKARI)
                .emotion(voice.EMOTION.HAPPINESS)
                .emotion_level(voice.EMOTION_LEVEL.HIGH)
                .pitch(100)
                .speed(100)
                .volume(200)
                .speak(TextSpeech, function(e, buf){
                    if (e) {
                        console.log('ERROR: ');
                        console.error(e);
                        reject(e);
                    } else {
                        console.log('SUCCESS: ');
                        resolve(buf);
                    }
                });
        });
    },
    sub: function (v1, v2){
        return v1 - v2;
    }
}
