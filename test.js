const fs = require('fs');
console.log(fs.readFileSync('src/data.ts', 'utf8').includes('aug-2569'));
