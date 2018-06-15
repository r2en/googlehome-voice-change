i## 概要
ユーザの現在位置情報の取得

## 補足
```rb
        const locationPermission = app.SupportedPermissions.DEVICE_PRECISE_LOCATION;
        console.log('locationPermission: ' + locationPermission);
        app.askForPermissions('To tell you about this location', [locationPermission]);
```
の部分で、組み込みのヘルパーインテントへ導く。<br>
はい、いいえ、でユーザの許可をとることができる。<br>

次のインテントに自動的に移行する<br>
Dialogflowイベント名: actions_intent_PERMISSION<br>
これを次のインテントに設定する必要性あり。<br>

## Dialogflow側の設定

![image](https://user-images.githubusercontent.com/28590220/36828181-8f759e7c-1d5b-11e8-9cbc-6b774b2ab5e3.png)

![image](https://user-images.githubusercontent.com/28590220/36828188-976921d0-1d5b-11e8-89fe-4c430a102b3e.png)

## cloud functions on firebase側の設定

```rb
'use strict'

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const VOICE_TYPE = "VoiceType";
const TEXT_SPEECH = "TextSpeech";

exports.position-infomation = functions.https.onRequest((request, response) => {
    const app = new App({ request, response });

    function askLocation(app) {
        let VoiceType = app.getArgument(VOICE_TYPE);
        let TextSpeech = app.getArgument(TEXT_SPEECH);

        const locationPermission = app.SupportedPermissions.DEVICE_PRECISE_LOCATION;
        console.log('locationPermission: ' + locationPermission);
        app.askForPermissions('To tell you about this location', [locationPermission]);
    }

    function receiveLocation(app) {
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
    actionMap.set('ask_location', askLocation);
    actionMap.set('receive_location', receiveLocation);

    app.handleRequest(actionMap);
});

```

## Simulator

![image](https://user-images.githubusercontent.com/28590220/36827563-b3c4f90c-1d57-11e8-9133-3b07e0db05e1.png)

## Firebaseのログ

![image](https://user-images.githubusercontent.com/28590220/36827580-cc67fa68-1d57-11e8-959d-ab803061cf89.png)

### 参考文献
[How to Get User Location on the Google Assistant](https://www.youtube.com/watch?v=QeANrxWTIFo)
[Conversations 'Helpers'の日本語訳](https://www.eisbahn.jp/yoichiro/2018/02/actions_on_google_conversations_4.html)
[緯度経度から住所検索](http://www.wellhat.co.jp/tools/googlemap.html)

