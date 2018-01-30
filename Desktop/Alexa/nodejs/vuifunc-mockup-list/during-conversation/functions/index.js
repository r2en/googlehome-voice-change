const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const DialogflowApp = require('actions-on-google').DialogflowApp;

const WELCOME_INTENT = 'action.do';
const ACCOUNT_INTENT = 'action.secret';

exports.test = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request: request, response: response});

    const target = JSON.stringify(request.body.result.parameters.target);
    const action = JSON.stringify(request.body.result.parameters.action);
    
    function welcomeIntent(app) {
        //app.ask('おはようございます。こちら' + target + 'を' + action + 'したいと思います。');
        app.ask('おはようございます。今からアカウントの紐付けを行いたいと思います');
    }

    function accountIntent(app) {
        app.askForSignIn();
        //app.ask('index.jsではあります。');
        if (app.getSignInStatus() === app.SignInStatus.OK) {
            let accessToken = app.getUser().accessToken;
            // use the accessToken to access your API
        }
        app.ask(accessToken)
    }

    const actionMap = new Map();
    actionMap.set(WELCOME_INTENT, welcomeIntent);
    actionMap.set(ACCOUNT_INTENT, accountIntent);
    app.handleRequest(actionMap);
});