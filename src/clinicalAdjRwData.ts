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
  {
    periodId: "y2568-m6",
    periodName: "ปีงบประมาณ 2568 (สะสม 6 เดือน)",
    description: "รายงานเฉลี่ยสะสม 6 เดือน สำหรับปีงบประมาณ 2568 ติดตามสิทธิ์และการกระจายโรค",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 65, monthsSent: 6, sentCount: 1896, calculatedCount: 1896, totalDaysOfStay: 6249, occupancyRate: 52.823, sumAdjRw: 1715.25, cmi: 0.9047, minAdjRw: 0.1878, maxAdjRw: 8.2584, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 6, sentCount: 2162, calculatedCount: 2162, totalDaysOfStay: 8368, occupancyRate: 51.087, sumAdjRw: 1826.67, cmi: 0.8449, minAdjRw: 0.1899, maxAdjRw: 9.4795, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 40, monthsSent: 6, sentCount: 1427, calculatedCount: 1427, totalDaysOfStay: 4816, occupancyRate: 66.154, sumAdjRw: 1180.17, cmi: 0.8270, minAdjRw: 0.1878, maxAdjRw: 7.3738, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 60, monthsSent: 6, sentCount: 1997, calculatedCount: 1997, totalDaysOfStay: 8164, occupancyRate: 74.762, sumAdjRw: 2021.33, cmi: 1.0122, minAdjRw: 0.1878, maxAdjRw: 9.6295, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 37, monthsSent: 6, sentCount: 1595, calculatedCount: 1595, totalDaysOfStay: 5797, occupancyRate: 86.086, sumAdjRw: 1241.19, cmi: 0.7782, minAdjRw: 0.1878, maxAdjRw: 6.9190, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 156, monthsSent: 6, sentCount: 5683, calculatedCount: 5683, totalDaysOfStay: 24314, occupancyRate: 85.637, sumAdjRw: 6691.50, cmi: 1.1775, minAdjRw: 0.1899, maxAdjRw: 25.3646, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 278, monthsSent: 6, sentCount: 8845, calculatedCount: 8845, totalDaysOfStay: 50145, occupancyRate: 99.109, sumAdjRw: 15778.10, cmi: 1.7838, minAdjRw: 0.1899, maxAdjRw: 74.6087, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 419, monthsSent: 6, sentCount: 11714, calculatedCount: 11713, totalDaysOfStay: 63922, occupancyRate: 83.823, sumAdjRw: 23057.50, cmi: 1.9685, minAdjRw: 0.1899, maxAdjRw: 36.6793, threshold: 1.2 }
    ]
  },
  {
    periodId: "y2568-m12",
    periodName: "ปีงบประมาณ 2568 (สะสม 12 เดือน)",
    description: "สรุปรายงานประจำปีสะสม 12 เดือน สำหรับปีงบประมาณ 2568 สถิติติดตามรายหน่วยบริการ",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 65, monthsSent: 12, sentCount: 3618, calculatedCount: 3618, totalDaysOfStay: 12975, occupancyRate: 54.689, sumAdjRw: 3438.22, cmi: 0.9503, minAdjRw: 0.1878, maxAdjRw: 8.3011, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 12, sentCount: 4215, calculatedCount: 4215, totalDaysOfStay: 16357, occupancyRate: 49.793, sumAdjRw: 3627.00, cmi: 0.8605, minAdjRw: 0.1899, maxAdjRw: 10.0061, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 40, monthsSent: 12, sentCount: 2826, calculatedCount: 2826, totalDaysOfStay: 9455, occupancyRate: 64.760, sumAdjRw: 2272.76, cmi: 0.8042, minAdjRw: 0.1878, maxAdjRw: 7.3738, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 60, monthsSent: 12, sentCount: 4034, calculatedCount: 4034, totalDaysOfStay: 17149, occupancyRate: 78.306, sumAdjRw: 3967.39, cmi: 0.9835, minAdjRw: 0.1878, maxAdjRw: 9.6295, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 37, monthsSent: 12, sentCount: 3283, calculatedCount: 3283, totalDaysOfStay: 11864, occupancyRate: 87.849, sumAdjRw: 2760.72, cmi: 0.8409, minAdjRw: 0.1878, maxAdjRw: 9.1898, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 156, monthsSent: 12, sentCount: 11902, calculatedCount: 11902, totalDaysOfStay: 52367, occupancyRate: 91.969, sumAdjRw: 14451.20, cmi: 1.2142, minAdjRw: 0.1899, maxAdjRw: 36.6793, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 278, monthsSent: 12, sentCount: 17413, calculatedCount: 17413, totalDaysOfStay: 95516, occupancyRate: 94.132, sumAdjRw: 30780.10, cmi: 1.7677, minAdjRw: 0.1899, maxAdjRw: 74.6087, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 419, monthsSent: 12, sentCount: 22854, calculatedCount: 22853, totalDaysOfStay: 125704, occupancyRate: 82.194, sumAdjRw: 44666.10, cmi: 1.9545, minAdjRw: 0.1899, maxAdjRw: 36.6793, threshold: 1.2 }
    ]
  },
  {
    periodId: "y2567-m12",
    periodName: "ปีงบประมาณ 2567 (สะสม 12 เดือน)",
    description: "รายงานรวมและปิดงบประมาณปี 2567 สรุปประสิทธิภาพทางการแพทย์และการเบิกจ่ายสากล",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 60, monthsSent: 12, sentCount: 3259, calculatedCount: 3259, totalDaysOfStay: 10011, occupancyRate: 45.712, sumAdjRw: 2586.12, cmi: 0.7935, minAdjRw: 0.1899, maxAdjRw: 9.4795, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 12, sentCount: 4421, calculatedCount: 4421, totalDaysOfStay: 19065, occupancyRate: 58.037, sumAdjRw: 3846.58, cmi: 0.8701, minAdjRw: 0.1878, maxAdjRw: 9.9658, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 30, monthsSent: 12, sentCount: 2480, calculatedCount: 2480, totalDaysOfStay: 8423, occupancyRate: 76.922, sumAdjRw: 1922.40, cmi: 0.7752, minAdjRw: 0.1878, maxAdjRw: 7.9509, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 60, monthsSent: 12, sentCount: 4021, calculatedCount: 4021, totalDaysOfStay: 14976, occupancyRate: 68.384, sumAdjRw: 3785.29, cmi: 0.9414, minAdjRw: 0.1878, maxAdjRw: 25.3646, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 30, monthsSent: 12, sentCount: 2922, calculatedCount: 2922, totalDaysOfStay: 9473, occupancyRate: 86.511, sumAdjRw: 2106.60, cmi: 0.7209, minAdjRw: 0.1878, maxAdjRw: 6.9190, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 156, monthsSent: 12, sentCount: 12117, calculatedCount: 12114, totalDaysOfStay: 53164, occupancyRate: 93.368, sumAdjRw: 12503.20, cmi: 1.0321, minAdjRw: 0.1878, maxAdjRw: 36.6793, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 278, monthsSent: 12, sentCount: 17471, calculatedCount: 17471, totalDaysOfStay: 96903, occupancyRate: 95.499, sumAdjRw: 29762.90, cmi: 1.7036, minAdjRw: 0.1878, maxAdjRw: 47.6127, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 446, monthsSent: 12, sentCount: 24312, calculatedCount: 24310, totalDaysOfStay: 123496, occupancyRate: 75.862, sumAdjRw: 46564.30, cmi: 1.9154, minAdjRw: 0.1899, maxAdjRw: 47.6127, threshold: 1.2 }
    ]
  },
  {
    periodId: "y2567-m6",
    periodName: "ปีงบประมาณ 2567 (สะสม 6 เดือน)",
    description: "รายงานประเมินความชุกชุมและอัตราความเหมาะสมสิทธิ์รักษาพยาบาลครึ่งแรกของปี 2567",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 60, monthsSent: 6, sentCount: 1556, calculatedCount: 1556, totalDaysOfStay: 4661, occupancyRate: 42.683, sumAdjRw: 1225.02, cmi: 0.7873, minAdjRw: 0.1899, maxAdjRw: 9.4795, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 6, sentCount: 2154, calculatedCount: 2154, totalDaysOfStay: 9351, occupancyRate: 57.088, sumAdjRw: 1804.52, cmi: 0.8378, minAdjRw: 0.1878, maxAdjRw: 8.9730, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 30, monthsSent: 6, sentCount: 1183, calculatedCount: 1183, totalDaysOfStay: 3885, occupancyRate: 71.154, sumAdjRw: 898.41, cmi: 0.7594, minAdjRw: 0.1878, maxAdjRw: 7.9509, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 60, monthsSent: 6, sentCount: 2047, calculatedCount: 2047, totalDaysOfStay: 7361, occupancyRate: 67.408, sumAdjRw: 1905.11, cmi: 0.9307, minAdjRw: 0.1878, maxAdjRw: 8.5841, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 30, monthsSent: 6, sentCount: 1351, calculatedCount: 1351, totalDaysOfStay: 4331, occupancyRate: 79.322, sumAdjRw: 991.536, cmi: 0.7339, minAdjRw: 0.1878, maxAdjRw: 6.1819, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 156, monthsSent: 6, sentCount: 5982, calculatedCount: 5980, totalDaysOfStay: 25564, occupancyRate: 90.039, sumAdjRw: 5922.01, cmi: 0.9903, minAdjRw: 0.1899, maxAdjRw: 25.6231, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 278, monthsSent: 6, sentCount: 8938, calculatedCount: 8938, totalDaysOfStay: 49447, occupancyRate: 97.729, sumAdjRw: 14502.50, cmi: 1.6226, minAdjRw: 0.1899, maxAdjRw: 47.6127, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 446, monthsSent: 6, sentCount: 12240, calculatedCount: 12240, totalDaysOfStay: 62476, occupancyRate: 76.967, sumAdjRw: 23415.20, cmi: 1.9130, minAdjRw: 0.1899, maxAdjRw: 36.6793, threshold: 1.2 }
    ]
  },
  {
    periodId: "y2566-m6",
    periodName: "ปีงบประมาณ 2566 (สะสม 6 เดือน)",
    description: "ตารางผลสัมฤทธิ์สะสรมและคะแนนวินิจฉัยโรคตามสิทธิ์ ปีงบประมาณ 2566",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 60, monthsSent: 6, sentCount: 1815, calculatedCount: 1815, totalDaysOfStay: 7241, occupancyRate: 66.310, sumAdjRw: 1977.80, cmi: 1.0897, minAdjRw: 0.1878, maxAdjRw: 8.2584, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 6, sentCount: 2156, calculatedCount: 2156, totalDaysOfStay: 8433, occupancyRate: 51.484, sumAdjRw: 2037.51, cmi: 0.9450, minAdjRw: 0.1899, maxAdjRw: 25.3646, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 30, monthsSent: 5, sentCount: 1143, calculatedCount: 1135, totalDaysOfStay: 3564, occupancyRate: 78.675, sumAdjRw: 873.508, cmi: 0.7696, minAdjRw: 0.1955, maxAdjRw: 7.3738, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 72, monthsSent: 6, sentCount: 1766, calculatedCount: 1766, totalDaysOfStay: 7602, occupancyRate: 58.013, sumAdjRw: 1738.88, cmi: 0.9846, minAdjRw: 0.1878, maxAdjRw: 8.5841, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 37, monthsSent: 6, sentCount: 1505, calculatedCount: 1505, totalDaysOfStay: 6131, occupancyRate: 91.045, sumAdjRw: 1452.29, cmi: 0.9650, minAdjRw: 0.1899, maxAdjRw: 7.2420, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 169, monthsSent: 6, sentCount: 6435, calculatedCount: 6435, totalDaysOfStay: 30332, occupancyRate: 98.615, sumAdjRw: 8383.66, cmi: 1.3028, minAdjRw: 0.1899, maxAdjRw: 25.6231, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 284, monthsSent: 6, sentCount: 8777, calculatedCount: 8777, totalDaysOfStay: 47829, occupancyRate: 92.534, sumAdjRw: 15716.80, cmi: 1.7907, minAdjRw: 0.1899, maxAdjRw: 36.6793, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 419, monthsSent: 6, sentCount: 11441, calculatedCount: 11319, totalDaysOfStay: 69746, occupancyRate: 91.461, sumAdjRw: 22934.90, cmi: 2.0262, minAdjRw: 0.1899, maxAdjRw: 47.6127, threshold: 1.2 }
    ]
  },
  {
    periodId: "y2566-m7",
    periodName: "ปีงบประมาณ 2566 (สะสม 7 เดือน)",
    description: "รายงานเฉลี่ยผลวิเคราะห์ทางคลังและข้อมูล AdjRW สะสม 7 เดือน ยุคเริ่มระบบขยายข้ามสิทธิ์",
    data: [
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", type: "F1", beds: 60, monthsSent: 7, sentCount: 2086, calculatedCount: 2086, totalDaysOfStay: 8422, occupancyRate: 66.211, sumAdjRw: 2268.11, cmi: 1.0873, minAdjRw: 0.1878, maxAdjRw: 8.2584, threshold: 0.6 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", type: "F1", beds: 90, monthsSent: 7, sentCount: 2463, calculatedCount: 2463, totalDaysOfStay: 9719, occupancyRate: 50.938, sumAdjRw: 2303.00, cmi: 0.9350, minAdjRw: 0.1899, maxAdjRw: 25.3646, threshold: 0.6 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", type: "F2", beds: 30, monthsSent: 5, sentCount: 1143, calculatedCount: 1135, totalDaysOfStay: 3564, occupancyRate: 78.675, sumAdjRw: 873.508, cmi: 0.7696, minAdjRw: 0.1955, maxAdjRw: 7.3738, threshold: 0.6 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", type: "F2", beds: 72, monthsSent: 7, sentCount: 2051, calculatedCount: 2051, totalDaysOfStay: 8807, occupancyRate: 57.698, sumAdjRw: 2024.14, cmi: 0.9869, minAdjRw: 0.1878, maxAdjRw: 9.3453, threshold: 0.6 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", type: "F2", beds: 37, monthsSent: 7, sentCount: 1799, calculatedCount: 1799, totalDaysOfStay: 7126, occupancyRate: 90.847, sumAdjRw: 1748.52, cmi: 0.9719, minAdjRw: 0.1899, maxAdjRw: 7.2420, threshold: 0.6 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", type: "M1", beds: 169, monthsSent: 7, sentCount: 7447, calculatedCount: 7447, totalDaysOfStay: 34956, occupancyRate: 97.566, sumAdjRw: 9743.75, cmi: 1.3084, minAdjRw: 0.1899, maxAdjRw: 25.6231, threshold: 1.0 },
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", type: "S", beds: 284, monthsSent: 6, sentCount: 8777, calculatedCount: 8777, totalDaysOfStay: 47829, occupancyRate: 92.534, sumAdjRw: 15716.80, cmi: 1.7907, minAdjRw: 0.1899, maxAdjRw: 36.6793, threshold: 1.2 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", type: "S", beds: 419, monthsSent: 7, sentCount: 13171, calculatedCount: 12849, totalDaysOfStay: 79681, occupancyRate: 89.703, sumAdjRw: 25960.60, cmi: 2.0204, minAdjRw: 0.1899, maxAdjRw: 47.6127, threshold: 1.2 }
    ]
  }
];
