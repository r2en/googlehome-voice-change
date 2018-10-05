const texts = require('./prompts').texts;

const message = ['welcome_msg_0_ja', 'welcome_msg_1_ja', 'welcome_msg_2_ja'];

// message[0] fetch array welcome_msg_0_ja
// message[0][0] fetch value welcome_msg_0_ja[0]

const getRandomNum = (array) => {
    return Math.floor(Math.random() * (array.length));
}

const getStaticItem = (message, index) => {
    if (message.length <= index){
        console.log('ERROR: getStatic: return array[0]');
        return message[0];
    } else {
        return message[index];
    }
}

for (var i = 0; i < message.length; i++) {
    var index = getRandomNum(texts[message[i]]);
    console.log(getStaticItem(texts[message[i]], index));
}
