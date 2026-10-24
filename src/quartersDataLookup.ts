export interface RawQuarterData {
  cr: number;
  qr: number;
  cash: number;
  nwc: number;
  netIncome: number;
  ebitda: number;
  unencumberedFund: number;
  appDays: number;
  acpUcDays: number;
  acpCsDays: number;
  acpSssDays?: number;
  aipDays: number;
  trialBalanceScore?: number;
  riskScore: number;
  feedScore?: number;
  feedEvalStatus?: string;
  // Official TPS components
  processScore?: number;
  operationalScore?: number;
  tpsScore?: number;
  tpsGrade?: "A" | "B" | "C" | "D" | "E" | "F";
  opMargin?: number;
  roa?: number;
  bedOccupancyRate?: number;
  unitCostOp?: "ผ่าน" | "ไม่ผ่าน";
  unitCostIp?: "ผ่าน" | "ไม่ผ่าน";
  planfinRevenue?: "ผ่าน" | "ไม่ผ่าน";
  planfinExpense?: "ผ่าน" | "ไม่ผ่าน";
  lcLabor?: "ไม่เกินHGR" | "เกินHGR";
  mcDrug?: "ไม่เกินHGR" | "เกินHGR";
  mcLab?: "ไม่เกินHGR" | "เกินHGR";
  mcSupply?: "ไม่เกินHGR" | "เกินHGR";
  sumAdjRw?: "ผ่านเกณฑ์" | "ไม่ผ่านเกณฑ์";
  sumAdjRwValue?: number;
}

export const quartersDataLookup: Record<string, Record<string, RawQuarterData>> = {
  // รพ.ประจวบคีรีขันธ์
  "10737": {
    "2565Q1": { cr: 2.29, qr: 2.18, cash: 1.13, nwc: 259986863.13, netIncome: 5462603.00, ebitda: 28994655.58, unencumberedFund: 37918922.70, appDays: 157, acpUcDays: 42, acpCsDays: 165, aipDays: 41, riskScore: 0 },
    "2565Q2": { cr: 1.97, qr: 1.87, cash: 1.19, nwc: 227822320.94, netIncome: 92406071.89, ebitda: 108021126.45, unencumberedFund: 44469433.45, appDays: 246, acpUcDays: 79, acpCsDays: 168, aipDays: 42, riskScore: 0 },
    "2565Q3": { cr: 2.1,  qr: 1.99, cash: 1.14, nwc: 226181668.64, netIncome: 91620205.18, ebitda: 122257227.83, unencumberedFund: 29633858.68, appDays: 217, acpUcDays: 83, acpCsDays: 179, aipDays: 39, riskScore: 0 },
    "2565Q4": { cr: 1.92, qr: 1.81, cash: 1.15, nwc: 177901479.87, netIncome: 45764386.07, ebitda: 91940543.31, unencumberedFund: 28962914.88, appDays: 204, acpUcDays: 68, acpCsDays: 172, aipDays: 38, riskScore: 0 },
    "2566Q1": { cr: 2.27, qr: 2.14, cash: 1.36, nwc: 192794379.92, netIncome: 5293421.31, ebitda: 19172369.96, unencumberedFund: 54223629.60, appDays: 217, acpUcDays: 37, acpCsDays: 153, aipDays: 39, riskScore: 0 },
    "2566Q2": { cr: 2.4,  qr: 2.23, cash: 1.28, nwc: 190607133.69, netIncome: 5462603.00, ebitda: 28994655.58, unencumberedFund: 37918922.70, appDays: 157, acpUcDays: 42, acpCsDays: 165, aipDays: 41, riskScore: 0 },
    "2566Q3": { cr: 2.29, qr: 2.16, cash: 1.28, nwc: 168800269.19, netIncome: -28024684.45, ebitda: 11014562.08, unencumberedFund: 36741355.77, appDays: 165, acpUcDays: 45, acpCsDays: 145, aipDays: 33, riskScore: 1 },
    "2566Q4": { cr: 1.89, qr: 1.78, cash: 0.88, nwc: 124525210.47, netIncome: -79137934.93, ebitda: -23796800.29, unencumberedFund: -16420695.74, appDays: 150, acpUcDays: 44, acpCsDays: 138, aipDays: 30, riskScore: 1 },
    "2567Q1": { cr: 2.1,  qr: 1.96, cash: 0.84, nwc: 143255269.94, netIncome: 20141035.81, ebitda: 38260382.83, unencumberedFund: -20198804.08, appDays: 96, acpUcDays: 62, acpCsDays: 143, aipDays: 26, riskScore: 0 },
    "2567Q2": { cr: 2.1,  qr: 1.95, cash: 0.56, nwc: 155419665.61, netIncome: 18361147.87, ebitda: 54886572.13, unencumberedFund: -62217198.77, appDays: 102, acpUcDays: 49, acpCsDays: 152, aipDays: 28, riskScore: 1 },
    "2567Q3": { cr: 2.08, qr: 1.92, cash: 0.39, nwc: 189251416.98, netIncome: 34137585.26, ebitda: 83215013.20, unencumberedFund: -107130964.95, appDays: 121, acpUcDays: 72, acpCsDays: 141, aipDays: 31, riskScore: 1 },
    "2567Q4": { cr: 1.57, qr: 1.44, cash: 0.48, nwc: 108623367.27, netIncome: -35781156.41, ebitda: 12315624.42, unencumberedFund: -98949898.14, appDays: 132, acpUcDays: 80, acpCsDays: 148, aipDays: 30, riskScore: 2 },
    "2568Q1": { cr: 1.97, qr: 1.84, cash: 0.81, nwc: 185820508.14, netIncome: 46239254.54, ebitda: 6531779.33, unencumberedFund: -35636087.14, appDays: 192, acpUcDays: 70, acpCsDays: 133, aipDays: 31, riskScore: 0 },
    "2568Q2": { cr: 1.91, qr: 1.77, cash: 0.69, nwc: 162988703.27, netIncome: 43444737.45, ebitda: 75388923.04, unencumberedFund: -56139112.13, appDays: 175, acpUcDays: 70, acpCsDays: 154, aipDays: 38, riskScore: 1 },
    "2568Q3": { cr: 2.04, qr: 1.89, cash: 0.67, nwc: 163703193.16, netIncome: 19747632.34, ebitda: 58587193.68, unencumberedFund: -51589540.24, appDays: 158, acpUcDays: 70, acpCsDays: 167, aipDays: 39, riskScore: 1 },
    "2568Q4": { cr: 1.69, qr: 1.57, cash: 0.54, nwc: 114718976.14, netIncome: -19934507.51, ebitda: 23315097.47, unencumberedFund: -76760307.16, appDays: 151, acpUcDays: 76, acpCsDays: 136, aipDays: 36, riskScore: 2 },
    "2569Q1": { cr: 1.78, qr: 1.66, cash: 0.59, nwc: 140741356.00, netIncome: 38426848.96, ebitda: 52286528.55, unencumberedFund: -74137170.87, appDays: 127, acpUcDays: 81, acpCsDays: 82, aipDays: 38, riskScore: 1 },
    "2569Q2": { cr: 2.14, qr: 1.96, cash: 0.81, nwc: 191993591.96, netIncome: 97936680.00, ebitda: 101491008.66, unencumberedFund: -31700039.21, appDays: 124, acpUcDays: 109, acpCsDays: 81, aipDays: 49, riskScore: 0 },
    "2569Q3": { cr: 1.94, qr: 1.72, cash: 0.76, nwc: 165030722.10, netIncome: 65648673.35, ebitda: 84895389.09, unencumberedFund: -43162374.31, appDays: 115, acpUcDays: 124, acpCsDays: 72, acpSssDays: 243, aipDays: 51, riskScore: 1, trialBalanceScore: 300, processScore: 7.0, operationalScore: 4.0, tpsScore: 11.0, tpsGrade: "B", opMargin: 0.1328, roa: 0.1126, bedOccupancyRate: 90.022, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ไม่ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 22968.59, feedScore: 8.5, feedEvalStatus: "ผ่านเกณฑ์" },
    "2569Q4": { cr: 1.92, qr: 1.7, cash: 0.68, nwc: 162612000.33, netIncome: 61589103.27, ebitda: 86470684.26, unencumberedFund: -57479888.83, appDays: 115, acpUcDays: 130, acpCsDays: 80, acpSssDays: 243, aipDays: 49, riskScore: 1, trialBalanceScore: 158.5, processScore: 7.0, operationalScore: 3.0, tpsScore: 14, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 91.63, unitCostOp: "ผ่าน", unitCostIp: "ไม่ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 25608.00, feedScore: 5, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มลดลง" }
  },
  // รพ.กุยบุรี
  "11315": {
    "2565Q1": { cr: 7.25, qr: 7.04, cash: 6.69, nwc: 85700467.97, netIncome: 7717484.50, ebitda: 9905967.04, unencumberedFund: 78105788.25, appDays: 132, acpUcDays: 109, acpCsDays: 49, aipDays: 61, riskScore: 0 },
    "2565Q2": { cr: 7.67, qr: 7.47, cash: 5.33, nwc: 91702988.91, netIncome: 41565697.71, ebitda: 42376992.91, unencumberedFund: 59501122.91, appDays: 194, acpUcDays: 54, acpCsDays: 84, aipDays: 50, riskScore: 0 },
    "2565Q3": { cr: 7.49, qr: 7.3,  cash: 5.24, nwc: 90673300.09, netIncome: 38386646.92, ebitda: 40712038.32, unencumberedFund: 59230084.62, appDays: 212, acpUcDays: 66, acpCsDays: 73, aipDays: 49, riskScore: 0 },
    "2565Q4": { cr: 7.13, qr: 6.91, cash: 5.23, nwc: 85395990.23, netIncome: 38463059.58, ebitda: 42460939.98, unencumberedFund: 58883483.61, appDays: 218, acpUcDays: 78, acpCsDays: 69, aipDays: 53, riskScore: 0 },
    "2566Q1": { cr: 5.24, qr: 5.07, cash: 4.75, nwc: 82618077.66, netIncome: 3594319.04, ebitda: 5415789.49, unencumberedFund: 72924557.94, appDays: 128, acpUcDays: 133, acpCsDays: 55, aipDays: 66, riskScore: 0 },
    "2566Q2": { cr: 7.25, qr: 7.04, cash: 6.69, nwc: 85700467.97, netIncome: 7717484.50, ebitda: 9905967.04, unencumberedFund: 78105788.25, appDays: 132, acpUcDays: 109, acpCsDays: 49, aipDays: 61, riskScore: 0 },
    "2566Q3": { cr: 6.26, qr: 6.03, cash: 5.66, nwc: 70948848.44, netIncome: 5262419.97, ebitda: 9407466.00, unencumberedFund: 62881176.26, appDays: 123, acpUcDays: 112, acpCsDays: 66, aipDays: 67, riskScore: 0 },
    "2566Q4": { cr: 5.82, qr: 5.48, cash: 5.02, nwc: 59081571.07, netIncome: -6181045.31, ebitda: 395651.83, unencumberedFund: 49256126.46, appDays: 114, acpUcDays: 121, acpCsDays: 64, aipDays: 88, riskScore: 1 },
    "2567Q1": { cr: 5.32, qr: 5.0,  cash: 4.53, nwc: 63869091.85, netIncome: 1875795.17, ebitda: 4794899.25, unencumberedFund: 52252233.72, appDays: 94, acpUcDays: 72, acpCsDays: 48, aipDays: 125, riskScore: 0 },
    "2567Q2": { cr: 3.77, qr: 3.49, cash: 3.14, nwc: 57257131.69, netIncome: -5698338.34, ebitda: -1426525.46, unencumberedFund: 44138819.21, appDays: 96, acpUcDays: 61, acpCsDays: 50, aipDays: 167, riskScore: 1 },
    "2567Q3": { cr: 3.71, qr: 3.58, cash: 2.66, nwc: 59117837.64, netIncome: -2022056.13, ebitda: 505789.12, unencumberedFund: 36232015.98, appDays: 118, acpUcDays: 66, acpCsDays: 63, aipDays: 80, riskScore: 1 },
    "2567Q4": { cr: 3.02, qr: 2.88, cash: 2.48, nwc: 50433129.60, netIncome: -12341037.18, ebitda: -7552992.90, unencumberedFund: 37085782.68, appDays: 137, acpUcDays: 83, acpCsDays: 52, aipDays: 87, riskScore: 1 },
    "2568Q1": { cr: 3.28, qr: 3.12, cash: 2.81, nwc: 60125879.67, netIncome: 8213350.02, ebitda: 10316132.93, unencumberedFund: 47609889.80, appDays: 175, acpUcDays: 84, acpCsDays: 61, aipDays: 109, riskScore: 0 },
    "2568Q2": { cr: 3.5,  qr: 3.33, cash: 2.95, nwc: 64946742.17, netIncome: 13223176.27, ebitda: 15068688.57, unencumberedFund: 50562906.18, appDays: 168, acpUcDays: 83, acpCsDays: 61, aipDays: 102, riskScore: 0 },
    "2568Q3": { cr: 8.92, qr: 8.53, cash: 7.42, nwc: 71206088.54, netIncome: 7815558.95, ebitda: 11687718.09, unencumberedFund: 57731865.95, appDays: 116, acpUcDays: 76, acpCsDays: 73, aipDays: 81, riskScore: 0 },
    "2568Q4": { cr: 5.54, qr: 5.21, cash: 4.28, nwc: 53406292.95, netIncome: -11520688.08, ebitda: -5635790.19, unencumberedFund: 38527026.80, appDays: 121, acpUcDays: 89, acpCsDays: 71, aipDays: 83, riskScore: 1 },
    "2569Q1": { cr: 4.87, qr: 4.6,  cash: 3.86, nwc: 54046339.33, netIncome: 5346299.58, ebitda: 7525024.16, unencumberedFund: 39967980.52, appDays: 100, acpUcDays: 81, acpCsDays: 75, aipDays: 91, riskScore: 0 },
    "2569Q2": { cr: 5.23, qr: 5.01, cash: 4.32, nwc: 67089907.95, netIncome: 21715277.20, ebitda: 20996766.56, unencumberedFund: 52695010.46, appDays: 86, acpUcDays: 109, acpCsDays: 70, aipDays: 82, riskScore: 0 },
    "2569Q3": { cr: 4.98, qr: 4.8, cash: 4.08, nwc: 48048416.50, netIncome: 2421182.89, ebitda: 3874399.73, unencumberedFund: 37177527.88, appDays: 73, acpUcDays: 125, acpCsDays: 68, acpSssDays: 476, aipDays: 70, riskScore: 0, trialBalanceScore: 300, processScore: 7.0, operationalScore: 3.0, tpsScore: 10.0, tpsGrade: "C", opMargin: 0.0427, roa: 0.0228, bedOccupancyRate: 80.439, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 1458.23, feedScore: 8.0, feedEvalStatus: "ผ่านเกณฑ์" },
    "2569Q4": { cr: 3.56, qr: 3.42, cash: 2.87, nwc: 41016102.75, netIncome: -2970722.29, ebitda: -1405240.48, unencumberedFund: 30004194.23, appDays: 73, acpUcDays: 130, acpCsDays: 70, acpSssDays: 476, aipDays: 69, riskScore: 1, trialBalanceScore: 156, processScore: 7.0, operationalScore: 3.0, tpsScore: 14, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 78.97, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 1594.75, feedScore: 4, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มลดลง" }
  },
  // รพ.ทับสะแก
  "11316": {
    "2565Q1": { cr: 5.19, qr: 5.1,  cash: 4.34, nwc: 78212259.22, netIncome: 8991312.02, ebitda: 9243343.00, unencumberedFund: 62386550.34, appDays: 40, acpUcDays: 52, acpCsDays: 70, aipDays: 22, riskScore: 0 },
    "2565Q2": { cr: 3.56, qr: 3.44, cash: 2.59, nwc: 64452938.92, netIncome: 40541944.10, ebitda: 31883587.43, unencumberedFund: 39983175.04, appDays: 254, acpUcDays: 48, acpCsDays: 46, aipDays: 50, riskScore: 0 },
    "2565Q3": { cr: 4.51, qr: 4.42, cash: 3.23, nwc: 57854909.86, netIncome: 35751378.68, ebitda: 29346462.98, unencumberedFund: 36771573.10, appDays: 147, acpUcDays: 56, acpCsDays: 55, aipDays: 29, riskScore: 0 },
    "2565Q4": { cr: 6.73, qr: 6.5,  cash: 3.53, nwc: 70968953.94, netIncome: 46534661.46, ebitda: 42283887.40, unencumberedFund: 31343854.27, appDays: 105, acpUcDays: 48, acpCsDays: 50, aipDays: 34, riskScore: 0 },
    "2566Q1": { cr: 6.34, qr: 6.07, cash: 4.32, nwc: 65297313.33, netIncome: -7041575.70, ebitda: -5028028.09, unencumberedFund: 40541400.98, appDays: 28, acpUcDays: 76, acpCsDays: 71, aipDays: 31, riskScore: 1 },
    "2566Q2": { cr: 5.19, qr: 5.1,  cash: 4.34, nwc: 78212259.22, netIncome: 8991312.02, ebitda: 9243343.00, unencumberedFund: 62386550.34, appDays: 40, acpUcDays: 52, acpCsDays: 70, aipDays: 22, riskScore: 0 },
    "2566Q3": { cr: 4.12, qr: 3.98, cash: 3.39, nwc: 65882621.71, netIncome: -4779126.55, ebitda: -2514258.37, unencumberedFund: 50377902.63, appDays: 48, acpUcDays: 54, acpCsDays: 66, aipDays: 32, riskScore: 1 },
    "2566Q4": { cr: 4.77, qr: 4.37, cash: 3.39, nwc: 54102048.21, netIncome: -16882865.14, ebitda: -14234339.83, unencumberedFund: 34268930.75, appDays: 48, acpUcDays: 53, acpCsDays: 63, aipDays: 54, riskScore: 1 },
    "2567Q1": { cr: 4.23, qr: 3.96, cash: 3.18, nwc: 57957634.95, netIncome: 4439993.02, ebitda: 5139688.91, unencumberedFund: 39162608.18, appDays: 98, acpUcDays: 66, acpCsDays: 49, aipDays: 80, riskScore: 0 },
    "2567Q2": { cr: 5.5,  qr: 5.24, cash: 3.43, nwc: 64671650.86, netIncome: 10364170.23, ebitda: 13272567.13, unencumberedFund: 34901720.44, appDays: 78, acpUcDays: 59, acpCsDays: 50, aipDays: 57, riskScore: 0 },
    "2567Q3": { cr: 4.98, qr: 4.65, cash: 2.1,  nwc: 62271709.70, netIncome: 9076002.45, ebitda: 10958058.86, unencumberedFund: 17122231.41, appDays: 85, acpUcDays: 73, acpCsDays: 52, aipDays: 64, riskScore: 0 },
    "2567Q4": { cr: 4.32, qr: 3.95, cash: 2.75, nwc: 42219936.19, netIncome: -12629411.91, ebitda: -8644804.21, unencumberedFund: 34268930.75, appDays: 69, acpUcDays: 69, acpCsDays: 51, aipDays: 68, riskScore: 1 },
    "2568Q1": { cr: 4.13, qr: 3.83, cash: 2.82, nwc: 47536507.40, netIncome: 5911870.89, ebitda: 7290930.97, unencumberedFund: 27667195.44, appDays: 83, acpUcDays: 79, acpCsDays: 58, aipDays: 76, riskScore: 0 },
    "2568Q2": { cr: 3.73, qr: 3.48, cash: 2.54, nwc: 45348698.69, netIncome: 6226201.42, ebitda: 5481480.43, unencumberedFund: 25505680.72, appDays: 64, acpUcDays: 73, acpCsDays: 68, aipDays: 68, riskScore: 0 },
    "2568Q3": { cr: 3.82, qr: 3.55, cash: 2.51, nwc: 42389440.84, netIncome: -2284163.45, ebitda: -792689.11, unencumberedFund: 22657817.20, appDays: 68, acpUcDays: 73, acpCsDays: 64, aipDays: 53, riskScore: 1 },
    "2568Q4": { cr: 2.14, qr: 1.93, cash: 1.14, nwc: 24451104.28, netIncome: -18003418.82, ebitda: -18550930.78, unencumberedFund: 2965880.87, appDays: 81, acpUcDays: 80, acpCsDays: 66, aipDays: 74, riskScore: 1 },
    "2569Q1": { cr: 1.9,  qr: 1.81, cash: 1.15, nwc: 22254438.34, netIncome: -2408434.71, ebitda: -68990.89, unencumberedFund: 3744555.72, appDays: 129, acpUcDays: 81, acpCsDays: 70, aipDays: 46, riskScore: 1 },
    "2569Q2": { cr: 2.34, qr: 2.25, cash: 1.63, nwc: 31010274.45, netIncome: 4179554.84, ebitda: 8851899.82, unencumberedFund: 14693443.40, appDays: 131, acpUcDays: 102, acpCsDays: 67, aipDays: 54, riskScore: 0 },
    "2569Q3": { cr: 2.19, qr: 2.08, cash: 1.31, nwc: 21891911.87, netIncome: -2025055.01, ebitda: -313760.54, unencumberedFund: 5730472.29, appDays: 122, acpUcDays: 123, acpCsDays: 57, acpSssDays: 356, aipDays: 57, riskScore: 1, trialBalanceScore: 300, processScore: 6.5, operationalScore: 2.0, tpsScore: 8.5, tpsGrade: "D", opMargin: -0.0029, roa: -0.0210, bedOccupancyRate: 55.815, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ไม่ผ่าน", planfinExpense: "ผ่าน", lcLabor: "เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 2536.87, feedScore: 6.5, feedEvalStatus: "เฝ้าระวัง" },
    "2569Q4": { cr: 1.99, qr: 1.89, cash: 1.1, nwc: 19095439.87, netIncome: -5509037.72, ebitda: -2955593.97, unencumberedFund: 1887203.16, appDays: 122, acpUcDays: 124, acpCsDays: 69, acpSssDays: 356, aipDays: 56, riskScore: 1, trialBalanceScore: 155.5, processScore: 7.0, operationalScore: 3.0, tpsScore: 13, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 57.09, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 2847.93, feedScore: 5.5, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มดีขึ้น" }
  },
  // รพ.บางสะพาน
  "11317": {
    "2565Q1": { cr: 6.6,  qr: 6.32, cash: 3.36, nwc: 323496412.26, netIncome: 67910553.78, ebitda: 79737764.32, unencumberedFund: 136655024.45, appDays: 55, acpUcDays: 87, acpCsDays: 121, aipDays: 54, riskScore: 0 },
    "2565Q2": { cr: 5.32, qr: 5.06, cash: 2.25, nwc: 220153436.26, netIncome: 168783718.56, ebitda: 182472442.77, unencumberedFund: 63879075.81, appDays: 125, acpUcDays: 77, acpCsDays: 41, aipDays: 36, riskScore: 0 },
    "2565Q3": { cr: 7.6,  qr: 7.29, cash: 2.55, nwc: 303473735.47, netIncome: 261528340.01, ebitda: 285276808.81, unencumberedFund: 71062249.72, appDays: 137, acpUcDays: 105, acpCsDays: 59, aipDays: 39, riskScore: 0 },
    "2565Q4": { cr: 8.34, qr: 8.04, cash: 3.05, nwc: 280713359.90, netIncome: 317151541.27, ebitda: 350463585.81, unencumberedFund: 78439948.53, appDays: 137, acpUcDays: 103, acpCsDays: 51, aipDays: 36, riskScore: 0 },
    "2566Q1": { cr: 7.97, qr: 7.62, cash: 3.89, nwc: 297510416.64, netIncome: 16376401.73, ebitda: 25801293.61, unencumberedFund: 123373835.85, appDays: 57, acpUcDays: 82, acpCsDays: 117, aipDays: 53, riskScore: 0 },
    "2566Q2": { cr: 6.6,  qr: 6.32, cash: 3.36, nwc: 323496412.26, netIncome: 67910553.78, ebitda: 79737764.32, unencumberedFund: 136655024.45, appDays: 55, acpUcDays: 87, acpCsDays: 121, aipDays: 54, riskScore: 0 },
    "2566Q3": { cr: 6.62, qr: 6.21, cash: 3.52, nwc: 240587363.90, netIncome: 17461804.80, ebitda: 41242491.49, unencumberedFund: 107663962.67, appDays: 46, acpUcDays: 79, acpCsDays: 113, aipDays: 58, riskScore: 0 },
    "2566Q4": { cr: 4.42, qr: 4.07, cash: 2.51, nwc: 183431709.14, netIncome: -30027510.66, ebitda: 3305028.92, unencumberedFund: 80747574.52, appDays: 28, acpUcDays: 78, acpCsDays: 105, aipDays: 59, riskScore: 1 },
    "2567Q1": { cr: 4.8,  qr: 4.48, cash: 3.0,  nwc: 175662869.21, netIncome: 32080553.00, ebitda: 49174873.79, unencumberedFund: 92375692.03, appDays: 59, acpUcDays: 83, acpCsDays: 101, aipDays: 55, riskScore: 0 },
    "2567Q2": { cr: 4.59, qr: 4.28, cash: 2.06, nwc: 180060930.02, netIncome: 36252566.99, ebitda: 64186424.74, unencumberedFund: 53397112.75, appDays: 59, acpUcDays: 83, acpCsDays: 112, aipDays: 56, riskScore: 0 },
    "2567Q3": { cr: 4.62, qr: 4.31, cash: 1.49, nwc: 183211742.44, netIncome: 29517675.00, ebitda: 62981132.53, unencumberedFund: 24571344.87, appDays: 71, acpUcDays: 95, acpCsDays: 96, aipDays: 54, riskScore: 0 },
    "2567Q4": { cr: 2.82, qr: 2.58, cash: 1.25, nwc: 115018228.83, netIncome: -32801608.94, ebitda: 11682825.07, unencumberedFund: 15582888.84, appDays: 76, acpUcDays: 97, acpCsDays: 87, aipDays: 51, riskScore: 1 },
    "2568Q1": { cr: 2.82, qr: 2.57, cash: 1.59, nwc: 116584912.17, netIncome: 15805813.00, ebitda: 26866290.64, unencumberedFund: 37590159.92, appDays: 106, acpUcDays: 97, acpCsDays: 58, aipDays: 52, riskScore: 0 },
    "2568Q2": { cr: 2.59, qr: 2.38, cash: 1.34, nwc: 119473664.04, netIncome: 8440875.94, ebitda: 25462603.27, unencumberedFund: 25668391.75, appDays: 94, acpUcDays: 93, acpCsDays: 64, aipDays: 46, riskScore: 0 },
    "2568Q3": { cr: 2.48, qr: 2.19, cash: 1.2,  nwc: 126296202.42, netIncome: 1066620.67,  ebitda: 38382638.63, unencumberedFund: 17360724.33, appDays: 106, acpUcDays: 91, acpCsDays: 61, aipDays: 69, riskScore: 0 },
    "2568Q4": { cr: 1.85, qr: 1.61, cash: 0.71, nwc: 93523115.59, netIncome: -25081577.77, ebitda: 14393616.09, unencumberedFund: -32157441.89, appDays: 127, acpUcDays: 110, acpCsDays: 64, aipDays: 64, riskScore: 2 },
    "2569Q1": { cr: 2.01, qr: 1.77, cash: 0.88, nwc: 113032248.95, netIncome: 27177677.42, ebitda: 38209248.90, unencumberedFund: -13047405.99, appDays: 169, acpUcDays: 86, acpCsDays: 74, aipDays: 73, riskScore: 0 },
    "2569Q2": { cr: 2.03, qr: 1.92, cash: 1.13, nwc: 122758483.23, netIncome: 41311156.56, ebitda: 57759652.91, unencumberedFund: 15420094.49, appDays: 191, acpUcDays: 110, acpCsDays: 69, aipDays: 51, riskScore: 0 },
    "2569Q3": { cr: 1.78, qr: 1.65, cash: 0.96, nwc: 87535308.49, netIncome: 7978051.64, ebitda: 35487096.90, unencumberedFund: -4652133.52, appDays: 178, acpUcDays: 118, acpCsDays: 59, acpSssDays: 270, aipDays: 51, riskScore: 0, trialBalanceScore: 300, processScore: 7.5, operationalScore: 4.0, tpsScore: 11.5, tpsGrade: "B", opMargin: 0.0980, roa: 0.0125, bedOccupancyRate: 97.856, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ไม่ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 12496.07, feedScore: 9.0, feedEvalStatus: "ผ่านเกณฑ์" },
    "2569Q4": { cr: 1.69, qr: 1.57, cash: 0.83, nwc: 81508083.58, netIncome: -2993965.17, ebitda: 33635158.79, unencumberedFund: -19595347.58, appDays: 178, acpUcDays: 124, acpCsDays: 70, acpSssDays: 270, aipDays: 51, riskScore: 1, trialBalanceScore: 158.25, processScore: 7.0, operationalScore: 3.0, tpsScore: 14, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 97.82, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 13849.3, feedScore: 6.5, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มดีขึ้น" }
  },
  // รพ.บางสะพานน้อย
  "11318": {
    "2565Q1": { cr: 3.2,  qr: 3.03, cash: 2.68, nwc: 51884864.40, netIncome: 10201975.20, ebitda: 11891953.93, unencumberedFund: 39617733.83, appDays: 117, acpUcDays: 22, acpCsDays: 68, aipDays: 121, riskScore: 0 },
    "2565Q2": { cr: 2.97, qr: 2.84, cash: 1.84, nwc: 63022583.62, netIncome: 40254660.31, ebitda: 42452285.99, unencumberedFund: 26884351.07, appDays: 152, acpUcDays: 36, acpCsDays: 46, aipDays: 144, riskScore: 0 },
    "2565Q3": { cr: 3.05, qr: 2.92, cash: 1.86, nwc: 57452005.51, netIncome: 32923435.88, ebitda: 37058109.96, unencumberedFund: 24063245.13, appDays: 136, acpUcDays: 39, acpCsDays: 66, aipDays: 132, riskScore: 0 },
    "2565Q4": { cr: 2.86, qr: 2.7,  cash: 2.24, nwc: 42889296.65, netIncome: 16924330.10, ebitda: 22945898.64, unencumberedFund: 28606561.58, appDays: 132, acpUcDays: 26, acpCsDays: 38, aipDays: 140, riskScore: 0 },
    "2566Q1": { cr: 3.14, qr: 2.93, cash: 2.47, nwc: 44207755.17, netIncome: -1291010.65, ebitda: 1029768.10, unencumberedFund: 30416906.84, appDays: 132, acpUcDays: 26, acpCsDays: 65, aipDays: 101, riskScore: 1 },
    "2566Q2": { cr: 3.2,  qr: 3.03, cash: 2.68, nwc: 51884864.40, netIncome: 10201975.20, ebitda: 11891953.93, unencumberedFund: 39617733.83, appDays: 117, acpUcDays: 22, acpCsDays: 68, aipDays: 121, riskScore: 0 },
    "2566Q3": { cr: 3.01, qr: 2.79, cash: 2.58, nwc: 36905559.94, netIncome: 1008911.91,  ebitda: 4484777.45, unencumberedFund: 29073566.07, appDays: 92, acpUcDays: 22, acpCsDays: 76, aipDays: 122, riskScore: 0 },
    "2566Q4": { cr: 2.29, qr: 2.15, cash: 1.76, nwc: 23063179.26, netIncome: -11568409.51, ebitda: -6075937.88, unencumberedFund: 13662052.76, appDays: 99, acpUcDays: 24, acpCsDays: 66, aipDays: 145, riskScore: 1 },
    "2567Q1": { cr: 2.39, qr: 2.18, cash: 1.96, nwc: 30269181.17, netIncome: 4534972.80, ebitda: 6542966.83, unencumberedFund: 20780015.39, appDays: 72, acpUcDays: 30, acpCsDays: 31, aipDays: 117, riskScore: 0 },
    "2567Q2": { cr: 2.55, qr: 2.3,  cash: 1.6,  nwc: 33164975.58, netIncome: 6483973.81, ebitda: 10459655.38, unencumberedFund: 12824678.36, appDays: 74, acpUcDays: 29, acpCsDays: 36, aipDays: 143, riskScore: 0 },
    "2567Q3": { cr: 2.16, qr: 1.91, cash: 0.92, nwc: 26879023.87, netIncome: 4530528.47, ebitda: 7604856.58, unencumberedFund: -1938375.94, appDays: 78, acpUcDays: 30, acpCsDays: 35, aipDays: 166, riskScore: 0 },
    "2567Q4": { cr: 1.22, qr: 1.1,  cash: 0.88, nwc: 5238931.34, netIncome: -17662867.44, ebitda: -12416494.17, unencumberedFund: -2707372.97, appDays: 84, acpUcDays: 31, acpCsDays: 33, aipDays: 201, riskScore: 3 },
    "2568Q1": { cr: 1.4,  qr: 1.28, cash: 1.03, nwc: 10738037.02, netIncome: 4778649.78, ebitda: 6906057.96, unencumberedFund: 892127.16, appDays: 115, acpUcDays: 37, acpCsDays: 41, aipDays: 140, riskScore: 1 },
    "2568Q2": { cr: 1.36, qr: 1.23, cash: 1.01, nwc: 10847649.44, netIncome: 7210823.76, ebitda: 8631231.52, unencumberedFund: 208143.20, appDays: 98, acpUcDays: 33, acpCsDays: 42, aipDays: 108, riskScore: 1 },
    "2568Q3": { cr: 1.62, qr: 1.4,  cash: 0.97, nwc: 12345615.51, netIncome: 7885255.17, ebitda: 11378984.68, unencumberedFund: -558695.50, appDays: 98, acpUcDays: 37, acpCsDays: 44, aipDays: 147, riskScore: 0 },
    "2568Q4": { cr: 1.35, qr: 1.16, cash: 0.55, nwc: 7422176.26, netIncome: 4008867.93, ebitda: 9752418.22, unencumberedFund: -9641119.38, appDays: 101, acpUcDays: 64, acpCsDays: 56, aipDays: 182, riskScore: 2 },
    "2569Q1": { cr: 1.39, qr: 1.19, cash: 0.64, nwc: 7548398.25, netIncome: 3987266.36, ebitda: 6230723.27, unencumberedFund: -6958896.46, appDays: 91, acpUcDays: 64, acpCsDays: 59, aipDays: 194, riskScore: 2 },
    "2569Q2": { cr: 1.57, qr: 1.39, cash: 0.98, nwc: 13608736.17, netIncome: 13106034.71, ebitda: 16391493.08, unencumberedFund: -469781.28, appDays: 122, acpUcDays: 91, acpCsDays: 65, aipDays: 122, riskScore: 0 },
    "2569Q3": { cr: 1.27, qr: 1.08, cash: 0.63, nwc: 5662230.28, netIncome: 3691246.64, ebitda: 9384306.80, unencumberedFund: -7703790.61, appDays: 115, acpUcDays: 105, acpCsDays: 57, acpSssDays: 256, aipDays: 68, riskScore: 2, trialBalanceScore: 300, processScore: 8.0, operationalScore: 4.0, tpsScore: 12.0, tpsGrade: "A", opMargin: 0.1077, roa: 0.0473, bedOccupancyRate: 88.922, unitCostOp: "ไม่ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "เกินHGR", mcDrug: "เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 2190.33, feedScore: 9.5, feedEvalStatus: "ผ่านเกณฑ์ดีเยี่ยม" },
    "2569Q4": { cr: 1.14, qr: 0.94, cash: 0.5, nwc: 2977979.28, netIncome: 310663.86, ebitda: 6838661.4, unencumberedFund: -10860871.97, appDays: 115, acpUcDays: 113, acpCsDays: 56, acpSssDays: 256, aipDays: 67, riskScore: 2, trialBalanceScore: 160, processScore: 7.0, operationalScore: 3.0, tpsScore: 13, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 88.10, unitCostOp: "ไม่ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 2421.36, feedScore: 4.5, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มลดลง" }
  },
  // รพ.ปราณบุรี
  "11319": {
    "2565Q1": { cr: 5.74, qr: 5.63, cash: 1.36, nwc: 193869819.80, netIncome: 145782611.78, ebitda: 145210530.69, unencumberedFund: 14512107.28, appDays: 69, acpUcDays: 50, acpCsDays: 84, aipDays: 224, riskScore: 0 },
    "2565Q2": { cr: 5.79, qr: 5.7,  cash: 2.45, nwc: 214941434.09, netIncome: 174857228.89, ebitda: 176664438.45, unencumberedFund: 64803820.83, appDays: 181, acpUcDays: 29, acpCsDays: 93, aipDays: 224, riskScore: 0 },
    "2565Q3": { cr: 5.93, qr: 5.81, cash: 3.54, nwc: 185929341.33, netIncome: 137345136.30, ebitda: 141988245.26, unencumberedFund: 95851640.48, appDays: 166, acpUcDays: 47, acpCsDays: 95, aipDays: 319, riskScore: 0 },
    "2565Q4": { cr: 9.51, qr: 9.32, cash: 5.57, nwc: 174459804.12, netIncome: 121234962.41, ebitda: 128806308.88, unencumberedFund: 93684923.52, appDays: 127, acpUcDays: 37, acpCsDays: 90, aipDays: 366, riskScore: 0 },
    "2566Q1": { cr: 8.18, qr: 7.94, cash: 5.09, nwc: 155853667.62, netIncome: -5536643.54, ebitda: -3551487.89, unencumberedFund: 88780281.60, appDays: 61, acpUcDays: 68, acpCsDays: 86, aipDays: 316, riskScore: 1 },
    "2566Q2": { cr: 7.62, qr: 7.43, cash: 6.07, nwc: 17157437.12,  netIncome: 19296459.93, ebitda: 21148947.88, unencumberedFund: 131313312.77, appDays: 69, acpUcDays: 50, acpCsDays: 84, aipDays: 224, riskScore: 0 },
    "2566Q3": { cr: 7.18, qr: 6.74, cash: 5.39, nwc: 165336658.56, netIncome: 11250884.84, ebitda: 16242532.19, unencumberedFund: 117387422.16, appDays: 95, acpUcDays: 49, acpCsDays: 70, aipDays: 285, riskScore: 0 },
    "2566Q4": { cr: 7.07, qr: 6.68, cash: 5.76, nwc: 131240029.05, netIncome: -15206133.59, ebitda: 5619330.90, unencumberedFund: 103050958.89, appDays: 76, acpUcDays: 54, acpCsDays: 69, aipDays: 237, riskScore: 1 },
    "2567Q1": { cr: 5.48, qr: 5.15, cash: 4.62, nwc: 130642288.74, netIncome: -2063243.63, ebitda: 1155125.93, unencumberedFund: 105553686.54, appDays: 55, acpUcDays: 79, acpCsDays: 66, aipDays: 384, riskScore: 1 },
    "2567Q2": { cr: 5.66, qr: 5.24, cash: 4.63, nwc: 123919773.68, netIncome: -10515087.90, ebitda: -3917339.86, unencumberedFund: 96660669.19, appDays: 61, acpUcDays: 65, acpCsDays: 63, aipDays: 254, riskScore: 1 },
    "2567Q3": { cr: 4.95, qr: 4.59, cash: 3.9,  nwc: 108829169.28, netIncome: -24207756.85, ebitda: -16816832.82, unencumberedFund: 79856979.96, appDays: 69, acpUcDays: 75, acpCsDays: 72, aipDays: 270, riskScore: 1 },
    "2567Q4": { cr: 4.98, qr: 4.76, cash: 3.97, nwc: 114708825.14, netIncome: -21508438.77, ebitda: -9653783.51, unencumberedFund: 85668453.86, appDays: 81, acpUcDays: 117, acpCsDays: 64, aipDays: 273, riskScore: 1 },
    "2568Q1": { cr: 4.51, qr: 4.3,  cash: 3.62, nwc: 123968289.78, netIncome: 141029027.11, ebitda: 146769452.13, unencumberedFund: 92466066.38, appDays: 105, acpUcDays: 125, acpCsDays: 58, aipDays: 254, riskScore: 0 },
    "2568Q2": { cr: 4.55, qr: 4.34, cash: 3.57, nwc: 129580782.63, netIncome: 145381655.74, ebitda: 153197464.62, unencumberedFund: 93900243.94, appDays: 99, acpUcDays: 137, acpCsDays: 61, aipDays: 286, riskScore: 0 },
    "2568Q3": { cr: 5.9,  qr: 5.6,  cash: 4.42, nwc: 120812891.60, netIncome: 133717048.94, ebitda: 146863910.79, unencumberedFund: 84350788.39, appDays: 80, acpUcDays: 149, acpCsDays: 58, aipDays: 328, riskScore: 0 },
    "2568Q4": { cr: 3.51, qr: 3.34, cash: 2.41, nwc: 94926232.88, netIncome: 102941570.13, ebitda: 125634335.29, unencumberedFund: 53537666.48, appDays: 88, acpUcDays: 167, acpCsDays: 70, aipDays: 293, riskScore: 0 },
    "2569Q1": { cr: 3.26, qr: 3.09, cash: 2.36, nwc: 104211262.04, netIncome: 1121202.35,  ebitda: 5020796.03, unencumberedFund: 62656767.88, appDays: 94, acpUcDays: 209, acpCsDays: 68, aipDays: 229, riskScore: 0 },
    "2569Q2": { cr: 4.01, qr: 3.83, cash: 2.98, nwc: 116387230.37, netIncome: 15065697.06, ebitda: 17209789.19, unencumberedFund: 76270505.41, appDays: 81, acpUcDays: 288, acpCsDays: 66, aipDays: 245, riskScore: 0 },
    "2569Q3": { cr: 4.12, qr: 3.86, cash: 2.83, nwc: 99855969.60, netIncome: -4752284.14, ebitda: 1379926.78, unencumberedFund: 58400096.94, appDays: 79, acpUcDays: 304, acpCsDays: 69, acpSssDays: 250, aipDays: 79, riskScore: 1, trialBalanceScore: 300, processScore: 7.0, operationalScore: 3.0, tpsScore: 10.0, tpsGrade: "C", opMargin: 0.0103, roa: -0.0143, bedOccupancyRate: 68.272, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "เกินHGR", mcDrug: "เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 3032.85, feedScore: 8.0, feedEvalStatus: "ผ่านเกณฑ์" },
    "2569Q4": { cr: 4.3, qr: 4.02, cash: 2.94, nwc: 97495082.08, netIncome: -8434572.2, ebitda: -936887.23, unencumberedFund: 57329395.52, appDays: 79, acpUcDays: 310, acpCsDays: 70, acpSssDays: 250, aipDays: 77, riskScore: 1, trialBalanceScore: 156.25, processScore: 7.0, operationalScore: 3.0, tpsScore: 13, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 68.21, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 3380.12, feedScore: 4, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มดีขึ้น" }
  },
  // รพ.หัวหิน
  "11320": {
    "2565Q1": { cr: 3.7,  qr: 3.39, cash: 1.79, nwc: 607588534.20, netIncome: 185514662.70, ebitda: 195315994.00, unencumberedFund: 183212987.40, appDays: 94, acpUcDays: 30, acpCsDays: 31, aipDays: 237, riskScore: 0 },
    "2565Q2": { cr: 4.78, qr: 4.35, cash: 2.82, nwc: 648761172.99, netIncome: 222974399.70, ebitda: 244872065.47, unencumberedFund: 319312600.45, appDays: 105, acpUcDays: 33, acpCsDays: 29, aipDays: 143, riskScore: 0 },
    "2565Q3": { cr: 4.24, qr: 3.92, cash: 2.74, nwc: 659037637.15, netIncome: 226972283.38, ebitda: 270544552.60, unencumberedFund: 358561344.54, appDays: 103, acpUcDays: 37, acpCsDays: 32, aipDays: 149, riskScore: 0 },
    "2565Q4": { cr: 4.34, qr: 4.03, cash: 2.74, nwc: 669351357.39, netIncome: 245320759.87, ebitda: 290870233.25, unencumberedFund: 348198976.97, appDays: 100, acpUcDays: 14, acpCsDays: 34, aipDays: 194, riskScore: 0 },
    "2566Q1": { cr: 4.71, qr: 4.37, cash: 3.03, nwc: 711155981.51, netIncome: 67065863.72, ebitda: 68614276.35, unencumberedFund: 390081913.56, appDays: 106, acpUcDays: 51, acpCsDays: 28, aipDays: 224, riskScore: 0 },
    "2566Q2": { cr: 4.6,  qr: 4.27, cash: 3.33, nwc: 729240149.04, netIncome: 74982892.71, ebitda: 84989916.10, unencumberedFund: 472571005.35, appDays: 94, acpUcDays: 30, acpCsDays: 31, aipDays: 237, riskScore: 0 },
    "2566Q3": { cr: 5.09, qr: 4.7,  cash: 3.46, nwc: 716534851.26, netIncome: 113577619.58, ebitda: 93748358.23, unencumberedFund: 431323987.88, appDays: 76, acpUcDays: 36, acpCsDays: 43, aipDays: 234, riskScore: 0 },
    "2566Q4": { cr: 5.8,  qr: 5.07, cash: 3.52, nwc: 788713079.02, netIncome: 245745101.33, ebitda: 173386644.37, unencumberedFund: 415017849.07, appDays: 80, acpUcDays: 17, acpCsDays: 50, aipDays: 230, riskScore: 0 },
    "2567Q1": { cr: 5.72, qr: 5.19, cash: 3.53, nwc: 872960536.96, netIncome: 62581335.28, ebitda: 87704364.85, unencumberedFund: 467886874.11, appDays: 70, acpUcDays: 35, acpCsDays: 66, aipDays: 146, riskScore: 0 },
    "2567Q2": { cr: 7.16, qr: 6.5,  cash: 4.24, nwc: 916798979.08, netIncome: 129835057.70, ebitda: 181866304.99, unencumberedFund: 481570637.66, appDays: 71, acpUcDays: 40, acpCsDays: 68, aipDays: 148, riskScore: 0 },
    "2567Q3": { cr: 6.36, qr: 5.78, cash: 3.35, nwc: 967984304.55, netIncome: 176593752.16, ebitda: 237854812.86, unencumberedFund: 424566168.63, appDays: 75, acpUcDays: 36, acpCsDays: 71, aipDays: 146, riskScore: 0 },
    "2567Q4": { cr: 5.22, qr: 4.65, cash: 3.15, nwc: 789948068.61, netIncome: -12115574.39, ebitda: 87739661.57, unencumberedFund: 402405999.69, appDays: 64, acpUcDays: 18, acpCsDays: 69, aipDays: 142, riskScore: 1 },
    "2568Q1": { cr: 5.44, qr: 4.81, cash: 3.08, nwc: 808027455.97, netIncome: -11452242.50, ebitda: 28024685.03, unencumberedFund: 379318964.07, appDays: 42, acpUcDays: 40, acpCsDays: 63, aipDays: 146, riskScore: 1 },
    "2568Q2": { cr: 4.87, qr: 4.29, cash: 2.9,  nwc: 773965791.02, netIncome: 10379448.18, ebitda: 64314669.97, unencumberedFund: 379285434.63, appDays: 51, acpUcDays: 53, acpCsDays: 53, aipDays: 185, riskScore: 0 },
    "2568Q3": { cr: 4.27, qr: 3.77, cash: 2.52, nwc: 744936965.50, netIncome: -19984962.88, ebitda: 49881591.75, unencumberedFund: 345968872.97, appDays: 61, acpUcDays: 59, acpCsDays: 54, aipDays: 185, riskScore: 1 },
    "2568Q4": { cr: 3.62, qr: 3.09, cash: 1.82, nwc: 665362107.78, netIncome: -131522509.71, ebitda: 307915.56, unencumberedFund: 208408125.48, appDays: 69, acpUcDays: 76, acpCsDays: 63, aipDays: 154, riskScore: 1 },
    "2569Q1": { cr: 3.81, qr: 3.31, cash: 2.03, nwc: 668477966.24, netIncome: -13469706.98, ebitda: 20124457.85, unencumberedFund: 246117343.92, appDays: 93, acpUcDays: 147, acpCsDays: 65, aipDays: 117, riskScore: 1 },
    "2569Q2": { cr: 4.17, qr: 3.58, cash: 2.07, nwc: 648878042.94, netIncome: -9755798.06, ebitda: 18863748.38, unencumberedFund: 218276191.03, appDays: 81, acpUcDays: 180, acpCsDays: 56, aipDays: 122, riskScore: 1 },
    "2569Q3": { cr: 3.61, qr: 3.10, cash: 1.69, nwc: 602015117.90, netIncome: -50904812.47, ebitda: 15025966.13, unencumberedFund: 158688608.90, appDays: 82, acpUcDays: 186, acpCsDays: 62, acpSssDays: 166, aipDays: 92, riskScore: 1, trialBalanceScore: 300, processScore: 5.5, operationalScore: 3.0, tpsScore: 8.5, tpsGrade: "D", opMargin: 0.0151, roa: -0.0226, bedOccupancyRate: 90.343, unitCostOp: "ไม่ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ไม่ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "เกินHGR", mcLab: "เกินHGR", mcSupply: "เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 33728.07, feedScore: 6.5, feedEvalStatus: "เฝ้าระวัง" },
    "2569Q4": { cr: 4.23, qr: 3.59, cash: 1.89, nwc: 585591234.88, netIncome: -76928916.35, ebitda: 2491290.64, unencumberedFund: 162390007.71, appDays: 82, acpUcDays: 190, acpCsDays: 60, acpSssDays: 166, aipDays: 89, riskScore: 1, trialBalanceScore: 151.25, processScore: 7.0, operationalScore: 3.0, tpsScore: 10, tpsGrade: "C", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 90.28, unitCostOp: "ไม่ผ่าน", unitCostIp: "ไม่ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 37350.50, feedScore: 2.5, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มดีขึ้น" }
  },
  // รพ.สามร้อยยอด
  "11321": {
    "2565Q1": { cr: 7.66, qr: 7.49, cash: 5.51, nwc: 190605300.96, netIncome: 20011098.45, ebitda: 20583892.61, unencumberedFund: 203399425.53, appDays: 90, acpUcDays: 34, acpCsDays: 62, aipDays: 120, riskScore: 0 },
    "2565Q2": { cr: 8.71, qr: 8.55, cash: 6.87, nwc: 212360782.78, netIncome: 80372038.05, ebitda: 81602461.05, unencumberedFund: 161751084.26, appDays: 129, acpUcDays: 49, acpCsDays: 33, aipDays: 136, riskScore: 0 },
    "2565Q3": { cr: 8.97, qr: 8.75, cash: 7.31, nwc: 215114342.69, netIncome: 81702948.30, ebitda: 85103369.72, unencumberedFund: 170332842.56, appDays: 129, acpUcDays: 43, acpCsDays: 43, aipDays: 162, riskScore: 0 },
    "2565Q4": { cr: 11.9,  qr: 11.61, cash: 10.09, nwc: 211941927.88, netIncome: 85737134.82, ebitda: 91323480.27, unencumberedFund: 176703045.56, appDays: 112, acpUcDays: 30, acpCsDays: 39, aipDays: 147, riskScore: 0 },
    "2566Q1": { cr: 11.95, qr: 11.63, cash: 10.99, nwc: 205310864.90, netIncome: -6287391.27, ebitda: -3954011.38, unencumberedFund: 187367183.01, appDays: 88, acpUcDays: 27, acpCsDays: 32, aipDays: 253, riskScore: 1 },
    "2566Q2": { cr: 13.59, qr: 13.32, cash: 12.2, nwc: 228678248.58, netIncome: 20011098.45, ebitda: 20583892.61, unencumberedFund: 203399425.53, appDays: 90, acpUcDays: 34, acpCsDays: 62, aipDays: 120, riskScore: 0 },
    "2566Q3": { cr: 15.11, qr: 14.79, cash: 13.55, nwc: 216264236.92, netIncome: 12068546.70, ebitda: 15036061.81, unencumberedFund: 192431678.24, appDays: 84, acpUcDays: 28, acpCsDays: 53, aipDays: 153, riskScore: 0 },
    "2566Q4": { cr: 14.38, qr: 14.05, cash: 12.56, nwc: 207269627.57, netIncome: 2512343.59, ebitda: 8025587.56, unencumberedFund: 179044674.81, appDays: 87, acpUcDays: 32, acpCsDays: 51, aipDays: 153, riskScore: 0 },
    "2567Q1": { cr: 13.35, qr: 12.89, cash: 11.72, nwc: 212766124.41, netIncome: 4474792.60, ebitda: 7090656.67, unencumberedFund: 184570675.05, appDays: 61, acpUcDays: 41, acpCsDays: 64, aipDays: 383, riskScore: 0 },
    "2567Q2": { cr: 14.54, qr: 14.11, cash: 11.88, nwc: 224553116.67, netIncome: 16433227.09, ebitda: 21553089.48, unencumberedFund: 180325552.33, appDays: 65, acpUcDays: 49, acpCsDays: 60, aipDays: 245, riskScore: 0 },
    "2567Q3": { cr: 17.04, qr: 16.56, cash: 12.72, nwc: 220179712.08, netIncome: 16760604.33, ebitda: 21162729.54, unencumberedFund: 160874650.20, appDays: 68, acpUcDays: 60, acpCsDays: 60, aipDays: 252, riskScore: 0 },
    "2567Q4": { cr: 17.92, qr: 17.41, cash: 15.99, nwc: 198372729.97, netIncome: -7106752.99, ebitda: 1623393.70, unencumberedFund: 175730798.98, appDays: 69, acpUcDays: 35, acpCsDays: 61, aipDays: 334, riskScore: 1 },
    "2568Q1": { cr: 13.22, qr: 12.77, cash: 11.7, nwc: 208004575.04, netIncome: 4719144.30, ebitda: 12577165.25, unencumberedFund: 182216444.36, appDays: 59, acpUcDays: 38, acpCsDays: 52, aipDays: 209, riskScore: 0 },
    "2568Q2": { cr: 11.66, qr: 11.31, cash: 10.31, nwc: 206271617.66, netIncome: -235444.53, ebitda: 11190550.18, unencumberedFund: 180181088.23, appDays: 76, acpUcDays: 44, acpCsDays: 55, aipDays: 223, riskScore: 1 },
    "2568Q3": { cr: 13.08, qr: 12.66, cash: 11.42, nwc: 196981831.00, netIncome: -11759873.84, ebitda: 2489349.37, unencumberedFund: 169937263.41, appDays: 68, acpUcDays: 50, acpCsDays: 54, aipDays: 269, riskScore: 1 },
    "2568Q4": { cr: 12.28, qr: 11.80, cash: 10.32, nwc: 186334916.79, netIncome: -22003124.19, ebitda: -4859355.12, unencumberedFund: 154022560.15, appDays: 66, acpUcDays: 66, acpCsDays: 59, aipDays: 259, riskScore: 1 },
    "2569Q1": { cr: 12.3,  qr: 11.86, cash: 10.69, nwc: 189432922.50, netIncome: 4943978.79, ebitda: 8530290.90, unencumberedFund: 162442356.28, appDays: 68, acpUcDays: 60, acpCsDays: 57, aipDays: 203, riskScore: 0 },
    "2569Q2": { cr: 14.33, qr: 13.81, cash: 12.28, nwc: 201499106.60, netIncome: 16377725.68, ebitda: 21991403.14, unencumberedFund: 170431076.08, appDays: 62, acpUcDays: 84, acpCsDays: 62, aipDays: 260, riskScore: 0 },
    "2569Q3": { cr: 14.14, qr: 13.61, cash: 12.18, nwc: 181550820.60, netIncome: -944780.80, ebitda: 8049693.10, unencumberedFund: 154392624.40, appDays: 69, acpUcDays: 91, acpCsDays: 54, acpSssDays: 285, aipDays: 70, riskScore: 1, trialBalanceScore: 300, processScore: 7.5, operationalScore: 3.0, tpsScore: 10.5, tpsGrade: "B", opMargin: 0.0585, roa: -0.0035, bedOccupancyRate: 49.101, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "เกินHGR", mcDrug: "เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "เกินHGR", sumAdjRw: "ผ่านเกณฑ์", sumAdjRwValue: 2851.66, feedScore: 8.5, feedEvalStatus: "ผ่านเกณฑ์" },
    "2569Q4": { cr: 12.94, qr: 12.45, cash: 11.16, nwc: 175389930.41, netIncome: -4201487.49, ebitda: 6031069.2, unencumberedFund: 149225090.65, appDays: 69, acpUcDays: 96, acpCsDays: 53, acpSssDays: 285, aipDays: 70, riskScore: 1, trialBalanceScore: 160.5, processScore: 7.0, operationalScore: 3.0, tpsScore: 14, tpsGrade: "A", opMargin: 0.05, roa: 0.02, bedOccupancyRate: 49.84, unitCostOp: "ผ่าน", unitCostIp: "ผ่าน", planfinRevenue: "ผ่าน", planfinExpense: "ผ่าน", lcLabor: "ไม่เกินHGR", mcDrug: "ไม่เกินHGR", mcLab: "ไม่เกินHGR", mcSupply: "ไม่เกินHGR", sumAdjRw: "ไม่ผ่านเกณฑ์", sumAdjRwValue: 3162.45, feedScore: 4.5, feedEvalStatus: "ไม่ผ่านเกณฑ์-แนวโน้มดีขึ้น" }
  }
};
