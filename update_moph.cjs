const fs = require('fs');
let file = fs.readFileSync('src/data/official_moph_generator.ts', 'utf8');

file = file.replace(/  acpSssDays: number;\n/, `  acpSssDays: number;\n  arUcAmount: number;\n  arCsAmount: number;\n  arSssAmount: number;\n  arOtherAmount: number;\n  arTotalAmount: number;\n`);

file = file.replace(/const totalExpense = totalRevenue - raw\.netIncome;/, `const totalExpense = totalRevenue - raw.netIncome;

      const acpSss = raw.acpSssDays || 45;
      const arUcAmount = (raw.acpUcDays / 90) * (totalRevenue * 0.55);
      const arCsAmount = (raw.acpCsDays / 90) * (totalRevenue * 0.20);
      const arSssAmount = (acpSss / 90) * (totalRevenue * 0.15);
      const arOtherAmount = (45 / 90) * (totalRevenue * 0.10);
      const arTotalAmount = arUcAmount + arCsAmount + arSssAmount + arOtherAmount;`);

file = file.replace(/acpSssDays: raw\.acpSssDays \|\| 0,/, `acpSssDays: acpSss,
        arUcAmount,
        arCsAmount,
        arSssAmount,
        arOtherAmount,
        arTotalAmount,`);

fs.writeFileSync('src/data/official_moph_generator.ts', file);
