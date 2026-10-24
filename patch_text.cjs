const fs = require('fs');
const filePath = 'src/components/LatestJuneJulyAuditDashboard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace hospital names with non-breaking spaces or whitespace-nowrap spans
code = code.replace(/รพ\.ประจวบคีรีขันธ์/g, '<span className="whitespace-nowrap">รพ.ประจวบคีรีขันธ์</span>');
code = code.replace(/รพ\.บางสะพานน้อย/g, '<span className="whitespace-nowrap">รพ.บางสะพานน้อย</span>');
code = code.replace(/รพ\.บางสะพาน\b/g, '<span className="whitespace-nowrap">รพ.บางสะพาน</span>');
code = code.replace(/รพ\.หัวหิน/g, '<span className="whitespace-nowrap">รพ.หัวหิน</span>');
code = code.replace(/รพ\.ปราณบุรี/g, '<span className="whitespace-nowrap">รพ.ปราณบุรี</span>');
code = code.replace(/รพ\.ทับสะแก/g, '<span className="whitespace-nowrap">รพ.ทับสะแก</span>');
code = code.replace(/รพ\.สามร้อยยอด/g, '<span className="whitespace-nowrap">รพ.สามร้อยยอด</span>');
code = code.replace(/รพ\.กุยบุรี/g, '<span className="whitespace-nowrap">รพ.กุยบุรี</span>');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Text wrapped with whitespace-nowrap.');
