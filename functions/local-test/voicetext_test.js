'use strict';
const TextSpeech = 'voice text test の方ではできるんだよなあ';
const VoiceType = 'bear';
// your WebTextAPI key
const VoiceKey = '';


//const VoiceTextWriter = require('./VoiceTextWriter');
const VoiceTextWriter = require('./CurlTextWriter');

//
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const bucketName = 'voicetextwebapi.appspot.com';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://voicetextwebapi.firebaseio.com",
    storageBucket: bucketName
});

//
console.time('処理時間：');
VoiceTextWriter.convertToTextBinary(VoiceKey, TextSpeech, VoiceType).then(function(buf){
    //console.log('buffer : ' + JSON.stringify(buf, null, '\t'));
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
    });
});
console.timeEnd('処理時間：');
