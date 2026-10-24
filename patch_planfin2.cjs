const fs = require('fs');
const filePath = 'src/planFinReportData.ts';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add optional plan properties to interface
code = code.replace(
  'totalRevenue: number;',
  'totalRevenue: number;\n  totalRevenuePlan?: number;'
).replace(
  'totalExpense: number;',
  'totalExpense: number;\n  totalExpensePlan?: number;'
);

// 2. Update generateRowDetailsForTotal signature
code = code.replace(
  'p70Val: number\n): PlanFinRow[]',
  'p70Val: number,\n  totalRevPlan?: number,\n  totalExpPlan?: number\n): PlanFinRow[]'
);

// 3. Update the P13S generation
code = code.replace(
  '    monthlyEstimated: totalRev,\n    monthlyActual: totalRev,\n    diff: 0,\n    percentage: 0,\n    status: "OK"',
  `    monthlyEstimated: totalRevPlan ?? totalRev,
    monthlyActual: totalRev,
    diff: totalRev - (totalRevPlan ?? totalRev),
    percentage: (totalRevPlan ?? totalRev) > 0 ? ((totalRev - (totalRevPlan ?? totalRev)) / (totalRevPlan ?? totalRev)) * 100 : 0,
    status: (totalRev - (totalRevPlan ?? totalRev)) >= 0 ? "OK" : "Not OK"`
);

// 4. Update the P26S generation
code = code.replace(
  '    monthlyEstimated: totalExp,\n    monthlyActual: totalExp,\n    diff: 0,\n    percentage: 0,\n    status: "OK"',
  `    monthlyEstimated: totalExpPlan ?? totalExp,
    monthlyActual: totalExp,
    diff: totalExp - (totalExpPlan ?? totalExp),
    percentage: (totalExpPlan ?? totalExp) > 0 ? ((totalExp - (totalExpPlan ?? totalExp)) / (totalExpPlan ?? totalExp)) * 100 : 0,
    status: (totalExp - (totalExpPlan ?? totalExp)) <= 0 ? "OK" : "Not OK"`
);

// 5. Update the generator caller
code = code.replace(
  'm.netUnencumberedFund\n    );',
  'm.netUnencumberedFund,\n      m.totalRevenuePlan,\n      m.totalExpensePlan\n    );'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Patched types and generator.');
