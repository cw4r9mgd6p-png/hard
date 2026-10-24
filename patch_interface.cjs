const fs = require('fs');
const filePath = 'src/financialDiagnosticsData.ts';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(
  /trialBalanceCheck:.*?;/,
  (match) => `${match}\n  trialBalanceScore?: number;`
);

code = code.replace(
  /trialBalanceCheck:.*?,/,
  (match) => `${match}\n      trialBalanceScore: rawVal?.trialBalanceScore ?? 0,`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Interface patched correctly.');
