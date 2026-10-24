const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');

file = file.replace(/    \]\n  \},\n    data: \[/g, "    ],\n    data: [");
fs.writeFileSync('src/data.ts', file);
