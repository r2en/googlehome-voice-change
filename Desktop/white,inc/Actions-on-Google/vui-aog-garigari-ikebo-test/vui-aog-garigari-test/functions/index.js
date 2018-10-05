"use strict";

const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse
} = require("actions-on-google");

const util = require("./util");
const moment = require("moment");
const functions = require("firebase-functions");
//const utterance = require("./utterance.json");
const utterance = require("./utterance_ogg.json");
const HOSTING = require("./defines").HOSTING;
const dashbot = require('dashbot')('D3LDG9jBb4nvO9QJwJsrR55QXGFSAeYuMnxLGcPt').google;

const app = dialogflow({
  init: () => ({
    data: {
      yes: 0,
      no: 0,
      thello: 0,
      boot: 0,
      level: 0,
      beginner: 0,
      intermediate: 0,
      advance: 0,
      workout: 0,
      interval: 0,
      firstLogin: 0,
      night: 0,
      goodnight: 0,
      reason: 0,
      love: 0,
      meetyou: 0,
      another: 0,
      fashion: 0,
      goal: 0,
      againreason: 0,
      num: 0,
      ssml: {},
      workoutssml: {},
      suggestion: [],
      fallback: {},
      fallbackCount: 0
    }
  })
});

const AppContexts = {
  THELLO: "thello",
  BOOT: "boot",
  MAIN: "main",
  YES: "yes",
  NO: "no",
  LEVEL: "level",
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advance",
  WORKOUT: "workout",
  INTERVAL: "interval",
  NIGHT: "night",
  GOODNIGHT: "goodnight",
  REASON: "reason",
  LOVE: "love",
  MEETYOU: "meetyou",
  ANOTHER: "another",
  FASHION: "fashion",
  AGAINREASON: "againreason",
  NOINPUT: "noinput",
  EXPLAIN: "explain"
};

const randomIntents = {
  "Random Ikemen Intent": { utteranceId: "random_ikemen" },
  "Random Itai Intent": { utteranceId: "random_itai" },
  "Random Baka Intent": { utteranceId: "random_baka" },
  "Random Curry Intent": { utteranceId: "random_curry" },
  "Random Eguchi Intent": { utteranceId: "random_eguchi" },
  "Random Homete Intent": { utteranceId: "random_homete" },
  "Random Jishin Intent": { utteranceId: "random_jisin" },
  "Random Kitsui Intent": { utteranceId: "random_kistui" },
  "Random Naruse Intent": { utteranceId: "random_naruse" },
  "Random Peko Intent": { utteranceId: "random_peko" },
  "Random S Intent": { utteranceId: "random_s" },
  "Random Suki Intent": { utteranceId: "random_suki" },
  "Random Type Intent": { utteranceId: "random_type" },
  "Random Yasashiku Intent": { utteranceId: "random_yasasiku" },
  "Random Yasumi Intent": { utteranceId: "random_yasumi" }
};

const ampm = 0;
const last = 1;
const xdays = 2;
const oneday = 86400;
const twoday = 172800;
const oneweek = 604800;

let xday = 0;
let menu = "";
let work_menu_text = "";
let work_menu_speech = "";

dashbot.configHandler(app);

const FirestoreNames = {
  CATEGORY: 'category',
  CREATED_AT: 'created_at',
  INTENT: 'intent',
  TIP: 'tip',
  TIPS: 'tips',
  URL: 'url',
  USERS: 'users',
  USER_ID: 'userId',
};

exports.mojuro = functions.https.onRequest(app);

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const interval_chat = num => {
  let interval_text = interval_chat_text(num);
  let interval_speech = interval_chat_speech(num);

  console.log(`🌲 interval_chat_text : ${interval_text} 🌲`);
  console.log(`🌲 interval_chat_speech : ${interval_speech} 🌲`);
  return {
    text: interval_text,
    speech: interval_speech
  };
};

const workout_menu = conv => {
  xday = time(conv, xdays);
  console.log(`🌲 X day : ${xday} 🌲`);
  console.log(`🌲 Level : ${conv.user.storage.level} 🌲`);
  work_menu_text = workout_menu_text(xday, conv.user.storage.level);
  work_menu_speech = workout_menu_speech(xday, conv.user.storage.level);
  return {
    text: work_menu_text,
    speech: work_menu_speech
  };
};


app.intent("Default Welcome Intent", conv => {
  console.log(`😀😁😂😀😁😂😀😁😂 そもそもconv.user.storage、voice matchしてないととれないのではないか ${JSON.stringify(conv.user.storage)} 😀😁😂😀😁😂😀😁😂`);
  if (!conv.user.storage.level) {
    conv.user.storage.level = 1;
  }
  conv.data.num = getRandomInt(15);
  conv.user.storage.lastSession = moment().unix();
  console.log(`🌲 正解見つかれ ${conv.user.storage.firstBoot} 🌲`);
  if (conv.user.storage.firstBoot === undefined) {
    conv.user.storage.lastSession = moment().unix();
    conv.user.storage.firstBoot = true;
    conv.user.storage.firstLogin = 1;
    conv.user.storage.experience = 0;
    conv.contexts.set(AppContexts.THELLO, 1);
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    //conv.ask("はじめまして。はい・いいえで答えて");
    console.log(`🌲 最初でconstruct_ssml(conv, 🌲`);

    const ssml = util.construct_ssml(
      conv,
      [[utterance.orpning_question.text]],
      [[utterance.orpning_question.speech]]
    );


    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    //<audio src='${HOSTING.AUDIO_URL}/opening_sound.mp3'/>
    //<audio src='https://ikemengym.firebaseapp.com/AUDIO/tittlecall_7.mp3'/>
    //<audio src='https://ikemengym-d1c86.firebaseapp.com/AUDIO/tittlecall_7.mp3'/>
    conv.ask(
      new SimpleResponse({
        speech: `<speak>
                  <audio src='https://ikemengym-d1c86.firebaseapp.com/AUDIO/ogg/tittlecall_7.mp3'/>
                  <break time="0.5s"/>
                  あなたの担当トレーナーをお呼び出ししますね
                  <break time="0.5s"/>
              </speak>`,
        text: "あなたの担当トレーナーをお呼び出ししますね"
      })
    );
    conv.ask(new SimpleResponse(ssml));
    conv.ask(
      new BasicCard({
        image: new Image({
          url: HOSTING.IMAGE_URL + "opening.png",
          alt: "Image alternate text"
        })
      })
    );
    console.log(`🌲 SSML 開放 : ${JSON.stringify(conv.data.ssml)} 🌲`);
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));
  } else {
    // トレーニングメニュー初期化 曜日 & 階級
    let training = workout_menu(conv);
    console.log(`🌲 workout_menuの下には入れてるよ🌲`);
    conv.user.storage.firstLogin = false;
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    //conv.user.storage.firstBoot = null; //起動を繰り返す
    const lastlogin = time(conv, last);
    //const lastlogin = 172800;
    console.log(`🌲 time関数の前にはいるよ 🌲`);
    console.log(`🌲 lastloginがないの？ ${lastlogin} 🌲`);
    if (oneweek < lastlogin) {
      conv.user.storage.experience = 0;
      conv.user.storage.love = null;
      conv.user.storage.fashion = null;
      conv.user.storage.meetyou = null;
      conv.user.storage.another = null;
      conv.user.storage.reason = null;
      conv.user.storage.level = null;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      const ssml = util.construct_ssml(
        conv,
        [
          [''],
          [''],
          [
            utterance.twodays_question_p1.text,
            utterance.twodays_question_p2.text,
            utterance.twodays_question_p3.text
          ]
        ],
        [
          [utterance.tittlecall_7.speech],
          [utterance.opening_sound.speech],
          [
            utterance.twodays_question_p1.speech,
            utterance.twodays_question_p2.speech,
            utterance.twodays_question_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    } else if (twoday < lastlogin) {
      conv.user.storage.experience++;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      const ssml = util.construct_ssml(
        conv,
        [
          [''],
          [''],
          [
            utterance.twodays_question_p1.text,
            utterance.twodays_question_p2.text,
            utterance.twodays_question_p3.text
          ]
        ],
        [
          [utterance.tittlecall_7.speech],
          [utterance.opening_sound.speech],
          [
            utterance.twodays_question_p1.speech,
            utterance.twodays_question_p2.speech,
            utterance.twodays_question_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    } else if (oneday < lastlogin) {
      conv.user.storage.experience++;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      //conv.ask("昨日に続いて偉いぞ。はい・いいえ");
      const ssml = util.construct_ssml(
        conv,
        [
          [''],
          [''],
          [
            utterance.nextday_question_p1.text,
            utterance.nextday_question_p2.text,
            utterance.nextday_question_p3.text
          ]
        ],
        [
          [utterance.tittlecall_7.speech],
          [utterance.opening_sound.speech],
          [
            utterance.nextday_question_p1.speech,
            utterance.nextday_question_p2.speech,
            utterance.nextday_question_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    } else {
      console.log(`🌲 sameday ifの前にはいるよ 🌲`);
      conv.user.storage.experience++;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      //conv.ask('もう会いたいの？はい・いいえ');
      console.log(`🌲 convの中身を知りたいんじゃ: ${JSON.stringify(conv)} 🌲`);
      console.log(
        `🌲 [conv]の中身を知りたいんじゃ : ${JSON.stringify([conv])} 🌲`
      );
      const message = [
        [''],
        [''],
        [
          utterance.sameday_question_p1.text,
          utterance.sameday_question_p2.text,
          utterance.sameday_question_p3.text
        ]
      ];
      const url = [
        [utterance.tittlecall_7.speech],
        [utterance.opening_sound.speech],
        [
          utterance.sameday_question_p1.speech,
          utterance.sameday_question_p2.speech,
          utterance.sameday_question_p3.speech
        ]
      ];
      const ssml = util.construct_ssml(conv, message, url);
      // 直前の質問をする
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      console.log(`🌲 SSML 開放 : ${JSON.stringify(conv.data.ssml)} 🌲`);
      
      conv.ask(new SimpleResponse(ssml));
      // 画像差し替え
      conv.ask(
        new BasicCard({
          image: new Image({
            url: HOSTING.IMAGE_URL + "opening.png",
            alt: "Image alternate text"
          })
        })
      );
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    }
  }
  conv.user.storage.lastSession = moment().unix();
});

app.intent("Invocation Welcome Intent", conv => {
  if (!conv.user.storage.level) {
    conv.user.storage.level = 1;
  }
  conv.data.num = getRandomInt(15);
  conv.user.storage.lastSession = moment().unix();
  
  if (conv.user.storage.firstBoot === null || conv.user.storage.firstBoot === undefined) {
    conv.user.storage.lastSession = moment().unix();
    conv.user.storage.firstBoot = true;
    conv.user.storage.firstLogin = 1;
    conv.user.storage.experience = 0;
    conv.contexts.set(AppContexts.THELLO, 1);
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    //conv.ask("はじめまして。はい・いいえで答えて");
    console.log(`🌲 最初でconstruct_ssml(conv, 🌲`);

    const ssml = util.construct_ssml(
      conv,
      [[utterance.orpning_question.text]],
      [[utterance.orpning_question.speech]]
    );

    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    //<audio src='${HOSTING.AUDIO_URL}/opening_sound.mp3'/>
    //<audio src='https://ikemengym.firebaseapp.com/AUDIO/tittlecall_7.mp3'/>
    //<audio src='https://ikemengym-d1c86.firebaseapp.com/AUDIO/tittlecall_7.mp3'/>
    conv.ask(
      new SimpleResponse({
        speech: `<speak>
                  <audio src='https://ikemengym-d1c86.firebaseapp.com/AUDIO/ogg/tittlecall_7.mp3'/>
                  <break time="0.5s"/>
                  あなたの担当トレーナーをお呼び出ししますね
                  <break time="0.5s"/>
              </speak>`,
        text: "あなたの担当トレーナーをお呼び出ししますね"
      })
    );
    conv.ask(new SimpleResponse(ssml));
    conv.ask(
      new BasicCard({
        image: new Image({
          url: HOSTING.IMAGE_URL + "opening.png",
          alt: "Image alternate text"
        })
      })
    );
    console.log(`🌲 SSML 開放 : ${JSON.stringify(conv.data.ssml)} 🌲`);
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));
  } else {
    // トレーニングメニュー初期化 曜日 & 階級
    let training = workout_menu(conv);
    console.log(`🌲 workout_menuの下には入れてるよ🌲`);
    conv.user.storage.firstLogin = false;
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    //conv.user.storage.firstBoot = null; //起動を繰り返す
    const lastlogin = time(conv, last);
    console.log(`🌲 time関数の前にはいるよ 🌲`);
    console.log(`🌲 lastloginがないの？ ${lastlogin} 🌲`);

    if (0 <= lastlogin && lastlogin <= oneday) {
      console.log(`🌲 sameday ifの前にはいるよ 🌲`);
      conv.user.storage.experience++;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      //conv.ask('もう会いたいの？はい・いいえ');
      console.log(`🌲 convの中身を知りたいんじゃ: ${JSON.stringify(conv)} 🌲`);
      console.log(
        `🌲 [conv]の中身を知りたいんじゃ : ${JSON.stringify([conv])} 🌲`
      );
      const message = [
        [''],
        [''],
        [
          utterance.sameday_question_p1.text,
          utterance.sameday_question_p2.text,
          utterance.sameday_question_p3.text
        ]
      ];
      const url = [
        [utterance.tittlecall_7.speech],
        [utterance.opening_sound.speech],
        [
          utterance.sameday_question_p1.speech,
          utterance.sameday_question_p2.speech,
          utterance.sameday_question_p3.speech
        ]
      ];
      const ssml = util.construct_ssml(conv, message, url);
      // 直前の質問をする
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      console.log(`🌲 SSML 開放 : ${JSON.stringify(conv.data.ssml)} 🌲`);
      
      conv.ask(new SimpleResponse(ssml));
      // 画像差し替え
      conv.ask(
        new BasicCard({
          image: new Image({
            url: HOSTING.IMAGE_URL + "opening.png",
            alt: "Image alternate text"
          })
        })
      );
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    } else if (oneday < lastlogin && lastlogin <= twoday) {
      conv.user.storage.experience++;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      //conv.ask("昨日に続いて偉いぞ。はい・いいえ");
      const ssml = util.construct_ssml(
        conv,
        [
          [''],
          [''],
          [
            utterance.nextday_question_p1.text,
            utterance.nextday_question_p2.text,
            utterance.nextday_question_p3.text
          ]
        ],
        [
          [utterance.tittlecall_7.speech],
          [utterance.opening_sound.speech],
          [
            utterance.nextday_question_p1.speech,
            utterance.nextday_question_p2.speech,
            utterance.nextday_question_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    } else if (twoday < lastlogin && lastlogin <= oneweek) {
      conv.user.storage.experience++;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      const ssml = util.construct_ssml(
        conv,
        [
          [''],
          [''],
          [
            utterance.twodays_question_p1.text,
            utterance.twodays_question_p2.text,
            utterance.twodays_question_p3.text
          ]
        ],
        [
          [utterance.tittlecall_7.speech],
          [utterance.opening_sound.speech],
          [
            utterance.twodays_question_p1.speech,
            utterance.twodays_question_p2.speech,
            utterance.twodays_question_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    } else if (oneweek < lastlogin) {
      conv.user.storage.experience = 0;
      conv.user.storage.love = null;
      conv.user.storage.fashion = null;
      conv.user.storage.meetyou = null;
      conv.user.storage.another = null;
      conv.user.storage.reason = null;
      conv.user.storage.level = null;
      conv.contexts.set(AppContexts.BOOT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      const ssml = util.construct_ssml(
        conv,
        [
          [''],
          [''],
          [
            utterance.twodays_question_p1.text,
            utterance.twodays_question_p2.text,
            utterance.twodays_question_p3.text
          ]
        ],
        [
          [utterance.tittlecall_7.speech],
          [utterance.opening_sound.speech],
          [
            utterance.twodays_question_p1.speech,
            utterance.twodays_question_p2.speech,
            utterance.twodays_question_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
    }
  }
  conv.user.storage.lastSession = moment().unix();
});

const time = (conv, flag) => {
  //const moment = require("moment");
  require("date-utils");
  var date = new Date();
  console.log(`🌲 time関数の中にいるよ 🌲`);
  console.log(`🌲 flagはこれだよ : ${flag} 🌲`);
  if (flag === 0) {
    var hh = date.toFormat("HH24");
    return (Number(hh) + 9) % 24;
  } else if (flag === 1) {
    //var lasttime = moment.unix(new Date(conv.user.last.seen)) / 1000000;
    var lasttime = moment.unix(conv.user.storage.lastSession) / 1000;
    var nowtime = moment().unix();
    var difftime = nowtime - lasttime;
    console.log(`🌲🌲🌲🌲🌲🌲🌲🌲 lasttimeはこれだよ : ${lasttime} 🌲🌲🌲🌲🌲🌲`);
    console.log(`🌲🌲🌲🌲🌲🌲🌲🌲 nowtimeはこれだよ : ${nowtime} 🌲🌲🌲🌲🌲🌲🌲`);
    console.log(`🌲 difftimeはこれだよ : ${difftime} 🌲`);
    return difftime;
  } else if (flag === 2) {
    // 0が日曜日
    var day = moment().day();
    conv.data.day = day;
    return day;
  }
};

app.intent("Thello Intent", conv => {
  console.log("Thello intent");
  //初回からあげ
  if (conv.data.yes === 0 && conv.data.no === 0) {
    conv.data.yes++;
    conv.data.no++;
    conv.data.thello++;
    //conv.ask('あれ、おかしいな');
    //conv.ask('約束できる？')
    const ssml = util.construct_ssml(
      conv,
      [[utterance.opening_no.text], [utterance.yakusoku_question.text]],
      [[utterance.opening_no.speech], [utterance.yakusoku_question.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.THELLO, 1);
  } else if (conv.data.yes === 1 && conv.data.no === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.thello = 0;
    //conv.ask('頼むからついてきて');
    //conv.ask('それじゃあ、メニュー');
    const ssml = util.construct_ssml(
      conv,
      [[utterance.yakusoku_no.text], [utterance.leveling_question_first.text]],
      [
        [utterance.yakusoku_no.speech],
        [utterance.leveling_question_first.speech]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["初級", "中級", "上級"];
    conv.ask(new Suggestions(conv.data.suggestion));
    conv.contexts.set(AppContexts.LEVEL_1, 1);
    conv.contexts.set(AppContexts.LEVEL_2, 1);
    conv.contexts.set(AppContexts.LEVEL_3, 1);
  }
});

app.intent("Boot Intent", conv => {
  //thello intentを参考にしてほぼ、no intentのパクリ
  // Time関数で何日前ログインかどうか判断
  var last_login = 0;
  const boot = existContext(conv, AppContexts.BOOT);
  let text;
  let speech;
  console.log(`🌲 ここが発話されなくて困ってる : ${work_menu_text[0]} 🌲`);
  console.log(`🌲 work_menu_speech : ${work_menu_speech[0]} 🌲`);
  if (last_login === 0) {
    //text1 = 'ま、いっか。'
    text = [
      utterance.sameday_no_p1.text,
      utterance.sameday_no_p2.text,
      utterance.sameday_no_p3.text
    ];
    speech = [
      utterance.sameday_no_p1.speech,
      utterance.sameday_no_p2.speech,
      utterance.sameday_no_p3.speech
    ];
  } else if (last_login === 1) {
    //text1 = 'ちっちっち'
    text = [
      utterance.nextday_no_p1.text,
      utterance.nextday_no_p2.text,
      utterance.nextday_no_p3.text
    ];
    speech = [
      utterance.nextday_no_p1.speech,
      utterance.nextday_no_p2.speech,
      utterance.nextday_no_p3.speech
    ];
  } else if (last_login === 2) {
    //text1 = 'まあ。わかるぞ。'twodays_no_p1
    text = [
      utterance.twodays_no_p1.text,
      utterance.twodays_no_p2.text,
      utterance.twodays_no_p3.text
    ];
    speech = [
      utterance.twodays_no_p1.speech,
      utterance.twodays_no_p2.speech,
      utterance.twodays_no_p3.speech
    ];
  }
  // Time関数で一週間以内かどうか判断
  var within_one_week = time(conv, last);
  if (within_one_week <= oneweek) {
    //text2 = 'それじゃあ今日も3つのトレーニング始める'; training_start_p1
    //conv.ask(text1 + text2);
    //conv.ask('それじゃあ、まずは' + work_menu[0] + '始めてもいい？');

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);

    const ssml = util.construct_ssml(
      conv,
      [
        text,
        [
          utterance.training_start_p1.text,
          utterance.training_start_p2.text,
          utterance.training_start_p3.text,
          //utterance.training_start_p4.text,
          utterance.training_start_p5.text
        ],
        [
          utterance.training_first_p1.text,
          utterance.training_first_p2.text,
          utterance.training_first_p3.text
        ],
        [training.text[0]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        speech,
        [
          utterance.training_start_p1.speech,
          utterance.training_start_p2.speech,
          utterance.training_start_p3.speech,
          //utterance.training_start_p4.speech,
          utterance.training_start_p5.speech
        ],
        [
          utterance.training_first_p1.speech,
          utterance.training_first_p2.speech,
          utterance.training_first_p3.speech
        ],
        [training.speech[0]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.WORKOUT, 1);
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
  } else if (within_one_week >= oneweek) {
    //text2 = 'よし、レベルを決め直す。初中上選んで。';
    //conv.ask(text1 + text2);
    const ssml = util.construct_ssml(
      conv,
      [text, utterance.leveling_question_second.text],
      [speech, utterance.leveling_question_second.speech]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["初級", "中級", "上級"];
    conv.ask(new Suggestions(conv.data.suggestion));
    // Levelがからあげだった場合の処理 中級と同じことをする
    conv.contexts.set(AppContexts.LEVEL, 1);
    conv.contexts.set(AppContexts.BEGINNER, 1);
    conv.contexts.set(AppContexts.INTERMEDIATE, 1);
    conv.contexts.set(AppContexts.ADVANCED, 1);
    conv.data.level = 0;
  }
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
  conv.data.yes = 0;
  conv.data.no = 0;
  conv.data.boot = 0;
});

app.intent("Yes Intent", conv => {
  const thello = existContext(conv, AppContexts.THELLO);
  const yes = existContext(conv, AppContexts.YES);
  const no = existContext(conv, AppContexts.NO);
  if (thello && conv.data.thello === 0) {
    conv.data.yes++;
    conv.data.no++;
    conv.data.thello++;
    //conv.ask('お、飲み込み');
    //conv.ask('約束できる？');
    const ssml = util.construct_ssml(
      conv,
      [[utterance.orpning_yes.text], [utterance.yakusoku_question.text]],
      [[utterance.orpning_yes.speech], [utterance.yakusoku_question.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.THELLO, 1);
  } else if (thello && conv.data.thello === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.thello = 0;
    //conv.ask('よし良い返事');
    //conv.ask('それじゃあ、メニュー');
    const ssml = util.construct_ssml(
      conv,
      [[utterance.yakusoku_yes.text], [utterance.leveling_question_first.text]],
      [
        [utterance.yakusoku_yes.speech],
        [utterance.leveling_question_first.speech]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["初級", "中級", "上級"];
    conv.ask(new Suggestions(conv.data.suggestion));
    conv.contexts.set(AppContexts.LEVEL, 1);
    conv.contexts.set(AppContexts.BEGINNER, 1);
    conv.contexts.set(AppContexts.INTERMEDIATE, 1);
    conv.contexts.set(AppContexts.ADVANCED, 1);
  }

  const boot = existContext(conv, AppContexts.BOOT);
  if (boot && conv.data.boot === 0) {
    // Time関数で何日前ログインかどうか判断
    var last_login = 0;
    const boot = existContext(conv, AppContexts.BOOT);
    let text;
    let speech;
    if (last_login === 0) {
      //text1 = 'ふうん、ずいぶん大胆'
      text = [
        utterance.sameday_yes_p1.text,
        utterance.sameday_yes_p2.text,
        utterance.sameday_yes_p3.text
      ];
      speech = [
        utterance.sameday_yes_p1.speech,
        utterance.sameday_yes_p2.speech,
        utterance.sameday_yes_p3.speech
      ];
    } else if (last_login === 1) {
      //text1 = 'よし、おりこうさん'
      text = [
        utterance.nextday_yes_p1.text,
        utterance.nextday_yes_p2.text,
        utterance.nextday_yes_p3.text
      ];
      speech = [
        utterance.nextday_yes_p1.speech,
        utterance.nextday_yes_p2.speech,
        utterance.nextday_yes_p3.speech
      ];
    } else if (last_login === 2) {
      //text1 = '正直なのはいいこと'
      text = [
        utterance.twodays_yes_p1.text,
        utterance.twodays_yes_p2.text,
        utterance.twodays_yes_p3.text
      ];
      speech = [
        utterance.twodays_yes_p1.speech,
        utterance.twodays_yes_p2.speech,
        utterance.twodays_yes_p3.speech
      ];
    }
    // Time関数で一週間以内かどうか判断
    var within_one_week = time(conv, last);
    if (within_one_week <= oneweek) {
      //text2 = 'それじゃあ今日も3つのトレーニング始める';
      //conv.ask(text1 + text2);
      //conv.ask('それじゃあ、まずは' + work_menu[0] + '始めてもいい？');
      let training = workout_menu(conv);
      console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
      console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
      const ssml = util.construct_ssml(
        conv,
        [
          text,
          [
            utterance.training_start_p1.text,
            utterance.training_start_p2.text,
            utterance.training_start_p3.text,
            //utterance.training_start_p4.text,
            utterance.training_start_p5.text
          ],
          [
            utterance.training_first_p1.text,
            utterance.training_first_p2.text,
            utterance.training_first_p3.text
          ],
          [training.text[0]],
          [
            utterance.training_ready_question_p1.text,
            utterance.training_ready_question_p2.text,
            utterance.training_ready_question_p3.text,
            utterance.training_ready_question_p4.text,
            utterance.training_ready_question_p5.text,
            utterance.training_ready_question_p6.text
          ]
        ],
        [
          speech,
          [
            utterance.training_start_p1.speech,
            utterance.training_start_p2.speech,
            utterance.training_start_p3.speech,
            //utterance.training_start_p4.speech,
            utterance.training_start_p5.speech
          ],
          [
            utterance.training_first_p1.speech,
            utterance.training_first_p2.speech,
            utterance.training_first_p3.speech
          ],
          [training.speech[0]],
          [
            utterance.training_ready_question_p1.speech,
            utterance.training_ready_question_p2.speech,
            utterance.training_ready_question_p3.speech,
            utterance.training_ready_question_p4.speech,
            utterance.training_ready_question_p5.speech,
            utterance.training_ready_question_p6.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));
      conv.contexts.set(AppContexts.WORKOUT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
    } else if (within_one_week >= oneweek) {
      //text2 = 'よし、レベルを決め直す。初中上選んで。';
      //conv.ask(text1 + text2);
      // Levelがからあげだった場合の処理 中級と同じことをする
      const ssml = util.construct_ssml(
        conv,
        [text, utterance.leveling_question_second.text],
        [speech, utterance.leveling_question_second.speech]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["初級", "中級", "上級"];
      conv.ask(new Suggestions(conv.data.suggestion));
      conv.contexts.set(AppContexts.LEVEL, 1);
      conv.contexts.set(AppContexts.BEGINNER, 1);
      conv.contexts.set(AppContexts.INTERMEDIATE, 1);
      conv.contexts.set(AppContexts.ADVANCED, 1);
      conv.data.level = 0;
    }
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.boot = 0;
  }
  // 今後出てくる可能性あるな
  // (conv.data.level === 1 && (beginner || level || advance || intermediate))
  if (conv.data.level === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.level = 0;

    //conv.ask('ふうん' + 'まずは' + work_menu[0] + 'はじめていい？');
    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [
        [utterance.kakugo_yes.text],
        [
          utterance.training_first_p1.text,
          utterance.training_first_p2.text,
          utterance.training_first_p3.text
        ],
        [training.text[0]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text
        ]
      ],
      [
        [utterance.kakugo_yes.speech],
        [
          utterance.training_first_p1.speech,
          utterance.training_first_p2.speech,
          utterance.training_first_p3.speech
        ],
        [training.speech[0]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.data.workoutssml = ssml;
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  }

  const interval = existContext(conv, AppContexts.INTERVAL);

  if (interval && conv.data.interval === 0) {
    conv.data.yes = 0;
    conv.data.no = 0;

    //conv.ask("お！えらいな" + "さいご" + work_menu[2] + "はじめていい？");

    //interval.text[0]//chat context
    //interval.speech[0]//chat context
    //interval.text[1]//yes
    //interval.speech[1]//yes

    let interval = interval_chat(conv.data.num);
    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    /* 休憩終わり一時削除 */
    const ssml = util.construct_ssml(
      conv,
      [
        [interval.text[1]],
        [utterance.interval_end.text],
        [
          utterance.training_third_p1.text,
          utterance.training_third_p2.text,
          utterance.training_third_p3.text
        ],
        [training.text[4]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        [interval.speech[1]],
        [utterance.interval_end.speech],
        [
          utterance.training_third_p1.speech,
          utterance.training_third_p2.speech,
          utterance.training_third_p3.speech
        ],
        [training.speech[4]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.data.workoutssml = ssml;
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  }

  const workout = existContext(conv, AppContexts.WORKOUT);

  if (workout && conv.data.workout === 0) {
    conv.data.workout++;
    conv.data.yes = 0;
    conv.data.no = 0;

    //conv.ask('よしまずは' + 'つぎは' + work_menu[1] + 'はじめていい？');

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [
        [training.text[1]],
        [
          utterance.training_second_p1.text,
          utterance.training_second_p2.text,
          utterance.training_second_p3.text
        ],
        [training.text[2]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text
        ]
      ],
      [
        [training.speech[1]],
        [
          utterance.training_second_p1.speech,
          utterance.training_second_p2.speech,
          utterance.training_second_p3.speech
        ],
        [training.speech[2]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.data.workoutssml = ssml;
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  } else if (workout && conv.data.workout === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.workout++;
    //conv.ask("よし、じゃあ" + "休憩。運動するの？はい・いいえ");

    let interval = interval_chat(conv.data.num);
    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [[training.text[3]], [interval.text[0]]],
      [[training.speech[3]], [interval.speech[0]]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.data.workoutssml = ssml;
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.INTERVAL, 1);
  } else if (workout && conv.data.workout === 2) {
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.workout++;
    //conv.ask('オッケー' + '今日は終わり' + 'すぅー');

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [
        [training.text[5]],
        [
          utterance.training_finish_p1.text,
          utterance.training_finish_p2.text,
          utterance.training_finish_p3.text
        ],
        [
          utterance.training_cooldown_p1.text,
          utterance.training_cooldown_p2.text,
          utterance.training_cooldown_p3.text
        ]
      ],
      [
        [training.speech[5]],
        [
          utterance.training_finish_p1.speech,
          utterance.training_finish_p2.speech,
          utterance.training_finish_p3.speech
        ],
        [
          utterance.training_cooldown_p1.speech,
          utterance.training_cooldown_p2.speech,
          utterance.training_cooldown_p3.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.data.workoutssml = ssml;
    conv.ask(new SimpleResponse(ssml));

    const experience = conv.user.storage.experience % 3;
    const login = time(conv, last);

    console.log(`🌲🌲🌲🌲 login : ${JSON.stringify(login)} 🌲🌲🌲🌲`);
    console.log(`🌲🌲🌲🌲 experience : ${JSON.stringify(experience)} 🌲🌲🌲🌲`);
    if (conv.user.storage.firstLogin === 1 || oneweek <= login) {
      //conv.ask('なかなか頑張った。目標あるの？');

      const ssml = util.construct_ssml(
        conv,
        [[utterance.reason_1_question.text]],
        [[utterance.reason_1_question.speech]]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = [
        "好きな人がいる",
        "着たい服がある",
        "成瀬くんに会いたいから",
        "そのほか"
      ];
      conv.ask(new Suggestions(conv.data.suggestion));

      conv.contexts.set(AppContexts.REASON, 1);
      conv.contexts.set(AppContexts.LOVE, 1);
      conv.contexts.set(AppContexts.FASHION, 1);
      conv.contexts.set(AppContexts.MEETYOU, 1);
      conv.contexts.set(AppContexts.ANOTHER, 1);
      conv.user.storage.firstLogin = 0;
    } else if (login <= oneweek && (experience === 0 || experience === 2)) {
      console.log(`🌲🌲🌲🌲 Experience が 0 か 2 : ${experience} 🌲🌲🌲🌲`);
      //朝昼夜を出し分ける
      const timezone = time(conv, ampm);
      if (4 <= timezone && timezone <= 14) {
        //conv.close('今日も１日頑張ろ')

        const ssml = util.construct_ssml(
          conv,
          [
            [
              utterance.end_moning_p1.text,
              utterance.end_moning_p2.text,
              utterance.end_moning_p3.text,
              utterance.end_moning_p4.text,
              utterance.end_moning_p5.text
            ]
          ],
          [
            [
              utterance.end_moning_p1.speech,
              utterance.end_moning_p2.speech,
              utterance.end_moning_p3.speech,
              utterance.end_moning_p4.speech,
              utterance.end_moning_p5.speech
            ]
          ]
        );
        console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
        conv.ask(new SimpleResponse(ssml));
        conv.close(
          new BasicCard({
            subtitle: "トレーニング動画や、成瀬桂のプロフィールはこちら。",
            title: "フィジ彼 公式",
            buttons: new Button({
              title: "http://stoicgym.jp/",
              url: "http://stoicgym.jp/"
            }),
            image: new Image({
              url: HOSTING.IMAGE_URL + "ending.png",
              alt: "Image alternate text"
            }),
            display: "CROPPED"
          })
        );
      } else if (15 <= timezone && timezone <= 18) {
        //conv.close('またな');
        const ssml = util.construct_ssml(
          conv,
          [
            [
              utterance.end_evening_p1.text,
              utterance.end_evening_p2.text,
              utterance.end_evening_p3.text,
              utterance.end_evening_p4.text,
              utterance.end_evening_p5.text
            ]
          ],
          [
            [
              utterance.end_evening_p1.speech,
              utterance.end_evening_p2.speech,
              utterance.end_evening_p3.speech,
              utterance.end_evening_p4.speech,
              utterance.end_evening_p5.speech
            ]
          ]
        );
        console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
        conv.ask(new SimpleResponse(ssml));
        conv.close(
          new BasicCard({
            subtitle: "トレーニング動画や、成瀬桂のプロフィールはこちら。",
            title: "フィジ彼 公式",
            buttons: new Button({
              title: "http://stoicgym.jp/",
              url: "http://stoicgym.jp/"
            }),
            image: new Image({
              url: HOSTING.IMAGE_URL + "ending.png",
              alt: "Image alternate text"
            }),
            display: "CROPPED"
          })
        );
      } else if (
        (19 <= timezone && timezone <= 24) ||
        (0 <= timezone && timezone <= 3)
      ) {
        //conv.ask('おやすみ');

        const ssml = util.construct_ssml(
          conv,
          [
            [
              utterance.end_night_p1.text,
              utterance.end_night_p2.text,
              utterance.end_night_p3.text,
              utterance.end_night_p4.text,
              utterance.end_night_p5.text
            ]
          ],
          [
            [
              utterance.end_night_p1.speech,
              utterance.end_night_p2.speech,
              utterance.end_night_p3.speech,
              utterance.end_night_p4.speech,
              utterance.end_night_p5.speech
            ]
          ]
        );
        console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
        conv.ask(new SimpleResponse(ssml));
        conv.data.suggestion = ["おやすみなさい"];
        conv.ask(new Suggestions(conv.data.suggestion));

        conv.contexts.set(AppContexts.NIGHT, 1);
        conv.contexts.set(AppContexts.GOODNIGHT, 1);
      }
    } else if (login <= oneweek && experience === 1) {
      console.log(`🌲🌲🌲🌲 Experience が 1 : ${experience} 🌲🌲🌲🌲`);
      console.log(`🌲🌲🌲🌲 Love : ${conv.user.storage.love} 🌲🌲🌲🌲`);
      console.log(`🌲🌲🌲🌲 Fashion : ${conv.user.storage.fashion} 🌲🌲🌲🌲`);
      console.log(`🌲🌲🌲🌲 Meet you : ${conv.user.storage.meetyou} 🌲🌲🌲🌲`);
      console.log(`🌲🌲🌲🌲 Another : ${conv.user.storage.another} 🌲🌲🌲🌲`);
      console.log(`🌲🌲🌲🌲 Reason : ${conv.user.storage.reason} 🌲🌲🌲🌲`);

      if (conv.user.storage.love === 1) {
        //conv.ask('明日も続けてくれる');
        const ssml = util.construct_ssml(
          conv,
          [
            [utterance.reason_2_lover_p1.text, utterance.reason_2_lover_p2.text]
          ],
          [
            [
              utterance.reason_2_lover_p1.speech,
              utterance.reason_2_lover_p2.speech
            ]
          ]
        );
        console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
        conv.ask(new SimpleResponse(ssml));
        conv.data.suggestion = ["はい", "いいえ"];
        conv.ask(new Suggestions(conv.data.suggestion));
      } else if (conv.user.storage.fashion === 1) {
        //conv.ask('聞かせて');
        const ssml = util.construct_ssml(
          conv,
          [
            [
              utterance.reason_2_fashion_p1.text,
              utterance.reason_2_fashion_p2.text
            ]
          ],
          [
            [
              utterance.reason_2_fashion_p1.speech,
              utterance.reason_2_fashion_p2.speech
            ]
          ]
        );
        console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
        conv.ask(new SimpleResponse(ssml));
        conv.data.suggestion = ["はい", "いいえ"];
        conv.ask(new Suggestions(conv.data.suggestion));
      } else if (
        conv.user.storage.meetyou === 1 &&
        conv.user.storage.another === 1 &&
        conv.user.storage.reason === 1
      ) {
        //conv.ask('続けられる？');

        const ssml = util.construct_ssml(
          conv,
          [
            [
              utterance.reason_2_another_unknown_p1.text,
              utterance.reason_2_another_unknown_p2.text
            ]
          ],
          [
            [
              utterance.reason_2_another_unknown_p1.speech,
              utterance.reason_2_another_unknown_p2.speech
            ]
          ]
        );
        console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
        conv.ask(new SimpleResponse(ssml));
        conv.data.suggestion = ["はい", "いいえ"];
        conv.ask(new Suggestions(conv.data.suggestion));
      }
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
      conv.contexts.set(AppContexts.AGAINREASON, 1);
    }
    //conv.contexts.set(AppContexts.REASON, 1);
  }

  const reason = existContext(conv, AppContexts.REASON);
  if (reason && conv.data.reason === 1) {
    //conv.ask('よし良い子だ' + 'それじゃあ「イケメンジムにつないで」って言いな');

    const ssml = util.construct_ssml(
      conv,
      [[utterance.fight_yes.text], [utterance.end_again.text]],
      [[utterance.fight_yes.speech], [utterance.end_again.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));

    conv_ask_timezone(conv);
  }

  const againreason = existContext(conv, AppContexts.AGAINREASON);
  if (againreason && conv.data.againreason === 0) {
    //conv.ask('オッケーやる気充分だな');

    const ssml = util.construct_ssml(
      conv,
      [[utterance.reason_2_yes_p1.text, utterance.reason_2_yes_p2.text]],
      [[utterance.reason_2_yes_p1.speech, utterance.reason_2_yes_p2.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));

    conv_ask_timezone(conv);
  }
});

const conv_ask_timezone = conv => {
  const timezone = time(conv, ampm);
  //const timezone = 20;
  if (4 <= timezone && timezone <= 14) {
    //conv.close('今日も１日頑張ろ')

    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.end_moning_p1.text,
          utterance.end_moning_p2.text,
          utterance.end_moning_p3.text,
          utterance.end_moning_p4.text,
          utterance.end_moning_p5.text
        ]
      ],
      [
        [
          utterance.end_moning_p1.speech,
          utterance.end_moning_p2.speech,
          utterance.end_moning_p3.speech,
          utterance.end_moning_p4.speech,
          utterance.end_moning_p5.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.close(
      new BasicCard({
        subtitle: "トレーニング動画や、成瀬桂のプロフィールはこちら。",
        title: "フィジ彼 公式",
        buttons: new Button({
          title: "http://stoicgym.jp/",
          url: "http://stoicgym.jp/"
        }),
        image: new Image({
          url: HOSTING.IMAGE_URL + "ending.png",
          alt: "Image alternate text"
        }),
        display: "CROPPED"
      })
    );
  } else if (15 <= timezone && timezone <= 18) {
    //conv.close('またな');

    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.end_evening_p1.text,
          utterance.end_evening_p2.text,
          utterance.end_evening_p3.text,
          utterance.end_evening_p4.text,
          utterance.end_evening_p5.text
        ]
      ],
      [
        [
          utterance.end_evening_p1.speech,
          utterance.end_evening_p2.speech,
          utterance.end_evening_p3.speech,
          utterance.end_evening_p4.speech,
          utterance.end_evening_p5.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.close(
      new BasicCard({
        subtitle: "トレーニング動画や、成瀬桂のプロフィールはこちら。",
        title: "フィジ彼 公式",
        buttons: new Button({
          title: "http://stoicgym.jp/",
          url: "http://stoicgym.jp/"
        }),
        image: new Image({
          url: HOSTING.IMAGE_URL + "ending.png",
          alt: "Image alternate text"
        }),
        display: "CROPPED"
      })
    );
  } else if (
    (19 <= timezone && timezone <= 24) ||
    (0 <= timezone && timezone <= 3)
  ) {
    //conv.ask("おやすみ");

    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.end_night_p1.text,
          utterance.end_night_p2.text,
          utterance.end_night_p3.text,
          utterance.end_night_p4.text,
          utterance.end_night_p5.text
        ]
      ],
      [
        [
          utterance.end_night_p1.speech,
          utterance.end_night_p2.speech,
          utterance.end_night_p3.speech,
          utterance.end_night_p4.speech,
          utterance.end_night_p5.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));

    conv.contexts.set(AppContexts.NIGHT, 1);
    conv.contexts.set(AppContexts.GOODNIGHT, 1);
  }
};

app.intent("No Intent", conv => {
  const thello = existContext(conv, AppContexts.THELLO);
  const yes = existContext(conv, AppContexts.YES);
  const no = existContext(conv, AppContexts.NO);
  if (thello && conv.data.thello === 0) {
    conv.data.yes++;
    conv.data.no++;
    conv.data.thello++;
    //conv.ask("あれ、おかしな");
    //conv.ask("約束できる？");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.opening_no.text], [utterance.yakusoku_question.text]],
      [[utterance.opening_no.speech], [utterance.yakusoku_question.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.THELLO, 1);
  } else if (thello && conv.data.thello === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.thello = 0;
    //conv.ask("頼むからついてきて");
    //conv.ask("それじゃあ、メニュー");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.yakusoku_no.text], [utterance.leveling_question_first.text]],
      [
        [utterance.yakusoku_no.speech],
        [utterance.leveling_question_first.speech]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));

    conv.contexts.set(AppContexts.LEVEL, 1);
    conv.contexts.set(AppContexts.BEGINNER, 1);
    conv.contexts.set(AppContexts.INTERMEDIATE, 1);
    conv.contexts.set(AppContexts.ADVANCED, 1);
  }

  const boot = existContext(conv, AppContexts.BOOT);
  if (boot && conv.data.boot === 0) {
    // Time関数で何日前ログインかどうか判断
    var last_login = 0;
    const boot = existContext(conv, AppContexts.BOOT);
    let text;
    let speech;
    if (last_login === 0) {
      //text1 = "まあ、いっか";
      text = [
        utterance.sameday_no_p1.text,
        utterance.sameday_no_p2.text,
        utterance.sameday_no_p3.text
      ];
      speech = [
        utterance.sameday_no_p1.speech,
        utterance.sameday_no_p2.speech,
        utterance.sameday_no_p3.speech
      ];
    } else if (last_login === 1) {
      //text1 = "ちっちっち";
      text = [
        utterance.nextday_no_p1.text,
        utterance.nextday_no_p2.text,
        utterance.nextday_no_p3.text
      ];
      speech = [
        utterance.nextday_no_p1.speech,
        utterance.nextday_no_p2.speech,
        utterance.nextday_no_p3.speech
      ];
    } else if (last_login === 2) {
      //text1 = "まあ。認めたくない気持ち";
      text = [
        utterance.twodays_no_p1.text,
        utterance.twodays_no_p2.text,
        utterance.twodays_no_p3.text
      ];
      speech = [
        utterance.twodays_no_p1.speech,
        utterance.twodays_no_p2.speech,
        utterance.twodays_no_p3.speech
      ];
    }
    // Time関数で一週間以内かどうか判断
    var within_one_week = time(conv, last);
    if (within_one_week <= oneweek) {
      //text2 = "それじゃあ今日も3つのトレーニング始める";
      //conv.ask(text1 + text2);
      //conv.ask("それじゃあ、まずは" + work_menu[0] + "始めてもいい？");
      let training = workout_menu(conv);
      console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
      console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
      const ssml = util.construct_ssml(
        conv,
        [
          text,
          [
            utterance.training_start_p1.text,
            utterance.training_start_p2.text,
            utterance.training_start_p3.text,
            //utterance.training_start_p4.text,
            utterance.training_start_p5.text
          ],
          [
            utterance.training_first_p1.text,
            utterance.training_first_p2.text,
            utterance.training_first_p3.text
          ],
          [training.text[0]],
          [
            utterance.training_ready_question_p1.text,
            utterance.training_ready_question_p2.text,
            utterance.training_ready_question_p3.text,
            utterance.training_ready_question_p4.text,
            utterance.training_ready_question_p5.text,
            utterance.training_ready_question_p6.text
          ]
        ],
        [
          speech,
          [
            utterance.training_start_p1.speech,
            utterance.training_start_p2.speech,
            utterance.training_start_p3.speech,
            //utterance.training_start_p4.speech,
            utterance.training_start_p5.speech
          ],
          [
            utterance.training_first_p1.speech,
            utterance.training_first_p2.speech,
            utterance.training_first_p3.speech
          ],
          [training.speech[0]],
          [
            utterance.training_ready_question_p1.speech,
            utterance.training_ready_question_p2.speech,
            utterance.training_ready_question_p3.speech,
            utterance.training_ready_question_p4.speech,
            utterance.training_ready_question_p5.speech,
            utterance.training_ready_question_p6.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["はい", "いいえ"];
      conv.ask(new Suggestions(conv.data.suggestion));

      conv.contexts.set(AppContexts.WORKOUT, 1);
      conv.contexts.set(AppContexts.YES, 1);
      conv.contexts.set(AppContexts.NO, 1);
    } else if (within_one_week >= oneweek) {
      //text2 = "よし、レベルを決め直す。初中上選んで。";
      //conv.ask(text1 + text2);
      // Levelがからあげだった場合の処理 中級と同じことをする

      const ssml = util.construct_ssml(
        conv,
        [text, utterance.leveling_question_second.text],
        [speech, utterance.leveling_question_second.speech]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.data.suggestion = ["初級", "中級", "上級"];
      conv.ask(new Suggestions(conv.data.suggestion));

      conv.contexts.set(AppContexts.LEVEL, 1);
      conv.contexts.set(AppContexts.BEGINNER, 1);
      conv.contexts.set(AppContexts.INTERMEDIATE, 1);
      conv.contexts.set(AppContexts.ADVANCED, 1);
      conv.data.level = 0;
    }
    conv.data.yes = 0;
    conv.data.no = 0;
    conv.data.boot = 0;
  }

  const level = existContext(conv, AppContexts.LEVEL);
  // if (conv.data.level === 1) {
  if (level && conv.data.level === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    //conv.ask("おいおい、はい、いいえ、だろ。");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.kakugo_no.text]],
      [[utterance.kakugo_no.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.LEVEL, 1);
  }

  const workout = existContext(conv, AppContexts.WORKOUT);

  if (workout && conv.data.workout === 0) {
    conv.data.yes = 0;
    conv.data.no = 0;
    //conv.ask("わかった");
    //conv.ask("それじゃあ" + work_menu[0] + "はじめてもいい？");

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [
        [utterance.kakugo_no.text],
        [
          utterance.training_first_p1.text,
          utterance.training_first_p2.text,
          utterance.training_first_p3.text
        ],
        [training.text[0]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        [utterance.kakugo_no.speech],
        [
          utterance.training_first_p1.speech,
          utterance.training_first_p2.speech,
          utterance.training_first_p3.speech
        ],
        [training.speech[0]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  } else if (workout && conv.data.workout === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    //conv.ask("わかった");
    /*
    const ssml = util.construct_ssml(conv,
        [
          [
              utterance.training_ready_no_p1.text,
              utterance.training_ready_no_p2.text,
              utterance.training_ready_no_p3.text
          ]
        ],
        [
          [
              utterance.training_ready_no_p1.speech,
              utterance.training_ready_no_p2.speech,
              utterance.training_ready_no_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.ask(new Suggestions(['はい', 'いいえ']));
      */

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.training_ready_no_p1.text,
          utterance.training_ready_no_p2.text,
          utterance.training_ready_no_p3.text
        ],
        [
          utterance.training_second_p1.text,
          utterance.training_second_p2.text,
          utterance.training_second_p3.text
        ],
        [training.text[2]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text
        ]
      ],
      [
        [
          utterance.training_ready_no_p1.speech,
          utterance.training_ready_no_p2.speech,
          utterance.training_ready_no_p3.speech
        ],
        [
          utterance.training_second_p1.speech,
          utterance.training_second_p2.speech,
          utterance.training_second_p3.speech
        ],
        [training.speech[2]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  } else if (workout && conv.data.workout === 2) {
    conv.data.yes = 0;
    conv.data.no = 0;
    //conv.ask("わかった");

    /*const ssml = util.construct_ssml(conv,
        [
          [
              utterance.training_ready_no_p1.text,
              utterance.training_ready_no_p2.text,
              utterance.training_ready_no_p3.text
          ]
        ],
        [
          [
              utterance.training_ready_no_p1.speech,
              utterance.training_ready_no_p2.speech,
              utterance.training_ready_no_p3.speech
          ]
        ]
      );
      console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
      conv.ask(new SimpleResponse(ssml));
      conv.ask(new Suggestions(['はい', 'いいえ']));*/

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    /* 休憩終わり一時削除 */
    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.training_ready_no_p1.text,
          utterance.training_ready_no_p2.text,
          utterance.training_ready_no_p3.text
        ],
        [
          utterance.training_third_p1.text,
          utterance.training_third_p2.text,
          utterance.training_third_p3.text
        ],
        [training.text[4]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        [
          utterance.training_ready_no_p1.speech,
          utterance.training_ready_no_p2.speech,
          utterance.training_ready_no_p3.speech
        ],
        [
          utterance.training_third_p1.speech,
          utterance.training_third_p2.speech,
          utterance.training_third_p3.speech
        ],
        [training.speech[4]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  }

  const interval = existContext(conv, AppContexts.INTERVAL);

  if (interval && conv.data.interval === 0) {
    conv.data.yes = 0;
    conv.data.no = 0;
    /* 休憩終わり一時削除 */
    //conv.ask("もしや忙しいとか、時間ないとか" + "休憩おわり");
    //conv.ask("よし、おわり" + "さいご" + work_menu[1] + "はじめていい？");

    let interval = interval_chat(conv.data.num);
    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    /* 休憩終わり一時削除 */
    const ssml = util.construct_ssml(
      conv,
      [
        [interval.text[2]],
        [utterance.interval_end.text],
        [
          utterance.training_third_p1.text,
          utterance.training_third_p2.text,
          utterance.training_third_p3.text
        ],
        [training.text[4]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        [interval.speech[2]],
        [utterance.interval_end.speech],
        [
          utterance.training_third_p1.speech,
          utterance.training_third_p2.speech,
          utterance.training_third_p3.speech
        ],
        [training.speech[4]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  }

  const reason = existContext(conv, AppContexts.REASON);

  if (reason && conv.data.reason === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    //conv.ask("おいおい、忘れたのか？「はい・いいえ」");
    //毎日続けないなと 無駄に入れてしまったかも...？
    const ssml = util.construct_ssml(
      conv,
      [[utterance.fight_no.text], [utterance.fight_question.text]],
      [[utterance.fight_no.speech], [utterance.fight_question.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.REASON, 1);
  }

  const againreason = existContext(conv, AppContexts.AGAINREASON);
  if (againreason && conv.data.againreason === 0) {
    //conv.ask("そんな頼りないこと言うなよ");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.reason_2_no_p1.text, utterance.reason_2_no_p2.text]],
      [[utterance.reason_2_no_p1.speech, utterance.reason_2_no_p2.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));

    conv_ask_timezone(conv);
  }
});

app.intent("Level Intent", conv => {
  if (conv.data.level === 0) {
    //conv.ask("なるほど、中級");
    //conv.ask("メニュー設定完了。お返事は、はい・いいえ");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.leveling_2.text], [utterance.kakugo_question.text]],
      [[utterance.leveling_2.speech], [utterance.kakugo_question.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.data.level++;
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.LEVEL, 1);
  } else if (conv.data.level === 1) {
    //conv.ask("おいおい、「はい」「イエス」だろ？ループすっぞ。");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.kakugo_no.text]],
      [[utterance.kakugo_no.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.LEVEL, 1);
  }
});

app.intent("Interval Intent", conv => {
  /* 筋トレ出し分け */
  //conv.ask("もしや忙しいとか、時間ないとか" + "休憩おわり");
  //conv.ask("よし、おわり" + "さいご" + work_menu[1] + "はじめていい？");

  let interval = interval_chat(conv.data.num);
  let training = workout_menu(conv);
  console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
  console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
  /* 休憩終わり一時削除 */
  const ssml = util.construct_ssml(
    conv,
    [
      [interval.text[2]],
      [utterance.interval_end.text],
      [
        utterance.training_third_p1.text,
        utterance.training_third_p2.text,
        utterance.training_third_p3.text
      ],
      [training.text[4]],
      [
        utterance.training_ready_question_p1.text,
        utterance.training_ready_question_p2.text,
        utterance.training_ready_question_p3.text,
        utterance.training_ready_question_p4.text,
        utterance.training_ready_question_p5.text,
        utterance.training_ready_question_p6.text
      ]
    ],
    [
      [interval.speech[2]],
      [utterance.interval_end.speech],
      [
        utterance.training_third_p1.speech,
        utterance.training_third_p2.speech,
        utterance.training_third_p3.speech
      ],
      [training.speech[4]],
      [
        utterance.training_ready_question_p1.speech,
        utterance.training_ready_question_p2.speech,
        utterance.training_ready_question_p3.speech,
        utterance.training_ready_question_p4.speech,
        utterance.training_ready_question_p5.speech,
        utterance.training_ready_question_p6.speech
      ]
    ]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
  conv.contexts.set(AppContexts.WORKOUT, 1);
});

app.intent("Beginner Intent", conv => {
  //conv.ask("おお初級か");
  //conv.ask("メニュー設定完了。お返事は、はい・いいえ");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.leveling_1.text], [utterance.kakugo_question.text]],
    [[utterance.leveling_1.speech], [utterance.kakugo_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.level++;
  conv.user.storage.level = 0;
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
  conv.contexts.set(AppContexts.LEVEL, 1);
});

app.intent("Intermediate Intent", conv => {
  //conv.ask("なるほど、中級");
  //conv.ask("メニュー設定完了。お返事は、はい・いいえ");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.leveling_2.text], [utterance.kakugo_question.text]],
    [[utterance.leveling_2.speech], [utterance.kakugo_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.level++;
  conv.user.storage.level = 1;
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
  conv.contexts.set(AppContexts.LEVEL, 1);
});

app.intent("Advance Intent", conv => {
  //conv.ask("ふーん、上級");
  //conv.ask("メニュー設定完了。お返事は、はい・いいえ");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.leveling_3.text], [utterance.kakugo_question.text]],
    [[utterance.leveling_3.speech], [utterance.kakugo_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.level++;
  conv.user.storage.level = 2;
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
  conv.contexts.set(AppContexts.LEVEL, 1);
});

app.intent("Work Out Intent", conv => {
  if (conv.data.workout === 0) {
    //conv.ask("わかった");

    //conv.ask("それじゃあ、まずは" + work_menu[0] + "始めてもいい？");

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);

    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.training_ready_no_p1.text,
          utterance.training_ready_no_p2.text,
          utterance.training_ready_no_p3.text
        ],
        [
          utterance.training_first_p1.text,
          utterance.training_first_p2.text,
          utterance.training_first_p3.text
        ],
        [training.text[0]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        [
          utterance.training_ready_no_p1.speech,
          utterance.training_ready_no_p2.speech,
          utterance.training_ready_no_p3.speech
        ],
        [
          utterance.training_first_p1.speech,
          utterance.training_first_p2.speech,
          utterance.training_first_p3.speech
        ],
        [training.speech[0]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  } else if (conv.data.workout === 1) {
    //conv.ask("わかった");

    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.training_ready_no_p1.text,
          utterance.training_ready_no_p2.text,
          utterance.training_ready_no_p3.text
        ],
        [
          utterance.training_second_p1.text,
          utterance.training_second_p2.text,
          utterance.training_second_p3.text
        ],
        [training.text[2]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text
        ]
      ],
      [
        [
          utterance.training_ready_no_p1.speech,
          utterance.training_ready_no_p2.speech,
          utterance.training_ready_no_p3.speech
        ],
        [
          utterance.training_second_p1.speech,
          utterance.training_second_p2.speech,
          utterance.training_second_p3.speech
        ],
        [training.speech[2]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  } else {
    //conv.ask("わかった");
    let training = workout_menu(conv);
    console.log(`🌲 training[0] : ${training.text[0]} 🌲`);
    console.log(`🌲 training[0] : ${training.speech[0]} 🌲`);
    /* 休憩終わり一時削除 */
    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.training_ready_no_p1.text,
          utterance.training_ready_no_p2.text,
          utterance.training_ready_no_p3.text
        ],
        [
          utterance.training_third_p1.text,
          utterance.training_third_p2.text,
          utterance.training_third_p3.text
        ],
        [training.text[4]],
        [
          utterance.training_ready_question_p1.text,
          utterance.training_ready_question_p2.text,
          utterance.training_ready_question_p3.text,
          utterance.training_ready_question_p4.text,
          utterance.training_ready_question_p5.text,
          utterance.training_ready_question_p6.text
        ]
      ],
      [
        [
          utterance.training_ready_no_p1.speech,
          utterance.training_ready_no_p2.speech,
          utterance.training_ready_no_p3.speech
        ],
        [
          utterance.training_third_p1.speech,
          utterance.training_third_p2.speech,
          utterance.training_third_p3.speech
        ],
        [training.speech[4]],
        [
          utterance.training_ready_question_p1.speech,
          utterance.training_ready_question_p2.speech,
          utterance.training_ready_question_p3.speech,
          utterance.training_ready_question_p4.speech,
          utterance.training_ready_question_p5.speech,
          utterance.training_ready_question_p6.speech
        ]
      ]
    );

    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
    conv.contexts.set(AppContexts.WORKOUT, 1);
  }
});

app.intent("Night Intent", conv => {
  //conv.close("おやすみ");

  const ssml = util.construct_ssml(
    conv,
    [
      [
        utterance.end_night_goodnight_p1.text,
        utterance.end_night_goodnight_p2.text,
        utterance.end_night_goodnight_p3.text,
        utterance.end_night_goodnight_p4.text,
        utterance.end_night_goodnight_p5.text
      ]
    ],
    [
      [
        utterance.end_night_goodnight_p1.speech,
        utterance.end_night_goodnight_p2.speech,
        utterance.end_night_goodnight_p3.speech,
        utterance.end_night_goodnight_p4.speech,
        utterance.end_night_goodnight_p5.speech
      ]
    ]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.close(
    new BasicCard({
      subtitle: "トレーニング動画や、成瀬桂のプロフィールはこちら。",
      title: "フィジ彼 公式",
      buttons: new Button({
        title: "http://stoicgym.jp/",
        url: "http://stoicgym.jp/"
      }),
      image: new Image({
        url: HOSTING.IMAGE_URL + "ending.png",
        alt: "Image alternate text"
      }),
      display: "CROPPED"
    })
  );
});

app.intent("Good Night Intent", conv => {
  //conv.ask("おやすみなさい、だろ？");

  const ssml = util.construct_ssml(
    conv,
    [
      [
        utterance.end_night_noinput_p1.text,
        utterance.end_night_noinput_p2.text,
        utterance.end_night_noinput_p3.text,
        utterance.end_night_noinput_p4.text,
        utterance.end_night_noinput_p5.text
      ]
    ],
    [
      [
        utterance.end_night_noinput_p1.speech,
        utterance.end_night_noinput_p2.speech,
        utterance.end_night_noinput_p3.speech,
        utterance.end_night_noinput_p4.speech,
        utterance.end_night_noinput_p5.speech
      ]
    ]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));

  conv.contexts.set(AppContexts.GOODNIGHT, 1);
  conv.contexts.set(AppContexts.NIGHT, 1);
});

app.intent("Reason Intent", conv => {
  if (conv.data.reason === 0) {
    //conv.ask("そうか、まあ目標があるならそれに向かって一緒に頑張ろ");
    //conv.ask("毎日続けないと効果はない");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.reason_1_unknown.text], [utterance.fight_question.text]],
      [[utterance.reason_1_unknown.speech], [utterance.fight_question.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.data.suggestion = ["はい", "いいえ"];
    conv.ask(new Suggestions(conv.data.suggestion));

    conv.data.reason++;
    conv.user.storage.reason = 1;
    conv.contexts.set(AppContexts.REASON, 1);
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
  } else if (conv.data.reason === 1) {
    conv.data.yes = 0;
    conv.data.no = 0;
    //conv.ask("おいおい、忘れたのか？「はい」「イエス」だろ？ループすっぞ。");

    const ssml = util.construct_ssml(
      conv,
      [[utterance.fight_no.text]],
      [[utterance.fight_no.speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.ask(new Suggestions(["はい", "いいえ"]));

    conv.contexts.set(AppContexts.REASON, 1);
    conv.contexts.set(AppContexts.YES, 1);
    conv.contexts.set(AppContexts.NO, 1);
  }
});

app.intent("Love Intent", conv => {
  //conv.ask("え、それって俺のこと");
  //conv.ask("毎日続けないと効果はない");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.reason_1_lover.text], [utterance.fight_question.text]],
    [[utterance.reason_1_lover.speech], [utterance.fight_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.reason++;
  conv.user.storage.love = 1;
  conv.contexts.set(AppContexts.REASON, 1);
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
});

app.intent("Level Check Intent", conv => {
  let reprompt = conv.data.ssml;
  const level = conv.user.storage.level + 1;
  const reply = utterance.level_check[`leveling_check_${level}`];
  //conv.ask(reply.text);
  //TODO 直前の質問を繰り返す
  const ssml = util.construct_ssml(conv, [[reply.text]], [[reply.speech]]);
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.ask(new SimpleResponse(reprompt));
  conv.ask(new Suggestions(conv.data.suggestion));
  playback_context(conv);
});

app.intent("Level Set Intent", conv => {
  //conv.ask(utterance.leveling_reset.text);
  //conv.ask(utterance.leveling_question_second.text);
  const ssml = util.construct_ssml(
    conv,
    [
      [utterance.leveling_reset.text],
      [utterance.leveling_question_second.text]
    ],
    [
      [utterance.leveling_reset.speech],
      [utterance.leveling_question_second.speech]
    ]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["初級", "中級", "上級"];
  conv.ask(new Suggestions(conv.data.suggestion));

  //レベル変更フローへ
  conv.contexts.set(AppContexts.LEVEL, 1);
  conv.contexts.set(AppContexts.BEGINNER, 1);
  conv.contexts.set(AppContexts.INTERMEDIATE, 1);
  conv.contexts.set(AppContexts.ADVANCED, 1);
});

app.intent("Help Intent", conv => {
  let reprompt = conv.data.ssml;
  const ssml = util.construct_ssml(
    conv,
    [[utterance.help.text]],
    [[utterance.help.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.ask(new SimpleResponse(reprompt));
  conv.ask(new Suggestions(conv.data.suggestion));
  playback_context(conv);
});

app.intent("Explain Intent", conv => {
  console.log(`🌲 Explain Intentにははいってる 🌲`);
  const interval = existContext(conv, AppContexts.INTERVAL);
  const boot = existContext(conv, AppContexts.BOOT);
  const workout = existContext(conv, AppContexts.WORKOUT);
  if (boot || interval || workout) {
    let ssml = conv.data.workoutssml;
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.ask(new Suggestions(conv.data.suggestion));
    playback_context(conv);
  } else {
    let reprompt = conv.data.ssml;
    const ssml = util.construct_ssml(
      conv,
      [
        [
          utterance.onemore_another_p1.text,
          utterance.onemore_another_p2.text,
          utterance.onemore_another_p3.text
        ]
      ],
      [
        [
          utterance.onemore_another_p1.speech,
          utterance.onemore_another_p2.speech,
          utterance.onemore_another_p3.speech
        ]
      ]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.ask(new SimpleResponse(ssml));
    conv.ask(new SimpleResponse(reprompt));
    conv.ask(new Suggestions(conv.data.suggestion));
    playback_context(conv);
  }
});

app.intent("Finish Intent", conv => {
  const reply = utterance.end;
  if (Array.isArray(reply)) {
    const index = Math.floor(Math.random() * reply.length);
    //conv.close(reply[index].text);
    const ssml = util.construct_ssml(
      conv,
      [[reply[index].text]],
      [[reply[index].speech]]
    );
    console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
    conv.close(new SimpleResponse(ssml));
  }
});


app.intent("Default Fallback Intent", conv => {
  let reprompt = conv.data.ssml;
  const repromptCount = parseInt(conv.arguments.get("REPROMPT_COUNT"));
  console.log(`🌲 Defaltfallbackには入れてる 🌲`);
  conv.contexts.set(AppContexts.LEVEL, 1);
  conv.contexts.set(AppContexts.BEGINNER, 1);
  conv.contexts.set(AppContexts.INTERMEDIATE, 1);
  conv.contexts.set(AppContexts.ADVANCED, 1);
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
  if (conv.data.fallbackCount === 0) {
    conv.data.fallback = reprompt;
    console.log(`🌲 repromptCount : ${repromptCount} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [[utterance.noinput_1_p1.text, utterance.noinput_1_p2.text]],
      [[utterance.noinput_1_p1.speech, utterance.noinput_1_p2.speech]]
    );
    conv.ask(new SimpleResponse(ssml));
    conv.ask(new SimpleResponse(reprompt));
    conv.ask(new Suggestions(conv.data.suggestion));
    playback_context(conv);
  } else if (conv.data.fallbackCount === 1) {
    conv.data.fallback
    console.log(`🌲 repromptCount : ${repromptCount} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [[utterance.noinput_1_p3.text, utterance.noinput_1_p4.text]],
      [[utterance.noinput_1_p3.speech, utterance.noinput_1_p4.speech]]
    );
    conv.ask(new SimpleResponse(ssml));
    conv.ask(new SimpleResponse(conv.data.fallback));
    conv.ask(new Suggestions(conv.data.suggestion));
    playback_context(conv);
  } else {
    console.log(`🌲 repromptCount : ${repromptCount} 🌲`);
    const ssml = util.construct_ssml(
      conv,
      [[utterance.noinput_1_p5.text, utterance.noinput_1_p6.text]],
      [[utterance.noinput_1_p5.speech, utterance.noinput_1_p6.speech]]
    );
    conv.close(new SimpleResponse(ssml));
  }
  conv.data.fallbackCount++;
});


app.intent(Object.keys(randomIntents), conv => {
  let reprompt = conv.data.ssml;
  const utteranceId = randomIntents[conv.intent].utteranceId;
  let reply = utterance.randoms[utteranceId];
  console.log(`🌲 reply : ${JSON.stringify(reply)} 🌲`);
  if (Array.isArray(reply)) {
    const index = Math.floor(Math.random() * reply.length);
    //conv.ask(reply[index].text);

    reply = reply[index];
  }

  const ssml = util.construct_ssml(conv, [[reply.text]], [[reply.speech]]);
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.ask(new SimpleResponse(reprompt));
  conv.ask(new Suggestions(conv.data.suggestion));
  playback_context(conv);

  //TODO 音声ファイルの組み込み
  //TODO 直前の質問を繰り返す
});
app.intent("Fashion Intent", conv => {
  //conv.ask("ウンウン");
  //conv.ask("毎日続けないと効果はない");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.reason_1_fashion.text], [utterance.fight_question.text]],
    [[utterance.reason_1_fashion.speech], [utterance.fight_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.reason++;
  conv.user.storage.fashion = 1;
  conv.contexts.set(AppContexts.REASON, 1);
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
});

app.intent("Meet you Intent", conv => {
  //conv.ask("なにそれ、面白いね");
  //conv.ask("毎日続けないと効果はない");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.reason_1_meetyou.text], [utterance.fight_question.text]],
    [[utterance.reason_1_meetyou.speech], [utterance.fight_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.reason++;
  conv.user.storage.meetyou = 1;
  conv.contexts.set(AppContexts.REASON, 1);
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
});

app.intent("Another Intent", conv => {
  //conv.ask("そうか、まあ目標があるなら");
  //conv.ask("毎日続けないと効果はない");

  const ssml = util.construct_ssml(
    conv,
    [[utterance.reason_1_another.text], [utterance.fight_question.text]],
    [[utterance.reason_1_another.speech], [utterance.fight_question.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));
  conv.data.suggestion = ["はい", "いいえ"];
  conv.ask(new Suggestions(conv.data.suggestion));

  conv.data.reason++;
  conv.user.storage.another = 1;
  conv.contexts.set(AppContexts.REASON, 1);
  conv.contexts.set(AppContexts.YES, 1);
  conv.contexts.set(AppContexts.NO, 1);
});

app.intent("Again Reason Intent", conv => {
  conv.contexts.output;
  //conv.ask("あれ？そんな頼りないこと言うなよー");
  conv.contexts.input;
  const ssml = util.construct_ssml(
    conv,
    [[utterance.reason_2_no_p1.text, utterance.reason_2_no_p2.text]],
    [[utterance.reason_2_no_p1.speech, utterance.reason_2_no_p2.speech]]
  );
  console.log(`🌲 conversation : ${JSON.stringify(ssml)} 🌲`);
  conv.ask(new SimpleResponse(ssml));

  conv_ask_timezone(conv);
});

const playback_context = conv => {
  console.log(
    `🌲 playback_contextに入りましたinput ${JSON.stringify(
      conv.contexts.input
    )} 🌲`
  );
  console.log(
    `🌲 playback_contextに入りましたoutput ${JSON.stringify(
      conv.contexts.output
    )} 🌲`
  );

  var ikeys = Object.keys(conv.contexts.input);
  console.log(`🌲 playback keys ${JSON.stringify(conv.contexts.input)} 🌲`);
  for (var i = 0, l = ikeys.length; i < l; i += 1) {
    //console.log(`🌲 conv.contexts.inputのカウント ${JSON.stringify(ikeys[i], conv.contexts.input[ ikeys[i] ])} 🌲`);
    let input = JSON.stringify(ikeys[i], conv.contexts.input[ikeys[i]]);
    if (
      input !== '"google_assistant_input_type_keyboard"' &&
      input !== '"google_assistant_input_type_touch"' &&
      input !== '"actions_capability_media_response_audio"' &&
      input !== '"actions_capability_audio_output"' &&
      input !== '"actions_capability_web_browser"' &&
      input !== '"actions_capability_media_response_audio"' &&
      input !== '"_actions_on_google"' &&
      input !== '"actions_capability_screen_output"'
    ) {
      console.log(`🌲 コンテキスト Slice : ${input.slice(1, -1)} 🌲`);
      conv.contexts.set(input.slice(1, -1), 1);
    }
  }

  console.log(
    `🌲 古いコンテキストの確認 ${JSON.stringify(conv.contexts.output)} 🌲`
  );
  console.log(
    `🌲 新しくコンテキストがセットされたか ${JSON.stringify(
      conv.contexts.input
    )} 🌲`
  );
};

const existContext = (conv, context) => {
  try {
    /*
    console.log(`🌲 コンテキストはなんじゃーいinput ${JSON.stringify(conv.contexts.input)} 🌲`);
    
    var ikeys = Object.keys(conv.contexts.input);
    console.log(`🌲 ikeys ${JSON.stringify(conv.contexts.input)} 🌲`);
    for( var i=0, l=ikeys.length; i<l; i+=1) {
      console.log(`🌲 conv.contexts.inputのカウント ${JSON.stringify(ikeys[i], conv.contexts.input[ ikeys[i] ])} 🌲`);
      let input = JSON.stringify(ikeys[i], conv.contexts.input[ ikeys[i] ]);
      if(input !== "\"google_assistant_input_type_touch\"" && input !== "\"actions_capability_media_response_audio\"" && input !== "\"actions_capability_audio_output\"" && input !== "\"actions_capability_web_browser\"" && input !== "\"actions_capability_media_response_audio\"" && input !== "\"_actions_on_google\"" && input !== "\"actions_capability_screen_output\""){
        console.log(`🌲 コンテキスト : ${input} 🌲`);
        conv.contexts.set(AppContexts.input, 1);
      }
    }
    */
    /*
    var dkeys = Object.keys(conv.data);
    console.log(`🌲 dkeys ${JSON.stringify(conv.data)} 🌲`);
    for(var k=0, m=dkeys.length; k<m; k+=1) {
      console.log(`🌲 データラベル : ${dkeys[k]} データ内容 : ${conv.data[ dkeys[k] ]} データ型 : ${typeof(conv.data[ dkeys[k] ])}🌲`);
      if(conv.data[dkeys[k]] !== 0){
        console.log(`🌲 成功カウント : ${dkeys[k]} 🌲`);
      }
    }

    var ckeys = Object.keys(conv.user.storage);
    console.log(`🌲 ckeys ${JSON.stringify(conv.user.storage)} 🌲`);
    for(var j=0, n=ckeys.length; j<n; j+=1) {
      console.log(`🌲 ストレージラベル : ${ckeys[j]} ストレージ内容 : ${conv.user.storage[ ckeys[j] ]} データ型 : ${typeof(conv.user.storage[ ckeys[k] ])}🌲`);
      if(conv.user.storage[ckeys[j]] !== 0){
        console.log(`🌲 ストレージ成功カウント : ${ckeys[j]} 🌲`);
      }
    }
    */

    console.log(`🌲 ${JSON.stringify(conv.contexts.get(context).lifespan)} 🌲`);
    return JSON.stringify(conv.contexts.get(context));
  } catch (e) {
    return;
  }
};

const workout_menu_text = (xday, level) => {
  var menu = ["", "", "", "", "", ""];
  switch (xday) {
    case 0:
      if (level === 0) {
        menu = [
          utterance.training_e_ready.text,
          utterance.training_e.text,
          utterance.training_i_ready.text,
          utterance.training_i_1.text,
          utterance.training_j_ready.text,
          utterance.training_j_2.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_e_ready.text,
          utterance.training_e.text,
          utterance.training_i_ready.text,
          utterance.training_i_3.text,
          utterance.training_n_ready.text,
          utterance.training_n_2.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_e_ready.text,
          utterance.training_e.text,
          utterance.training_j_ready.text,
          utterance.training_j_3.text,
          utterance.training_i_ready.text,
          utterance.training_i_3.text
        ];
      }
      break;
    case 1:
      if (level === 0) {
        menu = [
          utterance.training_a_ready.text,
          utterance.training_a.text,
          utterance.training_i_ready.text,
          utterance.training_i_1.text,
          utterance.training_n_ready.text,
          utterance.training_n_2.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_a_ready.text,
          utterance.training_a.text,
          utterance.training_i_ready.text,
          utterance.training_i_2.text,
          utterance.training_j_ready.text,
          utterance.training_j_2.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_a_ready.text,
          utterance.training_a.text,
          utterance.training_i_ready.text,
          utterance.training_i_2.text,
          utterance.training_j_ready.text,
          utterance.training_j_3.text
        ];
      }
      break;
    case 2:
      if (level === 0) {
        menu = [
          utterance.training_d_ready.text,
          utterance.training_d.text,
          utterance.training_p_ready.text,
          utterance.training_p_1.text,
          utterance.training_i_ready.text,
          utterance.training_i_1.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_d_ready.text,
          utterance.training_d.text,
          utterance.training_p_ready.text,
          utterance.training_p_2.text,
          utterance.training_n_ready.text,
          utterance.training_n_3.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_d_ready.text,
          utterance.training_d.text,
          utterance.training_p_ready.text,
          utterance.training_p_3.text,
          utterance.training_o_ready.text,
          utterance.training_o_3.text
        ];
      }
      break;
    case 3:
      if (level === 0) {
        menu = [
          utterance.training_g_ready.text,
          utterance.training_g.text,
          utterance.training_n_ready.text,
          utterance.training_n_1.text,
          utterance.training_l_ready.text,
          utterance.training_l_1.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_b_ready.text,
          utterance.training_b.text,
          utterance.training_l_ready.text,
          utterance.training_l_1.text,
          utterance.training_m_ready.text,
          utterance.training_m_2.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_b_ready.text,
          utterance.training_b.text,
          utterance.training_l_ready.text,
          utterance.training_l_1.text,
          utterance.training_m_ready.text,
          utterance.training_m_3.text
        ];
      }
      break;
    case 4:
      if (level === 0) {
        menu = [
          utterance.training_e_ready.text,
          utterance.training_e.text,
          utterance.training_i_ready.text,
          utterance.training_i_2.text,
          utterance.training_j_ready.text,
          utterance.training_j_1.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_e_ready.text,
          utterance.training_e.text,
          utterance.training_i_ready.text,
          utterance.training_i_2.text,
          utterance.training_k_ready.text,
          utterance.training_k_1.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_e_ready.text,
          utterance.training_e.text,
          utterance.training_i_ready.text,
          utterance.training_i_3.text,
          utterance.training_k_ready.text,
          utterance.training_k_1.text
        ];
      }
      break;
    case 5:
      if (level === 0) {
        menu = [
          utterance.training_d_ready.text,
          utterance.training_d.text,
          utterance.training_p_ready.text,
          utterance.training_p_1.text,
          utterance.training_n_ready.text,
          utterance.training_n_2.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_d_ready.text,
          utterance.training_d.text,
          utterance.training_p_ready.text,
          utterance.training_p_2.text,
          utterance.training_o_ready.text,
          utterance.training_o_1.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_d_ready.text,
          utterance.training_d.text,
          utterance.training_p_ready.text,
          utterance.training_p_3.text,
          utterance.training_o_ready.text,
          utterance.training_o_2.text
        ];
      }
      break;
    case 6:
      if (level === 0) {
        menu = [
          utterance.training_b_ready.text,
          utterance.training_b.text,
          utterance.training_l_ready.text,
          utterance.training_l_1.text,
          utterance.training_m_ready.text,
          utterance.training_m_1.text
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_b_ready.text,
          utterance.training_b.text,
          utterance.training_l_ready.text,
          utterance.training_l_1.text,
          utterance.training_m_ready.text,
          utterance.training_m_2.text
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_b_ready.text,
          utterance.training_b.text,
          utterance.training_l_ready.text,
          utterance.training_l_1.text,
          utterance.training_m_ready.text,
          utterance.training_m_3.text
        ];
      }
      break;
  }
  return menu;
};

const workout_menu_speech = (xday, level) => {
  var menu = ["", "", "", "", "", ""];
  switch (xday) {
    case 0:
      if (level === 0) {
        menu = [
          utterance.training_e_ready.speech,
          utterance.training_e.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_1.speech,
          utterance.training_j_ready.speech,
          utterance.training_j_2.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_e_ready.speech,
          utterance.training_e.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_3.speech,
          utterance.training_n_ready.speech,
          utterance.training_n_2.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_e_ready.speech,
          utterance.training_e.speech,
          utterance.training_j_ready.speech,
          utterance.training_j_3.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_3.speech
        ];
      }
      break;
    case 1:
      if (level === 0) {
        menu = [
          utterance.training_a_ready.speech,
          utterance.training_a.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_1.speech,
          utterance.training_n_ready.speech,
          utterance.training_n_2.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_a_ready.speech,
          utterance.training_a.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_2.speech,
          utterance.training_j_ready.speech,
          utterance.training_j_2.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_a_ready.speech,
          utterance.training_a.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_2.speech,
          utterance.training_j_ready.speech,
          utterance.training_j_3.speech
        ];
      }
      break;
    case 2:
      if (level === 0) {
        menu = [
          utterance.training_d_ready.speech,
          utterance.training_d.speech,
          utterance.training_p_ready.speech,
          utterance.training_p_1.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_1.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_d_ready.speech,
          utterance.training_d.speech,
          utterance.training_p_ready.speech,
          utterance.training_p_2.speech,
          utterance.training_n_ready.speech,
          utterance.training_n_3.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_d_ready.speech,
          utterance.training_d.speech,
          utterance.training_p_ready.speech,
          utterance.training_p_3.speech,
          utterance.training_o_ready.speech,
          utterance.training_o_3.speech
        ];
      }
      break;
    case 3:
      if (level === 0) {
        menu = [
          utterance.training_g_ready.speech,
          utterance.training_g.speech,
          utterance.training_n_ready.speech,
          utterance.training_n_1.speech,
          utterance.training_l_ready.speech,
          utterance.training_l_1.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_b_ready.speech,
          utterance.training_b.speech,
          utterance.training_l_ready.speech,
          utterance.training_l_1.speech,
          utterance.training_m_ready.speech,
          utterance.training_m_2.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_b_ready.speech,
          utterance.training_b.speech,
          utterance.training_l_ready.speech,
          utterance.training_l_1.speech,
          utterance.training_m_ready.speech,
          utterance.training_m_3.speech
        ];
      }
      break;
    case 4:
      if (level === 0) {
        menu = [
          utterance.training_e_ready.speech,
          utterance.training_e.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_2.speech,
          utterance.training_j_ready.speech,
          utterance.training_j_1.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_e_ready.speech,
          utterance.training_e.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_2.speech,
          utterance.training_k_ready.speech,
          utterance.training_k_1.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_e_ready.speech,
          utterance.training_e.speech,
          utterance.training_i_ready.speech,
          utterance.training_i_3.speech,
          utterance.training_k_ready.speech,
          utterance.training_k_1.speech
        ];
      }
      break;
    case 5:
      if (level === 0) {
        menu = [
          utterance.training_d_ready.speech,
          utterance.training_d.speech,
          utterance.training_p_ready.speech,
          utterance.training_p_1.speech,
          utterance.training_n_ready.speech,
          utterance.training_n_2.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_d_ready.speech,
          utterance.training_d.speech,
          utterance.training_p_ready.speech,
          utterance.training_p_2.speech,
          utterance.training_o_ready.speech,
          utterance.training_o_1.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_d_ready.speech,
          utterance.training_d.speech,
          utterance.training_p_ready.speech,
          utterance.training_p_3.speech,
          utterance.training_o_ready.speech,
          utterance.training_o_2.speech
        ];
      }
      break;
    case 6:
      if (level === 0) {
        menu = [
          utterance.training_b_ready.speech,
          utterance.training_b.speech,
          utterance.training_l_ready.speech,
          utterance.training_l_1.speech,
          utterance.training_m_ready.speech,
          utterance.training_m_1.speech
        ];
      } else if (level === 1) {
        menu = [
          utterance.training_b_ready.speech,
          utterance.training_b.speech,
          utterance.training_l_ready.speech,
          utterance.training_l_1.speech,
          utterance.training_m_ready.speech,
          utterance.training_m_2.speech
        ];
      } else if (level === 2) {
        menu = [
          utterance.training_b_ready.speech,
          utterance.training_b.speech,
          utterance.training_l_ready.speech,
          utterance.training_l_1.speech,
          utterance.training_m_ready.speech,
          utterance.training_m_3.speech
        ];
      }
      break;
  }
  return menu;
};

const interval_chat_text = num => {
  console.log(`🌲 interval_chat_text 🌲`);
  var menu = ["", "", ""];
  switch (num) {
    case 0:
      menu = [
        utterance.interval_1.text,
        utterance.interval_1_yes.text,
        utterance.interval_1_no.text
      ];
      break;
    case 1:
      menu = [
        utterance.interval_2.text,
        utterance.interval_2_yes.text,
        utterance.interval_2_no.text
      ];
      break;
    case 2:
      menu = [
        utterance.interval_3.text,
        utterance.interval_3_yes.text,
        utterance.interval_3_no.text
      ];
      break;
    case 3:
      menu = [
        utterance.interval_4.text,
        utterance.interval_4_yes.text,
        utterance.interval_4_no.text
      ];
      break;
    case 4:
      menu = [
        utterance.interval_5.text,
        utterance.interval_5_yes.text,
        utterance.interval_5_no.text
      ];
      break;
    case 5:
      menu = [
        utterance.interval_6.text,
        utterance.interval_6_yes.text,
        utterance.interval_6_no.text
      ];
      break;
    case 6:
      menu = [
        utterance.interval_7.text,
        utterance.interval_7_yes.text,
        utterance.interval_7_no.text
      ];
      break;
    case 7:
      menu = [
        utterance.interval_8.text,
        utterance.interval_8_yes.text,
        utterance.interval_8_no.text
      ];
      break;
    case 8:
      menu = [
        utterance.interval_9.text,
        utterance.interval_9_yes.text,
        utterance.interval_9_no.text
      ];
      break;
    case 9:
      menu = [
        utterance.interval_10.text,
        utterance.interval_10_yes.text,
        utterance.interval_10_no.text
      ];
      break;
    case 10:
      menu = [
        utterance.interval_11.text,
        utterance.interval_11_yes.text,
        utterance.interval_11_no.text
      ];
      break;
    case 11:
      menu = [
        utterance.interval_12.text,
        utterance.interval_12_yes.text,
        utterance.interval_12_no.text
      ];
      break;
    case 12:
      menu = [
        utterance.interval_13.text,
        utterance.interval_13_yes.text,
        utterance.interval_13_no.text
      ];
      break;
    case 13:
      menu = [
        utterance.interval_14.text,
        utterance.interval_14_yes.text,
        utterance.interval_14_no.text
      ];
      break;
    case 14:
      menu = [
        utterance.interval_15.text,
        utterance.interval_15_yes.text,
        utterance.interval_15_no.text
      ];
      break;
  }
  console.log(`🌲 interval_chat_text : ${menu} 🌲`);
  return menu;
};

const interval_chat_speech = num => {
  var menu = ["", "", ""];
  switch (num) {
    case 0:
      menu = [
        utterance.interval_1.speech,
        utterance.interval_1_yes.speech,
        utterance.interval_1_no.speech
      ];
      break;
    case 1:
      menu = [
        utterance.interval_2.speech,
        utterance.interval_2_yes.speech,
        utterance.interval_2_no.speech
      ];
      break;
    case 2:
      menu = [
        utterance.interval_3.speech,
        utterance.interval_3_yes.speech,
        utterance.interval_3_no.speech
      ];
      break;
    case 3:
      menu = [
        utterance.interval_4.speech,
        utterance.interval_4_yes.speech,
        utterance.interval_4_no.speech
      ];
      break;
    case 4:
      menu = [
        utterance.interval_5.speech,
        utterance.interval_5_yes.speech,
        utterance.interval_5_no.speech
      ];
      break;
    case 5:
      menu = [
        utterance.interval_6.speech,
        utterance.interval_6_yes.speech,
        utterance.interval_6_no.speech
      ];
      break;
    case 6:
      menu = [
        utterance.interval_7.speech,
        utterance.interval_7_yes.speech,
        utterance.interval_7_no.speech
      ];
      break;
    case 7:
      menu = [
        utterance.interval_8.speech,
        utterance.interval_8_yes.speech,
        utterance.interval_8_no.speech
      ];
      break;
    case 8:
      menu = [
        utterance.interval_9.speech,
        utterance.interval_9_yes.speech,
        utterance.interval_9_no.speech
      ];
      break;
    case 9:
      menu = [
        utterance.interval_10.speech,
        utterance.interval_10_yes.speech,
        utterance.interval_10_no.speech
      ];
      break;
    case 10:
      menu = [
        utterance.interval_11.speech,
        utterance.interval_11_yes.speech,
        utterance.interval_11_no.speech
      ];
      break;
    case 11:
      menu = [
        utterance.interval_12.speech,
        utterance.interval_12_yes.speech,
        utterance.interval_12_no.speech
      ];
      break;
    case 12:
      menu = [
        utterance.interval_13.speech,
        utterance.interval_13_yes.speech,
        utterance.interval_13_no.speech
      ];
      break;
    case 13:
      menu = [
        utterance.interval_14.speech,
        utterance.interval_14_yes.speech,
        utterance.interval_14_no.speech
      ];
      break;
    case 14:
      menu = [
        utterance.interval_15.speech,
        utterance.interval_15_yes.speech,
        utterance.interval_15_no.speech
      ];
      break;
  }
  return menu;
};
