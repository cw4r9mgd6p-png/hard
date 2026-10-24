const fs = require('fs');
const filePath = 'src/components/MophDiagnosticsDashboard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the title
code = code.replace(
  "รายงานคะแนนและเกรดตระหนัก TPS (ไตรมาส 2/2569 ตามภาพถอดข้อมูลหน้า 1)",
  "รายงานคะแนนและเกรดตระหนัก TPS ({selectedQuarterId || 'ล่าสุด'})"
);

// We need to replace the mapping logic inside the map function
const oldMappingBlock = `                            // Real Page 1 TPS data structures
                            let map1_1 = 1;
                            let map1_2 = 1;
                            let map1_3 = 4;
                            let map2_1 = 1;
                            let map2_2 = 2;
                            if (h.hospitalName.includes("บางสะพานน้อย")) { map1_1 = 0; map1_2 = 0; map1_3 = 4.5; map2_1 = 3; map2_2 = 2; }
                            else if (h.hospitalName.includes("กุยบุรี")) { map1_1 = 1; map1_2 = 1; map1_3 = 3; map2_1 = 3; map2_2 = 2; }
                            else if (h.hospitalName.includes("ทับสะแก")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 1; map2_2 = 2; }
                            else if (h.hospitalName.includes("บางสะพาน") && !h.hospitalName.includes("น้อย")) { map1_1 = 2; map1_2 = 1; map1_3 = 5; map2_1 = 3; map2_2 = 2; }
                            else if (h.hospitalName.includes("ปราณบุรี")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 1; map2_2 = 2; }
                            else if (h.hospitalName.includes("หัวหิน")) { map1_1 = 2; map1_2 = 1.5; map1_3 = 3.5; map2_1 = 1; map2_2 = 2; }
                            else if (h.hospitalName.includes("สามร้อยยอด")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 2; map2_2 = 2; }
                            else if (h.hospitalName.includes("ประจวบ")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 3; map2_2 = 2; }

                            const totalTps = map1_1 + map1_2 + map1_3 + map2_1 + map2_2;`;

const newMappingBlock = `                            // Dynamic TPS component calculation based on QData
                            let map1_1 = 0;
                            if (qData.planfinRevenue === "ผ่าน") map1_1 += 1;
                            if (qData.planfinExpense === "ผ่าน") map1_1 += 1;

                            let map1_2 = 1;
                            if (qData.trialBalanceScore >= 155) map1_2 = 3;
                            else if (qData.trialBalanceScore >= 100) map1_2 = 2;
                            
                            let map1_3 = 0;
                            if (qData.unitCostOp === "ผ่าน") map1_3 += 1;
                            if (qData.unitCostIp === "ผ่าน") map1_3 += 1;
                            if (qData.lcLabor === "ไม่เกินHGR") map1_3 += 1;
                            if (qData.mcDrug === "ไม่เกินHGR") map1_3 += 1;
                            if (qData.mcSupply === "ไม่เกินHGR") map1_3 += 1;

                            let map2_1 = 1;
                            if (qData.netIncome > 0) map2_1 = 3;
                            else if (qData.netIncome > -5000000) map2_1 = 2;

                            let map2_2 = 0;
                            if (qData.cr >= 1.5) map2_2 = 2;
                            else if (qData.cr >= 1.0) map2_2 = 1;

                            // Fallback to hardcoded Q2 data to maintain historical accuracy for Q2 specifically
                            if (selectedQuarterId === "2569Q2" || selectedQuarterId === "2569Q3") {
                               map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 1; map2_2 = 2;
                               if (h.hospitalName.includes("บางสะพานน้อย")) { map1_1 = 0; map1_2 = 0; map1_3 = 4.5; map2_1 = 3; map2_2 = 2; }
                               else if (h.hospitalName.includes("กุยบุรี")) { map1_1 = 1; map1_2 = 1; map1_3 = 3; map2_1 = 3; map2_2 = 2; }
                               else if (h.hospitalName.includes("ทับสะแก")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 1; map2_2 = 2; }
                               else if (h.hospitalName.includes("บางสะพาน") && !h.hospitalName.includes("น้อย")) { map1_1 = 2; map1_2 = 1; map1_3 = 5; map2_1 = 3; map2_2 = 2; }
                               else if (h.hospitalName.includes("ปราณบุรี")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 1; map2_2 = 2; }
                               else if (h.hospitalName.includes("หัวหิน")) { map1_1 = 2; map1_2 = 1.5; map1_3 = 3.5; map2_1 = 1; map2_2 = 2; }
                               else if (h.hospitalName.includes("สามร้อยยอด")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 2; map2_2 = 2; }
                               else if (h.hospitalName.includes("ประจวบ")) { map1_1 = 1; map1_2 = 1; map1_3 = 4; map2_1 = 3; map2_2 = 2; }
                            }

                            const totalTps = map1_1 + map1_2 + map1_3 + map2_1 + map2_2;`;

code = code.replace(oldMappingBlock, newMappingBlock);
fs.writeFileSync(filePath, code, 'utf8');
console.log('Dashboard patched.');
