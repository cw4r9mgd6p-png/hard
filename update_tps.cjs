const fs = require('fs');
const filePath = 'src/quartersDataLookup.ts';
let code = fs.readFileSync(filePath, 'utf8');

const tpsLogic = (qData) => {
  let map1_1 = 0;
  if (qData.planfinRevenue === "ผ่าน") map1_1 += 1;
  if (qData.planfinExpense === "ผ่าน") map1_1 += 1;

  let map1_2 = 1;
  if (qData.trialBalanceScore >= 155) map1_2 = 3;
  else if (qData.trialBalanceScore >= 100) map1_2 = 2;
  
  let map1_3 = 0;
  if (qData.unitCostOp === "ผ่าน") map1_3 += 1;
  if (qData.unitCostIp === "ผ่าน") map1_3 += 1;
  if (qData.lcLabor === "ไม่เกินHGR") map1_3 += 1;
  if (qData.mcDrug === "ไม่เกินHGR") map1_3 += 1;
  if (qData.mcSupply === "ไม่เกินHGR") map1_3 += 1;

  let map2_1 = 1;
  if (qData.netIncome > 0) map2_1 = 3;
  else if (qData.netIncome > -5000000) map2_1 = 2;

  let map2_2 = 0;
  if (qData.cr >= 1.5) map2_2 = 2;
  else if (qData.cr >= 1.0) map2_2 = 1;

  const total = map1_1 + map1_2 + map1_3 + map2_1 + map2_2;
  let grade = "C";
  if (total >= 13) grade = "A";
  else if (total >= 11) grade = "B";
  else if (total >= 9) grade = "C";
  else if (total >= 7) grade = "D";
  else grade = "E";
  
  return { total, grade };
};

// Process each hospital
code = code.replace(/("2569Q4":\s*{)([^}]+)(})/g, (match, prefix, content, suffix) => {
  try {
     const fn = new Function('return {' + content + '}');
     const qData = fn();
     const { total, grade } = tpsLogic(qData);
     
     // Update tpsScore and tpsGrade in the content
     let newContent = content.replace(/tpsScore:\s*[\d.]+/, `tpsScore: ${total}`);
     newContent = newContent.replace(/tpsGrade:\s*"[^"]+"/, `tpsGrade: "${grade}"`);
     
     return prefix + newContent + suffix;
  } catch (e) {
     return match;
  }
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('TPS scores and grades updated in data file for Q4.');
