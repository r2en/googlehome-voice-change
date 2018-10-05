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