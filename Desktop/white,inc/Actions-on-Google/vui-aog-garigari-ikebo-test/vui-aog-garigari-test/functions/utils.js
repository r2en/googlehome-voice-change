const ssml = require('ssml-builder');
const text = require('./prompts').text;
const voice = require('./prompts').voice;
const flow_main_text = require('./prompts').flow_main_text;
const flow_main_voice = require('./prompts').flow_main_voice;
const flow_yes_text = require('./prompts').flow_yes_text;
const flow_yes_voice = require('./prompts').flow_yes_voice;
const flow_no_text = require('./prompts').flow_no_text;
const flow_no_voice = require('./prompts').flow_no_voice;
const suggestion = require('./prompts').suggestion;
const response = require('./prompts').response;
const HOSTING = require('./defines').HOSTING;

const flow_quit_text = require('./prompts').flow_quit_text;
const flow_quit_voice = require('./prompts').flow_quit_voice;
const flow_noinput_text = require('./prompts').flow_noinput_text;
const flow_noinput_voice = require('./prompts').flow_noinput_voice;
const flow_unknown_text = require('./prompts').flow_unknown_text;
const flow_unknown_voice = require('./prompts').flow_unknown_voice;
const flow_help_text = require('./prompts').flow_help_text;
const flow_help_voice = require('./prompts').flow_help_voice;
const flow_goal_text = require('./prompts').flow_goal_text;
const flow_goal_voice = require('./prompts').flow_goal_voice;
const flow_another_text = require('./prompts').flow_another_text;
const flow_another_voice = require('./prompts').flow_another_voice;
const flow_reprompt_text = require('./prompts').flow_reprompt_text;
const flow_reprompt_voice = require('./prompts').flow_reprompt_voice;
const flow_revisited_text = require('./prompts').flow_revisited_text;
const flow_revisited_voice = require('./prompts').flow_revisited_voice;

const flow_level1_text = require('./prompts').flow_level1_text;
const flow_level1_voice = require('./prompts').flow_level1_voice;
const flow_level2_text = require('./prompts').flow_level2_text;
const flow_level2_voice = require('./prompts').flow_level2_voice;
const flow_level3_text = require('./prompts').flow_level3_text;
const flow_level3_voice = require('./prompts').flow_level3_voice;

const flow_love_text = require('./prompts').flow_love_text;
const flow_love_voice = require('./prompts').flow_love_voice;
const flow_fashion_text = require('./prompts').flow_fashion_text;
const flow_fashion_voice = require('./prompts').flow_fashion_voice;
const flow_meetyou_text = require('./prompts').flow_meetyou_text;
const flow_meetyou_voice = require('./prompts').flow_meetyou_voice;
const flow_anotherquestion_text = require('./prompts').flow_anotherquestion_text;
const flow_anotherquestion_voice = require('./prompts').flow_anotherquestion_voice;

const flow_morning_text = require('./prompts').flow_morning_text;
const flow_morning_voice = require('./prompts').flow_morning_voice;
const flow_evening_text = require('./prompts').flow_evening_text;
const flow_evening_voice = require('./prompts').flow_evening_voice;
const flow_night_text = require('./prompts').flow_night_text;
const flow_night_voice = require('./prompts').flow_night_voice;
//const flow_goodnight_text = require('./prompts').flow_goodnight_text;
//const flow_goodnight_voice = require('./prompts').flow_goodnight_voice;

const flow_random_naruse_text = require('./prompts').flow_random_naruse_text;
const flow_random_naruse_voice = require('./prompts').flow_random_naruse_voice;

const flow_random_suki_text = require('./prompts').flow_random_suki_text;
const flow_random_suki_voice = require('./prompts').flow_random_suki_voice;

const flow_random_type_text = require('./prompts').flow_random_type_text;
const flow_random_type_voice = require('./prompts').flow_random_type_voice;

const flow_random_kitsui_text = require('./prompts').flow_random_kitsui_text;
const flow_random_kitsui_voice = require('./prompts').flow_random_kitsui_voice;
    
const flow_random_yasashiku_text = require('./prompts').flow_random_yasashiku_text;
const flow_random_yasashiku_voice = require('./prompts').flow_random_yasashiku_voice;
    
const flow_random_homete_text = require('./prompts').flow_random_homete_text;
const flow_random_homete_voice = require('./prompts').flow_random_homete_voice;
    
const flow_random_eguchi_text = require('./prompts').flow_random_eguchi_text;
const flow_random_eguchi_voice = require('./prompts').flow_random_eguchi_voice;
    
const flow_random_curry_text = require('./prompts').flow_random_curry_text;
const flow_random_curry_voice = require('./prompts').flow_random_curry_voice;
    
const flow_random_s_text = require('./prompts').flow_random_s_text;
const flow_random_s_voice = require('./prompts').flow_random_s_voice;

const flow_random_peko_text = require('./prompts').flow_random_peko_text;
const flow_random_peko_voice = require('./prompts').flow_random_peko_voice;
    
const flow_random_jishin_text = require('./prompts').flow_random_jishin_text;
const flow_random_jishin_voice = require('./prompts').flow_random_jishin_voice;
    
const flow_random_itai_text = require('./prompts').flow_random_itai_text;
const flow_random_itai_voice = require('./prompts').flow_random_itai_voice;
    
const flow_random_baka_text = require('./prompts').flow_random_baka_text;
const flow_random_baka_voice = require('./prompts').flow_random_baka_voice;
    
const flow_random_ikemen_text = require('./prompts').flow_random_ikemen_text;
const flow_random_ikemen_voice = require('./prompts').flow_random_ikemen_voice;
    
const flow_random_yasumi_text = require('./prompts').flow_random_yasumi_text;
const flow_random_yasumi_voice = require('./prompts').flow_random_yasumi_voice;

const flow_sameday_text = require('./prompts').flow_sameday_text;
const flow_sameday_voice = require('./prompts').flow_sameday_voice;

const flow_nextday_text = require('./prompts').flow_nextday_text;
const flow_nextday_voice = require('./prompts').flow_nextday_voice;

const flow_afterday_text = require('./prompts').flow_afterday_text;
const flow_afterday_voice = require('./prompts').flow_afterday_voice;

const flow_sameday_yes_text = require('./prompts').flow_sameday_yes_text;
const flow_sameday_yes_voice = require('./prompts').flow_sameday_yes_voice;

const flow_nextday_yes_text = require('./prompts').flow_nextday_yes_text;
const flow_nextday_yes_voice = require('./prompts').flow_nextday_yes_voice;

const flow_afterday_yes_text = require('./prompts').flow_afterday_yes_text;
const flow_afterday_yes_voice = require('./prompts').flow_afterday_yes_voice;

const flow_sameday_no_text = require('./prompts').flow_sameday_no_text;
const flow_sameday_no_voice = require('./prompts').flow_sameday_no_voice;

const flow_nextday_no_text = require('./prompts').flow_nextday_no_text;
const flow_nextday_no_voice = require('./prompts').flow_nextday_no_voice;

const flow_afterday_no_text = require('./prompts').flow_afterday_no_text;
const flow_afterday_no_voice = require('./prompts').flow_afterday_no_voice;

const flow_before_week_text = require('./prompts').flow_before_week_text;
const flow_before_week_voice = require('./prompts').flow_before_week_voice;

const flow_after_week_text = require('./prompts').flow_afterday_week_text;
const flow_after_week_voice = require('./prompts').flow_afterday_week_voice;

const monday_level1_text = require('./prompts').monday_level1_text;
const monday_level1_voice = require('./prompts').monday_level1_voice;

const tuesday_level1_text = require('./prompts').tuesday_level1_text;
const tuesday_level1_voice = require('./prompts').tuesday_level1_voice;

const wednesday_level1_text = require('./prompts').wednesday_level1_text;
const wednesday_level1_voice = require('./prompts').wednesday_level1_voice;

const thursday_level1_text = require('./prompts').thursday_level1_text;
const thursday_level1_voice = require('./prompts').thursday_level1_voice;

const friday_level1_text = require('./prompts').friday_level1_text;
const friday_level1_voice = require('./prompts').friday_level1_voice;
                    
const saturday_level1_text = require('./prompts').saturday_level1_text;
const saturday_level1_voice = require('./prompts').saturday_level1_voice;

const sunday_level1_text = require('./prompts').sunday_level1_text;
const sunday_level1_voice = require('./prompts').sunday_level1_voice;

const monday_level2_text = require('./prompts').monday_level2_text;
const monday_level2_voice = require('./prompts').monday_level2_voice;

const tuesday_level2_text = require('./prompts').tuesday_level2_text;
const tuesday_level2_voice = require('./prompts').tuesday_level2_voice;

const wednesday_level2_text = require('./prompts').wednesday_level2_text;
const wednesday_level2_voice = require('./prompts').wednesday_level2_voice;

const thursday_level2_text = require('./prompts').thursday_level2_text;
const thursday_level2_voice = require('./prompts').thursday_level2_voice;

const friday_level2_text = require('./prompts').friday_level2_text;
const friday_level2_voice = require('./prompts').friday_level2_voice;
                    
const saturday_level2_text = require('./prompts').saturday_level2_text;
const saturday_level2_voice = require('./prompts').saturday_level2_voice;

const sunday_level2_text = require('./prompts').sunday_level2_text;
const sunday_level2_voice = require('./prompts').sunday_level2_voice;

const monday_level3_text = require('./prompts').monday_level3_text;
const monday_level3_voice = require('./prompts').monday_level3_voice;

const tuesday_level3_text = require('./prompts').tuesday_level3_text;
const tuesday_level3_voice = require('./prompts').tuesday_level3_voice;

const wednesday_level3_text = require('./prompts').wednesday_level3_text;
const wednesday_level3_voice = require('./prompts').wednesday_level3_voice;

const thursday_level3_text = require('./prompts').thursday_level3_text;
const thursday_level3_voice = require('./prompts').thursday_level3_voice;

const friday_level3_text = require('./prompts').friday_level3_text;
const friday_level3_voice = require('./prompts').friday_level3_voice;
                    
const saturday_level3_text = require('./prompts').saturday_level3_text;
const saturday_level3_voice = require('./prompts').saturday_level3_voice;

const sunday_level3_text = require('./prompts').sunday_level3_text;
const sunday_level3_voice = require('./prompts').sunday_level3_voice;

const oneday = 86400
const twoday = 172800
const oneweek = 604800

const branchChange = (visit_count) => {
    if(visit_count === 0){
        context = 'MainContext';
    } else if (visit_count === 1){
        context = 'RevisitedContext';
    }
    return context;
}

// contextのyes, noが今後richなレスポンスを返す必要があり、ここで設定する可能性あり。
const getContextSwitch = (conv, context, stage_count) => {
    var text = '';
    var voice = '';
    lastlogin = conv.data.lastlogin;
    if (context === 'MainContext') {
        //lastContextを毎回書き換える必要性あり
        /*if((conv.data.lastContext === 'SameDayContext' || conv.data.lastContext === 'NextDayContext' || conv.data.lastContext === 'AfterDayContext') && lastlogin <= 604800){
            console.log(`🌲🌲🌲 MainContext 1週間以内 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_before_week_text;
            voice = flow_before_week_voice;
        } else if(conv.data.lastContext === 'AfterDayContext' && 604800 < lastlogin){
            console.log(`🌲🌲🌲 MainContext 1週間以上 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_after_week_text;
            voice = flow_after_week_voice;
        } else {
            console.log(`🌲🌲🌲 MainContext 初回起動 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_main_text;
            voice = flow_main_voice;             
        }*/

        text = flow_main_text;
        voice = flow_main_voice;

       /*
        if(stage_count === 5) {
            console.log('トレーニングパート1');
        } else if (stage_count === 7) {
            console.log('トレーニングパート2');
        } else if (stage_count === 8) {
            console.log('トレーニングパート3');
        }
        conv.data.level = 1;
       // conv.data.level = get.argument('level');
       var level = conv.data.level;
       var day = conv.data.day;
       else if (level === '初級'){
            switch(day){
                case 0:
                    console.log(`🌲🌲🌲 月曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = monday_level1_text;
                    voice = monday_level1_voice;
                    break;
                case 1:
                    console.log(`🌲🌲🌲 火曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = tuesday_level1_text;
                    voice = tuesday_level1_voice;
                    break;
                case 2:
                    console.log(`🌲🌲🌲 水曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = wednesday_level1_text;
                    voice = wednesday_level1_voice;
                    break;
                case 3:
                    console.log(`🌲🌲🌲 木曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = thursday_level1_text;
                    voice = thursday_level1_voice;
                    break;                
                case 4:
                    console.log(`🌲🌲🌲 金曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = friday_level1_text;
                    voice = friday_level1_voice;
                    break;
                case 5:
                    console.log(`🌲🌲🌲 土曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = saturday_level1_text;
                    voice = saturday_level1_voice;
                    break;
                case 6:
                    console.log(`🌲🌲🌲 日曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = sunday_level1_text;
                    voice = sunday_level1_voice;
                    break;
            }
       } else if (level === '中級'){
            switch(day){
                case 0:
                    console.log(`🌲🌲🌲 月曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = monday_level2_text;
                    voice = monday_level2_voice;
                    break;
                case 1:
                    console.log(`🌲🌲🌲 火曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = tuesday_level2_text;
                    voice = tuesday_level2_voice;
                    break;
                case 2:
                    console.log(`🌲🌲🌲 水曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = wednesday_level2_text;
                    voice = wednesday_level2_voice;
                    break;
                case 3:
                    console.log(`🌲🌲🌲 木曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = thursday_level2_text;
                    voice = thursday_level2_voice;
                    break;                
                case 4:
                    console.log(`🌲🌲🌲 金曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = friday_level2_text;
                    voice = friday_level2_voice;
                    break;
                case 5:
                    console.log(`🌲🌲🌲 土曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = saturday_level2_text;
                    voice = saturday_level2_voice;
                    break;
                case 6:
                    console.log(`🌲🌲🌲 日曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = sunday_level2_text;
                    voice = sunday_level2_voice;
                    break;
            }
       } else if (level === '上級'){
            switch(day){
                case 0:
                    console.log(`🌲🌲🌲 月曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = monday_level3_text;
                    voice = monday_level3_voice;
                    break;
                case 1:
                    console.log(`🌲🌲🌲 火曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = tuesday_level3_text;
                    voice = tuesday_level3_voice;
                    break;
                case 2:
                    console.log(`🌲🌲🌲 水曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = wednesday_level3_text;
                    voice = wednesday_level3_voice;
                    break;
                case 3:
                    console.log(`🌲🌲🌲 木曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = thursday_level3_text;
                    voice = thursday_level3_voice;
                    break;                
                case 4:
                    console.log(`🌲🌲🌲 金曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = friday_level3_text;
                    voice = friday_level3_voice;
                    break;
                case 5:
                    console.log(`🌲🌲🌲 土曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = saturday_level3_text;
                    voice = saturday_level3_voice;
                    break;
                case 6:
                    console.log(`🌲🌲🌲 日曜日 : ${conv.data.level} : ${conv.data.day} 🌲🌲🌲`);
                    text = sunday_level3_text;
                    voice = sunday_level3_voice;
                    break;
            }
       }
       */
    } else if (context === 'YesContext') {
        if(conv.data.lastContext === 'SameDayContext'){
            console.log(`🌲🌲🌲 YesContext内 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_sameday_yes_text;
            voice = flow_sameday_yes_voice;
        } else if(conv.data.lastContext === 'NextDayContext'){
            console.log(`🌲🌲🌲 YesContext内 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_nextday_yes_text;
            voice = flow_nextday_yes_voice;  
        } else if(conv.data.lastContext === 'AfterDayContext'){
            console.log(`🌲🌲🌲 YesContext内 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_afterday_yes_text;
            voice = flow_afterday_yes_voice;  
        } else {
            console.log(`🌲🌲🌲 YesContext内 ${conv.data.lastContext} 🌲🌲🌲`);
            text = flow_yes_text;
            voice = flow_yes_voice;            
        }
    } else if (context === 'NoContext') {
        if(conv.data.lastContext === 'SameDayContext'){
            text = flow_sameday_no_text;
            voice = flow_sameday_no_voice;
        } else if(conv.data.lastContext === 'NextDayContext'){
            text = flow_nextday_no_text;
            voice = flow_nextday_no_voice;  
        } else if(conv.data.lastContext === 'AfterDayContext'){
            text = flow_afterday_no_text;
            voice = flow_afterday_no_voice;  
        } else {
            text = flow_yes_text;
            voice = flow_yes_voice;            
        }
    } else if (context === 'QuitContext'){
        text = flow_quit_text;
        voice = flow_quit_voice;
    } else if (context === 'NoinputContext'){
        text = flow_noinput_text;
        voice = flow_noinput_voice;
    } else if (context === 'UnknownContext'){
        text = flow_unknown_text;
        voice = flow_unknown_voice;
    } else if (context === 'HelpContext'){
        text = flow_help_text;
        voice = flow_help_voice;
    } else if (context === 'GoalContext'){
        text = flow_goal_text;
        voice = flow_goal_voice;
    }  else if (context === 'AnotherContext'){
        text = flow_another_text;
        voice = flow_another_voice;
    }  else if (context === 'RepromptContext'){
        text = flow_reprompt_text;
        voice = flow_reprompt_voice;
    }  else if (context === 'RevisitedContext'){
        text = flow_revisited_text;
        voice = flow_revisited_voice;
    } else if (context === 'Level1Context'){
        text = flow_level1_text;
        voice = flow_level1_voice;
    } else if (context === 'Level2Context'){
        text = flow_level2_text;
        voice = flow_level2_voice;
    } else if (context === 'Level3Context'){
        text = flow_level3_text;
        voice = flow_level3_voice;
    } else if (context === 'LoveContext'){
        text = flow_love_text;
        voice = flow_love_voice;
    } else if (context === 'FashionContext'){
        text = flow_fashion_text;
        voice = flow_fashion_voice;
    } else if (context === 'MeetyouContext'){
        text = flow_meetyou_text;
        voice = flow_meetyou_voice;
    } else if (context === 'AnotherQuestionContext'){
        text = flow_anotherquestion_text;
        voice = flow_anotherquestion_voice;
    } else if (context === 'MorningContext') {
        text = flow_morning_text;
        voice = flow_morning_voice;
    } else if (context === 'EveningContext') {
        text = flow_evening_text;
        voice = flow_evening_voice;
    } else if (context === 'NightContext') {
        text = flow_night_text;
        voice = flow_night_voice;
    } else if (context === 'RandomNaruseContext') {
        text = flow_random_naruse_text;
        voice = flow_random_naruse_voice;
    } else if (context === 'RandomSukiContext') {
        text = flow_random_suki_text;
        voice = flow_random_suki_voice;
    } else if (context === 'RandomTypeContext') {
        text = flow_random_type_text;
        voice = flow_random_type_voice;
    } else if (context === 'RandomKitsuiContext') {
        text = flow_random_kitsui_text;
        voice = flow_random_kitsui_voice;
    } else if (context === 'RandomYasashikuContext') {
        text = flow_random_yasashiku_text;
        voice = flow_random_yasashiku_voice;
    } else if (context === 'RandomHometeContext') {
        text = flow_random_homete_text;
        voice = flow_random_homete_voice;
    } else if (context === 'RandomEguchiContext') {
        text = flow_random_eguchi_text;
        voice = flow_random_eguchi_voice;
    } else if (context === 'RandomCurryContext') {
        text = flow_random_curry_text;
        voice = flow_random_curry_voice;
    } else if (context === 'RandomSContext') {
        text = flow_random_s_text;
        voice = flow_random_s_voice;
    } else if (context === 'RandomPekoContext') {
        text = flow_random_peko_text;
        voice = flow_random_peko_voice;
    } else if (context === 'RandomJishinContext') {
        text = flow_random_jishin_text;
        voice = flow_random_jishin_voice;
    } else if (context === 'RandomItaiContext') {
        text = flow_random_itai_text;
        voice = flow_random_itai_voice;
    } else if (context === 'RandomBakaContext') {
        text = flow_random_baka_text;
        voice = flow_random_baka_voice;
    } else if (context === 'RandomIkemenContext') {
        text = flow_random_ikemen_text;
        voice = flow_random_ikemen_voice;
    } else if (context === 'RandomYasumiContext') {
        text = flow_random_yasumi_text;
        voice = flow_random_yasumi_voice;
    } else if (context === 'SameDayContext'){
        text = flow_sameday_text;
        voice = flow_sameday_voice; 
    } else if (context === 'NextDayContext'){
        text = flow_nextday_text;
        voice = flow_nextday_voice;
    } else if (context === 'AfterDayContext'){
        text = flow_afterday_text;
        voice = flow_afterday_voice;
    }/* else if (context === 'GoodNightContext') {
        text = flow_goodnight_text;
        voice = flow_goodnight_voice;
    }*/
    var object = {
        text: text,
        voice: voice,
    }
    return object;
}

const selectStage = (conv, stage_count, type_info, context, argument) => {
    var type_list = '';
    var object = getContextSwitch(conv, context, stage_count);

    for (var i = 0; i < Object.keys(object['text']).length; i++) {
        if (stage_count === i) {
            console.log('type_infoも原因かもしれない : ' + type_info);
            if(type_info === 'display') {
                type_list = object['text']['stage' + i];
            } else if (type_info === 'voice'){
                type_list = object['voice']['stage' + i];
            } else if(type_info === 'suggestion'){
                type_list = suggestion['stage' + i];
            } else if(type_info === 'response'){
                type_list = response['stage' + i];
            }
        }
    }
    return type_list;
}

const constructDisplaySSML = (message) => {
    displayArray = '';
    for (var i = 0; i < message.length; i++) {
        var index = getRandomNum(text[message[i]]);
        displayArray += getStaticItem(text[message[i]], index) + '  \n';
    }
    return displayArray;
}

const constructVoiceSSML = (conv, message) => {
    var speech = new ssml();
    var pauseTime = '0.5s';
    for (var i = 0; i < message.length; i++) {
        var index = getRandomNum(voice[message[i]]);
        var audioURL = HOSTING.AUDIO_URL + getStaticItem(voice[message[i]], index)
        speech.audio(audioURL);
        speech.pause(pauseTime);
        console.log('audioURL: ', audioURL);
    }
    return speech.ssml();
}

const getRandomNum = (array) => {
    return Math.floor(Math.random() * (array.length));
}

const getStaticItem = (message, index) => {
    if (message.length <= index) {
        console.log('ERROR: getStatic: return message[0]');
        return message[0];
    } else {
        return message[index];
    }
}


module.exports = {
    branchChange: branchChange,
    selectStage: selectStage,
    getRandomNum: getRandomNum,
    getStaticItem: getStaticItem,
    getContextSwitch: getContextSwitch,
    constructDisplaySSML: constructDisplaySSML,
    constructVoiceSSML: constructVoiceSSML
};