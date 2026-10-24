const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');

// There's a syntax error around line 363-365. Let's fix it by searching for it.
// The problem is probably "  ,\n    {\n      monthId: \"aug-2569\","
// because of how we replaced ]};
file = file.replace(/  ,\n    \{\n      monthId: "aug-2569"/, "  },\n    {\n      monthId: \"aug-2569\"");
fs.writeFileSync('src/data.ts', file);
