#!/bin/bash
cat << 'INNER_EOF' > src/clinicalAdjRwData_temp.ts
export interface ClinicalAdjRwData {
  hospitalCode: string;
  hospitalName: string;
  type: string;
  beds: number;
  monthsSent: number;
  sentCount: number;
  calculatedCount: number;
  totalDaysOfStay: number;
  occupancyRate: number;
  sumAdjRw: number;
  cmi: number;
  minAdjRw: number;
  maxAdjRw: number;
  threshold: number;
}

export interface AdjRwPeriodReport {
  periodId: string;
  periodName: string;
  description: string;
  data: ClinicalAdjRwData[];
}

export const adjRwPeriods: AdjRwPeriodReport[] = [
  {
    periodId: "y2569-m10",
    periodName: "ปีงบประมาณ 2569 (สะสม 10 เดือน)",
    description: "รายงานเฉลี่ยสะสม 10 เดือน สำหรับปีงบประมาณ 2569 ประมวลผล เมื่อ 26 ส.ค. 69",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 60, monthsSent: 10, sentCount: 2000, calculatedCount: 2000, totalDaysOfStay: 12277, occupancyRate: 68.21, sumAdjRw: 3380.12, cmi: 1.11, minAdjRw: 0.19, maxAdjRw: 8.97, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 10, sentCount: 3000, calculatedCount: 3000, totalDaysOfStay: 13456, occupancyRate: 49.84, sumAdjRw: 3162.45, cmi: 0.91, minAdjRw: 0.19, maxAdjRw: 25.36, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 30, monthsSent: 10, sentCount: 1500, calculatedCount: 1500, totalDaysOfStay: 7107, occupancyRate: 78.97, sumAdjRw: 1594.75, cmi: 0.77, minAdjRw: 0.19, maxAdjRw: 7.37, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 72, monthsSent: 10, sentCount: 2500, calculatedCount: 2500, totalDaysOfStay: 12331, occupancyRate: 57.09, sumAdjRw: 2847.93, cmi: 0.96, minAdjRw: 0.19, maxAdjRw: 9.35, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 37, monthsSent: 10, sentCount: 2200, calculatedCount: 2200, totalDaysOfStay: 9779, occupancyRate: 88.10, sumAdjRw: 2421.36, cmi: 0.95, minAdjRw: 0.19, maxAdjRw: 7.37, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 169, monthsSent: 10, sentCount: 9000, calculatedCount: 9000, totalDaysOfStay: 49594, occupancyRate: 97.82, sumAdjRw: 13849.30, cmi: 1.30, minAdjRw: 0.19, maxAdjRw: 25.62, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 284, monthsSent: 10, sentCount: 15000, calculatedCount: 15000, totalDaysOfStay: 78068, occupancyRate: 91.63, sumAdjRw: 25608.00, cmi: 1.79, minAdjRw: 0.19, maxAdjRw: 36.68, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 419, monthsSent: 10, sentCount: 20000, calculatedCount: 20000, totalDaysOfStay: 113481, occupancyRate: 90.28, sumAdjRw: 37350.50, cmi: 2.02, minAdjRw: 0.19, maxAdjRw: 47.61, threshold: 1.2 }
    ]
  },
INNER_EOF
tail -n +26 src/clinicalAdjRwData.ts >> src/clinicalAdjRwData_temp.ts
mv src/clinicalAdjRwData_temp.ts src/clinicalAdjRwData.ts
