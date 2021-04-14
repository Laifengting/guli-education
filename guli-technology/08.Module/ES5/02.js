// // 调用 01.js 里面的方法
//引入模块，注意：当前路径必须写 ./
const m = require('./01.js')
console.log(m);

// 调用
const result1 = m.sum(1, 2);
const result2 = m.subtract(1, 2);
console.log(result1, result2);