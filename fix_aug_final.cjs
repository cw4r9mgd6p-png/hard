const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');

const target = `    ],
  {
    monthId: "aug-2569"`;
const replacement = `    ]
  },
  {
    monthId: "aug-2569"`;

file = file.replace(target, replacement);
fs.writeFileSync('src/data.ts', file);
