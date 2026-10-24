const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');
const julIdx = file.indexOf('monthId: "jul-2569"');
const start = file.substring(0, julIdx);
const end = file.substring(julIdx);
console.log(start.substring(start.length - 100));
console.log("----");
console.log(end.substring(0, 200));
