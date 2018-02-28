'use strict';
//const TextSpeech = 'おはよう';
const TextSpeech = '長文で話すとこれくらいの時間がかかりますよ';
//const VoiceType = 'takeru';
const VoiceType = 'hikari';
const VoiceKey = 'ibb36ycu3oryme2f';

const _VoiceTextWriter = require('./VoiceTextWriter');
//const VoiceTextWriter = require('./CurlTextWriter');

//
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const bucketName = 'voicetextwebapi.appspot.com';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://voicetextwebapi.firebaseio.com",
    storageBucket: bucketName
});
const VoiceTextWriter = new _VoiceTextWriter(VoiceKey);

function sleep(waitMsec) {
    var startMsec = new Date();
    while (new Date() - startMsec < waitMsec);
}
var cnt = 0;
var data = [];
for(var i = 0; i < 10; i++){
    var start_ms = new Date().getTime();
    var Result = VoiceTextWriter.convertToTextBinary(TextSpeech, VoiceType)
    .then(function(buf){
        cnt++;
        //console.log('BUFFER');
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
            //console.log('finish!');
        });
        stream.end(buf, () => {
            //console.log('end');
            let play_mp3 = '<speak>'
            //+ '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.mp3">再生中...</audio>.'
            //+ '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.ogg">再生中...</audio>.'
            + '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.wav">再生中...</audio>.'
            + '</speak>'
            var elapsed_ms = new Date().getTime() - start_ms;
            data.push(elapsed_ms);
            console.log('処理時間：' + elapsed_ms + 'ms');
            console.log(data);
        });
    });
};