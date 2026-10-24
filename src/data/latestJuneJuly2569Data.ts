// Data extracted directly from official MOPH reports and GFMIS Trial Balances (สิ้นปีงบประมาณ 2569 - กันยายน 2569)

export interface DebtTurnoverData {
  hospitalCode: string;
  hospitalName: string;
  cash: number;
  appDays: number; // A Payment Period (<= 90 วัน)
  appStatus: 'PASS' | 'WARNING' | 'CRITICAL';
  acpUcDays: number; // A Collection Period_UC (<= 60 วัน)
  acpUcStatus: 'PASS' | 'EXCEEDED';
  acpCsmbsDays: number; // A Collection Period_CSMBS (<= 60 วัน)
  acpCsmbsStatus: 'PASS' | 'EXCEEDED';
  acpSssDays: number; // A Collection Period_SSS (<= 120 วัน)
  acpSssStatus: 'PASS' | 'EXCEEDED';
  inventoryDays: number; // A Inventory Period (<= 60 วัน)
  inventoryStatus: 'PASS' | 'EXCEEDED';
}

export interface FinancialHealthData {
  hospitalCode: string;
  hospitalName: string;
  cr: number; // Current Ratio
  qr: number; // Quick Ratio
  cashRatio: number;
  nwc: number; // Net Working Capital (บาท)
  netIncome: number; // รายได้สูง(ต่ำ)กว่าค่าใช้จ่ายสุทธิ (บาท)
  riskScore: number; // ระดับความเสี่ยงทางการเงิน (1-7)
  ebitda: number; // กำไรก่อนดอกเบี้ย ภาษี ค่าเสื่อม (บาท)
  netFund: number; // เงินบำรุงคงเหลือสุทธิ (หลังหักหนี้แล้ว) (บาท)
}

export interface GfmisTrialBalanceItem {
  hospitalCode: string;
  hospitalName: string;
  docNumber: string;
  cashAndDeposits: number; // เงินสดและเงินฝากคลัง/ธนาคาร
  govAR: number; // ล/น การค้า-ภาครัฐ (1102050101)
  extAR: number; // ล/น การค้า-ภายนอก (1102050102)
  allowanceBadDebt: number; // ค่าเผื่อ-ล/นระยะสั้น (1102050123)
  inventoryGoods: number; // สินค้าสำเร็จรูป (1105010103)
  inventorySupplies: number; // วัสดุคงคลัง (1105010105)
  tradeAP: number; // รับสินค้า / ใบสำคัญ (2101010103)
  otherAP: number; // เจ้าหนี้อื่น-ภายนอก (2101020199)
  accruedVouchers: number; // ใบสำคัญค้างจ่ายอื่น (2102040110)
  totalMedicalRevenue: number; // รายได้รักษาพยาบาลรวม (4301020104 + 4301020105 + 4301020106)
  reportDate: string;
}

export interface TrialBalanceItem {
  id: number;
  title: string;
  maxScore: number;
  scores: {
    [hospitalName: string]: { score: number; percent: number };
  };
}

export interface TrialBalanceSummary {
  hospitalName: string;
  totalScore: number;
  percent: number;
  grade: string;
  gradeLabel: string;
}

export interface IpMonthlyRevenue {
  hospitalName: string;
  estimatedIpRevenue: number;
  revenuePercent: number;
  totalCompAfterLabor: number;
  monthlyDetails: {
    period: string;
    amount: number;
  }[];
}

// ==========================================
// 1. DATASET: เดือน กันยายน 2569 (สิ้นปีงบประมาณ 2569)
// ณ วันที่ 11 ตุลาคม 2569 เวลา 19:03 น.
// ==========================================

export const debtTurnoverSeptember2569: DebtTurnoverData[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ.ประจวบคีรีขันธ์",
    cash: 0.51,
    appDays: 122.01,
    appStatus: 'WARNING',
    acpUcDays: 136.22,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 100.22,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 247.36,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 38.45,
    inventoryStatus: 'PASS'
  },
  {
    hospitalCode: "11315",
    hospitalName: "รพ.กุยบุรี",
    cash: 2.25,
    appDays: 87.54,
    appStatus: 'PASS',
    acpUcDays: 107.04,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 45.13,
    acpCsmbsStatus: 'PASS',
    acpSssDays: 480.54,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 73.70,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11316",
    hospitalName: "รพ.ทับสะแก",
    cash: 0.56,
    appDays: 130.73,
    appStatus: 'WARNING',
    acpUcDays: 126.50,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 75.63,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 393.18,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 71.12,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11317",
    hospitalName: "รพ.บางสะพาน",
    cash: 0.60,
    appDays: 202.37,
    appStatus: 'CRITICAL',
    acpUcDays: 123.78,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 72.35,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 289.74,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 48.05,
    inventoryStatus: 'PASS'
  },
  {
    hospitalCode: "11318",
    hospitalName: "รพ.บางสะพานน้อย",
    cash: 0.26,
    appDays: 141.49,
    appStatus: 'WARNING',
    acpUcDays: 112.24,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 66.67,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 336.89,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 58.92,
    inventoryStatus: 'PASS'
  },
  {
    hospitalCode: "11319",
    hospitalName: "รพ.ปราณบุรี",
    cash: 2.26,
    appDays: 81.56,
    appStatus: 'PASS',
    acpUcDays: 296.25,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 74.80,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 247.99,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 64.15,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11320",
    hospitalName: "รพ.หัวหิน",
    cash: 1.22,
    appDays: 86.40,
    appStatus: 'PASS',
    acpUcDays: 192.94,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 71.89,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 120.93,
    acpSssStatus: 'PASS',
    inventoryDays: 86.52,
    inventoryStatus: 'EXCEEDED'
  },
  {
    hospitalCode: "11321",
    hospitalName: "รพ.สามร้อยยอด",
    cash: 10.32,
    appDays: 65.33,
    appStatus: 'PASS',
    acpUcDays: 82.90,
    acpUcStatus: 'EXCEEDED',
    acpCsmbsDays: 65.82,
    acpCsmbsStatus: 'EXCEEDED',
    acpSssDays: 312.02,
    acpSssStatus: 'EXCEEDED',
    inventoryDays: 61.89,
    inventoryStatus: 'EXCEEDED'
  }
];

export const financialHealthSeptember2569: FinancialHealthData[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ.ประจวบคีรีขันธ์",
    cr: 1.66,
    qr: 1.51,
    cashRatio: 0.51,
    nwc: 129872377.07,
    netIncome: 25813438.95,
    riskScore: 1,
    ebitda: 55417994.58,
    netFund: -96364652.01
  },
  {
    hospitalCode: "11315",
    hospitalName: "รพ.กุยบุรี",
    cr: 2.92,
    qr: 2.76,
    cashRatio: 2.25,
    nwc: 29832390.74,
    netIncome: -13470523.37,
    riskScore: 1,
    ebitda: -10320964.93,
    netFund: 19362639.58
  },
  {
    hospitalCode: "11316",
    hospitalName: "รพ.ทับสะแก",
    cr: 1.36,
    qr: 1.21,
    cashRatio: 0.56,
    nwc: 8662588.93,
    netIncome: -17410945.43,
    riskScore: 4,
    ebitda: -13192468.49,
    netFund: -10406807.45
  },
  {
    hospitalCode: "11317",
    hospitalName: "รพ.บางสะพาน",
    cr: 1.31,
    qr: 1.21,
    cashRatio: 0.60,
    nwc: 39861162.31,
    netIncome: -71416823.08,
    riskScore: 3,
    ebitda: 694932.90,
    netFund: -51483033.98
  },
  {
    hospitalCode: "11318",
    hospitalName: "รพ.บางสะพานน้อย",
    cr: 0.81,
    qr: 0.68,
    cashRatio: 0.26,
    nwc: -4977060.98,
    netIncome: -9701347.75,
    riskScore: 7,
    ebitda: -1092405.03,
    netFund: -18869247.18
  },
  {
    hospitalCode: "11319",
    hospitalName: "รพ.ปราณบุรี",
    cr: 3.30,
    qr: 3.08,
    cashRatio: 2.26,
    nwc: 77931337.39,
    netIncome: -32977167.83,
    riskScore: 1,
    ebitda: -13682339.79,
    netFund: 43131131.35
  },
  {
    hospitalCode: "11320",
    hospitalName: "รพ.หัวหิน",
    cr: 3.08,
    qr: 2.55,
    cashRatio: 1.22,
    nwc: 478511002.90,
    netIncome: -269590509.88,
    riskScore: 1,
    ebitda: -62524609.42,
    netFund: 49703825.77
  },
  {
    hospitalCode: "11321",
    hospitalName: "รพ.สามร้อยยอด",
    cr: 12.07,
    qr: 11.69,
    cashRatio: 10.32,
    nwc: 165130769.18,
    netIncome: -15202166.21,
    riskScore: 1,
    ebitda: -2114672.09,
    netFund: 139030388.10
  }
];

// ==========================================
// 2. DATASET: เดือน สิงหาคม 2569 (Historical Comparison)
// ==========================================

export const debtTurnoverAugust2569: DebtTurnoverData[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ.ประจวบคีรีขันธ์",
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
    hospitalName: "รพ.กุยบุรี",
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
    hospitalName: "รพ.ทับสะแก",
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
    hospitalName: "รพ.บางสะพาน",
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
    hospitalName: "รพ.บางสะพานน้อย",
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
    hospitalName: "รพ.ปราณบุรี",
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
    hospitalName: "รพ.หัวหิน",
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
    hospitalName: "รพ.สามร้อยยอด",
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
];

export const financialHealthAugust2569: FinancialHealthData[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ.ประจวบคีรีขันธ์",
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
    hospitalName: "รพ.กุยบุรี",
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
    hospitalName: "รพ.ทับสะแก",
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
    hospitalName: "รพ.บางสะพาน",
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
    hospitalName: "รพ.บางสะพานน้อย",
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
    hospitalName: "รพ.ปราณบุรี",
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
    hospitalName: "รพ.หัวหิน",
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
    hospitalName: "รพ.สามร้อยยอด",
    cr: 12.68,
    qr: 12.20,
    cashRatio: 10.95,
    nwc: 171561702.00,
    netIncome: -9123891.77,
    riskScore: 1,
    ebitda: 2649880.83,
    netFund: 146144110.57
  }
];

// Active datasets default to latest (September 2569)
export const debtTurnoverDataset = debtTurnoverSeptember2569;
export const financialHealthDataset = financialHealthSeptember2569;

// ==========================================
// 3. DATASET: รายงานงบทดลอง GFMIS ยอดยกไปสิ้นงวด 12 (ปี 2569)
// ข้อมูลจากรายงานงบทดลอง GFMIS ทั้ง 8 รพ.
// ==========================================

export const gfmisTrialBalanceSeptember2569: GfmisTrialBalanceItem[] = [
  {
    hospitalCode: "10737",
    hospitalName: "รพ.ประจวบคีรีขันธ์",
    docNumber: "2100200222",
    cashAndDeposits: 66217.76 + 13677308.97 + 91530372.15, // 105,273,898.88
    govAR: 166209527.56,
    extAR: 26810142.99,
    allowanceBadDebt: -923289.45,
    inventoryGoods: 28059322.85,
    inventorySupplies: 1248641.39,
    tradeAP: 106327801.87,
    otherAP: 65407667.30,
    accruedVouchers: 15198967.07,
    totalMedicalRevenue: 231225283.44 + 238405029.17 + 76813192.16, // 546,443,504.77
    reportDate: "13.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11315",
    hospitalName: "รพ.กุยบุรี",
    docNumber: "2100200221",
    cashAndDeposits: 7263.50 + 505000.00 + 40136161.82, // 40,648,425.32
    govAR: 3362810.98,
    extAR: 2213594.95,
    allowanceBadDebt: -77781.00,
    inventoryGoods: 2227975.85,
    inventorySupplies: 317673.31,
    tradeAP: 0.00,
    otherAP: 9181525.20,
    accruedVouchers: 1634751.22,
    totalMedicalRevenue: 16473380.08 + 51327482.08 + 3801890.17, // 71,602,752.33
    reportDate: "14.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11316",
    hospitalName: "รพ.ทับสะแก",
    docNumber: "2100200221",
    cashAndDeposits: 2391.00 + 2000000.00 + 14898434.58, // 16,900,825.58
    govAR: 10282499.25,
    extAR: 3372563.75,
    allowanceBadDebt: -110777.90,
    inventoryGoods: 3256500.46,
    inventorySupplies: 326204.06,
    tradeAP: 0.00,
    otherAP: 15077415.44,
    accruedVouchers: 2339074.42,
    totalMedicalRevenue: 24561125.80 + 53731496.30 + 7800425.44, // 86,093,047.54
    reportDate: "14.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11317",
    hospitalName: "รพ.บางสะพาน",
    docNumber: "2100201140",
    cashAndDeposits: 10230760.08 + 73511606.19, // 83,742,366.27
    govAR: 50177362.12,
    extAR: 15905783.38,
    allowanceBadDebt: -751744.04,
    inventoryGoods: 10731987.15,
    inventorySupplies: 1502307.25,
    tradeAP: 12465993.06,
    otherAP: 100385418.73,
    accruedVouchers: 10074949.12,
    totalMedicalRevenue: 112664472.51 + 179794338.10 + 52081704.85, // 344,540,515.46
    reportDate: "10.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11318",
    hospitalName: "รพ.บางสะพานน้อย",
    docNumber: "2100200221",
    cashAndDeposits: 289.75 + 300000.00 + 8522653.91, // 8,822,943.66
    govAR: 4707767.91,
    extAR: 3943079.45,
    allowanceBadDebt: -246861.68,
    inventoryGoods: 2414271.43,
    inventorySupplies: 289323.55,
    tradeAP: 0.00,
    otherAP: 19020474.89,
    accruedVouchers: 2628189.54,
    totalMedicalRevenue: 13972790.82 + 48458527.44 + 7479702.60, // 69,911,020.86
    reportDate: "14.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11319",
    hospitalName: "รพ.ปราณบุรี",
    docNumber: "2100200221",
    cashAndDeposits: 234195.00 + 24700000.00 + 56323484.77, // 81,257,679.77
    govAR: 16837965.82,
    extAR: 8257070.79,
    allowanceBadDebt: -494086.25,
    inventoryGoods: 4675318.20,
    inventorySupplies: 1250770.39,
    tradeAP: 0.00,
    otherAP: 23652883.98,
    accruedVouchers: 2928100.70,
    totalMedicalRevenue: 31625213.62 + 59500973.49 + 8886334.91, // 100,012,522.02
    reportDate: "14.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11320",
    hospitalName: "รพ.หัวหิน",
    docNumber: "2100200259",
    cashAndDeposits: 411697.32 + 39182189.87 + 250720136.65 + 130815.31, // 290,444,839.15
    govAR: 237239507.60,
    extAR: 74342527.63,
    allowanceBadDebt: -4190248.72,
    inventoryGoods: 119131132.13,
    inventorySupplies: 1490442.50,
    tradeAP: 145627934.05,
    otherAP: 9056341.49,
    accruedVouchers: 21536610.74,
    totalMedicalRevenue: 491530767.35 + 339013805.02 + 158348436.22, // 988,893,008.59
    reportDate: "09.10.2569 (งวด 12 ปี 2569)"
  },
  {
    hospitalCode: "11321",
    hospitalName: "รพ.สามร้อยยอด",
    docNumber: "2100200221",
    cashAndDeposits: 0.00 + 21500000.00 + 135183330.02, // 156,683,330.02
    govAR: 11570120.60,
    extAR: 6410806.05,
    allowanceBadDebt: -310250.04,
    inventoryGoods: 5025046.06,
    inventorySupplies: 562556.81,
    tradeAP: 0.00,
    otherAP: 8119025.84,
    accruedVouchers: 3446752.02,
    totalMedicalRevenue: 39477342.86 + 50711085.10 + 8475774.99, // 98,664,202.95
    reportDate: "14.10.2569 (งวด 12 ปี 2569)"
  }
];

// ==========================================
// 4. DATASET: ผลประเมินคุณภาพงบทดลอง 10 หมวด
// ==========================================

export const trialBalance10Items: TrialBalanceItem[] = [
  {
    id: 1,
    title: "1. การตรวจสอบความสัมพันธ์เรื่องกระทบยอดของรายการบัญชีเงินฝากธนาคารและการบันทึกบัญชีเงินงบประมาณ",
    maxScore: 45,
    scores: {
      "รพ.ประจวบ": { score: 45, percent: 100 },
      "รพ.กุยบุรี": { score: 45, percent: 100 },
      "รพ.ทับสะแก": { score: 45, percent: 100 },
      "รพ.บางสะพาน": { score: 40, percent: 88.89 },
      "รพ.บางสะพานน้อย": { score: 45, percent: 100 },
      "รพ.ปราณบุรี": { score: 45, percent: 100 },
      "รพ.หัวหิน": { score: 45, percent: 100 },
      "รพ.สามร้อยยอด": { score: 45, percent: 100 }
    }
  },
  {
    id: 2,
    title: "2. การปรับปรุงลูกหนี้ค่ารักษาพยาบาล ณ วันสิ้นเดือน",
    maxScore: 24,
    scores: {
      "รพ.ประจวบ": { score: 21, percent: 87.50 },
      "รพ.กุยบุรี": { score: 24, percent: 100 },
      "รพ.ทับสะแก": { score: 21, percent: 87.50 },
      "รพ.บางสะพาน": { score: 24, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 24, percent: 100 },
      "รพ.ปราณบุรี": { score: 24, percent: 100 },
      "รพ.หัวหิน": { score: 24, percent: 100 },
      "รพ.สามร้อยยอด": { score: 24, percent: 100 }
    }
  },
  {
    id: 3,
    title: "3. การตั้งค่าเผื่อหนี้สงสัยจะสูญ และค่าเผื่อหนี้สงสัยจะสูญกับหนี้สงสัยจะสูญ และหนี้สูญ",
    maxScore: 22,
    scores: {
      "รพ.ประจวบ": { score: 22, percent: 100 },
      "รพ.กุยบุรี": { score: 22, percent: 100 },
      "รพ.ทับสะแก": { score: 22, percent: 100 },
      "รพ.บางสะพาน": { score: 22, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 22, percent: 100 },
      "รพ.ปราณบุรี": { score: 21, percent: 95.45 },
      "รพ.หัวหิน": { score: 22, percent: 100 },
      "รพ.สามร้อยยอด": { score: 22, percent: 100 }
    }
  },
  {
    id: 4,
    title: "4. จับคู่ความสัมพันธ์ลูกหนี้ค่ารักษาพยาบาล - รายได้ค่ารักษาพยาบาล ระหว่างเดือน",
    maxScore: 14.5,
    scores: {
      "รพ.ประจวบ": { score: 13, percent: 89.66 },
      "รพ.กุยบุรี": { score: 14.5, percent: 100 },
      "รพ.ทับสะแก": { score: 13.5, percent: 93.10 },
      "รพ.บางสะพาน": { score: 13, percent: 89.66 },
      "รพ.บางสะพานน้อย": { score: 14.5, percent: 100 },
      "รพ.ปราณบุรี": { score: 14, percent: 96.55 },
      "รพ.หัวหิน": { score: 14, percent: 96.55 },
      "รพ.สามร้อยยอด": { score: 14.5, percent: 100 }
    }
  },
  {
    id: 5,
    title: "5. ความสัมพันธ์ของสินทรัพย์ถาวรกับค่าเสื่อมราคาสะสม ค่าเสื่อมราคาสะสมน้อยกว่าสินทรัพย์",
    maxScore: 11.75,
    scores: {
      "รพ.ประจวบ": { score: 11.75, percent: 100 },
      "รพ.กุยบุรี": { score: 11.75, percent: 100 },
      "รพ.ทับสะแก": { score: 11.75, percent: 100 },
      "รพ.บางสะพาน": { score: 11.75, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 11.75, percent: 100 },
      "รพ.ปราณบุรี": { score: 11.75, percent: 100 },
      "รพ.หัวหิน": { score: 11.75, percent: 100 },
      "รพ.สามร้อยยอด": { score: 11.75, percent: 100 }
    }
  },
  {
    id: 6,
    title: "6. จับคู่บัญชีค่าเสื่อมราคาสะสม และค่าเสื่อมราคา ระหว่างเดือน จะต้องเท่ากัน",
    maxScore: 11,
    scores: {
      "รพ.ประจวบ": { score: 11, percent: 100 },
      "รพ.กุยบุรี": { score: 11, percent: 100 },
      "รพ.ทับสะแก": { score: 11, percent: 100 },
      "รพ.บางสะพาน": { score: 11, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 11, percent: 100 },
      "รพ.ปราณบุรี": { score: 11, percent: 100 },
      "รพ.หัวหิน": { score: 11, percent: 100 },
      "รพ.สามร้อยยอด": { score: 11, percent: 100 }
    }
  },
  {
    id: 7,
    title: "7. บัญชีพัก ต้องไม่มียอดคงค้าง (ตามเกณฑ์ประเมินด้านบัญชีของกรมบัญชีกลาง)",
    maxScore: 1,
    scores: {
      "รพ.ประจวบ": { score: 1, percent: 100 },
      "รพ.กุยบุรี": { score: 1, percent: 100 },
      "รพ.ทับสะแก": { score: 1, percent: 100 },
      "รพ.บางสะพาน": { score: 1, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 1, percent: 100 },
      "รพ.ปราณบุรี": { score: 1, percent: 100 },
      "รพ.หัวหิน": { score: 1, percent: 100 },
      "รพ.สามร้อยยอด": { score: 1, percent: 100 }
    }
  },
  {
    id: 8,
    title: "8. จับคู่ความสัมพันธ์บัญชีวัสดุกับบัญชีเจ้าหนี้ระหว่างเดือน",
    maxScore: 12,
    scores: {
      "รพ.ประจวบ": { score: 12, percent: 100 },
      "รพ.กุยบุรี": { score: 11, percent: 91.67 },
      "รพ.ทับสะแก": { score: 10, percent: 83.33 },
      "รพ.บางสะพาน": { score: 11, percent: 91.67 },
      "รพ.บางสะพานน้อย": { score: 12, percent: 100 },
      "รพ.ปราณบุรี": { score: 10, percent: 83.33 },
      "รพ.หัวหิน": { score: 10, percent: 83.33 },
      "รพ.สามร้อยยอด": { score: 12, percent: 100 }
    }
  },
  {
    id: 9,
    title: "9. การตรวจสอบการบันทึกบัญชีค่าแรง , ตรวจสอบผังบัญชี , ตรวจสอบบัญชีทุน",
    maxScore: 16,
    scores: {
      "รพ.ประจวบ": { score: 14, percent: 87.50 },
      "รพ.กุยบุรี": { score: 16, percent: 100 },
      "รพ.ทับสะแก": { score: 16, percent: 100 },
      "รพ.บางสะพาน": { score: 16, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 16, percent: 100 },
      "รพ.ปราณบุรี": { score: 16, percent: 100 },
      "รพ.หัวหิน": { score: 12, percent: 75.00 },
      "รพ.สามร้อยยอด": { score: 16, percent: 100 }
    }
  },
  {
    id: 10,
    title: "10. บัญชีวัสดุคงเหลือ รายได้ค่ารักษาพยาบาลสุทธิ",
    maxScore: 3.25,
    scores: {
      "รพ.ประจวบ": { score: 3.25, percent: 100 },
      "รพ.กุยบุรี": { score: 3.25, percent: 100 },
      "รพ.ทับสะแก": { score: 3.25, percent: 100 },
      "รพ.บางสะพาน": { score: 3.25, percent: 100 },
      "รพ.บางสะพานน้อย": { score: 3.25, percent: 100 },
      "รพ.ปราณบุรี": { score: 3.25, percent: 100 },
      "รพ.หัวหิน": { score: 3, percent: 92.31 },
      "รพ.สามร้อยยอด": { score: 3.25, percent: 100 }
    }
  }
];

export const trialBalanceHospitalsSummary: TrialBalanceSummary[] = [
  { hospitalName: "รพ.สามร้อยยอด", totalScore: 160.5, percent: 100, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.บางสะพานน้อย", totalScore: 160, percent: 99.69, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.ประจวบคีรีขันธ์", totalScore: 158.5, percent: 98.75, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.บางสะพาน", totalScore: 158.25, percent: 98.6, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.ปราณบุรี", totalScore: 156.25, percent: 97.35, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.กุยบุรี", totalScore: 156, percent: 97.2, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.ทับสะแก", totalScore: 155.5, percent: 96.88, grade: "A", gradeLabel: "ดีมาก" },
  { hospitalName: "รพ.หัวหิน", totalScore: 151.25, percent: 94.24, grade: "A", gradeLabel: "ดีมาก" }
];

// ==========================================
// 5. DATASET: รายรับชดเชย IP 69
// ==========================================

export const ipRevenueDataset: IpMonthlyRevenue[] = [
  {
    hospitalName: "รพ.ประจวบคีรีขันธ์",
    estimatedIpRevenue: 67364658.07,
    revenuePercent: 78.43,
    totalCompAfterLabor: 52834015.01,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 1827464.71 },
      { period: "ต.ค. 68", amount: 3514757.26 },
      { period: "พ.ย. 68", amount: 7772651.97 },
      { period: "ธ.ค. 68", amount: 5937409.07 },
      { period: "ม.ค. 69", amount: 5040683.08 },
      { period: "ก.พ. 69", amount: 5202888.75 },
      { period: "มี.ค. 69", amount: 4894314.93 },
      { period: "เม.ย. 69", amount: 4883447.53 },
      { period: "พ.ค. 69", amount: 4220790.69 },
      { period: "มิ.ย. 69", amount: 4945778.69 },
      { period: "ก.ค. 69", amount: 4593828.33 }
    ]
  },
  {
    hospitalName: "รพ.กุยบุรี",
    estimatedIpRevenue: 10405230.15,
    revenuePercent: 74.96,
    totalCompAfterLabor: 7800115.65,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 284136.19 },
      { period: "ต.ค. 68", amount: 699479.79 },
      { period: "พ.ย. 68", amount: 808757.34 },
      { period: "ธ.ค. 68", amount: 890886.75 },
      { period: "ม.ค. 69", amount: 1047098.88 },
      { period: "ก.พ. 69", amount: 800055.83 },
      { period: "มี.ค. 69", amount: 749878.71 },
      { period: "เม.ย. 69", amount: 574062.33 },
      { period: "พ.ค. 69", amount: 733857.94 },
      { period: "มิ.ย. 69", amount: 760973.96 },
      { period: "ก.ค. 69", amount: 450927.93 }
    ]
  },
  {
    hospitalName: "รพ.ทับสะแก",
    estimatedIpRevenue: 19324548.95,
    revenuePercent: 52.88,
    totalCompAfterLabor: 10219676.48,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 428073.04 },
      { period: "ต.ค. 68", amount: 717902.30 },
      { period: "พ.ย. 68", amount: 1058775.40 },
      { period: "ธ.ค. 68", amount: 1477468.64 },
      { period: "ม.ค. 69", amount: 1051433.70 },
      { period: "ก.พ. 69", amount: 768451.79 },
      { period: "มี.ค. 69", amount: 683843.90 },
      { period: "เม.ย. 69", amount: 737486.91 },
      { period: "พ.ค. 69", amount: 832467.07 },
      { period: "มิ.ย. 69", amount: 752985.62 },
      { period: "ก.ค. 69", amount: 754259.90 }
    ]
  },
  {
    hospitalName: "รพ.บางสะพาน",
    estimatedIpRevenue: 49952835.24,
    revenuePercent: 83.89,
    totalCompAfterLabor: 41907808.10,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 1153479.21 },
      { period: "ต.ค. 68", amount: 2898058.83 },
      { period: "พ.ย. 68", amount: 6386195.60 },
      { period: "ธ.ค. 68", amount: 4023732.45 },
      { period: "ม.ค. 69", amount: 3489772.99 },
      { period: "ก.พ. 69", amount: 4279655.44 },
      { period: "มี.ค. 69", amount: 3727779.58 },
      { period: "เม.ย. 69", amount: 4696175.18 },
      { period: "พ.ค. 69", amount: 3543692.40 },
      { period: "มิ.ย. 69", amount: 2869363.38 },
      { period: "ก.ค. 69", amount: 4839903.04 }
    ]
  },
  {
    hospitalName: "รพ.บางสะพานน้อย",
    estimatedIpRevenue: 11163888.88,
    revenuePercent: 67.24,
    totalCompAfterLabor: 7506848.90,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 109123.70 },
      { period: "ต.ค. 68", amount: 1051311.99 },
      { period: "พ.ย. 68", amount: 611597.18 },
      { period: "ธ.ค. 68", amount: 976616.48 },
      { period: "ม.ค. 69", amount: 830889.32 },
      { period: "ก.พ. 69", amount: 540252.23 },
      { period: "มี.ค. 69", amount: 700143.59 },
      { period: "เม.ย. 69", amount: 604067.89 },
      { period: "พ.ค. 69", amount: 910796.11 },
      { period: "มิ.ย. 69", amount: 403796.12 },
      { period: "ก.ค. 69", amount: 768254.29 }
    ]
  },
  {
    hospitalName: "รพ.ปราณบุรี",
    estimatedIpRevenue: 11495249.31,
    revenuePercent: 116.74,
    totalCompAfterLabor: 13420050.46,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 231334.07 },
      { period: "ต.ค. 68", amount: 1119282.80 },
      { period: "พ.ย. 68", amount: 3574714.01 },
      { period: "ธ.ค. 68", amount: 1861708.85 },
      { period: "ม.ค. 69", amount: 930939.65 },
      { period: "ก.พ. 69", amount: 745157.77 },
      { period: "มี.ค. 69", amount: 848441.98 },
      { period: "เม.ย. 69", amount: 964205.85 },
      { period: "พ.ค. 69", amount: 979859.69 },
      { period: "มิ.ย. 69", amount: 1298726.91 },
      { period: "ก.ค. 69", amount: 865678.88 }
    ]
  },
  {
    hospitalName: "รพ.หัวหิน",
    estimatedIpRevenue: 129103357.97,
    revenuePercent: 85.46,
    totalCompAfterLabor: 110332256.66,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 8436121.49 },
      { period: "ต.ค. 68", amount: 9549140.01 },
      { period: "พ.ย. 68", amount: 14680229.13 },
      { period: "ธ.ค. 68", amount: 9300359.85 },
      { period: "ม.ค. 69", amount: 9882241.75 },
      { period: "ก.พ. 69", amount: 10120342.07 },
      { period: "มี.ค. 69", amount: 9590050.71 },
      { period: "เม.ย. 69", amount: 8097463.50 },
      { period: "พ.ค. 69", amount: 9977537.73 },
      { period: "มิ.ย. 69", amount: 11364831.20 },
      { period: "ก.ค. 69", amount: 9333939.22 }
    ]
  },
  {
    hospitalName: "รพ.สามร้อยยอด",
    estimatedIpRevenue: 11432347.64,
    revenuePercent: 76.91,
    totalCompAfterLabor: 8792774.26,
    monthlyDetails: [
      { period: "16-30 ก.ย. 68", amount: 58702.53 },
      { period: "ต.ค. 68", amount: 1057372.69 },
      { period: "พ.ย. 68", amount: 1009386.84 },
      { period: "ธ.ค. 68", amount: 903485.33 },
      { period: "ม.ค. 69", amount: 1224358.36 },
      { period: "ก.พ. 69", amount: 851075.71 },
      { period: "มี.ค. 69", amount: 917395.82 },
      { period: "เม.ย. 69", amount: 821535.11 },
      { period: "พ.ค. 69", amount: 591701.14 },
      { period: "มิ.ย. 69", amount: 689750.64 },
      { period: "ก.ค. 69", amount: 668010.09 }
    ]
  }
];

export const provincialTotalIpRevenue = {
  estimatedIpRevenue: 330242666.81,
  revenuePercent: 77.21,
  totalCompAfterLabor: 254980895.56,
  monthlyTotals: [
    { period: "16-30 ก.ย. 68", amount: 12531786.94 },
    { period: "ต.ค. 68", amount: 19507875.66 },
    { period: "พ.ย. 68", amount: 35672610.83 },
    { period: "ธ.ค. 68", amount: 25402000.48 },
    { period: "ม.ค. 69", amount: 23425427.75 },
    { period: "ก.พ. 69", amount: 23717018.61 },
    { period: "มี.ค. 69", amount: 23581688.64 },
    { period: "เม.ย. 69", amount: 22249604.96 },
    { period: "พ.ค. 69", amount: 22329677.14 },
    { period: "มิ.ย. 69", amount: 23299508.52 },
    { period: "ก.ค. 69", amount: 23263696.03 }
  ]
};
