const fs = require('fs');

let file = fs.readFileSync('src/data/latestJuneJuly2569Data.ts', 'utf8');

// Replace the comment headers
file = file.replace(/กรกฎาคม 2569/g, "สิงหาคม 2569");
file = file.replace(/15 ก.ค. 2569/g, "11 ก.ย. 2569"); // Based on image "(ณ วันที่ 11 ก.ย. 69)"
file = file.replace(/13 ก.ค. 2569/g, "11 ก.ย. 2569");

// New debtTurnoverDataset
const newDebtData = `export const debtTurnoverDataset: DebtTurnoverData[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ. ประจวบคีรีขันธ์",
    cash: 0.62,
    appDays: 117,
    appStatus: 'WARNING',
    acpUcDays: 135,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 86,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 232,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 46,
    inventoryStatus: 'PASS'
  },
  {
    hospitalCode: "11315",
    hospitalName: "รพ. กุยบุรี",
    cash: 2.66,
    appDays: 84,
    appStatus: 'PASS',
    acpUcDays: 135,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 67,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 471,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 72,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11316",
    hospitalName: "รพ. ทับสะแก",
    cash: 0.93,
    appDays: 124,
    appStatus: 'WARNING',
    acpUcDays: 127,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 61,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 385,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 54,
    inventoryStatus: 'PASS'
  },
  {
    hospitalCode: "11317",
    hospitalName: "รพ. บางสะพาน",
    cash: 0.74,
    appDays: 194,
    appStatus: 'CRITICAL',
    acpUcDays: 122,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 61,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 276,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 50,
    inventoryStatus: 'PASS'
  },
  {
    hospitalCode: "11318",
    hospitalName: "รพ. บางสะพานน้อย",
    cash: 0.38,
    appDays: 128,
    appStatus: 'WARNING',
    acpUcDays: 115,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 55,
    acpCsmbsStatus: 'PASS',
    acpSssDays: 316,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 68,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11319",
    hospitalName: "รพ. ปราณบุรี",
    cash: 2.71,
    appDays: 84,
    appStatus: 'PASS',
    acpUcDays: 300,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 62,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 232,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 82,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11320",
    hospitalName: "รพ. หัวหิน",
    cash: 1.52,
    appDays: 86,
    appStatus: 'PASS',
    acpUcDays: 193,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 61,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 106,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 86,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11321",
    hospitalName: "รพ. สามร้อยยอด",
    cash: 10.95,
    appDays: 72,
    appStatus: 'PASS',
    acpUcDays: 92,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 52,
    acpCsmbsStatus: 'PASS',
    acpSssDays: 298,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 69,
    inventoryStatus: 'EXCEEDED'
  }
];`;

const newFinData = `export const financialHealthDataset: FinancialHealthData[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ. ประจวบคีรีขันธ์",
    cr: 1.94,
    qr: 1.72,
    cashRatio: 0.62,
    nwc: 164487509.41,
    netIncome: 57557833.61,
    riskScore: 1,
    ebitda: 90187078.40,
    netFund: -67441571.75
  },
  {
    hospitalCode: "11315",
    hospitalName: "รพ. กุยบุรี",
    cr: 3.41,
    qr: 3.24,
    cashRatio: 2.66,
    nwc: 36789583.40,
    netIncome: -7559448.49,
    riskScore: 1,
    ebitda: -5205507.32,
    netFund: 25378590.26
  },
  {
    hospitalCode: "11316",
    hospitalName: "รพ. ทับสะแก",
    cr: 1.80,
    qr: 1.70,
    cashRatio: 0.93,
    nwc: 15472168.73,
    netIncome: -9865707.62,
    riskScore: 1,
    ebitda: -6471051.79,
    netFund: -1441449.96
  },
  {
    hospitalCode: "11317",
    hospitalName: "รพ. บางสะพาน",
    cr: 1.47,
    qr: 1.36,
    cashRatio: 0.74,
    nwc: 60653390.79,
    netIncome: -25419519.82,
    riskScore: 3,
    ebitda: 16327779.45,
    netFund: -33421368.52
  },
  {
    hospitalCode: "11318",
    hospitalName: "รพ. บางสะพานน้อย",
    cr: 0.94,
    qr: 0.78,
    cashRatio: 0.38,
    nwc: -1280852.88,
    netIncome: -4826162.17,
    riskScore: 7,
    ebitda: 2639866.11,
    netFund: -13957189.01
  },
  {
    hospitalCode: "11319",
    hospitalName: "รพ. ปราณบุรี",
    cr: 4.00,
    qr: 3.70,
    cashRatio: 2.71,
    nwc: 91070161.54,
    netIncome: -18232551.24,
    riskScore: 1,
    ebitda: -2876463.26,
    netFund: 52351122.32
  },
  {
    hospitalCode: "11320",
    hospitalName: "รพ. หัวหิน",
    cr: 3.47,
    qr: 2.95,
    cashRatio: 1.52,
    nwc: 529675627.30,
    netIncome: -162275353.95,
    riskScore: 1,
    ebitda: -20970470.54,
    netFund: 110535087.38
  },
  {
    hospitalCode: "11321",
    hospitalName: "รพ. สามร้อยยอด",
    cr: 12.68,
    qr: 12.20,
    cashRatio: 10.95,
    nwc: 171561702.00,
    netIncome: -9123891.77,
    riskScore: 1,
    ebitda: 2649880.83,
    netFund: 146144110.57
  }
];`;

const debtRegex = /export const debtTurnoverDataset: DebtTurnoverData\[\] = \[[\s\S]*?\];/;
file = file.replace(debtRegex, newDebtData);

const finRegex = /export const financialHealthDataset: FinancialHealthData\[\] = \[[\s\S]*?\];/;
file = file.replace(finRegex, newFinData);

fs.writeFileSync('src/data/latestJuneJuly2569Data.ts', file);
console.log("Updated data successfully");
