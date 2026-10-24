const fs = require('fs');
const filePath = 'src/planFinReportData.ts';
let code = fs.readFileSync(filePath, 'utf8');

// Add กรกฎาคม 2569 to planFinMonthsList
if (!code.includes('{ id: "256907", name: "กรกฎาคม 2569" }')) {
  code = code.replace(
    '{ id: "256906", name: "มิถุนายน 2569" },',
    '{ id: "256906", name: "มิถุนายน 2569" },\n  { id: "256907", name: "กรกฎาคม 2569" },'
  );
}

const julyData = {
  "10737": { rev: 536676396.02, exp: 669307322.05 },
  "11315": { rev: 62891887.90, exp: 107718409.42 },
  "11316": { rev: 75779968.53, exp: 129543585.86 },
  "11317": { rev: 265369145.02, exp: 397753185.98 },
  "11318": { rev: 57752913.83, exp: 95724610.87 },
  "11319": { rev: 96377189.44, exp: 156520978.79 },
  "11320": { rev: 849307104.76, exp: 1146014801.63 },
  "11321": { rev: 105828114.01, exp: 162430629.75 }
};

// We will find each hospital's months array and append 256906 (duplicate of 05 for now if missing) and 256907
const hospitalCodes = Object.keys(julyData);

hospitalCodes.forEach(codeStr => {
  // Use regex to find the hospital object
  const hospitalRegex = new RegExp(`hospitalCode:\\s*"${codeStr}"[\\s\\S]*?months:\\s*\\[([\\s\\S]*?)\\]\\s*\\}(,)?`, "g");
  const match = hospitalRegex.exec(code);
  if (match) {
    let monthsContent = match[1];
    
    // Check if 256906 exists, if not, create a dummy from 256905
    if (!monthsContent.includes('timeId: "256906"')) {
      const mayRegex = /timeId:\s*"256905"[^}]*\}/;
      const mayMatch = mayRegex.exec(monthsContent);
      if (mayMatch) {
        let juneBlock = mayMatch[0].replace('256905', '256906').replace('พฤษภาคม', 'มิถุนายน');
        monthsContent = monthsContent.replace(mayMatch[0], mayMatch[0] + ', {\n        ' + juneBlock);
      }
    }

    // Now append 256907
    if (!monthsContent.includes('timeId: "256907"')) {
      // Find the last month (which should be 256906 now) and duplicate it to modify
      const juneRegex = /timeId:\s*"256906"[^}]*\}/;
      const juneMatch = juneRegex.exec(monthsContent);
      if (juneMatch) {
        let julyBlock = juneMatch[0]
          .replace('256906', '256907')
          .replace('มิถุนายน', 'กรกฎาคม')
          .replace(/totalRevenue:\s*\d+(\.\d+)?/, `totalRevenue: ${julyData[codeStr].rev}`)
          .replace(/totalExpense:\s*\d+(\.\d+)?/, `totalExpense: ${julyData[codeStr].exp}`);
        monthsContent = monthsContent.replace(juneMatch[0], juneMatch[0] + ', {\n        ' + julyBlock);
      }
    }

    code = code.replace(match[1], monthsContent);
  }
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('Patched planFinReportData.ts with July data.');
