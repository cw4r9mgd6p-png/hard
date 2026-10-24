const fs = require('fs');
const filePath = 'src/quartersDataLookup.ts';
let code = fs.readFileSync(filePath, 'utf8');

const tpsLogic = (qData) => {
  let map1_1 = 0;
  if (qData.planfinRevenue === "ผ่าน") map1_1 += 1;
  if (qData.planfinExpense === "ผ่าน") map1_1 += 1;

  let map1_2 = 1;
  if (qData.trialBalanceScore >= 200 || qData.trialBalanceScore >= 155) map1_2 = 3;
  else if (qData.trialBalanceScore >= 150 || qData.trialBalanceScore >= 100) map1_2 = 2;
  
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
  
  return { total, grade, map1_1, map1_2, map1_3, map2_1, map2_2 };
};

// We will just evaluate and log it to see if it works
const dataMatches = [...code.matchAll(/"2569Q4":\s*{([^}]+)}/g)];
dataMatches.forEach(match => {
  // Try to parse the object string into a real object
  const objStr = "{" + match[1] + "}";
  try {
     const fn = new Function('return ' + objStr);
     const qData = fn();
     console.log(tpsLogic(qData));
  } catch (e) {
     console.log("parse error");
  }
});
