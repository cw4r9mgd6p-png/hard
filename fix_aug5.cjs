const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');
const errIdx = file.indexOf('data: [', 0);
console.log(file.substring(0, 300));
