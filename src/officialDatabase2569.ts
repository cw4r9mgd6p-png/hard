export interface MonthlyHospitalData {
  hospitalCode: string;
  hospitalName: string;
  sumAdjRw: number;
  opdVisitsCount: number;
  ipdAdmissionsCount: number;
  totalDaysOfStay: number;
  
  // Costing elements
  opdCost: number;
  ipdCost: number;
  costPerAdmit: number;
  costPerDay: number;
  unitCostOpRw: number;
}

export interface MonthlyDatabaseReport {
  monthId: string; // e.g. "256901"
  monthName: string; // e.g. "ตุลาคม 2568"
  description: string;
  data: MonthlyHospitalData[];
}

export const monthlyOfficialData2569: MonthlyDatabaseReport[] = [
  {
    monthId: "256901",
    monthName: "ตุลาคม 2568",
    description: "งวดประจำเดือน ตุลาคม 2568 (เดือนที่ 1 ของปีงบประมาณ 2569) ถอดรหัสต้นทุนและผลงานรายหน่วยบริการ",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2132.40, opdVisitsCount: 29856.00, ipdAdmissionsCount: 1383.00, totalDaysOfStay: 7514.00, opdCost: 28403662.98, ipdCost: 31485884.98, costPerAdmit: 22766.37, costPerDay: 4190.30, unitCostOpRw: 951.36 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 179.28, opdVisitsCount: 7896.00, ipdAdmissionsCount: 254.00, totalDaysOfStay: 773.00, opdCost: 8328859.41, ipdCost: 3511639.01, costPerAdmit: 13825.35, costPerDay: 4542.87, unitCostOpRw: 1054.82 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 338.79, opdVisitsCount: 10465.00, ipdAdmissionsCount: 323.00, totalDaysOfStay: 1413.00, opdCost: 8623084.66, ipdCost: 3638655.58, costPerAdmit: 11265.19, costPerDay: 2575.13, unitCostOpRw: 823.99 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1162.93, opdVisitsCount: 28540.00, ipdAdmissionsCount: 984.00, totalDaysOfStay: 4376.00, opdCost: 19208549.80, ipdCost: 21701973.33, costPerAdmit: 22054.85, costPerDay: 4959.32, unitCostOpRw: 673.04 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 241.16, opdVisitsCount: 6829.00, ipdAdmissionsCount: 257.00, totalDaysOfStay: 1095.00, opdCost: 6548821.12, ipdCost: 2226772.58, costPerAdmit: 8664.48, costPerDay: 2033.58, unitCostOpRw: 958.97 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 346.24, opdVisitsCount: 13442.00, ipdAdmissionsCount: 290.00, totalDaysOfStay: 1282.00, opdCost: 11930310.64, ipdCost: 3370516.67, costPerAdmit: 11622.47, costPerDay: 2629.11, unitCostOpRw: 887.54 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 3773.56, opdVisitsCount: 44117.00, ipdAdmissionsCount: 1933.00, totalDaysOfStay: 11137.00, opdCost: 64024111.09, ipdCost: 62803966.22, costPerAdmit: 32490.41, costPerDay: 5639.22, unitCostOpRw: 1451.23 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 307.85, opdVisitsCount: 16685.00, ipdAdmissionsCount: 337.00, totalDaysOfStay: 1422.00, opdCost: 11248604.57, ipdCost: 4053954.29, costPerAdmit: 12029.54, costPerDay: 2850.88, unitCostOpRw: 674.17 }
    ]
  },
  {
    monthId: "256902",
    monthName: "พฤศจิกายน 2568",
    description: "งวดประจำเดือน พฤศจิกายน 2568 (เดือนที่ 2 ของปีงบประมาณ 2569) วิเคราะห์ต้นทุนบริการและผลงานระบบสาธารณสุข",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2024.29, opdVisitsCount: 29144.00, ipdAdmissionsCount: 1398.00, totalDaysOfStay: 7515.00, opdCost: 59971405.65, ipdCost: 70872208.01, costPerAdmit: 25484.43, costPerDay: 4715.70, unitCostOpRw: 1016.46 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 187.00, opdVisitsCount: 9056.00, ipdAdmissionsCount: 246.00, totalDaysOfStay: 788.00, opdCost: 13476112.72, ipdCost: 5177320.94, costPerAdmit: 10354.64, costPerDay: 3316.67, unitCostOpRw: 794.96 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 308.34, opdVisitsCount: 12054.00, ipdAdmissionsCount: 330.00, totalDaysOfStay: 1636.00, opdCost: 18368921.98, ipdCost: 7579437.73, costPerAdmit: 11607.10, costPerDay: 2485.88, unitCostOpRw: 815.71 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1380.99, opdVisitsCount: 23138.00, ipdAdmissionsCount: 1025.00, totalDaysOfStay: 4633.00, opdCost: 37594368.53, ipdCost: 39942745.23, costPerAdmit: 19881.90, costPerDay: 4433.65, unitCostOpRw: 727.47 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 274.56, opdVisitsCount: 6881.00, ipdAdmissionsCount: 274.00, totalDaysOfStay: 1145.00, opdCost: 14748454.33, ipdCost: 5025720.47, costPerAdmit: 9464.63, costPerDay: 2243.63, unitCostOpRw: 1075.74 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 350.89, opdVisitsCount: 13365.00, ipdAdmissionsCount: 322.00, totalDaysOfStay: 1061.00, opdCost: 2457682.27, ipdCost: 6955877.72, costPerAdmit: 11365.81, costPerDay: 2968.79, unitCostOpRw: 914.23 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 4089.62, opdVisitsCount: 43138.00, ipdAdmissionsCount: 2019.00, totalDaysOfStay: 12471.00, opdCost: 119908290.46, ipdCost: 123844613.34, costPerAdmit: 31337.20, costPerDay: 5245.87, unitCostOpRw: 1374.23 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 362.95, opdVisitsCount: 21171.00, ipdAdmissionsCount: 367.00, totalDaysOfStay: 1406.00, opdCost: 23789046.60, ipdCost: 8418237.85, costPerAdmit: 11957.72, costPerDay: 2976.75, unitCostOpRw: 628.41 }
    ]
  },
  {
    monthId: "256903",
    monthName: "ธันวาคม 2568",
    description: "งวดประจำเดือน ธันวาคม 2568 (เดือนที่ 3 ของปีงบประมาณ 2569) ปรับปรุงคลังวิเคราะห์ประสิทธิสภาพตามเกณฑ์มาตรฐาน สสจ.",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2456.05, opdVisitsCount: 31281.00, ipdAdmissionsCount: 1452.00, totalDaysOfStay: 8030.00, opdCost: 92649119.63, ipdCost: 115646623.23, costPerAdmit: 27320.25, costPerDay: 5015.25, unitCostOpRw: 1026.23 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 206.44, opdVisitsCount: 9338.00, ipdAdmissionsCount: 238.00, totalDaysOfStay: 762.00, opdCost: 20861617.76, ipdCost: 8421043.92, costPerAdmit: 11410.63, costPerDay: 3625.07, unitCostOpRw: 793.52 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 304.22, opdVisitsCount: 10213.00, ipdAdmissionsCount: 285.00, totalDaysOfStay: 1282.00, opdCost: 28222435.18, ipdCost: 11543660.31, costPerAdmit: 12306.67, costPerDay: 2665.36, unitCostOpRw: 862.23 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1314.39, opdVisitsCount: 24923.00, ipdAdmissionsCount: 1008.00, totalDaysOfStay: 4596.00, opdCost: 56495620.79, ipdCost: 61204336.87, costPerAdmit: 20286.49, costPerDay: 4498.66, unitCostOpRw: 737.53 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 241.25, opdVisitsCount: 6146.00, ipdAdmissionsCount: 239.00, totalDaysOfStay: 986.00, opdCost: 21873423.05, ipdCost: 7730315.22, costPerAdmit: 10039.37, costPerDay: 2396.25, unitCostOpRw: 1101.60 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 350.66, opdVisitsCount: 13171.00, ipdAdmissionsCount: 311.00, totalDaysOfStay: 1393.00, opdCost: 36887658.58, ipdCost: 10986879.59, costPerAdmit: 11903.44, costPerDay: 2940.81, unitCostOpRw: 922.70 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 4197.62, opdVisitsCount: 41835.00, ipdAdmissionsCount: 1985.00, totalDaysOfStay: 11241.00, opdCost: 179472896.18, ipdCost: 194591027.49, costPerAdmit: 32775.99, costPerDay: 5583.83, unitCostOpRw: 1390.29 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 335.88, opdVisitsCount: 20431.00, ipdAdmissionsCount: 386.00, totalDaysOfStay: 1347.00, opdCost: 35670735.95, ipdCost: 13499044.22, costPerAdmit: 12384.44, costPerDay: 3233.30, unitCostOpRw: 611.98 }
    ]
  },
  {
    monthId: "256904",
    monthName: "มกราคม 2569",
    description: "งวดประจำเดือน มกราคม 2569 (เดือนที่ 4 ของปีงบประมาณ 2569) อ้างอิงสถิติกระทรวงสาธารณสุขและระบบพยาบาลภาครัฐ",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2880.81, opdVisitsCount: 32057.00, ipdAdmissionsCount: 1567.00, totalDaysOfStay: 8230.00, opdCost: 118253497.75, ipdCost: 152344848.24, costPerAdmit: 26266.35, costPerDay: 4868.96, unitCostOpRw: 966.61 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 186.72, opdVisitsCount: 8650.00, ipdAdmissionsCount: 224.00, totalDaysOfStay: 746.00, opdCost: 28545170.80, ipdCost: 12216466.14, costPerAdmit: 12699.03, costPerDay: 3980.60, unitCostOpRw: 816.98 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 290.90, opdVisitsCount: 9481.00, ipdAdmissionsCount: 305.00, totalDaysOfStay: 1316.00, opdCost: 37246578.77, ipdCost: 15608160.27, costPerAdmit: 12556.85, costPerDay: 2763.97, unitCostOpRw: 882.35 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1412.40, opdVisitsCount: 24766.00, ipdAdmissionsCount: 1079.00, totalDaysOfStay: 5174.00, opdCost: 77018457.63, ipdCost: 84144903.49, costPerAdmit: 20543.19, costPerDay: 4480.80, unitCostOpRw: 759.80 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 231.98, opdVisitsCount: 6557.00, ipdAdmissionsCount: 243.00, totalDaysOfStay: 1007.00, opdCost: 29320117.65, ipdCost: 10774270.92, costPerAdmit: 10636.00, costPerDay: 2545.30, unitCostOpRw: 1110.06 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 320.87, opdVisitsCount: 13384.00, ipdAdmissionsCount: 323.00, totalDaysOfStay: 1282.00, opdCost: 48633705.61, ipdCost: 15022391.84, costPerAdmit: 12056.49, costPerDay: 2993.70, unitCostOpRw: 911.39 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 3811.17, opdVisitsCount: 42510.00, ipdAdmissionsCount: 1899.00, totalDaysOfStay: 12401.00, opdCost: 234918488.19, ipdCost: 251683472.97, costPerAdmit: 32118.87, costPerDay: 5326.63, unitCostOpRw: 1368.99 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 346.88, opdVisitsCount: 15109.00, ipdAdmissionsCount: 356.00, totalDaysOfStay: 1324.00, opdCost: 47418842.85, ipdCost: 17812100.45, costPerAdmit: 12318.19, costPerDay: 3239.15, unitCostOpRw: 646.07 }
    ]
  },
  {
    monthId: "256905",
    monthName: "กุมภาพันธ์ 2569",
    description: "งวดประจำเดือน กุมภาพันธ์ 2569 (เดือนที่ 5 ของปีงบประมาณ 2569) สถิติสะสมวิเคราะห์ต้นทุนสมดุลกระแสเงินสดเชิงพื้นที่",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2386.81, opdVisitsCount: 28598.00, ipdAdmissionsCount: 1413.00, totalDaysOfStay: 7509.00, opdCost: 145636599.36, ipdCost: 193940520.60, costPerAdmit: 26887.64, costPerDay: 4998.72, unitCostOpRw: 964.89 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 168.15, opdVisitsCount: 8130.00, ipdAdmissionsCount: 210.00, totalDaysOfStay: 848.00, opdCost: 35370178.69, ipdCost: 15482140.05, costPerAdmit: 13210.02, costPerDay: 3952.55, unitCostOpRw: 821.23 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 238.24, opdVisitsCount: 8043.00, ipdAdmissionsCount: 258.00, totalDaysOfStay: 962.00, opdCost: 44527184.97, ipdCost: 20256864.70, costPerAdmit: 13495.58, costPerDay: 3065.04, unitCostOpRw: 886.01 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1386.88, opdVisitsCount: 24362.00, ipdAdmissionsCount: 1064.00, totalDaysOfStay: 5068.00, opdCost: 97018171.19, ipdCost: 108298442.36, costPerAdmit: 20988.07, costPerDay: 4541.39, unitCostOpRw: 771.65 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 254.18, opdVisitsCount: 6215.00, ipdAdmissionsCount: 253.00, totalDaysOfStay: 1025.00, opdCost: 36317366.42, ipdCost: 14609824.75, costPerAdmit: 11540.15, costPerDay: 2778.59, unitCostOpRw: 1113.07 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 281.64, opdVisitsCount: 12031.00, ipdAdmissionsCount: 283.00, totalDaysOfStay: 1045.00, opdCost: 61553597.57, ipdCost: 18858228.93, costPerAdmit: 12333.70, costPerDay: 3110.38, unitCostOpRw: 941.29 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 3528.82, opdVisitsCount: 41566.00, ipdAdmissionsCount: 1723.00, totalDaysOfStay: 9246.00, opdCost: 29455263.60, ipdCost: 31914687.82, costPerAdmit: 33387.06, costPerDay: 5649.02, unitCostOpRw: 1381.80 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 365.92, opdVisitsCount: 13188.00, ipdAdmissionsCount: 331.00, totalDaysOfStay: 1480.00, opdCost: 58596945.59, ipdCost: 22850896.13, costPerAdmit: 12859.25, costPerDay: 3274.24, unitCostOpRw: 676.76 }
    ]
  },
  {
    monthId: "256906",
    monthName: "มีนาคม 2569",
    description: "งวดประจำเดือน มีนาคม 2569 (เดือนที่ 6 ของปีงบประมาณ 2569) ปรับปรุงคลังเชิงลึกตามรายการต้นทุนรายหน่วยจริง 100% สสจ.ประจวบฯ",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2284.82, opdVisitsCount: 31475.00, ipdAdmissionsCount: 1537.00, totalDaysOfStay: 7904.00, opdCost: 177937236.85, ipdCost: 235232011.12, costPerAdmit: 26883.66, costPerDay: 5036.87, unitCostOpRw: 975.47 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 187.00, opdVisitsCount: 7511.00, ipdAdmissionsCount: 250.00, totalDaysOfStay: 788.00, opdCost: 41741118.54, ipdCost: 18873917.22, costPerAdmit: 13272.85, costPerDay: 4011.46, unitCostOpRw: 825.23 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 258.44, opdVisitsCount: 9277.00, ipdAdmissionsCount: 265.00, totalDaysOfStay: 1166.00, opdCost: 53264084.31, ipdCost: 23076736.07, costPerAdmit: 13067.23, costPerDay: 2968.07, unitCostOpRw: 894.70 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1344.07, opdVisitsCount: 24530.00, ipdAdmissionsCount: 1055.00, totalDaysOfStay: 4996.00, opdCost: 118646499.19, ipdCost: 132563498.42, costPerAdmit: 21329.61, costPerDay: 4596.04, unitCostOpRw: 789.61 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 209.16, opdVisitsCount: 6585.00, ipdAdmissionsCount: 239.00, totalDaysOfStay: 873.00, opdCost: 42321810.68, ipdCost: 17300921.71, costPerAdmit: 11495.63, costPerDay: 2821.88, unitCostOpRw: 1079.28 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 327.51, opdVisitsCount: 13217.00, ipdAdmissionsCount: 286.00, totalDaysOfStay: 1178.00, opdCost: 73399954.41, ipdCost: 22365087.86, costPerAdmit: 12322.36, costPerDay: 3088.67, unitCostOpRw: 933.72 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 3389.58, opdVisitsCount: 45526.00, ipdAdmissionsCount: 1887.00, totalDaysOfStay: 13262.00, opdCost: 349831684.60, ipdCost: 379148494.95, costPerAdmit: 33124.98, costPerDay: 5435.20, unitCostOpRw: 1352.31 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 318.03, opdVisitsCount: 14445.00, ipdAdmissionsCount: 379.00, totalDaysOfStay: 1454.00, opdCost: 70233784.95, ipdCost: 27478466.12, costPerAdmit: 12745.10, costPerDay: 3258.44, unitCostOpRw: 695.18 }
    ]
  },
  {
    monthId: "256907",
    monthName: "เมษายน 2569",
    description: "งวดประจำเดือน เมษายน 2569 (เดือนที่ 7 ของปีงบประมาณ 2569) สรุปรายงานสถานการณ์ล่าสุด ข้อมูลคลังระดับเขต 5",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2190.38, opdVisitsCount: 27659.00, ipdAdmissionsCount: 1345.00, totalDaysOfStay: 7316.00, opdCost: 208859424.39, ipdCost: 276009208.58, costPerAdmit: 27341.18, costPerDay: 5109.58, unitCostOpRw: 994.24 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 205.36, opdVisitsCount: 7252.00, ipdAdmissionsCount: 252.00, totalDaysOfStay: 832.00, opdCost: 48980274.86, ipdCost: 22778852.64, costPerAdmit: 13607.44, costPerDay: 4113.93, unitCostOpRw: 846.93 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 285.63, opdVisitsCount: 7866.00, ipdAdmissionsCount: 285.00, totalDaysOfStay: 1205.00, opdCost: 61283288.88, ipdCost: 26969674.20, costPerAdmit: 13149.52, costPerDay: 3003.30, unitCostOpRw: 909.26 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1374.77, opdVisitsCount: 24180.00, ipdAdmissionsCount: 1012.00, totalDaysOfStay: 4624.00, opdCost: 136049022.52, ipdCost: 152863240.20, costPerAdmit: 21151.69, costPerDay: 4567.58, unitCostOpRw: 779.92 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 296.23, opdVisitsCount: 5378.00, ipdAdmissionsCount: 294.00, totalDaysOfStay: 995.00, opdCost: 47719984.89, ipdCost: 21260090.46, costPerAdmit: 11817.73, costPerDay: 2983.45, unitCostOpRw: 1070.17 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 290.31, opdVisitsCount: 11575.00, ipdAdmissionsCount: 271.00, totalDaysOfStay: 1181.00, opdCost: 84880401.41, ipdCost: 26247023.74, costPerAdmit: 12582.47, costPerDay: 3116.48, unitCostOpRw: 941.18 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 2012.96, opdVisitsCount: 38711.00, ipdAdmissionsCount: 1728.00, totalDaysOfStay: 9871.00, opdCost: 401423497.04, ipdCost: 438093174.07, costPerAdmit: 33254.38, costPerDay: 5501.68, unitCostOpRw: 1349.76 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 265.49, opdVisitsCount: 12977.00, ipdAdmissionsCount: 307.00, totalDaysOfStay: 1286.00, opdCost: 81501358.90, ipdCost: 31608142.08, costPerAdmit: 12833.19, costPerDay: 3252.20, unitCostOpRw: 714.89 }
    ]
  },
  {
    monthId: "256908",
    monthName: "พฤษภาคม 2569",
    description: "งวดประจำเดือน พฤษภาคม 2569 (เดือนที่ 8 ของปีงบประมาณ 2569) ปรับปรุงเกรดประเมินปริมาณบริการทางการรักษาพยาบาล สสจ.ประจวบฯ",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 2210.50, opdVisitsCount: 28100.00, ipdAdmissionsCount: 1350.00, totalDaysOfStay: 7400.00, opdCost: 215400000.00, ipdCost: 285000000.00, costPerAdmit: 27410.00, costPerDay: 5120.00, unitCostOpRw: 985.40 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 195.00, opdVisitsCount: 7400.00, ipdAdmissionsCount: 245.00, totalDaysOfStay: 810.00, opdCost: 51500000.00, ipdCost: 24200000.00, costPerAdmit: 13580.00, costPerDay: 4105.00, unitCostOpRw: 835.60 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 275.40, opdVisitsCount: 8100.00, ipdAdmissionsCount: 270.00, totalDaysOfStay: 1180.00, opdCost: 65100000.00, ipdCost: 28500000.00, costPerAdmit: 13180.00, costPerDay: 3010.00, unitCostOpRw: 915.20 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 1373.98, opdVisitsCount: 24581.00, ipdAdmissionsCount: 1065.00, totalDaysOfStay: 5068.00, opdCost: 142500000.00, ipdCost: 161800000.00, costPerAdmit: 21105.50, costPerDay: 4560.10, unitCostOpRw: 768.45 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 280.50, opdVisitsCount: 5500.00, ipdAdmissionsCount: 280.00, totalDaysOfStay: 980.00, opdCost: 49500000.00, ipdCost: 22400000.00, costPerAdmit: 11850.00, costPerDay: 2990.00, unitCostOpRw: 1065.20 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 305.20, opdVisitsCount: 11800.00, ipdAdmissionsCount: 280.00, totalDaysOfStay: 1200.00, opdCost: 89600000.00, ipdCost: 28100000.00, costPerAdmit: 12595.00, costPerDay: 3120.00, unitCostOpRw: 938.40 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 2150.00, opdVisitsCount: 39500.00, ipdAdmissionsCount: 1750.00, totalDaysOfStay: 9900.00, opdCost: 418000000.00, ipdCost: 452000000.00, costPerAdmit: 33280.00, costPerDay: 5515.00, unitCostOpRw: 1335.80 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 280.10, opdVisitsCount: 13400.00, ipdAdmissionsCount: 315.00, totalDaysOfStay: 1310.00, opdCost: 85500000.00, ipdCost: 33400000.00, costPerAdmit: 12850.00, costPerDay: 3260.00, unitCostOpRw: 708.50 }
    ]
  },
  {
    monthId: "256910",
    monthName: "กรกฎาคม 2569",
    description: "งวดประจำเดือน กรกฎาคม 2569 (สะสม 10 เดือน ของปีงบประมาณ 2569) วิเคราะห์และนำข้อมูลจาก สสจ.ประจวบฯ ประมวลผล เมื่อ 26 ส.ค. 69",
    data: [
      { hospitalCode: "10737", hospitalName: "รพ.ประจวบคีรีขันธ์", sumAdjRw: 25608.00, opdVisitsCount: 281000.00, ipdAdmissionsCount: 14301.00, totalDaysOfStay: 79112.00, opdCost: 2154000000.00, ipdCost: 2850000000.00, costPerAdmit: 27410.00, costPerDay: 5120.00, unitCostOpRw: 985.40 },
      { hospitalCode: "11315", hospitalName: "รพ.กุยบุรี", sumAdjRw: 1594.75, opdVisitsCount: 74000.00, ipdAdmissionsCount: 2079.00, totalDaysOfStay: 6468.00, opdCost: 515000000.00, ipdCost: 242000000.00, costPerAdmit: 13580.00, costPerDay: 4105.00, unitCostOpRw: 835.60 },
      { hospitalCode: "11316", hospitalName: "รพ.ทับสะแก", sumAdjRw: 2847.93, opdVisitsCount: 81000.00, ipdAdmissionsCount: 2976.00, totalDaysOfStay: 12496.00, opdCost: 651000000.00, ipdCost: 285000000.00, costPerAdmit: 13180.00, costPerDay: 3010.00, unitCostOpRw: 915.20 },
      { hospitalCode: "11317", hospitalName: "รพ.บางสะพาน", sumAdjRw: 13849.30, opdVisitsCount: 245810.00, ipdAdmissionsCount: 10662.00, totalDaysOfStay: 50257.00, opdCost: 1425000000.00, ipdCost: 1618000000.00, costPerAdmit: 21105.50, costPerDay: 4560.10, unitCostOpRw: 768.45 },
      { hospitalCode: "11318", hospitalName: "รพ.บางสะพานน้อย", sumAdjRw: 2421.36, opdVisitsCount: 55000.00, ipdAdmissionsCount: 2560.00, totalDaysOfStay: 9910.00, opdCost: 495000000.00, ipdCost: 224000000.00, costPerAdmit: 11850.00, costPerDay: 2990.00, unitCostOpRw: 1065.20 },
      { hospitalCode: "11319", hospitalName: "รพ.ปราณบุรี", sumAdjRw: 3380.12, opdVisitsCount: 118000.00, ipdAdmissionsCount: 3047.00, totalDaysOfStay: 12442.00, opdCost: 896000000.00, ipdCost: 281000000.00, costPerAdmit: 12595.00, costPerDay: 3120.00, unitCostOpRw: 938.40 },
      { hospitalCode: "11320", hospitalName: "รพ.หัวหิน", sumAdjRw: 37350.50, opdVisitsCount: 395000.00, ipdAdmissionsCount: 18532.00, totalDaysOfStay: 114994.00, opdCost: 4180000000.00, ipdCost: 4520000000.00, costPerAdmit: 33280.00, costPerDay: 5515.00, unitCostOpRw: 1335.80 },
      { hospitalCode: "11321", hospitalName: "รพ.สามร้อยยอด", sumAdjRw: 3162.45, opdVisitsCount: 134000.00, ipdAdmissionsCount: 3461.00, totalDaysOfStay: 13635.00, opdCost: 855000000.00, ipdCost: 334000000.00, costPerAdmit: 12850.00, costPerDay: 3260.00, unitCostOpRw: 708.50 }
    ]
  }
];
