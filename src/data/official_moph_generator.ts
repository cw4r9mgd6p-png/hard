import { quartersDataLookup, RawQuarterData } from '../quartersDataLookup';

export const hospitals = [
  { id: "10737", name: "รพ.ประจวบคีรีขันธ์", group: "รพท.S", beds: 284 },
  { id: "11315", name: "รพ.กุยบุรี", group: "รพช.F2", beds: 30 },
  { id: "11316", name: "รพ.ทับสะแก", group: "รพช.F2", beds: 72 },
  { id: "11317", name: "รพ.บางสะพาน", group: "รพท.M1", beds: 169 },
  { id: "11318", name: "รพ.บางสะพานน้อย", group: "รพช.F2", beds: 37 },
  { id: "11319", name: "รพ.ปราณบุรี", group: "รพช.F1", beds: 60 },
  { id: "11320", name: "รพ.หัวหิน", group: "รพท.S", beds: 419 },
  { id: "11321", name: "รพ.สามร้อยยอด", group: "รพช.F1", beds: 90 },
];

export interface RichMophOfficialData {
  id: string;
  name: string;
  group: string;
  beds: number;
  quarter: string;
  
  // 1. Liquidity
  cr: number;
  qr: number;
  cashRatio: number;
  nwc: number;
  
  // 2. Performance
  opMargin: number;
  roa: number;
  ebitda: number;
  netIncome: number;
  unencumberedFund: number;
  totalRevenue: number;
  totalExpense: number;
  
  // 3. AR / Rights
  appDays: number;
  acpUcDays: number;
  acpCsDays: number;
  acpSssDays: number;
  arUcAmount: number;
  arCsAmount: number;
  arSssAmount: number;
  arOtherAmount: number;
  arTotalAmount: number;
  unitCostOpStatus: "ผ่าน" | "ไม่ผ่าน";
  unitCostIpStatus: "ผ่าน" | "ไม่ผ่าน";
  
  // 4. Resources
  aipDays: number;
  bedOccupancyRate: number;
  bedOccupancyStatus: "เกิน 80%" | "ไม่เกิน 80%";
  lcLaborStatus: "เกินHGR" | "ไม่เกินHGR";
  mcDrugStatus: "เกินHGR" | "ไม่เกินHGR";
  mcLabStatus: "เกินHGR" | "ไม่เกินHGR";
  mcSupplyStatus: "เกินHGR" | "ไม่เกินHGR";
  planfinRevenueStatus: "ผ่าน" | "ไม่ผ่าน";
  planfinExpenseStatus: "ผ่าน" | "ไม่ผ่าน";
  
  // 5. Grades & Scores
  processScore: number;
  operationalScore: number;
  totalScore: number;
  trialBalanceScore: number;
  grade: "A" | "B" | "C" | "D" | "E" | "F";
  risk: number;
}

export function generateAllOfficialData(): RichMophOfficialData[] {
  const data: RichMophOfficialData[] = [];
  
  for (const h of hospitals) {
    const qData = quartersDataLookup[h.id];
    if (!qData) continue;
    
    for (const [quarterId, raw] of Object.entries(qData)) {
      
      // Calculate realistic metrics based on raw data
      const isPositiveEbitda = raw.ebitda > 0;
      const isPositiveNi = raw.netIncome > 0;
      const isHighCash = raw.cash > 0.8;
      
      const opMargin = raw.ebitda / (raw.ebitda + Math.abs(raw.netIncome) + 1000000); // synthetic ratio
      const roa = raw.netIncome / (raw.nwc + 50000000);
      
      // Revenue and Expense derived from net income and ebitda just for visualization
      const totalRevenue = Math.abs(raw.ebitda) * 1.5 + Math.abs(raw.netIncome) + 50000000;
      const totalExpense = totalRevenue - raw.netIncome;

      const acpSss = raw.acpSssDays || 45;
      const arUcAmount = (raw.acpUcDays / 90) * (totalRevenue * 0.55);
      const arCsAmount = (raw.acpCsDays / 90) * (totalRevenue * 0.20);
      const arSssAmount = (acpSss / 90) * (totalRevenue * 0.15);
      const arOtherAmount = (45 / 90) * (totalRevenue * 0.10);
      const arTotalAmount = arUcAmount + arCsAmount + arSssAmount + arOtherAmount;

      const baseScore = isPositiveEbitda && isPositiveNi ? 10 : (isHighCash ? 8 : 5);
      // Small variation based on hospital beds and quarter length
      const randomFactor = (h.beds % 3) + (quarterId.charCodeAt(quarterId.length - 1) % 2);
      
      const totalScore = Math.min(15, baseScore + randomFactor);
      
      let grade: "A"|"B"|"C"|"D"|"E"|"F" = "F";
      if (totalScore >= 13) grade = "A";
      else if (totalScore >= 11) grade = "B";
      else if (totalScore >= 9) grade = "C";
      else if (totalScore >= 7) grade = "D";
      else if (totalScore >= 5) grade = "E";
      
      const bedOccRate = Math.min(95, 50 + (h.beds % 40) + (isPositiveNi ? 15 : -10));
      
      data.push({
        id: h.id,
        name: h.name,
        group: h.group,
        beds: h.beds,
        quarter: quarterId,
        
        cr: raw.cr,
        qr: raw.qr,
        cashRatio: raw.cash,
        nwc: raw.nwc,
        
        opMargin: opMargin,
        roa: roa,
        ebitda: raw.ebitda,
        netIncome: raw.netIncome,
        unencumberedFund: raw.unencumberedFund,
        totalRevenue: totalRevenue,
        totalExpense: totalExpense,
        
        appDays: raw.appDays,
        acpUcDays: raw.acpUcDays,
        acpCsDays: raw.acpCsDays,
        acpSssDays: acpSss,
        arUcAmount,
        arCsAmount,
        arSssAmount,
        arOtherAmount,
        arTotalAmount,
        unitCostOpStatus: isPositiveEbitda ? "ผ่าน" : "ไม่ผ่าน",
        unitCostIpStatus: isPositiveNi ? "ผ่าน" : "ไม่ผ่าน",
        
        aipDays: raw.aipDays,
        bedOccupancyRate: bedOccRate,
        bedOccupancyStatus: bedOccRate > 80 ? "เกิน 80%" : "ไม่เกิน 80%",
        
        lcLaborStatus: raw.nwc > 0 ? "ไม่เกินHGR" : "เกินHGR",
        mcDrugStatus: raw.cash > 1 ? "ไม่เกินHGR" : "เกินHGR",
        mcLabStatus: isPositiveEbitda ? "ไม่เกินHGR" : "เกินHGR",
        mcSupplyStatus: isPositiveNi ? "ไม่เกินHGR" : "เกินHGR",
        planfinRevenueStatus: isPositiveEbitda ? "ผ่าน" : "ไม่ผ่าน",
        planfinExpenseStatus: raw.nwc > 0 ? "ผ่าน" : "ไม่ผ่าน",
        
        processScore: (totalScore * 0.6),
        operationalScore: (totalScore * 0.4),
        totalScore: totalScore,
        trialBalanceScore: raw.trialBalanceScore || 160.5,
        grade: grade,
        risk: raw.riskScore
      });
    }
  }
  
  return data.sort((a, b) => b.quarter.localeCompare(a.quarter));
}

export const richMophData = generateAllOfficialData();
