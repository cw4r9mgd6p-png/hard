const fs = require('fs');
const filePath = 'src/planFinReportData.ts';
let code = fs.readFileSync(filePath, 'utf8');

const julyData = {
  "10737": { revPlan: 542083333.32, revAct: 536676396.02, expPlan: 700912083.28, expAct: 669307322.05 },
  "11315": { revPlan: 64155209.57, revAct: 62891887.90, expPlan: 107433797.05, expAct: 107718409.42 },
  "11316": { revPlan: 82519193.32, revAct: 75779968.53, expPlan: 127425182.52, expAct: 129543585.86 },
  "11317": { revPlan: 288608004.57, revAct: 265369145.02, expPlan: 397505700.17, expAct: 397753185.98 },
  "11318": { revPlan: 59149343.31, revAct: 57752913.83, expPlan: 94152771.36, expAct: 95724610.87 },
  "11319": { revPlan: 100231210.47, revAct: 96377189.44, expPlan: 152976372.55, expAct: 156520978.79 },
  "11320": { revPlan: 863743908.28, revAct: 849307104.76, expPlan: 1211827505.28, expAct: 1146014801.63 },
  "11321": { revPlan: 106567157.47, revAct: 105828114.01, expPlan: 158606191.87, expAct: 162430629.75 }
};

Object.keys(julyData).forEach(codeStr => {
  const data = julyData[codeStr];
  
  // Find where timeId: "256905" is for this hospital
  const hospitalStart = code.indexOf(`hospitalCode: "${codeStr}"`);
  if (hospitalStart !== -1) {
    const nextHospitalStart = code.indexOf('hospitalCode:', hospitalStart + 10);
    const searchArea = nextHospitalStart !== -1 ? code.substring(hospitalStart, nextHospitalStart) : code.substring(hospitalStart);
    
    // Find the 256905 block
    const mayMatch = searchArea.match(/timeId:\s*"256905"[\s\S]*?rows:\s*\[\]\s*\}/);
    if (mayMatch) {
      const mayBlock = mayMatch[0];
      
      // Duplicate for 256906
      const juneBlock = mayBlock
        .replace('256905', '256906')
        .replace('พฤษภาคม', 'มิถุนายน');
        
      // Duplicate for 256907 and replace values
      const julyBlock = mayBlock
        .replace('256905', '256907')
        .replace('พฤษภาคม', 'กรกฎาคม')
        .replace(/totalRevenue:\s*\d+(\.\d+)?/, `totalRevenue: ${data.revAct}`)
        .replace(/totalExpense:\s*\d+(\.\d+)?/, `totalExpense: ${data.expAct}`)
        .replace(/totalRevenuePlan:\s*\d+(\.\d+)?/, `totalRevenuePlan: ${data.revPlan}`) // if it was there
        .replace(/totalExpensePlan:\s*\d+(\.\d+)?/, `totalExpensePlan: ${data.expPlan}`); // if it was there
      
      // Add totalRevenuePlan and totalExpensePlan if they weren't replaced
      let finalJuly = julyBlock;
      if (!finalJuly.includes('totalRevenuePlan')) {
        finalJuly = finalJuly.replace(/totalRevenue:\s*[\d.]+/, `totalRevenue: ${data.revAct},\n        totalRevenuePlan: ${data.revPlan}`);
      }
      if (!finalJuly.includes('totalExpensePlan')) {
        finalJuly = finalJuly.replace(/totalExpense:\s*[\d.]+/, `totalExpense: ${data.expAct},\n        totalExpensePlan: ${data.expPlan}`);
      }
      
      const newBlock = mayBlock + ',\n      {\n        ' + juneBlock + ',\n      {\n        ' + finalJuly;
      
      code = code.replace(mayBlock, newBlock);
    }
  }
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched blocks.');
