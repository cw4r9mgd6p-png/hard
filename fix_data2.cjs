const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');

file = file.replace(/    \]\s*\}\s*,\s*data: \[/g, "    ],\n    data: [");
fs.writeFileSync('src/data.ts', file);
