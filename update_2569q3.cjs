const fs = require('fs');
let file = fs.readFileSync('src/quartersDataLookup.ts', 'utf8');

file = file.replace(/  acpCsDays: number;\n  aipDays: number;/, "  acpCsDays: number;\n  acpSssDays?: number;\n  aipDays: number;");

const newData = {
  "10737": `"2569Q3": { cr: 1.94, qr: 1.72, cash: 0.76, nwc: 165030722.08, netIncome: 65648673.35, ebitda: 84895389.09, unencumberedFund: -43162374.31, appDays: 115, acpUcDays: 124, acpCsDays: 72, acpSssDays: 243, aipDays: 51, riskScore: 1 }`,
  "11315": `"2569Q3": { cr: 4.98, qr: 4.80, cash: 4.08, nwc: 48048416.50, netIncome: 2421182.89, ebitda: 3874399.73, unencumberedFund: 37177527.88, appDays: 73, acpUcDays: 125, acpCsDays: 68, acpSssDays: 476, aipDays: 70, riskScore: 0 }`,
  "11316": `"2569Q3": { cr: 2.19, qr: 2.08, cash: 1.31, nwc: 21891911.87, netIncome: -2025055.01, ebitda: -313760.54, unencumberedFund: 5730472.29, appDays: 122, acpUcDays: 123, acpCsDays: 57, acpSssDays: 356, aipDays: 57, riskScore: 1 }`,
  "11317": `"2569Q3": { cr: 1.78, qr: 1.65, cash: 0.96, nwc: 87535308.49, netIncome: 7978051.64, ebitda: 35487096.90, unencumberedFund: -4652133.52, appDays: 178, acpUcDays: 118, acpCsDays: 58, acpSssDays: 270, aipDays: 51, riskScore: 0 }`,
  "11318": `"2569Q3": { cr: 1.27, qr: 1.08, cash: 0.63, nwc: 5662230.28, netIncome: 3691246.64, ebitda: 9384306.80, unencumberedFund: -7703790.61, appDays: 115, acpUcDays: 105, acpCsDays: 57, acpSssDays: 256, aipDays: 68, riskScore: 2 }`,
  "11319": `"2569Q3": { cr: 4.12, qr: 3.86, cash: 2.83, nwc: 99855969.60, netIncome: -4752284.14, ebitda: 1379926.78, unencumberedFund: 58400096.94, appDays: 79, acpUcDays: 304, acpCsDays: 69, acpSssDays: 250, aipDays: 79, riskScore: 1 }`,
  "11320": `"2569Q3": { cr: 3.61, qr: 3.10, cash: 1.69, nwc: 602015117.85, netIncome: -50904812.47, ebitda: 15025966.13, unencumberedFund: 158688608.92, appDays: 82, acpUcDays: 186, acpCsDays: 62, acpSssDays: 166, aipDays: 92, riskScore: 1 }`,
  "11321": `"2569Q3": { cr: 14.14, qr: 13.61, cash: 12.18, nwc: 181550820.57, netIncome: -944780.80, ebitda: 8049693.10, unencumberedFund: 154392624.36, appDays: 69, acpUcDays: 91, acpCsDays: 54, acpSssDays: 285, aipDays: 70, riskScore: 1 }`
};

for (const [id, line] of Object.entries(newData)) {
  const regex = new RegExp(`"2569Q3":\\s*\\{[^}]+\\}`);
  // we need to make sure we only replace the line for the specific hospital ID
  // wait, the regex will replace the first occurrence it finds
  // let's split the file by hospital blocks
  const blockRegex = new RegExp(`("${id}": \\{[\\s\\S]*?\\})`);
  const match = file.match(blockRegex);
  if (match) {
    const updatedBlock = match[1].replace(/"2569Q3":\s*\{[^}]+\}/, line);
    file = file.replace(match[1], updatedBlock);
  }
}

fs.writeFileSync('src/quartersDataLookup.ts', file);
console.log('Updated src/quartersDataLookup.ts');
