const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');

const augStart = file.lastIndexOf('{', file.lastIndexOf('monthId: "aug-2569"'));
const augEnd = file.lastIndexOf('];');

file = file.substring(0, file.lastIndexOf(' applied: false', augStart)) + "    applied: false\n  }\n];";
fs.writeFileSync('src/data.ts', file);
