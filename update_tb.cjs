const fs = require('fs');
let file = fs.readFileSync('src/quartersDataLookup.ts', 'utf8');

const tbScores = {
  "10737": 154,
  "11315": 159.5,
  "11316": 154.5,
  "11317": 153,
  "11318": 160.5,
  "11319": 157,
  "11320": 153.8,
  "11321": 160.5
};

file = file.replace(/  acpSssDays\?: number;\n  aipDays: number;/, "  acpSssDays\?: number;\n  aipDays: number;\n  trialBalanceScore\?: number;");

for (const [id, score] of Object.entries(tbScores)) {
  const blockRegex = new RegExp(`("${id}": \\{[\\s\\S]*?\\})`);
  const match = file.match(blockRegex);
  if (match) {
    let block = match[1];
    block = block.replace(/"2569Q3": \{ ([^}]+) \}/, `"2569Q3": { $1, trialBalanceScore: ${score} }`);
    file = file.replace(match[1], block);
  }
}

fs.writeFileSync('src/quartersDataLookup.ts', file);
console.log('Updated src/quartersDataLookup.ts with trialBalanceScore');
