const fs = require('fs');
let file = fs.readFileSync('src/data.ts', 'utf8');

const augData = `,
  {
    monthId: "aug-2569",
    monthName: "สิงหาคม 2569",
    reportDate: "10 กันยายน 2569",
    remarks: [
      "อัปเดตข้อมูลยอดยกไปจากรายงานงบทดลอง GFMIS ล่าสุด ประจำเดือนสิงหาคม 2569"
    ],
    data: [
      { 
        hospitalName: "รพ.ประจวบคีรีขันธ์", 
        govGL: 160281485.59, govGFMIS: 160281485.59, govGFMISDiff: 0, govInsurance: 160281485.59, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 97771506.21, between90DaysAnd1Year: 29620474.83, moreThan1Year: 32889504.55, total: 160281485.59 },
        extGL: 31734911.42, extGFMIS: 31734911.42, extGFMISDiff: 0, extInsurance: 31734911.42, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 7564143.91, between90DaysAnd1Year: 12390825.55, moreThan1Year: 11779941.96, total: 31734911.42 }
      },
      { 
        hospitalName: "รพ.กุยบุรี", 
        govGL: 6774686.66, govGFMIS: 6774686.66, govGFMISDiff: 0, govInsurance: 6774686.66, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 5289473.66, between90DaysAnd1Year: 1448429.00, moreThan1Year: 36784.00, total: 6774686.66 },
        extGL: 2152943.75, extGFMIS: 2152943.75, extGFMISDiff: 0, extInsurance: 2152943.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 572528.00, between90DaysAnd1Year: 1063321.00, moreThan1Year: 517094.75, total: 2152943.75 }
      },
      { 
        hospitalName: "รพ.ทับสะแก", 
        govGL: 11995550.01, govGFMIS: 11995550.01, govGFMISDiff: 0, govInsurance: 11995550.01, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 7356877.01, between90DaysAnd1Year: 4106385.00, moreThan1Year: 532288.00, total: 11995550.01 },
        extGL: 3242379.75, extGFMIS: 3242379.75, extGFMISDiff: 0, extInsurance: 3242379.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 785133.00, between90DaysAnd1Year: 1250125.00, moreThan1Year: 1207121.75, total: 3242379.75 }
      },
      { 
        hospitalName: "รพ.บางสะพาน", 
        govGL: 64111209.24, govGFMIS: 64111209.24, govGFMISDiff: 0, govInsurance: 64111209.24, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 46772714.24, between90DaysAnd1Year: 9362145.00, moreThan1Year: 7976350.00, total: 64111209.24 },
        extGL: 15412468.63, extGFMIS: 15412468.63, extGFMISDiff: 0, extInsurance: 15412468.63, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 4086851.63, between90DaysAnd1Year: 4432168.00, moreThan1Year: 6893449.00, total: 15412468.63 }
      },
      { 
        hospitalName: "รพ.บางสะพานน้อย", 
        govGL: 5344635.60, govGFMIS: 5344635.60, govGFMISDiff: 0, govInsurance: 5344635.60, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 3572886.60, between90DaysAnd1Year: 1491931.00, moreThan1Year: 279818.00, total: 5344635.60 },
        extGL: 3896378.70, extGFMIS: 3896378.70, extGFMISDiff: 0, extInsurance: 3896378.70, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 709493.70, between90DaysAnd1Year: 904975.00, moreThan1Year: 2281910.00, total: 3896378.70 }
      },
      { 
        hospitalName: "รพ.ปราณบุรี", 
        govGL: 23951028.85, govGFMIS: 23951028.85, govGFMISDiff: 0, govInsurance: 23951028.85, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 14063852.13, between90DaysAnd1Year: 158032.80, moreThan1Year: 9729143.92, total: 23951028.85 },
        extGL: 8300385.51, extGFMIS: 8300385.51, extGFMISDiff: 0, extInsurance: 8300385.51, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 2049432.00, between90DaysAnd1Year: 1281180.14, moreThan1Year: 4969773.37, total: 8300385.51 }
      },
      { 
        hospitalName: "รพ.หัวหิน", 
        govGL: 238491483.11, govGFMIS: 238491483.11, govGFMISDiff: 0, govInsurance: 238491483.11, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 153583853.11, between90DaysAnd1Year: 42110515.00, moreThan1Year: 42797115.00, total: 238491483.11 },
        extGL: 71968386.16, extGFMIS: 71968386.16, extGFMISDiff: 0, extInsurance: 71968386.16, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 16459468.16, between90DaysAnd1Year: 22626993.00, moreThan1Year: 32881925.00, total: 71968386.16 }
      },
      { 
        hospitalName: "รพ.สามร้อยยอด", 
        govGL: 12295365.66, govGFMIS: 12295365.66, govGFMISDiff: 0, govInsurance: 12295365.66, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 8051369.66, between90DaysAnd1Year: 4184051.00, moreThan1Year: 60845.00, total: 12295365.66 },
        extGL: 6213990.55, extGFMIS: 6213990.55, extGFMISDiff: 0, extInsurance: 6213990.55, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 852781.55, between90DaysAnd1Year: 1812854.00, moreThan1Year: 3548355.00, total: 6213990.55 }
      }
    ]
  }
];`;

file = file.replace(/  \}\n\];/g, augData);
fs.writeFileSync('src/data.ts', file);
console.log('Updated src/data.ts successfully.');
