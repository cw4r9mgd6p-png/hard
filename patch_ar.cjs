const fs = require('fs');

// Patch data.ts
const dataFilePath = 'src/data.ts';
let dataCode = fs.readFileSync(dataFilePath, 'utf8');

const julBlock = `  {
    monthId: "jul-2569",
    monthName: "กรกฎาคม 2569",
    reportDate: "18 สิงหาคม 2569",
    remarks: [
      "รายงานฉบับล่าสุดไม่มีส่วนต่างระหว่าง GL และ GFMIS รวมถึงยอดจัดเก็บประกันสำหรับทุกโรงพยาบาล สะท้อนถึงการปรับปรุงกระบวนการกระทบยอดได้อย่างมีประสิทธิภาพ 100%"
    ],
    data: [
      { 
        hospitalName: "รพ.ประจวบคีรีขันธ์", 
        govGL: 149361273.43, govGFMIS: 149361273.43, govGFMISDiff: 0, govInsurance: 149361273.43, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 91110376.79, between90DaysAnd1Year: 27602055.33, moreThan1Year: 30648841.31, total: 149361273.43 },
        extGL: 30365868.67, extGFMIS: 30365868.67, extGFMISDiff: 0, extInsurance: 30365868.67, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 7237890.35, between90DaysAnd1Year: 11856322.01, moreThan1Year: 11271656.31, total: 30365868.67 }
      },
      { 
        hospitalName: "รพ.กุยบุรี", 
        govGL: 6741400.31, govGFMIS: 6741400.31, govGFMISDiff: 0, govInsurance: 6741400.31, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 5263489.15, between90DaysAnd1Year: 1441312.16, moreThan1Year: 36599.00, total: 6741400.31 },
        extGL: 2039830.00, extGFMIS: 2039830.00, extGFMISDiff: 0, extInsurance: 2039830.00, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 542456.25, between90DaysAnd1Year: 1007469.00, moreThan1Year: 489904.75, total: 2039830.00 }
      },
      { 
        hospitalName: "รพ.ทับสะแก", 
        govGL: 12098661.01, govGFMIS: 12098661.01, govGFMISDiff: 0, govInsurance: 12098661.01, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 7420131.00, between90DaysAnd1Year: 4141695.20, moreThan1Year: 536834.81, total: 12098661.01 },
        extGL: 3369833.75, extGFMIS: 3369833.75, extGFMISDiff: 0, extInsurance: 3369833.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 816001.00, between90DaysAnd1Year: 1299285.00, moreThan1Year: 1254547.75, total: 3369833.75 }
      },
      { 
        hospitalName: "รพ.บางสะพาน", 
        govGL: 71047367.37, govGFMIS: 71047367.37, govGFMISDiff: 0, govInsurance: 71047367.37, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 51833116.53, between90DaysAnd1Year: 10375171.09, moreThan1Year: 8839079.75, total: 71047367.37 },
        extGL: 15158287.13, extGFMIS: 15158287.13, extGFMISDiff: 0, extInsurance: 15158287.13, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 4019448.23, between90DaysAnd1Year: 4359051.00, moreThan1Year: 6779787.90, total: 15158287.13 }
      },
      { 
        hospitalName: "รพ.บางสะพานน้อย", 
        govGL: 5724025.77, govGFMIS: 5724025.77, govGFMISDiff: 0, govInsurance: 5724025.77, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 3826501.53, between90DaysAnd1Year: 1597843.24, moreThan1Year: 299681.00, total: 5724025.77 },
        extGL: 3974130.20, extGFMIS: 3974130.20, extGFMISDiff: 0, extInsurance: 3974130.20, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 723659.25, between90DaysAnd1Year: 923035.20, moreThan1Year: 2327435.75, total: 3974130.20 }
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
        govGL: 241208444.83, govGFMIS: 241208444.83, govGFMISDiff: 0, govInsurance: 241208444.83, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 155333555.32, between90DaysAnd1Year: 42590215.17, moreThan1Year: 43284674.34, total: 241208444.83 },
        extGL: 69706917.76, extGFMIS: 69706917.76, extGFMISDiff: 0, extInsurance: 69706917.76, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 15942204.12, between90DaysAnd1Year: 21915993.23, moreThan1Year: 31848720.41, total: 69706917.76 }
      },
      { 
        hospitalName: "รพ.สามร้อยยอด", 
        govGL: 13247248.79, govGFMIS: 13247248.79, govGFMISDiff: 0, govInsurance: 13247248.79, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 8673852.18, between90DaysAnd1Year: 4507851.61, moreThan1Year: 65545.00, total: 13247248.79 },
        extGL: 5876342.00, extGFMIS: 5876342.00, extGFMISDiff: 0, extInsurance: 5876342.00, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 1231093.50, between90DaysAnd1Year: 2338382.00, moreThan1Year: 2306866.50, total: 5876342.00 }
      }
    ]
  }
];`;

dataCode = dataCode.replace(/      \}\n    \]\n  \}\n\];/g, '      }\n    ]\n  },\n' + julBlock);
fs.writeFileSync(dataFilePath, dataCode, 'utf8');

// Patch App.tsx
const appFilePath = 'src/App.tsx';
let appCode = fs.readFileSync(appFilePath, 'utf8');
appCode = appCode.replace(/useState<string>\("jun-2569"\)/g, 'useState<string>("jul-2569")');
fs.writeFileSync(appFilePath, appCode, 'utf8');

console.log('Patched AR data for July');
