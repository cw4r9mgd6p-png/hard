const fs = require('fs');
let file = fs.readFileSync('src/App.tsx', 'utf8');

file = file.replace(/🌟 วิเคราะห์ล่าสุด ก.ค. 69/g, '🌟 วิเคราะห์ล่าสุด ส.ค. 69');
file = file.replace(/\(Latest June-July Audit\)/g, '(Latest August Audit)');
file = file.replace(/useState<"LATEST_JUNE_JULY_AUDIT" \| "MOPH_DIAGNOSTICS" \| "AR_AUDIT" \| "MOPH_OFFICIAL_RESULTS" \| "FINANCIAL_TRENDS">\("AR_AUDIT"\);/, 'useState<"LATEST_JUNE_JULY_AUDIT" | "MOPH_DIAGNOSTICS" | "AR_AUDIT" | "MOPH_OFFICIAL_RESULTS" | "FINANCIAL_TRENDS">("LATEST_JUNE_JULY_AUDIT");');

fs.writeFileSync('src/App.tsx', file);
