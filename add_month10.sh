#!/bin/bash
# Remove the last two lines "  }\n];" from src/officialDatabase2569.ts
sed -i '$d' src/officialDatabase2569.ts
sed -i '$d' src/officialDatabase2569.ts

# Append new data and close array
cat << 'INNER_EOF' >> src/officialDatabase2569.ts
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
INNER_EOF
