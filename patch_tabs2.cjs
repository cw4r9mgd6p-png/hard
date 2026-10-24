const fs = require('fs');
const filePath = 'src/components/LatestJuneJulyAuditDashboard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// I also want to make sure the container for tabs looks good
code = code.replace(
  '<div className="flex overflow-x-auto gap-2 pb-2 snap-x scroll-smooth custom-scrollbar">',
  '<div className="flex overflow-x-auto gap-2 pb-2 snap-x scroll-smooth custom-scrollbar w-full">'
);

// We need to double check if the button class replacement worked
if (code.includes('className={`flex-1 min-w-[240px] shrink-0')) {
  console.log("Button replacement worked");
} else {
  console.log("Button replacement didn't work");
}

fs.writeFileSync(filePath, code, 'utf8');
