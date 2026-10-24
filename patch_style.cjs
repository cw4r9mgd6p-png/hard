const fs = require('fs');
const filePath = 'src/index.css';
let code = fs.readFileSync(filePath, 'utf8');

if (!code.includes('.custom-scrollbar')) {
  code += `
/* Custom Scrollbar for horizontal tabs */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.4);
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.8);
}
`;
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Added custom scrollbar styles.');
} else {
  console.log('Custom scrollbar styles already exist.');
}
