const fs = require('fs');
const filePath = 'src/quartersDataLookup.ts';
let code = fs.readFileSync(filePath, 'utf8');

const updates = {
  "10737": { planfinRevenue: '"ผ่าน"', planfinExpense: '"ผ่าน"' },
  "11315": { planfinRevenue: '"ผ่าน"', planfinExpense: '"ผ่าน"' },
  "11316": { planfinRevenue: '"ไม่ผ่าน"', planfinExpense: '"ผ่าน"' },
  "11317": { planfinRevenue: '"ไม่ผ่าน"', planfinExpense: '"ผ่าน"' },
  "11318": { planfinRevenue: '"ผ่าน"', planfinExpense: '"ผ่าน"' },
  "11319": { planfinRevenue: '"ผ่าน"', planfinExpense: '"ผ่าน"' },
  "11320": { planfinRevenue: '"ผ่าน"', planfinExpense: '"ไม่ผ่าน"' },
  "11321": { planfinRevenue: '"ผ่าน"', planfinExpense: '"ผ่าน"' }
};

Object.keys(updates).forEach(codeStr => {
  // Find the block for the hospital
  const hospitalStart = code.indexOf(`"${codeStr}": {`);
  if (hospitalStart !== -1) {
    const nextHospitalStart = code.indexOf('},', hospitalStart + 10);
    // Find the 2569Q4 block
    const q4Index = code.indexOf('"2569Q4":', hospitalStart);
    if (q4Index !== -1 && (nextHospitalStart === -1 || q4Index < nextHospitalStart)) {
      const q4End = code.indexOf('}', q4Index);
      let q4Block = code.substring(q4Index, q4End + 1);
      
      q4Block = q4Block.replace(/planfinRevenue:\s*"[^"]+"/, `planfinRevenue: ${updates[codeStr].planfinRevenue}`);
      q4Block = q4Block.replace(/planfinExpense:\s*"[^"]+"/, `planfinExpense: ${updates[codeStr].planfinExpense}`);
      
      code = code.substring(0, q4Index) + q4Block + code.substring(q4End + 1);
    }
  }
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('Patched Q4 planfin statuses.');
