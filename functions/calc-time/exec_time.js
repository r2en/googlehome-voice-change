const execSync = require('child_process').execSync;

for(var i = 0; i < 3; i++){
    const result =  execSync('node time_check.js').toString();
    console.log(result)
};