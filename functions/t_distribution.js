
var free = 30
var sample_standard_deviation =  839.5536671351033
var sample_mean =  3846.8

left_hand = sample_mean - (2.042 * sample_standard_deviation / Math.sqrt(free - 1));
right_hand = sample_mean - (-2.042 * sample_standard_deviation / Math.sqrt(free - 1));
console.log(left_hand + ' < T < ' + right_hand);
