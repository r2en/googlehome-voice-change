const HOSTING = {
    BASE_URL: 'https://ikemengym-d1c86.firebaseapp.com/',
    //BASE_URL: 'https://ikemengym.firebaseapp.com/',
    //AUDIO_URL: 'https://ikemengym-d1c86.firebaseapp.com/AUDIO/',
    AUDIO_URL: 'https://ikemengym-d1c86.firebaseapp.com/AUDIO/ogg/',
    //AUDIO_URL: 'https://ikemengym.firebaseapp.com/AUDIO/',
    IMAGE_URL: 'https://ikemengym-d1c86.firebaseapp.com/IMAGE/',
    //IMAGE_URL: 'https://ikemengym.firebaseapp.com/IMAGE/',
};

const FIREBASE_DB = {
    USERS_PATH: 'users',
    VISITS: 'visits',
    LAST_DATE: 'lastDate',
    config: {
        apiKey: "AIzaSyBZF5yFiM3ZM-V7Pz7_Sx00GMIsyvilq48",
        authDomain: "ikemengym.firebaseapp.com",
        databaseURL: "https://ikemengym.firebaseio.com",
        projectId: "ikemengym",
        storageBucket: "ikemengym.appspot.com",
        messagingSenderId: "166453263503"
    }
};

module.exports = {
    HOSTING: HOSTING,
    FIREBASE_DB: FIREBASE_DB
};