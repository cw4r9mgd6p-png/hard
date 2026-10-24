export interface QuarterlyTrendPoint {
  quarter: string;
  cash: number;               // เงินสดเงินฝาก
  ar: number;                 // ลูกหนี้หมุนเวียน
  inventory: number;          // มูลค่าสินค้าคงคลัง
  currentAssets: number;      // สินทรัพย์หมุนเวียน (usually cash + ar + inventory)
  currentLiabilities: number; // หนี้สินหมุนเวียน
  netMaintenance: number;     // เงินบำรุงคงเหลือ (หักหนี้แล้ว)
}

export interface HospitalFinancialTrend {
  id: string;
  hospitalName: string;
  data: QuarterlyTrendPoint[];
}

// Generate highly realistic datasets based on the user's screenshots for the 8 hospitals in Prachuap Khiri Khan.
// Quarters: 2565Q1 to 2569Q2 (18 quarters total)
export const hospitalTrends: HospitalFinancialTrend[] = [
  {
    id: "11321",
    hospitalName: "11321-รพ. สามร้อยยอด",
    data: [
      { quarter: "2565Q1", cash: 157690000, ar: 56670000, inventory: 4870000, currentAssets: 219220000, currentLiabilities: 28620000, netMaintenance: 129000000 },
      { quarter: "2565Q2", cash: 189220000, ar: 46270000, inventory: 4410000, currentAssets: 239900000, currentLiabilities: 27540000, netMaintenance: 161800000 },
      { quarter: "2565Q3", cash: 197300000, ar: 38870000, inventory: 5940000, currentAssets: 242100000, currentLiabilities: 26990000, netMaintenance: 170305000 },
      { quarter: "2565Q4", cash: 196190000, ar: 29560000, inventory: 5640000, currentAssets: 231390000, currentLiabilities: 19440000, netMaintenance: 176700000 },
      { quarter: "2566Q1", cash: 206060000, ar: 12000000, inventory: 6000000, currentAssets: 224060000, currentLiabilities: 18750000, netMaintenance: 187400000 },
      { quarter: "2566Q2", cash: 221590000, ar: 20340000, inventory: 4900000, currentAssets: 246840000, currentLiabilities: 18160000, netMaintenance: 203430000 },
      { quarter: "2566Q3", cash: 207680000, ar: 19010000, inventory: 4900000, currentAssets: 231590000, currentLiabilities: 15330000, netMaintenance: 192350000 },
      { quarter: "2566Q4", cash: 194570000, ar: 23080000, inventory: 5110000, currentAssets: 222760000, currentLiabilities: 15490000, netMaintenance: 179080000 },
      { quarter: "2567Q1", cash: 201910000, ar: 20160000, inventory: 7920000, currentAssets: 229990000, currentLiabilities: 17230000, netMaintenance: 184680000 },
      { quarter: "2567Q2", cash: 197020000, ar: 36980000, inventory: 7130000, currentAssets: 241140000, currentLiabilities: 16580000, netMaintenance: 180320000 },
      { quarter: "2567Q3", cash: 174610000, ar: 52710000, inventory: 6590000, currentAssets: 233910000, currentLiabilities: 13730000, netMaintenance: 160880000 },
      { quarter: "2567Q4", cash: 187470000, ar: 16650000, inventory: 5980000, currentAssets: 210100000, currentLiabilities: 11720000, netMaintenance: 175750500 },
      { quarter: "2568Q1", cash: 199150000, ar: 18210000, inventory: 7660000, currentAssets: 225030000, currentLiabilities: 17020000, netMaintenance: 182200000 },
      { quarter: "2568Q2", cash: 199500000, ar: 19350000, inventory: 6770000, currentAssets: 225620000, currentLiabilities: 19350000, netMaintenance: 180200000 },
      { quarter: "2568Q3", cash: 186220000, ar: 20220000, inventory: 6850000, currentAssets: 213290000, currentLiabilities: 16310000, netMaintenance: 169910000 },
      { quarter: "2568Q4", cash: 170480000, ar: 24450000, inventory: 7930000, currentAssets: 202850000, currentLiabilities: 16520000, netMaintenance: 154000000 },
      { quarter: "2569Q1", cash: 179210000, ar: 19610000, inventory: 7380000, currentAssets: 206200000, currentLiabilities: 16760000, netMaintenance: 162450000 },
      { quarter: "2569Q2", cash: 185627083.95, ar: 23127804.43, inventory: 7860430.26, currentAssets: 216615318.65, currentLiabilities: 15116212.05, netMaintenance: 170431076.08 }, { quarter: "2569Q3", cash: 168286834, ar: 19757814, inventory: 7322826, currentAssets: 195367474, currentLiabilities: 13816653, netMaintenance: 154392624 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 175389930, ar: 14942617, inventory: 701700, currentAssets: 78611436, currentLiabilities: -96778494, netMaintenance: 149225090 }]
  },
  {
    id: "11315",
    hospitalName: "11315-รพ. กุยบุรี",
    data: [
      { quarter: "2565Q1", cash: 36720000, ar: 53660000, inventory: 2320000, currentAssets: 92690000, currentLiabilities: 17830000, netMaintenance: 19000000 },
      { quarter: "2565Q2", cash: 73280000, ar: 29420000, inventory: 2750000, currentAssets: 105450000, currentLiabilities: 13750000, netMaintenance: 59500000 },
      { quarter: "2565Q3", cash: 73210000, ar: 28780000, inventory: 2650000, currentAssets: 104640000, currentLiabilities: 13970000, netMaintenance: 59200000 },
      { quarter: "2565Q4", cash: 72860000, ar: 23400000, inventory: 3060000, currentAssets: 99330000, currentLiabilities: 13930000, netMaintenance: 58900000 },
      { quarter: "2566Q1", cash: 92560000, ar: 6240000, inventory: 3310000, currentAssets: 102100000, currentLiabilities: 19490000, netMaintenance: 72900000 },
      { quarter: "2566Q2", cash: 91730000, ar: 2880000, inventory: 4920000, currentAssets: 99410000, currentLiabilities: 13710000, netMaintenance: 78100000 },
      { quarter: "2566Q3", cash: 76340000, ar: 3980000, inventory: 3100005, currentAssets: 84440000, currentLiabilities: 13490000, netMaintenance: 62900000 },
      { quarter: "2566Q4", cash: 61530000, ar: 4470500, inventory: 4110000, currentAssets: 71340000, currentLiabilities: 12260000, netMaintenance: 49300000 },
      { quarter: "2567Q1", cash: 66970000, ar: 4750000, inventory: 4750000, currentAssets: 78650000, currentLiabilities: 14780000, netMaintenance: 52300000 },
      { quarter: "2567Q2", cash: 64910000, ar: 5790000, inventory: 5350000, currentAssets: 77930000, currentLiabilities: 20670000, netMaintenance: 44100000 },
      { quarter: "2567Q3", cash: 58030000, ar: 20070000, inventory: 2840000, currentAssets: 80930000, currentLiabilities: 21810000, netMaintenance: 36200000 },
      { quarter: "2567Q4", cash: 61920000, ar: 9990000, inventory: 3500000, currentAssets: 75400000, currentLiabilities: 26370000, netMaintenance: 37100000 },
      { quarter: "2568Q1", cash: 74100000, ar: 8180000, inventory: 4220000, currentAssets: 86500000, currentLiabilities: 25980000, netMaintenance: 47600000 },
      { quarter: "2568Q2", cash: 76640000, ar: 9870000, inventory: 4420000, currentAssets: 90930000, currentLiabilities: 26370000, netMaintenance: 50600000 },
      { quarter: "2568Q3", cash: 66710000, ar: 9980000, inventory: 3510000, currentAssets: 80200000, currentLiabilities: 11760000, netMaintenance: 57700000 },
      { quarter: "2568Q4", cash: 50350000, ar: 10940000, inventory: 3880000, currentAssets: 65170000, currentLiabilities: 8990000, netMaintenance: 38500000 },
      { quarter: "2569Q1", cash: 53910000, ar: 10330000, inventory: 3770000, currentAssets: 68010000, currentLiabilities: 13970000, netMaintenance: 40000000 },
      { quarter: "2569Q2", cash: 68517352.80, ar: 10943743.85, inventory: 3489309.63, currentAssets: 82950406.28, currentLiabilities: 15860498.33, netMaintenance: 52695010.46 }, { quarter: "2569Q3", cash: 49255663, ar: 8692176, inventory: 2173044, currentAssets: 60120883, currentLiabilities: 12072466, netMaintenance: 37177528 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 41016102, ar: 8363010, inventory: 232000, currentAssets: 68541642, currentLiabilities: 27525540, netMaintenance: 30004194 }]
  },
  {
    id: "11316",
    hospitalName: "11316-รพ. ทับสะแก",
    data: [
      { quarter: "2565Q1", cash: 58070000, ar: 22530000, inventory: 929110, currentAssets: 81530000, currentLiabilities: 23280000, netMaintenance: 34800000 },
      { quarter: "2565Q2", cash: 65210000, ar: 21400000, inventory: 3020000, currentAssets: 89630000, currentLiabilities: 25180000, netMaintenance: 40000000 },
      { quarter: "2565Q3", cash: 53240000, ar: 19610000, inventory: 1480000, currentAssets: 74340000, currentLiabilities: 16480000, netMaintenance: 36800000 },
      { quarter: "2565Q4", cash: 43720000, ar: 36780000, inventory: 2854000, currentAssets: 83350000, currentLiabilities: 12390000, netMaintenance: 31300000 },
      { quarter: "2566Q1", cash: 52820000, ar: 21400000, inventory: 3300000, currentAssets: 77530000, currentLiabilities: 12230000, netMaintenance: 40580000 },
      { quarter: "2566Q2", cash: 81010000, ar: 14190000, inventory: 1680000, currentAssets: 96880000, currentLiabilities: 18670000, netMaintenance: 62400000 },
      { quarter: "2566Q3", cash: 71580000, ar: 12460000, inventory: 2960000, currentAssets: 87000000, currentLiabilities: 21120000, netMaintenance: 50400000 },
      { quarter: "2566Q4", cash: 48650000, ar: 14060000, inventory: 5740000, currentAssets: 68450000, currentLiabilities: 14350000, netMaintenance: 34300000 },
      { quarter: "2567Q1", cash: 57060000, ar: 14000000, inventory: 4840000, currentAssets: 75900000, currentLiabilities: 17940000, netMaintenance: 39160000 },
      { quarter: "2567Q2", cash: 49290000, ar: 26010000, inventory: 3740000, currentAssets: 79040000, currentLiabilities: 14370000, netMaintenance: 34920000 },
      { quarter: "2567Q3", cash: 42190000, ar: 32860000, inventory: 5160000, currentAssets: 77920000, currentLiabilities: 15650000, netMaintenance: 22300000 },
      { quarter: "2567Q4", cash: 34970000, ar: 5260000, inventory: 4710000, currentAssets: 44940000, currentLiabilities: 17100000, netMaintenance: 17870000 },
      { quarter: "2568Q1", cash: 42830000, ar: 15340500, inventory: 4560000, currentAssets: 62720000, currentLiabilities: 27700000, netMaintenance: 15120000 },
      { quarter: "2568Q2", cash: 42190000, ar: 15610000, inventory: 4150000, currentAssets: 61960000, currentLiabilities: 25500000, netMaintenance: 16690000 },
      { quarter: "2568Q3", cash: 37730000, ar: 15630000, inventory: 4060000, currentAssets: 57420000, currentLiabilities: 22700000, netMaintenance: 15030000 },
      { quarter: "2568Q4", cash: 24450000, ar: 16940000, inventory: 4500000, currentAssets: 45890000, currentLiabilities: 21450000, netMaintenance: 3000000 },
      { quarter: "2569Q1", cash: 28440000, ar: 16320000, inventory: 2230000, currentAssets: 46980000, currentLiabilities: 24730000, netMaintenance: 3700000 },
      { quarter: "2569Q2", cash: 37721453.25, ar: 14348037.43, inventory: 2082779.63, currentAssets: 54152270.31, currentLiabilities: 23141995.86, netMaintenance: 14693443.40 }, { quarter: "2569Q3", cash: 24099500, ar: 14165355, inventory: 2023622, currentAssets: 40288476, currentLiabilities: 18396565, netMaintenance: 5730472 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 19095439, ar: 10570903, inventory: 342653, currentAssets: 68541642, currentLiabilities: 49446203, netMaintenance: 1887203 }]
  },
  {
    id: "11317",
    hospitalName: "11317-รพ. บางสะพาน",
    data: [
      { quarter: "2565Q1", cash: 129430000, ar: 123430000, inventory: 9500000, currentAssets: 262420000, currentLiabilities: 118740000, netMaintenance: 10800000 },
      { quarter: "2565Q2", cash: 114660000, ar: 143200000, inventory: 13250000, currentAssets: 271110000, currentLiabilities: 50960000, netMaintenance: 63900000 },
      { quarter: "2565Q3", cash: 117250000, ar: 217950000, inventory: 14250000, currentAssets: 349450000, currentLiabilities: 45980000, netMaintenance: 71100000 },
      { quarter: "2565Q4", cash: 116650000, ar: 190840000, inventory: 11470000, currentAssets: 318960000, currentLiabilities: 78400000, netMaintenance: 38250000 },
      { quarter: "2566Q1", cash: 166040000, ar: 159230000, inventory: 14940000, currentAssets: 340190000, currentLiabilities: 123400000, netMaintenance: 42680000 },
      { quarter: "2566Q2", cash: 170900000, ar: 194100000, inventory: 16170000, currentAssets: 381260000, currentLiabilities: 136770000, netMaintenance: 57770000 },
      { quarter: "2566Q3", cash: 150690000, ar: 115160000, inventory: 17550000, currentAssets: 283400000, currentLiabilities: 107700000, netMaintenance: 42810500 },
      { quarter: "2566Q4", cash: 134620000, ar: 83670000, inventory: 18770000, currentAssets: 237070000, currentLiabilities: 53640000, netMaintenance: 80700000 },
      { quarter: "2567Q1", cash: 138680000, ar: 68420000, inventory: 14790000, currentAssets: 221890000, currentLiabilities: 92400000, netMaintenance: 46280000 },
      { quarter: "2567Q2", cash: 111350000, ar: 111350000, inventory: 15552000, currentAssets: 230220000, currentLiabilities: 50160000, netMaintenance: 53400000 },
      { quarter: "2567Q3", cash: 75410000, ar: 142720000, inventory: 15690000, currentAssets: 233820000, currentLiabilities: 50610000, netMaintenance: 24800000 },
      { quarter: "2567Q4", cash: 91470000, ar: 79600000, inventory: 15170000, currentAssets: 178220000, currentLiabilities: 63200000, netMaintenance: 15600000 },
      { quarter: "2568Q1", cash: 101850000, ar: 62780000, inventory: 16010000, currentAssets: 180640000, currentLiabilities: 64060000, netMaintenance: 37600000 },
      { quarter: "2568Q2", cash: 100690000, ar: 78150000, inventory: 15780000, currentAssets: 194610000, currentLiabilities: 75140000, netMaintenance: 25700000 },
      { quarter: "2568Q3", cash: 102400000, ar: 84480000, inventory: 24750000, currentAssets: 211630000, currentLiabilities: 85340000, netMaintenance: 17400000 },
      { quarter: "2568Q4", cash: 99020000, ar: 78120000, inventory: 26410000, currentAssets: 203550000, currentLiabilities: 110030000, netMaintenance: -32200000 },
      { quarter: "2569Q1", cash: 98480000, ar: 98480000, inventory: 26860000, currentAssets: 224950000, currentLiabilities: 111910000, netMaintenance: -13000000 },
      { quarter: "2569Q2", cash: 134676782.57, ar: 94154564.81, inventory: 13110129.28, currentAssets: 241941476.66, currentLiabilities: 119182993.43, netMaintenance: 15420094.49 }, { quarter: "2569Q3", cash: 107735764, ar: 77435081, inventory: 14589218, currentAssets: 199760063, currentLiabilities: 112224754, netMaintenance: -4652134 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 81508083, ar: 20402593, inventory: 512500, currentAssets: 250666274, currentLiabilities: 169158191, netMaintenance: -19595347 }]
  },
  {
    id: "11319",
    hospitalName: "11319-รพ. ปราณบุรี",
    data: [
      { quarter: "2565Q1", cash: 55630000, ar: 174650000, inventory: 4500000, currentAssets: 234770000, currentLiabilities: 40900000, netMaintenance: 14500000 },
      { quarter: "2565Q2", cash: 109940000, ar: 145840000, inventory: 4040000, currentAssets: 259810000, currentLiabilities: 64800000, netMaintenance: 45140000 },
      { quarter: "2565Q3", cash: 133510000, ar: 85610000, inventory: 4530000, currentAssets: 223640000, currentLiabilities: 37710000, netMaintenance: 95900000 },
      { quarter: "2565Q4", cash: 114190000, ar: 76880000, inventory: 3900000, currentAssets: 194960000, currentLiabilities: 37713862, netMaintenance: 76476138 },
      { quarter: "2566Q1", cash: 110490000, ar: 61860000, inventory: 5210000, currentAssets: 177560000, currentLiabilities: 35240000, netMaintenance: 75250000 },
      { quarter: "2566Q2", cash: 157300000, ar: 35240000, inventory: 4920000, currentAssets: 197470000, currentLiabilities: 36120000, netMaintenance: 131300000 },
      { quarter: "2566Q3", cash: 144200000, ar: 36120000, inventory: 11770000, currentAssets: 192090000, currentLiabilities: 19890000, netMaintenance: 117400000 },
      { quarter: "2566Q4", cash: 124540000, ar: 19890000, inventory: 8480500, currentAssets: 152860000, currentLiabilities: 21620000, netMaintenance: 103100000 },
      { quarter: "2567Q1", cash: 134720000, ar: 15460200, inventory: 9620000, currentAssets: 159800000, currentLiabilities: 29160000, netMaintenance: 105600000 },
      { quarter: "2567Q2", cash: 123120000, ar: 16220000, inventory: 11170000, currentAssets: 150510000, currentLiabilities: 26590000, netMaintenance: 96700000 },
      { quarter: "2567Q3", cash: 107450000, ar: 19010000, inventory: 9920000, currentAssets: 136380000, currentLiabilities: 27550000, netMaintenance: 79900000 },
      { quarter: "2567Q4", cash: 114420000, ar: 22770000, inventory: 6340000, currentAssets: 143530000, currentLiabilities: 28820000, netMaintenance: 85700000 },
      { quarter: "2568Q1", cash: 127850000, ar: 24020000, inventory: 7420000, currentAssets: 159290000, currentLiabilities: 35320000, netMaintenance: 92534000 },
      { quarter: "2568Q2", cash: 130310000, ar: 28110000, inventory: 7670000, currentAssets: 166080000, currentLiabilities: 36500000, netMaintenance: 93900000 },
      { quarter: "2568Q3", cash: 108980000, ar: 29090000, inventory: 7400000, currentAssets: 145470000, currentLiabilities: 24660000, netMaintenance: 84400000 },
      { quarter: "2568Q4", cash: 91140000, ar: 35170000, inventory: 6430000, currentAssets: 132750005, currentLiabilities: 37820000, netMaintenance: 53500000 },
      { quarter: "2569Q1", cash: 108820000, ar: 33660550, inventory: 7840000, currentAssets: 150320000, currentLiabilities: 46110000, netMaintenance: 62710000 },
      { quarter: "2569Q2", cash: 115227224.75, ar: 32866825.85, inventory: 6960033.71, currentAssets: 155054084.31, currentLiabilities: 38666853.94, netMaintenance: 76270505.41 }, { quarter: "2569Q3", cash: 90574485, ar: 32965272, inventory: 8321331, currentAssets: 131861088, currentLiabilities: 32005118, netMaintenance: 58400097 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 97495082, ar: 14942617, inventory: 774700, currentAssets: 78611436, currentLiabilities: -18883646, netMaintenance: 57329395 }]
  },
  {
    id: "11318",
    hospitalName: "11318-รพ. บางสะพานน้อย",
    data: [
      { quarter: "2565Q1", cash: 52980000, ar: 27560000, inventory: 3060000, currentAssets: 83600000, currentLiabilities: 30620000, netMaintenance: 22600000 },
      { quarter: "2565Q2", cash: 58860000, ar: 31990000, inventory: 4160000, currentAssets: 95010000, currentLiabilities: 31990000, netMaintenance: 26900000 },
      { quarter: "2565Q3", cash: 52130000, ar: 29710000, inventory: 3640000, currentAssets: 85480000, currentLiabilities: 28030000, netMaintenance: 24103000 },
      { quarter: "2565Q4", cash: 51650000, ar: 10610000, inventory: 3690000, currentAssets: 65950000, currentLiabilities: 23060000, netMaintenance: 28600000 },
      { quarter: "2566Q1", cash: 51020000, ar: 9500000, inventory: 4340000, currentAssets: 64870000, currentLiabilities: 30400000, netMaintenance: 20620000 },
      { quarter: "2566Q2", cash: 63210000, ar: 8250000, inventory: 4010000, currentAssets: 75470000, currentLiabilities: 39600000, netMaintenance: 23580000 },
      { quarter: "2566Q3", cash: 47370000, ar: 4040000, inventory: 4040000, currentAssets: 55270000, currentLiabilities: 29100000, netMaintenance: 18270000 },
      { quarter: "2566Q4", cash: 31470000, ar: 6970000, inventory: 2500000, currentAssets: 40940000, currentLiabilities: 17880000, netMaintenance: 13700000 },
      { quarter: "2567Q1", cash: 42680000, ar: 4570000, inventory: 4570000, currentAssets: 51820000, currentLiabilities: 21780000, netMaintenance: 20850000 },
      { quarter: "2567Q2", cash: 34230000, ar: 14980000, inventory: 5350000, currentAssets: 54560000, currentLiabilities: 21400000, netMaintenance: 12830000 },
      { quarter: "2567Q3", cash: 29210000, ar: 15689000, inventory: 5790000, currentAssets: 50680000, currentLiabilities: 23170000, netMaintenance: -1900000 },
      { quarter: "2567Q4", cash: 20960000, ar: 5240000, inventory: 2860000, currentAssets: 29050000, currentLiabilities: 23870000, netMaintenance: -2700000 },
      { quarter: "2568Q1", cash: 27650000, ar: 6710000, inventory: 3220000, currentAssets: 37580000, currentLiabilities: 26850000, netMaintenance: 892100 },
      { quarter: "2568Q2", cash: 30430000, ar: 6630005, inventory: 3920000, currentAssets: 40980005, currentLiabilities: 30130000, netMaintenance: 208100 },
      { quarter: "2568Q3", cash: 19310000, ar: 8560000, inventory: 4380000, currentAssets: 32260000, currentLiabilities: 19910000, netMaintenance: -558700 },
      { quarter: "2568Q4", cash: 11180000, ar: 13590000, inventory: 3870000, currentAssets: 28630000, currentLiabilities: 21210000, netMaintenance: -9600000 },
      { quarter: "2569Q1", cash: 12390000, ar: 10630000, inventory: 3870000, currentAssets: 26900000, currentLiabilities: 19350000, netMaintenance: -7000000 },
      { quarter: "2569Q2", cash: 23397476.22, ar: 9788740.05, inventory: 4297495.63, currentAssets: 37483711.91, currentLiabilities: 23874975.74, netMaintenance: -469781.28 }, { quarter: "2569Q3", cash: 13211871, ar: 9437050, inventory: 3984532, currentAssets: 26633454, currentLiabilities: 20971223, netMaintenance: -7703791 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 2977979, ar: 6833436, inventory: 673800, currentAssets: 50599551, currentLiabilities: 47621572, netMaintenance: -10860871 }]
  },
  {
    id: "10737",
    hospitalName: "10737-รพ. ประจวบคีรีขันธ์",
    data: [
      { quarter: "2565Q1", cash: 227740000, ar: 211200000, inventory: 22170000, currentAssets: 461130000, currentLiabilities: 201540000, netMaintenance: 24200000 },
      { quarter: "2565Q2", cash: 279490000, ar: 159710000, inventory: 23490000, currentAssets: 462690000, currentLiabilities: 234870000, netMaintenance: 44500000 },
      { quarter: "2565Q3", cash: 234410000, ar: 174780000, inventory: 22620000, currentAssets: 431800000, currentLiabilities: 205620000, netMaintenance: 29600000 },
      { quarter: "2565Q4", cash: 222380000, ar: 118410000, inventory: 21270000, currentAssets: 371270000, currentLiabilities: 193370000, netMaintenance: 29010000 },
      { quarter: "2566Q1", cash: 206460000, ar: 129340000, inventory: 19730000, currentAssets: 344600000, currentLiabilities: 151810000, netMaintenance: 54200000 },
      { quarter: "2566Q2", cash: 167490000, ar: 115150000, inventory: 23150000, currentAssets: 326760000, currentLiabilities: 136150000, netMaintenance: 37900000 },
      { quarter: "2566Q3", cash: 125130000, ar: 109390000, inventory: 17010000, currentAssets: 299650000, currentLiabilities: 130850000, netMaintenance: 36700000 },
      { quarter: "2566Q4", cash: 145860000, ar: 79120000, inventory: 15390000, currentAssets: 264440000, currentLiabilities: 139920000, netMaintenance: -16400000 },
      { quarter: "2567Q1", cash: 196390000, ar: 68340000, inventory: 18230000, currentAssets: 273490000, currentLiabilities: 130230000, netMaintenance: -20200000 },
      { quarter: "2567Q2", cash: 132940000, ar: 125170000, inventory: 21190000, currentAssets: 296710000, currentLiabilities: 141290000, netMaintenance: -62200000 },
      { quarter: "2567Q3", cash: 268110000, ar: 91470000, inventory: 28040000, currentAssets: 364480000, currentLiabilities: 175230000, netMaintenance: -107100000 },
      { quarter: "2567Q4", cash: 197310000, ar: 155170000, inventory: 24770000, currentAssets: 299190000, currentLiabilities: 190570000, netMaintenance: -98900000 },
      { quarter: "2568Q1", cash: 193440000, ar: 123580000, inventory: 24900000, currentAssets: 377390000, currentLiabilities: 191570000, netMaintenance: -35600000 },
      { quarter: "2568Q2", cash: 192040000, ar: 105460000, inventory: 25080005, currentAssets: 342100005, currentLiabilities: 179110000, netMaintenance: -56100000 },
      { quarter: "2568Q3", cash: 171250000, ar: 89780000, inventory: 23610000, currentAssets: 321110000, currentLiabilities: 157410000, netMaintenance: -51600000 },
      { quarter: "2568Q4", cash: 193070000, ar: 106460000, inventory: 19950000, currentAssets: 280980000, currentLiabilities: 166260000, netMaintenance: -76800000 },
      { quarter: "2569Q1", cash: 193680000, ar: 136420000, inventory: 21650000, currentAssets: 321180000, currentLiabilities: 180440000, netMaintenance: -74100000 },
      { quarter: "2569Q2", cash: 136416499.55, ar: 193677746.28, inventory: 30314777.68, currentAssets: 360409233.50, currentLiabilities: 168415431.54, netMaintenance: -31700039.21 }, { quarter: "2569Q3", cash: 133429094, ar: 168542014, inventory: 38624212, currentAssets: 340595320, currentLiabilities: 175564598, netMaintenance: -43162374 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 162612000, ar: 45108918, inventory: 487900, currentAssets: 346008460, currentLiabilities: 183396460, netMaintenance: -57479888 }]
  },
  {
    id: "11320",
    hospitalName: "11320-รพ. หัวหิน",
    data: [
      { quarter: "2565Q1", cash: 402810000, ar: 360000000, inventory: 69760000, currentAssets: 832620000, currentLiabilities: 225030000, netMaintenance: 183200000 },
      { quarter: "2565Q2", cash: 484000000, ar: 262590000, inventory: 73800000, currentAssets: 820390000, currentLiabilities: 319300000, netMaintenance: 371600000 },
      { quarter: "2565Q3", cash: 557330000, ar: 240020000, inventory: 65090000, currentAssets: 862440000, currentLiabilities: 358600000, netMaintenance: 203410000 },
      { quarter: "2565Q4", cash: 549110000, ar: 25852000, inventory: 62130000, currentAssets: 869760000, currentLiabilities: 348200000, netMaintenance: 200400000 },
      { quarter: "2566Q1", cash: 580810000, ar: 256860000, inventory: 65170000, currentAssets: 902840000, currentLiabilities: 390100000, netMaintenance: 191690000 },
      { quarter: "2566Q2", cash: 674550000, ar: 190410000, inventory: 66850000, currentAssets: 931810000, currentLiabilities: 217240000, netMaintenance: 472600000 },
      { quarter: "2566Q3", cash: 606160000, ar: 217240000, inventory: 68320000, currentAssets: 891730000, currentLiabilities: 119950000, netMaintenance: 291310000 },
      { quarter: "2566Q4", cash: 578390000, ar: 254690000, inventory: 119950000, currentAssets: 953030000, currentLiabilities: 98020000, netMaintenance: 415000000 },
      { quarter: "2567Q1", cash: 652870000, ar: 307020000, inventory: 98230000, currentAssets: 1060000000, currentLiabilities: 104740000, netMaintenance: 467900000 },
      { quarter: "2567Q2", cash: 631040000, ar: 336360000, inventory: 104740000, currentAssets: 1070000000, currentLiabilities: 115990000, netMaintenance: 481600000 },
      { quarter: "2567Q3", cash: 604990000, ar: 438840000, inventory: 106700000, currentAssets: 1150000000, currentLiabilities: 180590000, netMaintenance: 424600000 },
      { quarter: "2567Q4", cash: 589650000, ar: 280790000, inventory: 114650000, currentAssets: 977140000, currentLiabilities: 187190000, netMaintenance: 402400000 },
      { quarter: "2568Q1", cash: 560520000, ar: 314840000, inventory: 115990000, currentAssets: 990020000, currentLiabilities: 181990000, netMaintenance: 37930000 },
      { quarter: "2568Q2", cash: 579970000, ar: 277990000, inventory: 113900000, currentAssets: 973960000, currentLiabilities: 204690000, netMaintenance: 379390000 },
      { quarter: "2568Q3", cash: 574080000, ar: 284760000, inventory: 134600000, currentAssets: 972750000, currentLiabilities: 253960000, netMaintenance: 346000000 },
      { quarter: "2568Q4", cash: 462200000, ar: 322520000, inventory: 118950000, currentAssets: 919320000, currentLiabilities: 237890000, netMaintenance: 208400000 },
      { quarter: "2569Q1", cash: 482920000, ar: 304500000, inventory: 120770000, currentAssets: 906370000, currentLiabilities: 204690000, netMaintenance: 246100000 },
      { quarter: "2569Q2", cash: 423715315.11, ar: 309087017.30, inventory: 120769099.47, currentAssets: 853571431.88, currentLiabilities: 204693388.94, netMaintenance: 218276191.03 }, { quarter: "2569Q3", cash: 389810555, ar: 325226558, inventory: 117635138, currentAssets: 832672251, currentLiabilities: 230657133, netMaintenance: 158688609 }
    , { quarter: "2569Q4 (ก.ค. 69)", cash: 585591234, ar: 219455088, inventory: 889200, currentAssets: 560414656, currentLiabilities: -25176578, netMaintenance: 162390007 }]
  }
];
