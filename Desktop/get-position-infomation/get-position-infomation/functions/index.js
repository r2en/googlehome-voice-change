'use strict'

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const NAME_ACTION = "main"

const VOICE_TYPE = "VoiceType";
const TEXT_SPEECH = "TextSpeech";


exports.VoiceWebText = functions.https.onRequest((request, response) => {
    const app = new App({ request, response });

    function calcMojuro(app) {
        console.log('ver.39 多分成功したっぽい');
        let VoiceType = app.getArgument(VOICE_TYPE);
        let TextSpeech = app.getArgument(TEXT_SPEECH);
        console.log('VoiceType: ' + VoiceType);
        console.log('TextSpeech: ' + TextSpeech);

        const locationPermission = app.SupportedPermissions.DEVICE_PRECISE_LOCATION;
        console.log('locationPermission: ' + locationPermission);
        app.askForPermissions('To tell you about this location', [locationPermission]);
    }

    function receiveLocation(app) {
        //longitude: -122.0841979
        //latitude: 37.4219806
        if (!app.isPermissionGranted()) {
          app.tell("Without knowing your location, I can't tell you about your locatoin.");
        }
        const location = app.getDeviceLocation().coordinates;
        const latitude = location.latitude;
        const longitude = location.longitude;
        console.log('location: ' + JSON.stringify(location, null, '\t'));
        console.log('latitude: ' + latitude);
        console.log('longitude: ' + longitude);
        app.ask('成功したかどうかfirebaseで確認して見てください。');
    }

    let actionMap = new Map();
    actionMap.set('main', calcMojuro);
    actionMap.set('receive_location', receiveLocation);

    app.handleRequest(actionMap);
});
