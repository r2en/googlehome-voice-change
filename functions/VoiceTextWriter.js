var VoiceText = require('voicetext');

class VoiceTextWriter {
    constructor(VoiceKey) {
        this.voice = new VoiceText(VoiceKey);
    }

    convertToTextBinary(TextSpeech, VoiceType) {
        var self = this;

        if(TextSpeech == undefined || TextSpeech == null){
            TextSpeech = '私が読み上げるテキストがありません';
        }
        
        if(VoiceType == undefined || VoiceType == null){
            var Speaker = self.voice.SPEAKER.HIKARI;
        }else if(VoiceType == 'bear'){
            var Speaker = self.voice.SPEAKER.BEAR;
        }else if(VoiceType == 'takeru'){
            var Speaker = self.voice.SPEAKER.TAKERU;
        }else{
            var Speaker = self.voice.SPEAKER.HIKARI;
        }

        //console.log('convertToTextBinary: ' + JSON.stringify(self.voice, null, '\t'));
        //console.log('VoiceKey: ' + VoiceKey);
        //console.log('TextSpeech: ' + TextSpeech);
        //console.log('VoiceType: ' + VoiceType);

        return new Promise(function(resolve, reject) {
            //console.log('new Promise Function');
            self.voice
                .speaker(Speaker)
                .emotion(self.voice.EMOTION.HAPPINESS)
                .emotion_level(self.voice.EMOTION_LEVEL.HIGH)
                .volume(300)
                //.format('OGG')
                //console.log(self.voice)
                .speak(TextSpeech, function(e, buf) {
                    if (e) {
                        //console.log('ERROR');
                        console.error(e);
                        reject(e);

                    } else {    
                        //console.log('SUCCESS');                
                        resolve(buf);
                    }
                });                        
        });
    }
}

module.exports = VoiceTextWriter;
