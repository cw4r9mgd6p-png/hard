const fs = require('fs');
const filePath = 'src/components/LatestJuneJulyAuditDashboard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the grid container with a scrollable flex container
code = code.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">',
  '<div className="flex overflow-x-auto gap-2 pb-2 snap-x scroll-smooth custom-scrollbar">'
);

// We should also add shrink-0 to the buttons to prevent them from squishing
const buttonReplacement = 'className={`flex-1 min-w-[240px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-150 cursor-pointer snap-start ${';

code = code.replaceAll(
  'className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-150 cursor-pointer ${',
  buttonReplacement
);

// We need to make sure the text can wrap if absolutely necessary, but with min-w-[240px] it probably won't need to.
// Let's remove whitespace-nowrap just to be safe and use break-words
code = code.replaceAll('whitespace-nowrap font-black', 'font-black break-words');
code = code.replaceAll('whitespace-nowrap', 'break-words');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Tabs patched.');
