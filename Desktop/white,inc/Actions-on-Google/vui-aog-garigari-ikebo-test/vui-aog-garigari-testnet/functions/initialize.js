// firebase等々の初回起動時の初期設定関連をここにまとめる
//const timeUtils = require('./timeUtils');
const firebaseAdmin = require('firebase-admin');
const firebaseEncode = require('firebase-encode');
const FIREBASE_DB = require('./defines').FIREBASE_DB;

const encodeAsFirebaseKey = (string) => {
    return firebaseEncode.encode(string);
}

const firebaseInitialize = (conv) => {
   
    firebaseAdmin.database().ref(FIREBASE_DB.USERS_PATH).child(conv.user._id)
        .once('value', (data) => {
            let newUser = true;
            if (data && data.val() && data.val()[FIREBASE_DB.VISITS]) {
                // Previously visited
                newUser = false;
                const visits = data.val()[FIREBASE_DB.VISITS] + 1;

                firebaseAdmin.database().ref(FIREBASE_DB.USERS_PATH).child(conv.user._id).update({
                    [FIREBASE_DB.VISITS]: visits
                });

                //２回目以降の回起動時
                //welcomeOneFunction(app);

            } else {
                // First time user
                firebaseAdmin.database().ref(FIREBASE_DB.USERS_PATH).child(conv.user._id).update({
                    [FIREBASE_DB.VISITS]: 1
                });

                //初回起動時のみ
                //welcomeFirstFunction(app);
            }
        });
        
}

module.exports = {
    encodeAsFirebaseKey: encodeAsFirebaseKey,
    firebaseInitialize: firebaseInitialize
};
