/*
 * MasterMind ver1.2.0 Complete Edition
 * add the Game over and add answer count.
 */

'use strict';
var Alexa = require("alexa-sdk");
var appId = ''; //'amzn1.echo-sdk-ams.app.your-skill-id';

/*
 * Sentence
 * Exception
 * emit(argument,argument)
 */

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    //alexa.dynamoDBTableName = 'highLowGuessUsers';
    alexa.registerHandlers(newSessionHandlers, guessModeHandlers, startGameHandlers, guessAttemptHandlers);
    alexa.execute();
};

var states = {
    GUESSMODE: '_GUESSMODE', // User is trying to guess the number.
    STARTMODE: '_STARTMODE'  // Prompt the user to start or restart the game.
};

var newSessionHandlers = {
    'NewSession': function() {
        if(Object.keys(this.attributes).length === 0) {
            this.attributes['endedSessionCount'] = 0;
            this.attributes['gamesPlayed'] = 0;
        }
        this.handler.state = states.STARTMODE;
        this.emit(':ask', 'Welcome to eat and bite game. You have played '
            + this.attributes['gamesPlayed'].toString() + ' times. would you like to play?',
            'Say yes to start the game or no to quit.');
    },
    "AMAZON.StopIntent": function() {
      this.emit(':tell', "Goodbye!");  
    },
    "AMAZON.CancelIntent": function() {
      this.emit(':tell', "Goodbye!");  
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        //this.attributes['endedSessionCount'] += 1;
        this.emit(":tell", "Goodbye!");
    }
};

var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.HelpIntent': function() {
        var message = 'I will think of three-digit number between zero and one nine, try to guess and I will tell you if it' +
            ' is eat or bite. Do you want to start the game?';
        this.emit(':ask', message, message);
    },
    'AMAZON.YesIntent': function() {
        this.attributes['answerCount'] = 0;

        var digit_1 = Math.floor( Math.random() * 10 );
        do{ var digit_2 = Math.floor( Math.random() * 10 ); }while(digit_1 == digit_2)
        do{ var digit_3 = Math.floor( Math.random() * 10 ); }while(digit_1 == digit_3 || digit_2 == digit_3)

        this.attributes["guessDigit_1"] = digit_1;
        this.attributes["guessDigit_2"] = digit_2;
        this.attributes["guessDigit_3"] = digit_3;
        this.handler.state = states.GUESSMODE;
        this.emit(':ask', 'Great! ' + 'Try saying a number to start the game.', 'Try saying a number.');
    },
    'AMAZON.NoIntent': function() {
        console.log("NOINTENT");
        this.emit(':tell', 'Ok, see you next time!');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");  
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");  
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        //this.attributes['endedSessionCount'] += 1;
        this.emit(':tell', "Goodbye!");
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        var message = 'Say yes to continue, or no to end the game.';
        this.emit(':ask', message, message);
    }
});

var guessModeHandlers = Alexa.CreateStateHandler(states.GUESSMODE, {
    'NewSession': function () {
        this.handler.state = '';
        this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
    },
    'NumberGuessIntent': function() {
        var eat = 0; var bite = 0;  
        var guessNumber = parseInt(this.event.request.intent.slots.number.value);
        if(isNaN(guessNumber)){
            this.emit('Exception');
        }else{
            var guessNumber_1 = Math.floor(guessNumber / 100);
            var guessNumber_2 = Math.floor(guessNumber % 100 / 10);
            var guessNumber_3 = Math.floor(guessNumber % 10); 
            if((guessNumber_1 == guessNumber_2) || (guessNumber_2 == guessNumber_3) || (guessNumber_1 == guessNumber_3))
            {
                this.emit(':ask','Numerical value is a duplicate. Please say one more.')
            }
        }

        if(this.attributes['answerCount'] == 9){
            this.emit('gameOver');
        }

        var targetDigit_1 = this.attributes["guessDigit_1"];
        var targetDigit_2 = this.attributes["guessDigit_2"];
        var targetDigit_3 = this.attributes["guessDigit_3"];
        console.log('user guessed: ' + guessNumber);

        if(guessNumber_1 == targetDigit_1)eat++;
        if(guessNumber_2 == targetDigit_2)eat++;
        if(guessNumber_3 == targetDigit_3)eat++;

        if(guessNumber_1 == targetDigit_2 || guessNumber_1 == targetDigit_3)bite++;
        if(guessNumber_2 == targetDigit_1 || guessNumber_2 == targetDigit_3)bite++;
        if(guessNumber_3 == targetDigit_1 || guessNumber_3 == targetDigit_2)bite++;

        if(eat == 3){
            this.emit('JustRight', () => {
                this.emit(':ask', guessNumber_1.toString() + guessNumber_2.toString() + guessNumber_3.toString() +
                 ' is correct! You answerd correctly in ' + this.attributes['answerCount'].toString() +
                ' times. Would you like to play a new game?','Say yes to start a new game, or no to end the game.');
            })
        }else if((eat > 0) && (bite >0)){
            this.emit('Both', eat, bite);
        }else if((eat > 0) && (bite == 0)){
            this.emit('OnlyEat',eat);
        }else if((bite > 0) && (eat == 0)){           
            this.emit('OnlyBite',bite);
        }else if((eat == 0)&&(bite == 0)){
            this.emit('NoHit');
        }
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', 'I am thinking of three-digit number between zero and nine, try to guess and I will tell you' +
            ' if it is eat or bite.', 'Try saying a number.');
    },
    "AMAZON.StopIntent": function() {
        console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");  
    },
    "AMAZON.CancelIntent": function() {
        console.log("CANCELINTENT");
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        this.attributes['endedSessionCount'] += 1;
        this.emit(':tell', "Goodbye!");
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }
});

// These handlers are not bound to a state
var guessAttemptHandlers = {
    'OnlyEat': function(eat) {
        this.attributes['answerCount']++;
        this.emit(':ask', eat.toString() + ' Eat.', 'Try saying a number.');
    },
    'OnlyBite': function(bite) {
        this.attributes['answerCount']++;
        this.emit(':ask', bite.toString() + ' Bite.', 'Try saying a number.');
    },
    'JustRight': function(callback) {
        this.handler.state = states.STARTMODE;
        this.attributes['gamesPlayed']++;
        callback();
    },
    'gameOver': function(){
        this.handler.state = states.STARTMODE;
        this.emit(':ask','You could not guess the numbers within ten times and I am the winner.'
         , 'would you like to play? Say yes to start the game.');
    },
    'NoHit': function() {
        this.attributes['answerCount']++;
        this.emit(':ask', 'No Hit. Try saying a number.', 'Try saying a number.');
    },
    'Both': function(eat, bite){
        this.attributes['answerCount']++;
        this.emit(':ask', eat.toString() + ' Eat.' + bite.toString() + 'Bite.', 'Try saying a number.');
    },
    'Exception': function(){
        this.emit(':ask', 'I think you say incorrect numerical value.', 'Try saying a number.');
    }
};