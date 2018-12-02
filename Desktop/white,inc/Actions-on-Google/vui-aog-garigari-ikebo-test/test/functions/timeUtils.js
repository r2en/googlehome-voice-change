'use strict';

var moment = require('moment');
const DATE_FORMATTER = 'YYYY-MM-DD HH:mm:ss';

const getNowDate = () => {
    // moment()だとどうも標準時が返ってくるので日本時間に変更するため「9時間」を追加している
    var date = moment().add(9, 'hours').format(DATE_FORMATTER);
    return date;
};

module.exports = {
    DATE_FORMATTER: DATE_FORMATTER,
    getNowDate: getNowDate
};