export interface AgingData {
  lessThan90Days: number;
  between90DaysAnd1Year: number;
  moreThan1Year: number;
  total: number;
}

export interface HospitalARData {
  hospitalName: string;
  
  // ลูกหนี้หน่วยงานภาครัฐ
  govGL: number;
  govGFMIS: number;
  govGFMISDiff: number; // GL - GFMIS
  govInsurance: number;
  govInsuranceDiff: number; // GL - Insurance
  govAging?: AgingData;
  
  // ลูกหนี้บุคคลภายนอก
  extGL: number;
  extGFMIS: number;
  extGFMISDiff: number; // GL - GFMIS
  extInsurance: number;
  extInsuranceDiff: number; // GL - Insurance
  extAging?: AgingData;
}

export interface MonthlyAuditReport {
  monthId: string; // e.g. "oct-2568"
  monthName: string; // e.g. "ตุลาคม 2568"
  reportDate: string; // e.g. "16 ธันวาคม 2568"
  data: HospitalARData[];
  remarks: string[];
}

export interface ExecutiveScenario {
  id: string;
  title: string;
  description: string;
  impactLabel: string;
  govDiffReduction: number; // percentage improvement
  extDiffReduction: number; // percentage improvement
  applied: boolean;
}
