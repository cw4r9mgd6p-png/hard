const fs = require('fs');
const filePath = 'src/components/LatestJuneJulyAuditDashboard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(/รพ\.บางสะพาน \(/g, '<span className="whitespace-nowrap">รพ.บางสะพาน</span> (');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Fixed Bangsaphan');
