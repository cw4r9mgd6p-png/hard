import { MonthlyAuditReport, ExecutiveScenario } from './types';

export const monthlyReports: MonthlyAuditReport[] = [
  {
    monthId: "oct-2568",
    monthName: "ตุลาคม 2568",
    reportDate: "ตุลาคม 2568",
    remarks: [
      "รพ.ปราณบุรี ยอดตามGL มากกว่ายอดลูกหนี้ค่ารักษาพยาบาล (ประกัน) จำนวน 0.50 บาท"
    ],
    data: [
      {
        hospitalName: "รพ.ประจวบคีรีขันธ์",
        govGL: 157492477.41, govGFMIS: 157492477.41, govGFMISDiff: 0, govInsurance: 157492477.41, govInsuranceDiff: 0,
        extGL: 41171276.83, extGFMIS: 41171276.83, extGFMISDiff: 0, extInsurance: 41171276.83, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.กุยบุรี",
        govGL: 8422190.25, govGFMIS: 8422190.25, govGFMISDiff: 0, govInsurance: 8422190.25, govInsuranceDiff: 0,
        extGL: 2031688.00, extGFMIS: 2031688.00, extGFMISDiff: 0, extInsurance: 2031688.00, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.ทับสะแก",
        govGL: 11620054.04, govGFMIS: 11620054.04, govGFMISDiff: 0, govInsurance: 11620054.04, govInsuranceDiff: 0,
        extGL: 2566512.85, extGFMIS: 2566512.85, extGFMISDiff: 0, extInsurance: 2566512.85, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.บางสะพาน",
        govGL: 72425959.45, govGFMIS: 72425959.45, govGFMISDiff: 0, govInsurance: 72425959.45, govInsuranceDiff: 0,
        extGL: 14417518.40, extGFMIS: 14417518.40, extGFMISDiff: 0, extInsurance: 14417518.40, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.บางสะพานน้อย",
        govGL: 7760743.20, govGFMIS: 7760743.20, govGFMISDiff: 0, govInsurance: 7760743.20, govInsuranceDiff: 0,
        extGL: 3080457.00, extGFMIS: 3080457.00, extGFMISDiff: 0, extInsurance: 3080457.00, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.ปราณบุรี",
        govGL: 29025368.60, govGFMIS: 29025368.60, govGFMISDiff: 0, govInsurance: 29025368.10, govInsuranceDiff: 0.50,
        extGL: 7578211.01, extGFMIS: 7578211.01, extGFMISDiff: 0, extInsurance: 7578211.01, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.หัวหิน",
        govGL: 259271435.47, govGFMIS: 259271435.47, govGFMISDiff: 0, govInsurance: 259271435.47, govInsuranceDiff: 0,
        extGL: 64614079.85, extGFMIS: 64614079.85, extGFMISDiff: 0, extInsurance: 64614079.85, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.สามร้อยยอด",
        govGL: 13586875.16, govGFMIS: 13586875.16, govGFMISDiff: 0, govInsurance: 13586875.16, govInsuranceDiff: 0,
        extGL: 5608530.00, extGFMIS: 5608530.00, extGFMISDiff: 0, extInsurance: 5608530.00, extInsuranceDiff: 0
      }
    ]
  },
  {
    monthId: "nov-2568",
    monthName: "พฤศจิกายน 2568",
    reportDate: "16 ธันวาคม 2568",
    remarks: [
      "รพ.ปราณบุรี ยอดสุทธิตามจ่าย GL สูงกว่ายอดลูกหนี้ค่ารักษาพยาบาล (ประกัน) จำนวน 858.50 บาท และต่ำกว่าประกันงานรัฐสุทธิ -147,048.80 บาท",
      "รพ.ปราณบุรี ลูกหนี้บุคคลภายนอกตาม GL สูงกว่ายอดลูกหนี้ประกันฝ่ายบุคคลนอกจำนวน 2,756,050.15 บาท"
    ],
    data: [
      {
        hospitalName: "รพ.ประจวบคีรีขันธ์",
        govGL: 175220231.35, govGFMIS: 175220231.35, govGFMISDiff: 0, govInsurance: 175220231.35, govInsuranceDiff: 0,
        extGL: 35542663.74, extGFMIS: 35542663.74, extGFMISDiff: 0, extInsurance: 35542663.74, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.กุยบุรี",
        govGL: 10223084.97, govGFMIS: 10223084.97, govGFMISDiff: 0, govInsurance: 10223084.97, govInsuranceDiff: 0,
        extGL: 1551072.00, extGFMIS: 1551072.00, extGFMISDiff: 0, extInsurance: 1551072.00, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.ทับสะแก",
        govGL: 14463654.89, govGFMIS: 14463654.89, govGFMISDiff: 0, govInsurance: 14463654.89, govInsuranceDiff: 0,
        extGL: 2566283.50, extGFMIS: 2566283.50, extGFMISDiff: 0, extInsurance: 2566283.50, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.บางสะพาน",
        govGL: 90258436.26, govGFMIS: 90258436.26, govGFMISDiff: 0, govInsurance: 90258436.26, govInsuranceDiff: 0,
        extGL: 12392781.90, extGFMIS: 12392781.90, extGFMISDiff: 0, extInsurance: 12392781.90, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.บางสะพานน้อย",
        govGL: 9443587.95, govGFMIS: 9443587.95, govGFMISDiff: 0, govInsurance: 9443587.95, govInsuranceDiff: 0,
        extGL: 2941015.75, extGFMIS: 2941015.75, extGFMISDiff: 0, extInsurance: 2941015.75, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.ปราณบุรี",
        govGL: 31816626.66, govGFMIS: 31816626.66, govGFMISDiff: 0, govInsurance: 31963675.46, govInsuranceDiff: -147048.80,
        extGL: 6830597.01, extGFMIS: 6830597.01, extGFMISDiff: 0, extInsurance: 4074546.86, extInsuranceDiff: 2756050.15
      },
      {
        hospitalName: "รพ.หัวหิน",
        govGL: 241583266.94, govGFMIS: 241583266.94, govGFMISDiff: 0, govInsurance: 241583266.94, govInsuranceDiff: 0,
        extGL: 54183211.52, extGFMIS: 54183211.52, extGFMISDiff: 0, extInsurance: 54183211.52, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.สามร้อยยอด",
        govGL: 15605523.46, govGFMIS: 15605523.46, govGFMISDiff: 0, govInsurance: 15605523.46, govInsuranceDiff: 0,
        extGL: 4705329.00, extGFMIS: 4705329.00, extGFMISDiff: 0, extInsurance: 4705329.00, extInsuranceDiff: 0
      }
    ]
  },
  {
    monthId: "dec-2568",
    monthName: "ธันวาคม 2568",
    reportDate: "20 มกราคม 2569",
    remarks: [
      "รพ.ปราณบุรี ยอดลูกหนี้ค้างรวมตามบัญชี GL มากกว่าฝั่งประกันภัย (ภาครัฐ) จำนวน 36,344.20 บาท"
    ],
    data: [
      {
        hospitalName: "รพ.ประจวบคีรีขันธ์",
        govGL: 161830382.54, govGFMIS: 161830382.54, govGFMISDiff: 0, govInsurance: 161830382.54, govInsuranceDiff: 0,
        extGL: 33400931.99, extGFMIS: 33400931.99, extGFMISDiff: 0, extInsurance: 33400931.99, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.กุยบุรี",
        govGL: 8563365.45, govGFMIS: 8563365.45, govGFMISDiff: 0, govInsurance: 8563365.45, govInsuranceDiff: 0,
        extGL: 1568614.00, extGFMIS: 1568614.00, extGFMISDiff: 0, extInsurance: 1568614.00, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.ทับสะแก",
        govGL: 13417211.34, govGFMIS: 13417211.34, govGFMISDiff: 0, govInsurance: 13417211.34, govInsuranceDiff: 0,
        extGL: 2755662.75, extGFMIS: 2755662.75, extGFMISDiff: 0, extInsurance: 2755662.75, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.บางสะพาน",
        govGL: 85662908.02, govGFMIS: 85662908.02, govGFMISDiff: 0, govInsurance: 85662908.02, govInsuranceDiff: 0,
        extGL: 13122309.65, extGFMIS: 13122309.65, extGFMISDiff: 0, extInsurance: 13122309.65, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.บางสะพานน้อย",
        govGL: 7982351.00, govGFMIS: 7982351.00, govGFMISDiff: 0, govInsurance: 7982351.00, govInsuranceDiff: 0,
        extGL: 2895693.70, extGFMIS: 2895693.70, extGFMISDiff: 0, extInsurance: 2895693.70, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.ปราณบุรี",
        govGL: 26719935.93, govGFMIS: 26719935.93, govGFMISDiff: 0, govInsurance: 26683591.73, govInsuranceDiff: 36344.20,
        extGL: 7196099.01, extGFMIS: 7196099.01, extGFMISDiff: 0, extInsurance: 7196099.01, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.หัวหิน",
        govGL: 249834008.08, govGFMIS: 249834008.08, govGFMISDiff: 0, govInsurance: 249834008.08, govInsuranceDiff: 0,
        extGL: 58544614.57, extGFMIS: 58544614.57, extGFMISDiff: 0, extInsurance: 58544614.57, extInsuranceDiff: 0
      },
      {
        hospitalName: "รพ.สามร้อยยอด",
        govGL: 14794455.96, govGFMIS: 14794455.96, govGFMISDiff: 0, govInsurance: 14794455.96, govInsuranceDiff: 0,
        extGL: 5227951.00, extGFMIS: 5227951.00, extGFMISDiff: 0, extInsurance: 5227951.00, extInsuranceDiff: 0
      }
    ]
  },
  {
    monthId: "jan-2569",
    monthName: "มกราคม 2569",
    reportDate: "16 กุมภาพันธ์ 2569",
    remarks: [],
    data: [
      { hospitalName: "รพ.ประจวบคีรีขันธ์", govGL: 164957493.76, govGFMIS: 164957493.76, govGFMISDiff: 0, govInsurance: 164957493.76, govInsuranceDiff: 0, extGL: 34111154.05, extGFMIS: 34111154.05, extGFMISDiff: 0, extInsurance: 34111154.05, extInsuranceDiff: 0 },
      { hospitalName: "รพ.กุยบุรี", govGL: 9888542.09, govGFMIS: 9888542.09, govGFMISDiff: 0, govInsurance: 9888542.09, govInsuranceDiff: 0, extGL: 1732905.00, extGFMIS: 1732905.00, extGFMISDiff: 0, extInsurance: 1732905.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ทับสะแก", govGL: 13259215.65, govGFMIS: 13259215.65, govGFMISDiff: 0, govInsurance: 13259215.65, govInsuranceDiff: 0, extGL: 3259735.40, extGFMIS: 3259735.40, extGFMISDiff: 0, extInsurance: 3259735.40, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพาน", govGL: 88519001.07, govGFMIS: 88519001.07, govGFMISDiff: 0, govInsurance: 88519001.07, govInsuranceDiff: 0, extGL: 14284360.90, extGFMIS: 14284360.90, extGFMISDiff: 0, extInsurance: 14284360.90, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพานน้อย", govGL: 7668961.00, govGFMIS: 7668961.00, govGFMISDiff: 0, govInsurance: 7668961.00, govInsuranceDiff: 0, extGL: 3054826.70, extGFMIS: 3054826.70, extGFMISDiff: 0, extInsurance: 3054826.70, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ปราณบุรี", govGL: 23783864.79, govGFMIS: 23783864.79, govGFMISDiff: 0, govInsurance: 24174091.59, govInsuranceDiff: -390226.80, extGL: 7535879.01, extGFMIS: 7535879.01, extGFMISDiff: 0, extInsurance: 7561938.01, extInsuranceDiff: -26059.00 },
      { hospitalName: "รพ.หัวหิน", govGL: 243960416.14, govGFMIS: 243960416.14, govGFMISDiff: 0, govInsurance: 243960416.14, govInsuranceDiff: 0, extGL: 63962743.69, extGFMIS: 63962743.69, extGFMISDiff: 0, extInsurance: 63962743.69, extInsuranceDiff: 0 },
      { hospitalName: "รพ.สามร้อยยอด", govGL: 14913652.17, govGFMIS: 14913652.17, govGFMISDiff: 0, govInsurance: 14913652.17, govInsuranceDiff: 0, extGL: 5626279.00, extGFMIS: 5626279.00, extGFMISDiff: 0, extInsurance: 5626279.00, extInsuranceDiff: 0 }
    ]
  },
  {
    monthId: "feb-2569",
    monthName: "กุมภาพันธ์ 2569",
    reportDate: "16 มีนาคม 2569",
    remarks: [],
    data: [
      { hospitalName: "รพ.ประจวบคีรีขันธ์", govGL: 90435380.93, govGFMIS: 90435380.93, govGFMISDiff: 0, govInsurance: 90435380.93, govInsuranceDiff: 0, extGL: 7425624.02, extGFMIS: 7425624.02, extGFMISDiff: 0, extInsurance: 7425624.02, extInsuranceDiff: 0 },
      { hospitalName: "รพ.กุยบุรี", govGL: 5777641.12, govGFMIS: 5777641.12, govGFMISDiff: 0, govInsurance: 5777641.12, govInsuranceDiff: 0, extGL: 526979.00, extGFMIS: 526979.00, extGFMISDiff: 0, extInsurance: 526979.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ทับสะแก", govGL: 7706804.00, govGFMIS: 7706804.00, govGFMISDiff: 0, govInsurance: 7706804.00, govInsuranceDiff: 0, extGL: 955687.00, extGFMIS: 955687.00, extGFMISDiff: 0, extInsurance: 955687.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพาน", govGL: 51450785.88, govGFMIS: 51450785.88, govGFMISDiff: 0, govInsurance: 51450785.88, govInsuranceDiff: 0, extGL: 4860261.50, extGFMIS: 4860261.50, extGFMISDiff: 0, extInsurance: 4860261.50, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพานน้อย", govGL: 4472667.51, govGFMIS: 4472667.51, govGFMISDiff: 0, govInsurance: 4472667.51, govInsuranceDiff: 0, extGL: 652464.95, extGFMIS: 652464.95, extGFMISDiff: 0, extInsurance: 652464.95, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ปราณบุรี", govGL: 5964096.65, govGFMIS: 5964096.65, govGFMISDiff: 0, govInsurance: 5964096.65, govInsuranceDiff: 0, extGL: 913072.50, extGFMIS: 913072.50, extGFMISDiff: 0, extInsurance: 913072.50, extInsuranceDiff: 0 },
      { hospitalName: "รพ.หัวหิน", govGL: 164345414.17, govGFMIS: 164345414.17, govGFMISDiff: 0, govInsurance: 164345414.17, govInsuranceDiff: 0, extGL: 14476977.38, extGFMIS: 14476977.38, extGFMISDiff: 0, extInsurance: 14476977.38, extInsuranceDiff: 0 },
      { hospitalName: "รพ.สามร้อยยอด", govGL: 11186952.89, govGFMIS: 11186952.89, govGFMISDiff: 0, govInsurance: 11186952.89, govInsuranceDiff: 0, extGL: 1873202.00, extGFMIS: 1873202.00, extGFMISDiff: 0, extInsurance: 1873202.00, extInsuranceDiff: 0 }
    ]
  },
  {
    monthId: "mar-2569",
    monthName: "มีนาคม 2569",
    reportDate: "16 เมษายน 2569",
    remarks: [],
    data: [
      { hospitalName: "รพ.ประจวบคีรีขันธ์", govGL: 324706037.84, govGFMIS: 324706037.84, govGFMISDiff: 0, govInsurance: 324706037.84, govInsuranceDiff: 0, extGL: 33667453.63, extGFMIS: 33667453.63, extGFMISDiff: 0, extInsurance: 33667453.63, extInsuranceDiff: 0 },
      { hospitalName: "รพ.กุยบุรี", govGL: 6174968.71, govGFMIS: 6174968.71, govGFMISDiff: 0, govInsurance: 6174968.71, govInsuranceDiff: 0, extGL: 514306.00, extGFMIS: 514306.00, extGFMISDiff: 0, extInsurance: 514306.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ทับสะแก", govGL: 7138338.50, govGFMIS: 7138338.50, govGFMISDiff: 0, govInsurance: 7138338.50, govInsuranceDiff: 0, extGL: 862865.00, extGFMIS: 862865.00, extGFMISDiff: 0, extInsurance: 862865.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพาน", govGL: 50815982.80, govGFMIS: 50815982.80, govGFMISDiff: 0, govInsurance: 50815982.80, govInsuranceDiff: 0, extGL: 4615465.75, extGFMIS: 4615465.75, extGFMISDiff: 0, extInsurance: 4615465.75, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพานน้อย", govGL: 4603812.49, govGFMIS: 4603812.49, govGFMISDiff: 0, govInsurance: 4603812.49, govInsuranceDiff: 0, extGL: 666447.75, extGFMIS: 666447.75, extGFMISDiff: 0, extInsurance: 666447.75, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ปราณบุรี", govGL: 8524772.58, govGFMIS: 8524772.58, govGFMISDiff: 0, govInsurance: 8524772.58, govInsuranceDiff: 0, extGL: 1475545.00, extGFMIS: 1475545.00, extGFMISDiff: 0, extInsurance: 1475545.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.หัวหิน", govGL: 146053279.95, govGFMIS: 146053279.95, govGFMISDiff: 0, govInsurance: 146053279.95, govInsuranceDiff: 0, extGL: 15648724.11, extGFMIS: 15648724.11, extGFMISDiff: 0, extInsurance: 15648724.11, extInsuranceDiff: 0 },
      { hospitalName: "รพ.สามร้อยยอด", govGL: 11025474.09, govGFMIS: 11025474.09, govGFMISDiff: 0, govInsurance: 11025474.09, govInsuranceDiff: 0, extGL: 1611854.00, extGFMIS: 1611854.00, extGFMISDiff: 0, extInsurance: 1611854.00, extInsuranceDiff: 0 }
    ]
  },
  {
    monthId: "apr-2569",
    monthName: "เมษายน 2569",
    reportDate: "16 พฤษภาคม 2569",
    remarks: [],
    data: [
      { hospitalName: "รพ.ประจวบคีรีขันธ์", govGL: 327344033.58, govGFMIS: 327344033.58, govGFMISDiff: 0, govInsurance: 327344033.58, govInsuranceDiff: 0, extGL: 31684268.35, extGFMIS: 31684268.35, extGFMISDiff: 0, extInsurance: 31684268.35, extInsuranceDiff: 0 },
      { hospitalName: "รพ.กุยบุรี", govGL: 6571980.90, govGFMIS: 6571980.90, govGFMISDiff: 0, govInsurance: 6571980.90, govInsuranceDiff: 0, extGL: 526979.00, extGFMIS: 526979.00, extGFMISDiff: 0, extInsurance: 526979.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ทับสะแก", govGL: 6522935.50, govGFMIS: 6522935.50, govGFMISDiff: 0, govInsurance: 6522935.50, govInsuranceDiff: 0, extGL: 955687.00, extGFMIS: 955687.00, extGFMISDiff: 0, extInsurance: 955687.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพาน", govGL: 49645205.83, govGFMIS: 49645205.83, govGFMISDiff: 0, govInsurance: 49645205.83, govInsuranceDiff: 0, extGL: 4239248.65, extGFMIS: 4239248.65, extGFMISDiff: 0, extInsurance: 4239248.65, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพานน้อย", govGL: 5440907.65, govGFMIS: 5440907.65, govGFMISDiff: 0, govInsurance: 5440907.65, govInsuranceDiff: 0, extGL: 709271.25, extGFMIS: 709271.25, extGFMISDiff: 0, extInsurance: 709271.25, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ปราณบุรี", govGL: 9873652.00, govGFMIS: 9873652.00, govGFMISDiff: 0, govInsurance: 9873652.00, govInsuranceDiff: 0, extGL: 1788069.00, extGFMIS: 1788069.00, extGFMISDiff: 0, extInsurance: 1788069.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.หัวหิน", govGL: 151629031.17, govGFMIS: 151629031.17, govGFMISDiff: 0, govInsurance: 151629031.17, govInsuranceDiff: 0, extGL: 15323596.11, extGFMIS: 15323596.11, extGFMISDiff: 0, extInsurance: 15323596.11, extInsuranceDiff: 0 },
      { hospitalName: "รพ.สามร้อยยอด", govGL: 11306671.47, govGFMIS: 11306671.47, govGFMISDiff: 0, govInsurance: 11306671.47, govInsuranceDiff: 0, extGL: 1516927.00, extGFMIS: 1516927.00, extGFMISDiff: 0, extInsurance: 1516927.00, extInsuranceDiff: 0 }
    ]
  },
  {
    monthId: "may-2569",
    monthName: "พฤษภาคม 2569",
    reportDate: "10 มิถุนายน 2569",
    remarks: [],
    data: [
      { hospitalName: "รพ.ประจวบคีรีขันธ์", govGL: 140040879.31, govGFMIS: 140040879.31, govGFMISDiff: 0, govInsurance: 140040879.31, govInsuranceDiff: 0, extGL: 31878341.96, extGFMIS: 31878341.96, extGFMISDiff: 0, extInsurance: 31878341.96, extInsuranceDiff: 0 },
      { hospitalName: "รพ.กุยบุรี", govGL: 8363010.38, govGFMIS: 8363010.38, govGFMISDiff: 0, govInsurance: 8363010.38, govInsuranceDiff: 0, extGL: 2213297.00, extGFMIS: 2213297.00, extGFMISDiff: 0, extInsurance: 2213297.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ทับสะแก", govGL: 10570903.05, govGFMIS: 10570903.05, govGFMISDiff: 0, govInsurance: 10570903.05, govInsuranceDiff: 0, extGL: 3426531.75, extGFMIS: 3426531.75, extGFMISDiff: 0, extInsurance: 3426531.75, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพาน", govGL: 62476014.90, govGFMIS: 62476014.90, govGFMISDiff: 0, govInsurance: 62476014.90, govInsuranceDiff: 0, extGL: 15560008.00, extGFMIS: 15560008.00, extGFMISDiff: 0, extInsurance: 15560008.00, extInsuranceDiff: 0 },
      { hospitalName: "รพ.บางสะพานน้อย", govGL: 6800473.59, govGFMIS: 6800473.59, govGFMISDiff: 0, govInsurance: 6800473.59, govInsuranceDiff: 0, extGL: 3611308.70, extGFMIS: 3611308.70, extGFMISDiff: 0, extInsurance: 3611308.70, extInsuranceDiff: 0 },
      { hospitalName: "รพ.ปราณบุรี", govGL: 27360399.69, govGFMIS: 27360399.69, govGFMISDiff: 0, govInsurance: 27360399.69, govInsuranceDiff: 0, extGL: 8934935.51, extGFMIS: 8934935.51, extGFMISDiff: 0, extInsurance: 8934935.51, extInsuranceDiff: 0 },
      { hospitalName: "รพ.หัวหิน", govGL: 246887424.55, govGFMIS: 246887424.55, govGFMISDiff: 0, govInsurance: 246887424.55, govInsuranceDiff: 0, extGL: 73515038.78, extGFMIS: 73515038.78, extGFMISDiff: 0, extInsurance: 73515038.78, extInsuranceDiff: 0 },
      { hospitalName: "รพ.สามร้อยยอด", govGL: 15190023.73, govGFMIS: 15190023.73, govGFMISDiff: 0, govInsurance: 15190023.73, govInsuranceDiff: 0, extGL: 6566400.50, extGFMIS: 6566400.50, extGFMISDiff: 0, extInsurance: 6566400.50, extInsuranceDiff: 0 }
    ]
  },
  {
    monthId: "jun-2569",
    monthName: "มิถุนายน 2569",
    reportDate: "10 กรกฎาคม 2569",
    remarks: [],
    data: [
      { 
        hospitalName: "รพ.ประจวบคีรีขันธ์", 
        govGL: 137722465.18, govGFMIS: 137722465.18, govGFMISDiff: 0, govInsurance: 137722465.18, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 83979320.40, between90DaysAnd1Year: 25437789.00, moreThan1Year: 28305355.78, total: 137722465.18 },
        extGL: 30870023.20, extGFMIS: 30870023.20, extGFMISDiff: 0, extInsurance: 30870023.20, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 7357772.45, between90DaysAnd1Year: 12053363.38, moreThan1Year: 11458887.37, total: 30870023.20 }
      },
      { 
        hospitalName: "รพ.กุยบุรี", 
        govGL: 6477117.62, govGFMIS: 6477117.62, govGFMISDiff: 0, govInsurance: 6477117.62, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 5057197.30, between90DaysAnd1Year: 1384777.32, moreThan1Year: 35143.00, total: 6477117.62 },
        extGL: 2210427.75, extGFMIS: 2210427.75, extGFMISDiff: 0, extInsurance: 2210427.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 587804.25, between90DaysAnd1Year: 1091692.50, moreThan1Year: 530931.00, total: 2210427.75 }
      },
      { 
        hospitalName: "รพ.ทับสะแก", 
        govGL: 10899822.55, govGFMIS: 10899822.55, govGFMISDiff: 0, govInsurance: 10899822.55, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 6684003.00, between90DaysAnd1Year: 3731481.80, moreThan1Year: 484337.75, total: 10899822.55 },
        extGL: 3497759.75, extGFMIS: 3497759.75, extGFMISDiff: 0, extInsurance: 3497759.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 846981.00, between90DaysAnd1Year: 1348638.00, moreThan1Year: 1302140.75, total: 3497759.75 }
      },
      { 
        hospitalName: "รพ.บางสะพาน", 
        govGL: 61770264.40, govGFMIS: 61770264.40, govGFMISDiff: 0, govInsurance: 61770264.40, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 45063726.03, between90DaysAnd1Year: 9020418.62, moreThan1Year: 7686119.75, total: 61770264.40 },
        extGL: 15671672.13, extGFMIS: 15671672.13, extGFMISDiff: 0, extInsurance: 15671672.13, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 4155513.23, between90DaysAnd1Year: 4506648.00, moreThan1Year: 7009510.90, total: 15671672.13 }
      },
      { 
        hospitalName: "รพ.บางสะพานน้อย", 
        govGL: 5891583.97, govGFMIS: 5891583.97, govGFMISDiff: 0, govInsurance: 5891583.97, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 3938515.73, between90DaysAnd1Year: 1644620.24, moreThan1Year: 308448.00, total: 5891583.97 },
        extGL: 3752215.95, extGFMIS: 3752215.95, extGFMISDiff: 0, extInsurance: 3752215.95, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 683234.25, between90DaysAnd1Year: 871492.20, moreThan1Year: 2197489.50, total: 3752215.95 }
      },
      { 
        hospitalName: "รพ.ปราณบุรี", 
        govGL: 29644446.92, govGFMIS: 29644446.92, govGFMISDiff: 0, govInsurance: 29644446.92, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 17406636.13, between90DaysAnd1Year: 195599.80, moreThan1Year: 12042210.99, total: 29644446.92 },
        extGL: 9111450.51, extGFMIS: 9111450.51, extGFMISDiff: 0, extInsurance: 9111450.51, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 2249733.00, between90DaysAnd1Year: 1406401.14, moreThan1Year: 5455316.37, total: 9111450.51 }
      },
      { 
        hospitalName: "รพ.หัวหิน", 
        govGL: 257258934.94, govGFMIS: 257258934.94, govGFMISDiff: 0, govInsurance: 257258934.94, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 165662650.32, between90DaysAnd1Year: 45423415.17, moreThan1Year: 46172869.45, total: 257258934.94 },
        extGL: 72600209.59, extGFMIS: 72600209.59, extGFMISDiff: 0, extInsurance: 72600209.59, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 16604077.12, between90DaysAnd1Year: 22825819.23, moreThan1Year: 33170313.24, total: 72600209.59 }
      },
      { 
        hospitalName: "รพ.สามร้อยยอด", 
        govGL: 13885569.09, govGFMIS: 13885569.09, govGFMISDiff: 0, govInsurance: 13885569.09, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 9091895.18, between90DaysAnd1Year: 4725005.91, moreThan1Year: 68668.00, total: 13885569.09 },
        extGL: 6217816.50, extGFMIS: 6217816.50, extGFMISDiff: 0, extInsurance: 6217816.50, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 1302627.50, between90DaysAnd1Year: 2474263.00, moreThan1Year: 2440926.00, total: 6217816.50 }
      }
    ]
  },
  {
    monthId: "jul-2569",
    monthName: "กรกฎาคม 2569",
    reportDate: "18 สิงหาคม 2569",
    remarks: [
      "รายงานฉบับล่าสุดไม่มีส่วนต่างระหว่าง GL และ GFMIS รวมถึงยอดจัดเก็บประกันสำหรับทุกโรงพยาบาล สะท้อนถึงการปรับปรุงกระบวนการกระทบยอดได้อย่างมีประสิทธิภาพ 100%"
    ],
    data: [
      { 
        hospitalName: "รพ.ประจวบคีรีขันธ์", 
        govGL: 149361273.43, govGFMIS: 149361273.43, govGFMISDiff: 0, govInsurance: 149361273.43, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 91110376.79, between90DaysAnd1Year: 27602055.33, moreThan1Year: 30648841.31, total: 149361273.43 },
        extGL: 30365868.67, extGFMIS: 30365868.67, extGFMISDiff: 0, extInsurance: 30365868.67, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 7237890.35, between90DaysAnd1Year: 11856322.01, moreThan1Year: 11271656.31, total: 30365868.67 }
      },
      { 
        hospitalName: "รพ.กุยบุรี", 
        govGL: 6741400.31, govGFMIS: 6741400.31, govGFMISDiff: 0, govInsurance: 6741400.31, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 5263489.15, between90DaysAnd1Year: 1441312.16, moreThan1Year: 36599.00, total: 6741400.31 },
        extGL: 2039830.00, extGFMIS: 2039830.00, extGFMISDiff: 0, extInsurance: 2039830.00, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 542456.25, between90DaysAnd1Year: 1007469.00, moreThan1Year: 489904.75, total: 2039830.00 }
      },
      { 
        hospitalName: "รพ.ทับสะแก", 
        govGL: 12098661.01, govGFMIS: 12098661.01, govGFMISDiff: 0, govInsurance: 12098661.01, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 7420131.00, between90DaysAnd1Year: 4141695.20, moreThan1Year: 536834.81, total: 12098661.01 },
        extGL: 3369833.75, extGFMIS: 3369833.75, extGFMISDiff: 0, extInsurance: 3369833.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 816001.00, between90DaysAnd1Year: 1299285.00, moreThan1Year: 1254547.75, total: 3369833.75 }
      },
      { 
        hospitalName: "รพ.บางสะพาน", 
        govGL: 71047367.37, govGFMIS: 71047367.37, govGFMISDiff: 0, govInsurance: 71047367.37, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 51833116.53, between90DaysAnd1Year: 10375171.09, moreThan1Year: 8839079.75, total: 71047367.37 },
        extGL: 15158287.13, extGFMIS: 15158287.13, extGFMISDiff: 0, extInsurance: 15158287.13, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 4019448.23, between90DaysAnd1Year: 4359051.00, moreThan1Year: 6779787.90, total: 15158287.13 }
      },
      { 
        hospitalName: "รพ.บางสะพานน้อย", 
        govGL: 5724025.77, govGFMIS: 5724025.77, govGFMISDiff: 0, govInsurance: 5724025.77, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 3826501.53, between90DaysAnd1Year: 1597843.24, moreThan1Year: 299681.00, total: 5724025.77 },
        extGL: 3974130.20, extGFMIS: 3974130.20, extGFMISDiff: 0, extInsurance: 3974130.20, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 723659.25, between90DaysAnd1Year: 923035.20, moreThan1Year: 2327435.75, total: 3974130.20 }
      },
      { 
        hospitalName: "รพ.ปราณบุรี", 
        govGL: 23951028.85, govGFMIS: 23951028.85, govGFMISDiff: 0, govInsurance: 23951028.85, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 14063852.13, between90DaysAnd1Year: 158032.80, moreThan1Year: 9729143.92, total: 23951028.85 },
        extGL: 8300385.51, extGFMIS: 8300385.51, extGFMISDiff: 0, extInsurance: 8300385.51, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 2049432.00, between90DaysAnd1Year: 1281180.14, moreThan1Year: 4969773.37, total: 8300385.51 }
      },
      { 
        hospitalName: "รพ.หัวหิน", 
        govGL: 241208444.83, govGFMIS: 241208444.83, govGFMISDiff: 0, govInsurance: 241208444.83, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 155333555.32, between90DaysAnd1Year: 42590215.17, moreThan1Year: 43284674.34, total: 241208444.83 },
        extGL: 69706917.76, extGFMIS: 69706917.76, extGFMISDiff: 0, extInsurance: 69706917.76, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 15942204.12, between90DaysAnd1Year: 21915993.23, moreThan1Year: 31848720.41, total: 69706917.76 }
      },
      { 
        hospitalName: "รพ.สามร้อยยอด", 
        govGL: 13247248.79, govGFMIS: 13247248.79, govGFMISDiff: 0, govInsurance: 13247248.79, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 8673852.18, between90DaysAnd1Year: 4507851.61, moreThan1Year: 65545.00, total: 13247248.79 },
        extGL: 5876342.00, extGFMIS: 5876342.00, extGFMISDiff: 0, extInsurance: 5876342.00, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 1231093.50, between90DaysAnd1Year: 2338382.00, moreThan1Year: 2306866.50, total: 5876342.00 }
      }
    ]
  },
  {
    monthId: "aug-2569",
    monthName: "สิงหาคม 2569",
    reportDate: "10 กันยายน 2569",
    remarks: [
      "อัปเดตข้อมูลยอดยกไปจากรายงานงบทดลอง GFMIS ล่าสุด ประจำเดือนสิงหาคม 2569 (ยอดลูกหนี้ GFMIS ตรงกับ GL 100%)"
    ],
    data: [
      { 
        hospitalName: "รพ.ประจวบคีรีขันธ์", 
        govGL: 160281485.59, govGFMIS: 160281485.59, govGFMISDiff: 0, govInsurance: 160281485.59, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 97771506.21, between90DaysAnd1Year: 29620474.83, moreThan1Year: 32889504.55, total: 160281485.59 },
        extGL: 31734911.42, extGFMIS: 31734911.42, extGFMISDiff: 0, extInsurance: 31734911.42, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 7564143.91, between90DaysAnd1Year: 12390825.55, moreThan1Year: 11779941.96, total: 31734911.42 }
      },
      { 
        hospitalName: "รพ.กุยบุรี", 
        govGL: 6774686.66, govGFMIS: 6774686.66, govGFMISDiff: 0, govInsurance: 6774686.66, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 5289473.66, between90DaysAnd1Year: 1448429.00, moreThan1Year: 36784.00, total: 6774686.66 },
        extGL: 2152943.75, extGFMIS: 2152943.75, extGFMISDiff: 0, extInsurance: 2152943.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 572528.00, between90DaysAnd1Year: 1063321.00, moreThan1Year: 517094.75, total: 2152943.75 }
      },
      { 
        hospitalName: "รพ.ทับสะแก", 
        govGL: 11995550.01, govGFMIS: 11995550.01, govGFMISDiff: 0, govInsurance: 11995550.01, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 7356877.01, between90DaysAnd1Year: 4106385.00, moreThan1Year: 532288.00, total: 11995550.01 },
        extGL: 3242379.75, extGFMIS: 3242379.75, extGFMISDiff: 0, extInsurance: 3242379.75, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 785133.00, between90DaysAnd1Year: 1250125.00, moreThan1Year: 1207121.75, total: 3242379.75 }
      },
      { 
        hospitalName: "รพ.บางสะพาน", 
        govGL: 64111209.24, govGFMIS: 64111209.24, govGFMISDiff: 0, govInsurance: 64111209.24, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 46772714.24, between90DaysAnd1Year: 9362145.00, moreThan1Year: 7976350.00, total: 64111209.24 },
        extGL: 15412468.63, extGFMIS: 15412468.63, extGFMISDiff: 0, extInsurance: 15412468.63, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 4086851.63, between90DaysAnd1Year: 4432168.00, moreThan1Year: 6893449.00, total: 15412468.63 }
      },
      { 
        hospitalName: "รพ.บางสะพานน้อย", 
        govGL: 5344635.60, govGFMIS: 5344635.60, govGFMISDiff: 0, govInsurance: 5344635.60, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 3572886.60, between90DaysAnd1Year: 1491931.00, moreThan1Year: 279818.00, total: 5344635.60 },
        extGL: 3896378.70, extGFMIS: 3896378.70, extGFMISDiff: 0, extInsurance: 3896378.70, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 709493.70, between90DaysAnd1Year: 904975.00, moreThan1Year: 2281910.00, total: 3896378.70 }
      },
      { 
        hospitalName: "รพ.ปราณบุรี", 
        govGL: 21881760.37, govGFMIS: 21881760.37, govGFMISDiff: 0, govInsurance: 21881760.37, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 12850388.37, between90DaysAnd1Year: 144360.00, moreThan1Year: 8887012.00, total: 21881760.37 },
        extGL: 8657061.51, extGFMIS: 8657061.51, extGFMISDiff: 0, extInsurance: 8657061.51, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 2137494.51, between90DaysAnd1Year: 1336214.00, moreThan1Year: 5183353.00, total: 8657061.51 }
      },
      { 
        hospitalName: "รพ.หัวหิน", 
        govGL: 238491483.11, govGFMIS: 238491483.11, govGFMISDiff: 0, govInsurance: 238491483.11, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 153583853.11, between90DaysAnd1Year: 42110515.00, moreThan1Year: 42797115.00, total: 238491483.11 },
        extGL: 71968386.16, extGFMIS: 71968386.16, extGFMISDiff: 0, extInsurance: 71968386.16, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 16459468.16, between90DaysAnd1Year: 22626993.00, moreThan1Year: 32881925.00, total: 71968386.16 }
      },
      { 
        hospitalName: "รพ.สามร้อยยอด", 
        govGL: 12295365.66, govGFMIS: 12295365.66, govGFMISDiff: 0, govInsurance: 12295365.66, govInsuranceDiff: 0, 
        govAging: { lessThan90Days: 8051369.66, between90DaysAnd1Year: 4184051.00, moreThan1Year: 60845.00, total: 12295365.66 },
        extGL: 6213990.55, extGFMIS: 6213990.55, extGFMISDiff: 0, extInsurance: 6213990.55, extInsuranceDiff: 0,
        extAging: { lessThan90Days: 852781.55, between90DaysAnd1Year: 1812854.00, moreThan1Year: 3548355.00, total: 6213990.55 }
      }
    ]
  },
  {
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
  },
];

export const mockScenarios: ExecutiveScenario[] = [
  {
    id: "sc-1",
    title: "ยกระดับโปรแกรมจับคู่บัญชีอัตโนมัติ (Automated Reconciliation Audit)",
    description: "ติดตั้งระบบประมวลผลจับคู่บิลค่าส่งตัวรักษาร่วมกับหน่วยงานภาครัฐเพื่อขจัดส่วนต่างความล่าช้าใน GL และประกันภัย ณ รพ.ปราณบุรี",
    impactLabel: "ลดความผิดพลาดกระทบยอดลงได้ 85% ทันที",
    govDiffReduction: 85,
    extDiffReduction: 85,
    applied: false
  },
  {
    id: "sc-2",
    title: "จัดชุดวอร์รูมเจ้าหน้าที่บัญชีเคลื่อนที่ ณ จุดบริการหลัก",
    description: "จัดโปรแกรมด่วนเสริมทักษะทีมงานเก็บกู้ประวัติสิทธิตามสิทธิผู้ประกันตน ช่วยอัปเกรดยอดจ่าย GL ให้ขนานคู่ขนานไปกับ GFMIS และตารางประกัน",
    impactLabel: "ช่วยขจัดความช้าของการปิดงบลดลง 60%",
    govDiffReduction: 60,
    extDiffReduction: 40,
    applied: false
  },
  {
    id: "sc-3",
    title: "จัดคณะกรรมการเคลียร์บัญชีและตัดจำหน่ายหนี้สูญเฉพาะกิจ",
    description: "ประสานสํานักงานหลักประกันสุขภาพแห่งชาติเพื่ออนุมัติตรวจสอบยอดลูกหนี้บุคคลภายนอกที่ค้างนานเกิน 1 ปีปัดตกจำหน่าย เพื่อความโปร่งใส",
    impactLabel: "สเปรดลดส่วนต่างสะสมขจัดความหนาถาวร 95%",
    govDiffReduction: 95,
    extDiffReduction: 95,
       applied: false
  }
];