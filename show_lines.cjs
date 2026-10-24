const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');
let lines = file.split('\n');
for (let i = 359; i < 370; i++) {
  console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
}
