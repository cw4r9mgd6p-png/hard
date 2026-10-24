const fs = require('fs');
const filePath = 'src/components/MophDiagnosticsDashboard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(
  "quarterOptions.find(q => q.id === selectedQuarterId)?.name",
  "availableQuarters.find(q => q.quarterId === selectedQuarterId)?.quarterName"
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('TPS title patched properly.');
