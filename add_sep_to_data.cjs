const fs = require('fs');

let file = fs.readFileSync('src/data.ts', 'utf8');

const sepReport = `  {
    monthId: "sep-2569",
    monthName: "กันยายน 2569 (สิ้นปีงบประมาณ 2569)",
    reportDate: "11 ตุลาคม 2569",
    remarks: [
      "อัปเดตยอดยกไปสิ้นปีงบประมาณ 2569 (งวด 12) จากรายงานงบทดลอง GFMIS ครบทั้ง 8 โรงพยาบาล",
      "สถานการณ์การเงินการคลังล่าสุด: รพ.บางสะพานน้อย Risk Score ระดับ 7 (วิกฤต), รพ.ทับสะแก Risk Score ระดับ 4 (เฝ้าระวังสีส้ม), รพ.บางสะพาน Risk Score ระดับ 3",
      "เงินบำรุงคงเหลือสุทธิหลังหักหนี้ติดลบ 4 แห่ง: รพ.ประจวบคีรีขันธ์ (-96.36M), รพ.บางสะพาน (-51.48M), รพ.บางสะพานน้อย (-18.87M), รพ.ทับสะแก (-10.41M)"
    ],
    data: [
      { 
        hospitalName: "รพ.ประจวบคีรีขันธ์", 
        govGL: 166209527.56, govGFMIS: 166209527.56, govGFMISDiff: 0, govInsurance: 166209527.56, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 104523100.56, between90DaysAnd1Year: 28796922.00, moreThan1Year: 32889505.00, total: 166209527.56 },
        extGL: 26810142.99, extGFMIS: 26810142.99, extGFMISDiff: 0, extInsurance: 26810142.99, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 6520300.99, between90DaysAnd1Year: 9509900.00, moreThan1Year: 10779942.00, total: 26810142.99 }
      },
      { 
        hospitalName: "รพ.กุยบุรี", 
        govGL: 3362810.98, govGFMIS: 3362810.98, govGFMISDiff: 0, govInsurance: 3362810.98, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 2626026.98, between90DaysAnd1Year: 700000.00, moreThan1Year: 36784.00, total: 3362810.98 },
        extGL: 2213594.95, extGFMIS: 2213594.95, extGFMISDiff: 0, extInsurance: 2213594.95, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 633179.20, between90DaysAnd1Year: 1063321.00, moreThan1Year: 517094.75, total: 2213594.95 }
      },
      { 
        hospitalName: "รพ.ทับสะแก", 
        govGL: 10282499.25, govGFMIS: 10282499.25, govGFMISDiff: 0, govInsurance: 10282499.25, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 6243826.25, between90DaysAnd1Year: 3506385.00, moreThan1Year: 532288.00, total: 10282499.25 },
        extGL: 3372563.75, extGFMIS: 3372563.75, extGFMISDiff: 0, extInsurance: 3372563.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 915317.00, between90DaysAnd1Year: 1250125.00, moreThan1Year: 1207121.75, total: 3372563.75 }
      },
      { 
        hospitalName: "รพ.บางสะพาน", 
        govGL: 50177362.12, govGFMIS: 50177362.12, govGFMISDiff: 0, govInsurance: 50177362.12, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 36838867.12, between90DaysAnd1Year: 6362145.00, moreThan1Year: 6976350.00, total: 50177362.12 },
        extGL: 15905783.38, extGFMIS: 15905783.38, extGFMISDiff: 0, extInsurance: 15905783.38, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 4580166.38, between90DaysAnd1Year: 4432168.00, moreThan1Year: 6893449.00, total: 15905783.38 }
      },
      { 
        hospitalName: "รพ.บางสะพานน้อย", 
        govGL: 4707767.91, govGFMIS: 4707767.91, govGFMISDiff: 0, govInsurance: 4707767.91, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 3236018.91, between90DaysAnd1Year: 1191931.00, moreThan1Year: 279818.00, total: 4707767.91 },
        extGL: 3943079.45, extGFMIS: 3943079.45, extGFMISDiff: 0, extInsurance: 3943079.45, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 756194.45, between90DaysAnd1Year: 904975.00, moreThan1Year: 2281910.00, total: 3943079.45 }
      },
      { 
        hospitalName: "รพ.ปราณบุรี", 
        govGL: 16837965.82, govGFMIS: 16837965.82, govGFMISDiff: 0, govInsurance: 16837965.82, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 9806593.82, between90DaysAnd1Year: 144360.00, moreThan1Year: 6887012.00, total: 16837965.82 },
        extGL: 8257070.79, extGFMIS: 8257070.79, extGFMISDiff: 0, extInsurance: 8257070.79, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 1737503.79, between90DaysAnd1Year: 1336214.00, moreThan1Year: 5183353.00, total: 8257070.79 }
      },
      { 
        hospitalName: "รพ.หัวหิน", 
        govGL: 237239507.60, govGFMIS: 237239507.60, govGFMISDiff: 0, govInsurance: 237239507.60, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 152331877.60, between90DaysAnd1Year: 42110515.00, moreThan1Year: 42797115.00, total: 237239507.60 },
        extGL: 74342527.63, extGFMIS: 74342527.63, extGFMISDiff: 0, extInsurance: 74342527.63, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 18833609.63, between90DaysAnd1Year: 22626993.00, moreThan1Year: 32881925.00, total: 74342527.63 }
      },
      { 
        hospitalName: "รพ.สามร้อยยอด", 
        govGL: 11570120.60, govGFMIS: 11570120.60, govGFMISDiff: 0, govInsurance: 11570120.60, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 7325224.60, between90DaysAnd1Year: 4184051.00, moreThan1Year: 60845.00, total: 11570120.60 },
        extGL: 6410806.05, extGFMIS: 6410806.05, extGFMISDiff: 0, extInsurance: 6410806.05, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 1049597.05, between90DaysAnd1Year: 1812854.00, moreThan1Year: 3548355.00, total: 6410806.05 }
      }
    ]
  }`;

// Check if sep-2569 already exists
if (!file.includes('"sep-2569"')) {
  file = file.replace(/export const mockScenarios/, sepReport + ',\n];\n\nexport const mockScenarios');
  // Also remove the previous closing of monthlyReports before mockScenarios
  file = file.replace(/      }\n    \]\n  }\n\];\n\n  {/g, '      }\n    ]\n  },\n  {');
  fs.writeFileSync('src/data.ts', file, 'utf8');
  console.log("Appended sep-2569 to monthlyReports successfully");
} else {
  console.log("sep-2569 already exists");
}
