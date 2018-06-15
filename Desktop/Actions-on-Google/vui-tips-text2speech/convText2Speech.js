// brew install open-jtalk
// node convText2Speech.js sample.txt
// https://uhyohyo.net/javascript/16_5.html

const fs = require('fs');
const exec = require('child_process').exec;

// .txtファイルから一行ずつ読み込む
const readFilePromise = (filePath) => {
    return new Promise((resolve) => {
        fs.readFile(path = filePath, options = {
            encoding: 'utf8'
        }, (err, buffer) => {
            buffer = buffer.split('\n');
            resolve(buffer);
        });
    });
}

// 一行に一個、.txtファイルを生成
const createFilePromise = (fileText) => {
    return new Promise((resolve) => {
        for (var i = 0; i < fileText.length; i++) {
            fs.writeFile(path = 'output' + i + '.txt', fileText[i], (err, buffer) => {
                resolve(fileText);
            });
        }
    });
}

// 全ての.txtファイルから.wavファイルを生成
function execCommandPromise(fileText, input) {
    return new Promise((resolve) => {
        const execSync = require('child_process').execSync;
        const makeDirctory = execSync('mkdir music_material');
        for (var i = 0; i < fileText.length; i++) {
            const execCmd = execSync('open_jtalk -x /usr/local/Cellar/open-jtalk/1.10_1/dic -m /usr/local/Cellar/open-jtalk/1.10_1/voice/mei/mei_normal.htsvoice -ow' + ' ' + 'music_material/output' + i + '.wav' + ' ' + 'output' + i + '.txt');
            //const execPlay = execSync('afplay' + ' ' + 'output' + i +'.wav');
        }
        resolve(fileText);
    });
}

// 全ての.txtファイルを削除
const postProcessingPromise = (fileText) => {
    return new Promise((resolve) => {
        console.log(fileText);
        const execSync = require('child_process').execSync;
        for (var i = 0; i < fileText.length; i++) {
            const execCmd = execSync('rm ' + 'output' + i + '.txt');
        }
    });
}

const input = process.argv[2]

Promise.resolve(input)
    .then(function (result) {
        return readFilePromise(result);
    })
    .then(function (result) {
        return createFilePromise(result);
    })
    .then(function (result) {
        return execCommandPromise(result, input);
    })
    .then(function (result) {
        return postProcessingPromise(result);
    })
    ;