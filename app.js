const tf = require("@tensorflow/tfjs-node");

const t = tf.zeros([5, 5, 5, 5]);
const f = tf.reshape(t, [125, -1]);
console.log(f.arraySync());
