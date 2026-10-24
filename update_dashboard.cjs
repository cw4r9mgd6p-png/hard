const fs = require('fs');

const code = `import React, { useState } from 'react';
import { 
  debtTurnoverSeptember2569,
  debtTurnoverAugust2569,
  financialHealthSeptember2569,
  financialHealthAugust2569,
  gfmisTrialBalanceSeptember2569,
  trialBalance10Items, 
  trialBalanceHospitalsSummary, 
  ipRevenueDataset, 
  provincialTotalIpRevenue,
  DebtTurnoverData,
  FinancialHealthData
} from '../data/latestJuneJuly2569Data';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Building2, 
  DollarSign, 
  FileSpreadsheet, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Award, 
  Activity, 
  Filter,
  Layers,
  ArrowRight,
  TrendingDown,
  Calendar,
  FileText,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { XLSX } from '../utils/xlsxHelper';

export function LatestJuneJulyAuditDashboard() {
  const [selectedMonth, setSelectedMonth] = useState<'SEP_2569' | 'AUG_2569'>('SEP_2569');
  const [activeDomain, setActiveDomain] = useState<'OVERVIEW' | 'TURNOVER' | 'FINANCIAL_HEALTH' | 'GFMIS_TB' | 'TRIAL_BALANCE' | 'IP_REVENUE'>('OVERVIEW');
  const [selectedHospital, setSelectedHospital] = useState<string>('ALL');

  // Dynamic active dataset based on selected month
  const activeTurnoverDataset = selectedMonth === 'SEP_2569' ? debtTurnoverSeptember2569 : debtTurnoverAugust2569;
  const activeHealthDataset = selectedMonth === 'SEP_2569' ? financialHealthSeptember2569 : financialHealthAugust2569;

  // Format currency helpers
  const formatBaht = (val: number) => {
    return val.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ฿";
  };

  // Export to Excel
  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Turnover September 2569
      const ws1 = XLSX.utils.json_to_sheet(debtTurnoverSeptember2569.map(d => ({
        "รหัส": d.hospitalCode,
        "หน่วยบริการ": d.hospitalName,
        "Cash Ratio": d.cash,
        "A Payment Period <=90วัน (วัน)": d.appDays,
        "A Collection Period_UC <=60วัน (วัน)": d.acpUcDays,
        "A Collection Period_CSMBS <=60วัน (วัน)": d.acpCsmbsDays,
        "A Collection Period_SSS <=120วัน (วัน)": d.acpSssDays,
        "A Inventory Period <=60วัน (วัน)": d.inventoryDays
      })));
      XLSX.utils.book_append_sheet(wb, ws1, "ระยะเวลาเก็บหนี้_กย69");

      // Sheet 2: Financial Health September 2569
      const ws2 = XLSX.utils.json_to_sheet(financialHealthSeptember2569.map(d => ({
        "รหัส": d.hospitalCode,
        "หน่วยงาน": d.hospitalName,
        "Current Ratio (เท่า)": d.cr,
        "Quick Ratio (เท่า)": d.qr,
        "Cash Ratio (เท่า)": d.cashRatio,
        "Net Working Capital (บาท)": d.nwc,
        "Net Income (บาท)": d.netIncome,
        "Risk Scoring": d.riskScore,
        "EBITDA (บาท)": d.ebitda,
        "เงินบำรุงคงเหลือ(หักหนี้แล้ว) (บาท)": d.netFund
      })));
      XLSX.utils.book_append_sheet(wb, ws2, "สถานการณ์การเงิน_กย69");

      // Sheet 3: GFMIS Ending Balances
      const ws3 = XLSX.utils.json_to_sheet(gfmisTrialBalanceSeptember2569.map(d => ({
        "รหัส": d.hospitalCode,
        "หน่วยบริการ": d.hospitalName,
        "รหัสหน่วยเบิกจ่าย": d.docNumber,
        "เงินสดและเงินฝากคลัง/ธนาคาร": d.cashAndDeposits,
        "ล/น การค้า-ภาครัฐ (1102050101)": d.govAR,
        "ล/น การค้า-ภายนอก (1102050102)": d.extAR,
        "ค่าเผื่อหนี้สงสัยจะสูญ (1102050123)": d.allowanceBadDebt,
        "สินค้าสำเร็จรูป (1105010103)": d.inventoryGoods,
        "วัสดุคงคลัง (1105010105)": d.inventorySupplies,
        "เจ้าหนี้การค้า/รับสินค้า (2101010103)": d.tradeAP,
        "เจ้าหนี้อื่น-ภายนอก (2101020199)": d.otherAP,
        "ใบสำคัญค้างจ่ายอื่น (2102040110)": d.accruedVouchers,
        "รายได้รักษาพยาบาลรวม": d.totalMedicalRevenue,
        "วันที่รายงาน": d.reportDate
      })));
      XLSX.utils.book_append_sheet(wb, ws3, "งบทดลอง_GFMIS_งวด12");

      // Sheet 4: Trial Balance Quality
      const ws4 = XLSX.utils.json_to_sheet(trialBalanceHospitalsSummary.map(d => ({
        "โรงพยาบาล": d.hospitalName,
        "คะแนนที่ได้ (เต็ม 160.50)": d.totalScore,
        "ร้อยละ (%)": d.percent,
        "เกรด": d.grade,
        "ระดับ": d.gradeLabel
      })));
      XLSX.utils.book_append_sheet(wb, ws4, "ประเมินคุณภาพงบทดลอง");

      XLSX.writeFile(wb, \`รายงานการเงินและงบทดลอง_สสจ_ประจวบคีรีขันธ์_กันยายน2569.xlsx\`);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการดาวน์โหลด Excel");
    }
  };

  // Filtered dataset helpers
  const filteredTurnover = selectedHospital === 'ALL' 
    ? activeTurnoverDataset 
    : activeTurnoverDataset.filter(d => d.hospitalName.includes(selectedHospital) || selectedHospital.includes(d.hospitalName));

  const filteredHealth = selectedHospital === 'ALL'
    ? activeHealthDataset
    : activeHealthDataset.filter(d => d.hospitalName.includes(selectedHospital) || selectedHospital.includes(d.hospitalName));

  const filteredGfmis = selectedHospital === 'ALL'
    ? gfmisTrialBalanceSeptember2569
    : gfmisTrialBalanceSeptember2569.filter(d => d.hospitalName.includes(selectedHospital) || selectedHospital.includes(d.hospitalName));

  // Chart data for Turnover comparison
  const turnoverChartData = activeTurnoverDataset.map(d => ({
    name: d.hospitalName.replace("รพ. ", "").replace("รพ.", ""),
    "ชำระหนี้ (APP)": d.appDays,
    "ลูกหนี้ UC": d.acpUcDays,
    "ลูกหนี้ CSMBS": d.acpCsmbsDays,
    "ลูกหนี้ SSS": d.acpSssDays,
    "สินค้าคงคลัง (AIP)": d.inventoryDays
  }));

  // Chart data for Financial Health
  const healthChartData = activeHealthDataset.map(d => ({
    name: d.hospitalName.replace("รพ. ", "").replace("รพ.", ""),
    "NWC (ล้านบาท)": Number((d.nwc / 1_000_000).toFixed(2)),
    "เงินบำรุงสุทธิ (ล้านบาท)": Number((d.netFund / 1_000_000).toFixed(2)),
    "Net Income (ล้านบาท)": Number((d.netIncome / 1_000_000).toFixed(2)),
    "EBITDA (ล้านบาท)": Number((d.ebitda / 1_000_000).toFixed(2)),
    cr: d.cr,
    cash: d.cashRatio,
    risk: d.riskScore
  }));

  // Chart data for GFMIS AR comparison
  const gfmisArChartData = gfmisTrialBalanceSeptember2569.map(d => ({
    name: d.hospitalName.replace("รพ. ", "").replace("รพ.", ""),
    "ล/น ภาครัฐ (ล้านบาท)": Number((d.govAR / 1_000_000).toFixed(2)),
    "ล/น ภายนอก (ล้านบาท)": Number((d.extAR / 1_000_000).toFixed(2)),
    "เงินสด/เงินฝาก (ล้านบาท)": Number((d.cashAndDeposits / 1_000_000).toFixed(2)),
    "เจ้าหนี้รวม (ล้านบาท)": Number(((d.tradeAP + d.otherAP + d.accruedVouchers) / 1_000_000).toFixed(2))
  }));

  return (
    <div className="space-y-5 animate-fadeIn" id="latest-june-july-dashboard">
      
      {/* 1. Header Banner with Month Switcher & Actions */}
      <div className="bg-[#0b1324] border border-[#213f7a] rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>รายงานข้อมูลการเงินและงบทดลองล่าสุด</span>
              </span>
              
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/40">
                {selectedMonth === 'SEP_2569' ? "ณ เดือนกันยายน 2569 (สิ้นปีงบประมาณ 2569)" : "ณ เดือนสิงหาคม 2569"}
              </span>

              <span className="text-[11px] text-sky-400 font-medium hidden sm:inline">
                (ข้อมูลรอบประเมิน 11 ต.ค. 2569 เวลา 19:03 น. + งบทดลอง GFMIS งวด 12)
              </span>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
              <span>การวิเคราะห์สถานการณ์การเงินการคลังและคุณภาพงบทดลอง 8 โรงพยาบาล</span>
              <span className={selectedMonth === 'SEP_2569' ? "text-amber-400 font-black" : "text-sky-400 font-black"}>
                ({selectedMonth === 'SEP_2569' ? "กันยายน 2569 - สิ้นปีงบ" : "สิงหาคม 2569"})
              </span>
            </h2>

            <p className="text-xs text-slate-300">
              สังเคราะห์ข้อมูลจากกองเศรษฐกิจสุขภาพและหลักประกันสุขภาพ สป. (11 ต.ค. 2569), สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์ และรายงานงบทดลอง GFMIS งวด 12
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Month Switcher Toggle Pills */}
            <div className="bg-[#111c35] p-1 rounded-2xl border border-[#1e2f4f] flex items-center gap-1 shadow-inner">
              <button
                onClick={() => setSelectedMonth('SEP_2569')}
                className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer \${
                  selectedMonth === 'SEP_2569'
                    ? "bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-md font-black"
                    : "text-slate-400 hover:text-white"
                }\`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>กันยายน 2569 (ล่าสุด)</span>
              </button>
              <button
                onClick={() => setSelectedMonth('AUG_2569')}
                className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer \${
                  selectedMonth === 'AUG_2569'
                    ? "bg-gradient-to-b from-sky-500 to-sky-600 text-white shadow-md font-black"
                    : "text-slate-400 hover:text-white"
                }\`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>สิงหาคม 2569</span>
              </button>
            </div>

            {/* Export Excel Button */}
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 border-t border-x border-emerald-400 border-b-2 border-emerald-800 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>ส่งออก Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Executive Diagnostic Highlights (4 High-Level Key Indicators for September 2569) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Negative Net Fund (เงินบำรุงหักหนี้แล้ว) */}
        <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 shadow-lg hover:border-amber-500/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wide">เงินบำรุงคงเหลือ(หักหนี้แล้ว)</span>
            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-400 mb-1">
            {selectedMonth === 'SEP_2569' ? "ติดลบ 4 แห่ง (-177.12M)" : "ติดลบ 3 แห่ง (-68.88M)"}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {selectedMonth === 'SEP_2569' ? (
              <>
                <span className="text-rose-400 font-bold">รพ.ประจวบฯ (-96.36M)</span>, <span className="text-rose-400 font-bold">บางสะพาน (-51.48M)</span>, <span className="text-rose-400 font-bold">บางสะพานน้อย (-18.87M)</span>, <span className="text-rose-400 font-bold">ทับสะแก (-10.41M)</span>
              </>
            ) : (
              <>
                <span className="text-rose-400 font-bold">รพ.ประจวบฯ (-67.44M)</span>, <span className="text-rose-400 font-bold">บางสะพาน (-33.42M)</span>, <span className="text-rose-400 font-bold">บางสะพานน้อย (-13.96M)</span>
              </>
            )}
          </p>
        </div>

        {/* Card 2: Risk Scoring Escalation */}
        <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 shadow-lg hover:border-rose-500/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-rose-400 uppercase tracking-wide">ระดับความเสี่ยงการคลัง (Risk Score)</span>
            <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white mb-1">
            {selectedMonth === 'SEP_2569' ? (
              <span className="text-rose-500">รพ.บางสะพานน้อย ระดับ 7 (วิกฤต)</span>
            ) : (
              <span className="text-rose-500">รพ.บางสะพานน้อย ระดับ 7</span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {selectedMonth === 'SEP_2569' ? (
              <>
                <span className="text-amber-400 font-bold">ทับสะแก ขยับขึ้นสู่ ระดับ 4 (สีส้ม)</span>, <span className="text-amber-300 font-bold">บางสะพาน ระดับ 3</span>, บางสะพานน้อย CR=0.81 NWC ติดลบ
              </>
            ) : (
              <>
                บางสะพานน้อย เสี่ยงระดับ 7 สูงสุดในจังหวัด, บางสะพาน ระดับ 3, ทับสะแก ระดับ 1
              </>
            )}
          </p>
        </div>

        {/* Card 3: Drug Payment Period (A Payment Period) */}
        <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 shadow-lg hover:border-indigo-500/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wide">ระยะเวลาชำระหนี้ (APP ≤ 90 วัน)</span>
            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white mb-1">
            {selectedMonth === 'SEP_2569' ? (
              <span className="text-rose-400">เกินเกณฑ์ 4 แห่ง</span>
            ) : (
              <span className="text-amber-400">เกินเกณฑ์ 4 แห่ง</span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {selectedMonth === 'SEP_2569' ? (
              <>
                ช้าสุดที่ <span className="text-rose-400 font-bold">บางสะพาน (202.37 วัน)</span>, บางสะพานน้อย (141.49 วัน), ทับสะแก (130.73 วัน), ประจวบฯ (122.01 วัน)
              </>
            ) : (
              <>
                ช้าสุดที่ <span className="text-rose-400 font-bold">บางสะพาน (194 วัน)</span>, บางสะพานน้อย (128 วัน), ทับสะแก (124 วัน)
              </>
            )}
          </p>
        </div>

        {/* Card 4: Safe Liquidity Leaders */}
        <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 shadow-lg hover:border-emerald-500/50 transition-all relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wide">กลุ่มสภาพคล่องปลอดภัยสูง</span>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 mb-1">
            4 รพ. แข็งแกร่ง
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {selectedMonth === 'SEP_2569' ? (
              <>
                <span className="text-emerald-300 font-bold">สามร้อยยอด (+139.0M, CR 12.07)</span>, <span className="text-emerald-300 font-bold">หัวหิน (+49.7M)</span>, ปราณบุรี (+43.1M), กุยบุรี (+19.4M)
              </>
            ) : (
              <>
                <span className="text-emerald-300 font-bold">สามร้อยยอด (+146.1M)</span>, <span className="text-emerald-300 font-bold">หัวหิน (+110.5M)</span>, ปราณบุรี (+52.4M), กุยบุรี (+25.4M)
              </>
            )}
          </p>
        </div>

      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-2 shadow-lg">
        <div className="flex overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent gap-2 pb-2 snap-x scroll-smooth custom-scrollbar">
          
          {/* Tab 0: Overview */}
          <button
            onClick={() => setActiveDomain('OVERVIEW')}
            className={\`flex-1 min-w-[210px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer snap-start \${
              activeDomain === 'OVERVIEW'
                ? 'bg-gradient-to-b from-emerald-500 to-emerald-650 text-white border-t border-x border-emerald-400 border-b-4 border-emerald-800 shadow-[0_4px_10px_rgba(16,185,129,0.35),_0_3px_0_0_#065f46] active:translate-y-[1.5px]'
                : 'bg-[#111c35] text-slate-300 hover:text-white border border-[#1e2f4f]'
            }\`}
          >
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex flex-col items-center text-center leading-snug">
              <span className="font-black break-words">ภาพรวมบทวิเคราะห์</span>
              <span className="text-[11px] font-semibold opacity-90 mt-0.5 break-words">(Executive Synthesis & MoM)</span>
            </div>
          </button>

          {/* Tab 1: Topic 1 Turnover */}
          <button
            onClick={() => setActiveDomain('TURNOVER')}
            className={\`flex-1 min-w-[210px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer snap-start \${
              activeDomain === 'TURNOVER'
                ? 'bg-gradient-to-b from-blue-500 to-blue-650 text-white border-t border-x border-blue-400 border-b-4 border-blue-800 shadow-[0_4px_10px_rgba(59,130,246,0.35),_0_3px_0_0_#1e3a8a] active:translate-y-[1.5px]'
                : 'bg-[#111c35] text-slate-300 hover:text-white border border-[#1e2f4f]'
            }\`}
          >
            <Clock className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="flex flex-col items-center text-center leading-snug">
              <span className="font-black break-words">1. ระยะเวลาเรียกเก็บหนี้และชำระหนี้</span>
              <span className="text-[11px] font-semibold opacity-90 mt-0.5 break-words">(Turnover Days & Inventory)</span>
            </div>
          </button>

          {/* Tab 2: Topic 2 Financial Health */}
          <button
            onClick={() => setActiveDomain('FINANCIAL_HEALTH')}
            className={\`flex-1 min-w-[210px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer snap-start \${
              activeDomain === 'FINANCIAL_HEALTH'
                ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 border-t border-x border-amber-400 border-b-4 border-amber-800 shadow-[0_4px_10px_rgba(245,158,11,0.35),_0_3px_0_0_#78350f] active:translate-y-[1.5px]'
                : 'bg-[#111c35] text-slate-300 hover:text-white border border-[#1e2f4f]'
            }\`}
          >
            <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex flex-col items-center text-center leading-snug">
              <span className="font-black break-words">2. สถานการณ์การเงินการคลัง</span>
              <span className="text-[11px] font-semibold opacity-90 mt-0.5 break-words">(Financial Health Situation)</span>
            </div>
          </button>

          {/* Tab 3: GFMIS Trial Balance (NEW) */}
          <button
            onClick={() => setActiveDomain('GFMIS_TB')}
            className={\`flex-1 min-w-[210px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer snap-start \${
              activeDomain === 'GFMIS_TB'
                ? 'bg-gradient-to-b from-teal-500 to-teal-650 text-white border-t border-x border-teal-400 border-b-4 border-teal-800 shadow-[0_4px_10px_rgba(20,184,166,0.35),_0_3px_0_0_#115e59] active:translate-y-[1.5px]'
                : 'bg-[#111c35] text-slate-300 hover:text-white border border-[#1e2f4f]'
            }\`}
          >
            <FileText className="w-4 h-4 text-teal-300 shrink-0" />
            <div className="flex flex-col items-center text-center leading-snug">
              <span className="font-black break-words">3. งบทดลอง GFMIS สิ้นปีงบ 69</span>
              <span className="text-[11px] font-semibold opacity-90 mt-0.5 break-words">(GFMIS Trial Balance Ending)</span>
            </div>
          </button>

          {/* Tab 4: Topic 4 Trial Balance Quality */}
          <button
            onClick={() => setActiveDomain('TRIAL_BALANCE')}
            className={\`flex-1 min-w-[210px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer snap-start \${
              activeDomain === 'TRIAL_BALANCE'
                ? 'bg-gradient-to-b from-purple-500 to-purple-650 text-white border-t border-x border-purple-400 border-b-4 border-purple-800 shadow-[0_4px_10px_rgba(168,85,247,0.35),_0_3px_0_0_#581c87] active:translate-y-[1.5px]'
                : 'bg-[#111c35] text-slate-300 hover:text-white border border-[#1e2f4f]'
            }\`}
          >
            <Award className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="flex flex-col items-center text-center leading-snug">
              <span className="font-black break-words">4. ผลประเมินคุณภาพงบทดลอง</span>
              <span className="text-[11px] font-semibold opacity-90 mt-0.5 break-words">(Trial Balance Quality 10 หมวด)</span>
            </div>
          </button>

          {/* Tab 5: Topic 5 IP Revenue */}
          <button
            onClick={() => setActiveDomain('IP_REVENUE')}
            className={\`flex-1 min-w-[210px] shrink-0 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer snap-start \${
              activeDomain === 'IP_REVENUE'
                ? 'bg-gradient-to-b from-sky-500 to-sky-650 text-white border-t border-x border-sky-400 border-b-4 border-sky-800 shadow-[0_4px_10px_rgba(14,165,233,0.35),_0_3px_0_0_#0369a1] active:translate-y-[1.5px]'
                : 'bg-[#111c35] text-slate-300 hover:text-white border border-[#1e2f4f]'
            }\`}
          >
            <TrendingUp className="w-4 h-4 text-sky-300 shrink-0" />
            <div className="flex flex-col items-center text-center leading-snug">
              <span className="font-black break-words">5. รายรับชดเชย IP หลังปรับลดค่าแรง</span>
              <span className="text-[11px] font-semibold opacity-90 mt-0.5 break-words">(Inpatient Revenue Compensation)</span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. TAB CONTENTS */}

      {/* DOMAIN 1: OVERVIEW SYNTHESIS & MoM Analytics */}
      {activeDomain === 'OVERVIEW' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Executive Summary Narrative */}
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  บทวิเคราะห์สังเคราะห์ภาพรวมสถานการณ์การเงินการคลัง ({selectedMonth === 'SEP_2569' ? "กันยายน 2569 - สิ้นปีงบประมาณ 2569" : "สิงหาคม 2569"})
                </h3>
              </div>
              <span className="text-xs text-slate-400 bg-[#111c35] px-3 py-1 rounded-lg border border-[#1e2f4f]">
                {selectedMonth === 'SEP_2569' ? "ข้อมูล ณ 11 ต.ค. 2569 19:03 น." : "ข้อมูล ณ 11 ก.ย. 2569"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-[#111c35]/80 p-4 rounded-xl border border-[#1e2f4f] space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>จุดเฝ้าระวังวิกฤตสภาพคล่องและเงินบำรุงสุทธิ (เดือนกันยายน 2569)</span>
                </div>
                <p>
                  1. <strong>เงินบำรุงคงเหลือสุทธิหลังหักหนี้ติดลบเพิ่มเป็น 4 แห่ง:</strong> รวมยอดติดลบสูงถึง <strong className="text-rose-400">-177.12 ล้านบาท</strong> ได้แก่ <strong>รพ.ประจวบคีรีขันธ์ (-96.36M)</strong>, <strong>รพ.บางสะพาน (-51.48M)</strong>, <strong>รพ.บางสะพานน้อย (-18.87M)</strong>, และ <strong>รพ.ทับสะแก (-10.41M)</strong>
                </p>
                <p>
                  2. <strong>สัญญาณเตือนภัยระดับความเสี่ยง (Risk Scoring):</strong> <strong>รพ.บางสะพานน้อย</strong> อยู่ใน <strong>ระดับ 7 (วิกฤตสูงสุด/โซนแดงเข้ม)</strong> โดยมี CR เพียง 0.81, Quick Ratio 0.68, Cash Ratio 0.26 และ NWC ติดลบ -4.98 ล้านบาท ขณะที่ <strong>รพ.ทับสะแก</strong> ขยับจากระดับ 1 ขึ้นสู่ <strong>ระดับ 4 (เฝ้าระวังสีส้ม)</strong>
                </p>
                <p>
                  3. <strong>ระยะเวลาชำระหนี้ค่ายา (A Payment Period):</strong> <strong>รพ.บางสะพาน</strong> ใช้ระยะเวลาชำระหนี้ยาวนานที่สุดในจังหวัดถึง <strong>202.37 วัน</strong> (เกินเกณฑ์ 90 วันอย่างรุนแรง) ตามด้วย รพ.บางสะพานน้อย (141.49 วัน), รพ.ทับสะแก (130.73 วัน) และ รพ.ประจวบฯ (122.01 วัน)
                </p>
              </div>

              <div className="bg-[#111c35]/80 p-4 rounded-xl border border-[#1e2f4f] space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>ประสิทธิภาพการเรียกเก็บหนี้และกลุ่มสภาพคล่องเข้มแข็ง</span>
                </div>
                <p>
                  1. <strong>การเรียกเก็บหนี้สิทธิประกันสังคม (SSS):</strong> ล่าช้าเกินเกณฑ์ 120 วันทุกแห่ง โดยเฉลี่ยเกือบ 300 วัน โดยเฉพาะ <strong>รพ.กุยบุรี (480.54 วัน)</strong>, <strong>รพ.ทับสะแก (393.18 วัน)</strong>, และ <strong>รพ.บางสะพานน้อย (336.89 วัน)</strong>
                </p>
                <p>
                  2. <strong>การเรียกเก็บหนี้สิทธิบัตรทอง (UC):</strong> เกินเกณฑ์ 60 วันทุกแห่ง โดยช้าสุดที่ <strong>รพ.ปราณบุรี (296.25 วัน)</strong> และ <strong>รพ.หัวหิน (192.94 วัน)</strong>
                </p>
                <p>
                  3. <strong>กลุ่มโรงพยาบาลที่มีฐานะการเงินและสภาพคล่องแข็งแกร่ง:</strong> <strong>รพ.สามร้อยยอด</strong> มีเงินบำรุงสุทธิสูงถึง 139.03 ล้านบาท, CR = 12.07, Cash Ratio = 10.32 ตามด้วย <strong>รพ.หัวหิน</strong> (NWC 478.51M, เงินบำรุง 49.70M), <strong>รพ.ปราณบุรี</strong> (เงินบำรุง 43.13M, CR 3.30), และ <strong>รพ.กุยบุรี</strong> (เงินบำรุง 19.36M, CR 2.92)
                </p>
                <p>
                  4. <strong>คุณภาพงบทดลอง GFMIS:</strong> ข้อมูลยอดยกไปสิ้นงวด 12 ตรงกับบัญชีแยกประเภท (GL) ครบถ้วน 100% ผ่านเกณฑ์การประเมินด้านการบัญชีของกรมบัญชีกลาง
                </p>
              </div>
            </div>
          </div>

          {/* MoM Comparison: สิงหาคม 2569 vs กันยายน 2569 */}
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-amber-400" />
                  <span>ตารางเปรียบเทียบการเปลี่ยนแปลงสถานะการเงิน (Month-over-Month: ส.ค. 69 ➔ ก.ย. 69)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  ติดตามการเปลี่ยนแปลงของเงินบำรุงสุทธิ, ทุนหมุนเวียน NWC, Risk Scoring และระยะเวลาชำระหนี้
                </p>
              </div>
            </div>

            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <table className="whitespace-nowrap w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#111c35] text-slate-200 border-b border-[#1e2f4f]">
                    <th className="py-2.5 px-2 font-extrabold">หน่วยบริการ</th>
                    <th className="py-2.5 px-2 font-extrabold text-center">Risk Score (ส.ค. ➔ ก.ย.)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">เงินบำรุงสุทธิ ส.ค. 69</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">เงินบำรุงสุทธิ ก.ย. 69</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">ส่วนต่างเงินบำรุง (MoM)</th>
                    <th className="py-2.5 px-2 font-extrabold text-center">CR (ส.ค. ➔ ก.ย.)</th>
                    <th className="py-2.5 px-2 font-extrabold text-center">ชำระหนี้ APP (วัน)</th>
                    <th className="py-2.5 px-2 font-extrabold text-center">สถานะการคลัง</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2f4f]/60 text-slate-200">
                  {financialHealthSeptember2569.map((sep) => {
                    const aug = financialHealthAugust2569.find(a => a.hospitalCode === sep.hospitalCode);
                    const diffFund = aug ? sep.netFund - aug.netFund : 0;
                    const sepTurnover = debtTurnoverSeptember2569.find(t => t.hospitalCode === sep.hospitalCode);
                    const augTurnover = debtTurnoverAugust2569.find(t => t.hospitalCode === sep.hospitalCode);

                    return (
                      <tr key={sep.hospitalCode} className="hover:bg-[#111c35]/50 transition-colors">
                        <td className="py-2 px-2 font-bold text-white flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{sep.hospitalName}</span>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <span className="font-mono text-slate-400">{aug?.riskScore}</span>
                          <span className="mx-1 text-slate-500">➔</span>
                          <span className={\`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] \${
                            sep.riskScore >= 7 ? 'bg-red-500/30 text-red-300 border border-red-500/50' :
                            sep.riskScore >= 3 ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' :
                            'bg-emerald-500/20 text-emerald-300'
                          }\`}>
                            {sep.riskScore}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right font-mono text-slate-400">
                          {aug ? (aug.netFund / 1_000_000).toFixed(2) + "M" : "-"}
                        </td>
                        <td className={\`py-2 px-2 text-right font-mono font-bold \${sep.netFund < 0 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                          {(sep.netFund / 1_000_000).toFixed(2)}M
                        </td>
                        <td className={\`py-2 px-2 text-right font-mono font-bold \${diffFund < 0 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                          {diffFund > 0 ? "+" : ""}{(diffFund / 1_000_000).toFixed(2)}M
                        </td>
                        <td className="py-2 px-2 text-center font-mono text-slate-300">
                          {aug?.cr.toFixed(2)} ➔ <strong className={sep.cr < 1.0 ? 'text-rose-400' : 'text-slate-200'}>{sep.cr.toFixed(2)}</strong>
                        </td>
                        <td className={\`py-2 px-2 text-center font-mono font-bold \${sepTurnover && sepTurnover.appDays > 90 ? 'text-rose-400' : 'text-slate-300'}\`}>
                          {sepTurnover?.appDays} วัน
                        </td>
                        <td className="py-2 px-2 text-center">
                          {sep.riskScore >= 7 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/40">
                              วิกฤตสูงสุด
                            </span>
                          ) : sep.riskScore >= 3 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              เฝ้าระวังพิเศษ
                            </span>
                          ) : sep.netFund < 0 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-500/20 text-orange-300 border border-orange-500/40">
                              เงินบำรุงติดลบ
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              คล่องตัวปกติ
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Chart 1: NWC vs Net Maintenance Fund */}
            <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-black text-white">เปรียบเทียบ NWC และ เงินบำรุงคงเหลือสุทธิ (ล้านบาท)</h4>
                  <span className="text-xs text-slate-400">สถานะ ณ เดือน{selectedMonth === 'SEP_2569' ? "กันยายน 2569" : "สิงหาคม 2569"}</span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={healthChartData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2f4f" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} angle={-25} textAnchor="end" />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#070d19', borderColor: '#213f7a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [\`\${val} ล้านบาท\`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Bar dataKey="NWC (ล้านบาท)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="เงินบำรุงสุทธิ (ล้านบาท)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Debt Collection Days by Rights (UC vs CSMBS vs SSS) */}
            <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-black text-white">ระยะเวลาการเรียกเก็บลูกหนี้และชำระหนี้ (วัน)</h4>
                  <span className="text-xs text-slate-400">เกณฑ์: เรียกเก็บ ≤ 60 วัน / ชำระหนี้ค่ายา ≤ 90 วัน</span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={turnoverChartData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2f4f" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} angle={-25} textAnchor="end" />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#070d19', borderColor: '#213f7a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [\`\${val} วัน\`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Bar dataKey="ลูกหนี้ UC" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ลูกหนี้ CSMBS" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ลูกหนี้ SSS" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ชำระหนี้ (APP)" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DOMAIN 2: TURNOVER & COLLECTION DAYS */}
      {activeDomain === 'TURNOVER' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  <span>1. ระยะเวลาการเรียกเก็บหนี้ สิทธิ UC, CSMBS, SSS และระยะเวลาสินค้าคงคลัง ({selectedMonth === 'SEP_2569' ? "เดือนกันยายน 2569" : "เดือนสิงหาคม 2569"})</span>
                  <span className="block text-xs font-semibold text-sky-300/90 mt-0.5">(Debt Collection & Inventory Turnover Analysis)</span>
                </h3>
                <span className="text-xs text-slate-400">
                  ที่มา: กองเศรษฐกิจสุขภาพและหลักประกันสุขภาพ สป. ณ วันที่ 11 ตุลาคม 2569 เวลา 19:03 น.
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <table className="whitespace-nowrap w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#111c35] text-slate-200 border-b border-[#1e2f4f]">
                    <th className="py-2.5 px-1.5 font-extrabold">หน่วยบริการ</th>
                    <th className="py-2.5 px-2 font-extrabold text-center">
                      <span>Cash Ratio</span>
                      <span className="text-[10px] text-slate-400 block font-normal">(≥ 1.0)</span>
                    </th>
                    <th className="py-2.5 px-2 font-extrabold text-center">
                      <span>A Payment Period</span>
                      <span className="text-[10px] text-slate-400 block font-normal">(≤ 90 วัน)</span>
                    </th>
                    <th className="py-2.5 px-2 font-extrabold text-center">
                      <span>A Collection UC</span>
                      <span className="text-[10px] text-slate-400 block font-normal">(≤ 60 วัน)</span>
                    </th>
                    <th className="py-2.5 px-2 font-extrabold text-center">
                      <span>A Collection CSMBS</span>
                      <span className="text-[10px] text-slate-400 block font-normal">(≤ 60 วัน)</span>
                    </th>
                    <th className="py-2.5 px-2 font-extrabold text-center">
                      <span>A Collection SSS</span>
                      <span className="text-[10px] text-slate-400 block font-normal">(≤ 120 วัน)</span>
                    </th>
                    <th className="py-2.5 px-2 font-extrabold text-center">
                      <span>A Inventory Period</span>
                      <span className="text-[10px] text-slate-400 block font-normal">(≤ 60 วัน)</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2f4f]/60 text-slate-200">
                  {filteredTurnover.map((row) => (
                    <tr key={row.hospitalCode} className="hover:bg-[#111c35]/50 transition-colors">
                      <td className="py-2 px-1.5 font-bold text-white flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="break-words">{row.hospitalName}</span>
                      </td>
                      <td className={\`py-2 px-2 text-center font-mono font-bold \${row.cash < 1.0 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.cash.toFixed(2)}
                      </td>
                      <td className={\`py-2 px-2 text-center font-mono font-bold \${row.appDays > 90 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.appDays.toFixed(2)} วัน
                      </td>
                      <td className={\`py-2 px-2 text-center font-mono font-bold \${row.acpUcDays > 60 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.acpUcDays.toFixed(2)} วัน
                      </td>
                      <td className={\`py-2 px-2 text-center font-mono font-bold \${row.acpCsmbsDays > 60 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.acpCsmbsDays.toFixed(2)} วัน
                      </td>
                      <td className={\`py-2 px-2 text-center font-mono font-bold \${row.acpSssDays > 120 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.acpSssDays.toFixed(2)} วัน
                      </td>
                      <td className={\`py-2 px-2 text-center font-mono font-bold \${row.inventoryDays > 60 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.inventoryDays.toFixed(2)} วัน
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend & Benchmarks */}
            <div className="mt-3 p-2.5 bg-[#111c35]/60 rounded-xl border border-[#1e2f4f] flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-400">สัญลักษณ์เกณฑ์:</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ผ่านเกณฑ์มาตรฐาน
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> สีแดง = เกินเกณฑ์มาตรฐานที่กำหนด
                </span>
              </div>
              <span className="text-slate-400 text-xs italic">เกณฑ์มาตรฐานกระทรวงสาธารณสุข และ กองเศรษฐกิจสุขภาพ สป.</span>
            </div>

          </div>

        </div>
      )}

      {/* DOMAIN 3: FINANCIAL HEALTH SITUATION */}
      {activeDomain === 'FINANCIAL_HEALTH' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  <span>2. สถานการณ์การเงินการคลัง ({selectedMonth === 'SEP_2569' ? "เดือนกันยายน 2569" : "เดือนสิงหาคม 2569"})</span>
                  <span className="block text-xs font-semibold text-amber-300/90 mt-0.5">(Financial Health Situation & Liquidity Metrics)</span>
                </h3>
                <span className="text-xs text-slate-400">
                  วิเคราะห์สภาพคล่อง (CR, QR, Cash Ratio), ทุนสำรอง NWC, Net Income, Risk Scoring, EBITDA และเงินบำรุงคงเหลือ(หักหนี้แล้ว) (ณ วันที่ 11 ต.ค. 2569 เวลา 19:03 น.)
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <table className="whitespace-nowrap w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#111c35] text-slate-200 border-b border-[#1e2f4f]">
                    <th className="py-2.5 px-2 font-extrabold">รหัส</th>
                    <th className="py-2.5 px-2.5 font-extrabold">หน่วยงาน</th>
                    <th className="py-2.5 px-1.5 font-extrabold text-center">Current Ratio (เท่า)</th>
                    <th className="py-2.5 px-1.5 font-extrabold text-center">Quick Ratio (เท่า)</th>
                    <th className="py-2.5 px-1.5 font-extrabold text-center">Cash Ratio (เท่า)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">Net Working Capital (บาท)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">Net Income (บาท)</th>
                    <th className="py-2.5 px-1.5 font-extrabold text-center">Risk Scoring</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">EBITDA (บาท)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">เงินบำรุงคงเหลือ(หักหนี้แล้ว) (บาท)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2f4f]/60 text-slate-200">
                  {filteredHealth.map((row) => (
                    <tr key={row.hospitalCode} className="hover:bg-[#111c35]/50 transition-colors">
                      <td className="py-2 px-2 font-mono text-slate-400">{row.hospitalCode}</td>
                      <td className="py-2 px-2.5 font-bold text-white break-words">{row.hospitalName}</td>
                      <td className={\`py-2 px-1.5 text-center font-mono font-bold \${row.cr < 1.5 ? 'text-rose-400' : 'text-slate-200'}\`}>
                        {row.cr.toFixed(2)}
                      </td>
                      <td className={\`py-2 px-1.5 text-center font-mono \${row.qr < 1.0 ? 'text-rose-400 font-bold' : ''}\`}>{row.qr.toFixed(2)}</td>
                      <td className={\`py-2 px-1.5 text-center font-mono font-bold \${row.cashRatio < 1.0 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.cashRatio.toFixed(2)}
                      </td>
                      <td className={\`py-2 px-2 text-right font-mono font-semibold \${row.nwc < 0 ? 'text-rose-400' : 'text-slate-200'}\`}>
                        {row.nwc.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={\`py-2 px-2 text-right font-mono font-bold \${row.netIncome < 0 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                        {row.netIncome.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-1.5 text-center">
                        <span className={\`inline-flex px-2.5 py-0.5 rounded-full text-xs font-black \${
                          row.riskScore >= 7 ? 'bg-red-500/30 text-red-300 border border-red-500/60' :
                          row.riskScore >= 4 ? 'bg-orange-500/30 text-orange-300 border border-orange-500/60' :
                          row.riskScore >= 2 ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }\`}>
                          ระดับ {row.riskScore}
                        </span>
                      </td>
                      <td className={\`py-2 px-2 text-right font-mono font-bold \${row.ebitda < 0 ? 'text-rose-400' : 'text-slate-200'}\`}>
                        {row.ebitda.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={\`py-2 px-2 text-right font-mono font-black \${row.netFund < 0 ? 'text-rose-400 bg-rose-500/10' : 'text-emerald-400 bg-emerald-500/10'} rounded-lg\`}>
                        {row.netFund.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Risk Summary Box */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#111c35] p-3 rounded-xl border border-rose-500/30">
                <div className="text-[11px] font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>เงินบำรุงคงเหลือ(หักหนี้แล้ว) ติดลบ (4 แห่ง)</span>
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  รพ.ประจวบคีรีขันธ์ (-96.36M), รพ.บางสะพาน (-51.48M), รพ.บางสะพานน้อย (-18.87M), รพ.ทับสะแก (-10.41M)
                </div>
              </div>

              <div className="bg-[#111c35] p-3 rounded-xl border border-amber-500/30">
                <div className="text-[11px] font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>หน่วยงานที่ขาดทุนสุทธิ (Net Income ติดลบ)</span>
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  รพ.หัวหิน (-269.59M), รพ.บางสะพาน (-71.42M), รพ.ปราณบุรี (-32.98M), รพ.ทับสะแก (-17.41M), รพ.สามร้อยยอด (-15.20M), รพ.กุยบุรี (-13.47M), รพ.บางสะพานน้อย (-9.70M)
                </div>
              </div>

              <div className="bg-[#111c35] p-3 rounded-xl border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>สภาพคล่องสูงสุด (Cash Ratio &gt; 2.0)</span>
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  รพ.สามร้อยยอด (Cash 10.32, CR 12.07), รพ.ปราณบุรี (Cash 2.26, CR 3.30), รพ.กุยบุรี (Cash 2.25, CR 2.92)
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DOMAIN 4: GFMIS TRIAL BALANCE (ยอดยกไปสิ้นงวด 12 ประจำปีงบประมาณ 2569) */}
      {activeDomain === 'GFMIS_TB' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span>3. ข้อมูลยอดยกไปจากรายงานงบทดลอง GFMIS ประจำงวด 12 (สิ้นปีงบประมาณ 2569)</span>
                </h3>
                <span className="text-xs text-slate-400">
                  ข้อมูลสรุปจากรายงาน NGL_TB_PMT ประจำงวด 12 ถึง 12 ปี 2569 ของหน่วยเบิกจ่ายทั้ง 8 โรงพยาบาลในจังหวัดประจวบคีรีขันธ์
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-teal-500/20 border border-teal-500/40 text-teal-300 rounded-xl text-[11px] font-black">
                  GFMIS GL 100% Reconciled
                </span>
              </div>
            </div>

            {/* GFMIS Table */}
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <table className="whitespace-nowrap w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#111c35] text-slate-200 border-b border-[#1e2f4f]">
                    <th className="py-2.5 px-2 font-extrabold">หน่วยบริการ</th>
                    <th className="py-2.5 px-1.5 font-extrabold text-center">รหัสเบิกจ่าย</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">เงินสด/เงินฝากคลัง/ธนาคาร</th>
                    <th className="py-2.5 px-2 font-extrabold text-right text-sky-400">ล/น การค้า-ภาครัฐ (1102050101)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right text-emerald-400">ล/น การค้า-ภายนอก (1102050102)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right text-rose-400">ค่าเผื่อหนี้สูญ (1102050123)</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">สินค้า+วัสดุคงคลัง</th>
                    <th className="py-2.5 px-2 font-extrabold text-right text-amber-400">เจ้าหนี้การค้า/รับสินค้า</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">เจ้าหนี้อื่น+ใบสำคัญ</th>
                    <th className="py-2.5 px-2 font-extrabold text-right text-purple-300">รายได้รักษาพยาบาลรวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2f4f]/60 text-slate-200">
                  {filteredGfmis.map((row) => (
                    <tr key={row.hospitalCode} className="hover:bg-[#111c35]/50 transition-colors">
                      <td className="py-2.5 px-2 font-bold text-white flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{row.hospitalName}</span>
                      </td>
                      <td className="py-2 px-1.5 font-mono text-center text-slate-400">{row.docNumber}</td>
                      <td className="py-2 px-2 text-right font-mono font-semibold text-slate-200">
                        {row.cashAndDeposits.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-sky-300">
                        {row.govAR.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-emerald-300">
                        {row.extAR.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-rose-400">
                        {row.allowanceBadDebt.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-slate-300">
                        {(row.inventoryGoods + row.inventorySupplies).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-amber-300">
                        {row.tradeAP.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-slate-300">
                        {(row.otherAP + row.accruedVouchers).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-black text-purple-300 bg-purple-950/20 rounded">
                        {row.totalMedicalRevenue.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* GFMIS Graphical Chart */}
            <div className="mt-5 pt-4 border-t border-[#1e2f4f]">
              <h4 className="text-xs font-black text-white mb-3">
                เปรียบเทียบลูกหนี้การค้าภาครัฐ vs ลูกหนี้การค้าภายนอก vs สภาพคล่องเงินสด/เงินฝาก ตามรายงาน GFMIS สิ้นปี 2569 (ล้านบาท)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gfmisArChartData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2f4f" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} angle={-25} textAnchor="end" />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#070d19', borderColor: '#213f7a', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [\`\${val} ล้านบาท\`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Bar dataKey="ล/น ภาครัฐ (ล้านบาท)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ล/น ภายนอก (ล้านบาท)" fill="#34d399" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="เงินสด/เงินฝาก (ล้านบาท)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="เจ้าหนี้รวม (ล้านบาท)" fill="#f87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DOMAIN 5: TRIAL BALANCE QUALITY (10 หมวด) */}
      {activeDomain === 'TRIAL_BALANCE' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  <span>4. ผลประเมินการตรวจสอบคุณภาพงบทดลอง ปีงบประมาณ 2569</span>
                  <span className="block text-xs font-semibold text-purple-300/90 mt-0.5">(Trial Balance Quality & Diagnostic Scoring)</span>
                </h3>
                <span className="text-xs text-slate-400">
                  ที่มา: สำนักงานเขตสุขภาพที่ 5 (คะแนนเต็ม 160.50 คะแนน แบ่ง 10 หมวดข้อตรวจ)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-[11px] font-black">
                  ผลการประเมิน: ผ่านเกรด A ทุกแห่ง (100%)
                </span>
              </div>
            </div>

            {/* Overview Card First, followed by Hospital Ranking Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 mb-5">
              
              {/* Card 0: Overview */}
              <div className="bg-gradient-to-b from-emerald-950/40 to-[#111c35] p-2.5 rounded-xl border border-emerald-500/40 text-center space-y-1 col-span-2 sm:col-span-1 lg:col-span-1 shadow-md">
                <div className="text-[11px] font-black text-emerald-400 uppercase">🌟 ภาพรวม</div>
                <div className="font-extrabold text-white text-[11px] break-words">ทั้ง 8 รพ.</div>
                <div className="text-xs font-black text-emerald-300 font-mono">156.6</div>
                <div className="text-[11px] text-slate-300 font-mono">(เฉลี่ย 97.5%)</div>
                <div className="inline-block px-1.5 py-0.5 bg-emerald-500/30 text-emerald-300 rounded text-[9px] font-black">
                  เกรด A ดีมาก
                </div>
              </div>

              {/* 8 Hospitals */}
              {trialBalanceHospitalsSummary.map((h, idx) => (
                <div key={h.hospitalName} className="bg-[#111c35] p-2.5 rounded-xl border border-[#1e2f4f] text-center space-y-1">
                  <div className="text-[11px] font-bold text-slate-400">อันดับ #{idx + 1}</div>
                  <div className="font-extrabold text-white text-[11px] truncate" title={h.hospitalName}>{h.hospitalName.replace("รพ.", "")}</div>
                  <div className="text-xs font-black text-emerald-400 font-mono">{h.totalScore.toFixed(1)}</div>
                  <div className="text-[11px] text-slate-300 font-mono">({h.percent.toFixed(2)}%)</div>
                  <div className="inline-block px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[9px] font-bold">
                    เกรด {h.grade}
                  </div>
                </div>
              ))}
            </div>

            {/* 10 Items Detailed Table */}
            <h4 className="text-xs font-black text-white mb-2.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>รายละเอียดผลคะแนนแยกตาม 10 หมวดข้อตรวจคุณภาพงบทดลอง</span>
            </h4>

            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <table className="whitespace-nowrap w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#111c35] text-slate-200 border-b border-[#1e2f4f]">
                    <th className="py-2 px-2 font-extrabold w-8 text-center">ข้อ</th>
                    <th className="py-2 px-1.5 font-extrabold">ชื่อเรื่องข้อตรวจ</th>
                    <th className="py-2 px-2 font-extrabold text-center">คะแนนเต็ม</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.ประจวบ</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.กุยบุรี</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.ทับสะแก</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.บางสะพาน</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.บางสะพานน้อย</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.ปราณบุรี</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.หัวหิน</th>
                    <th className="py-2 px-2 font-extrabold text-center">รพ.สามร้อยยอด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2f4f]/60 text-slate-200">
                  {trialBalance10Items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#111c35]/50 transition-colors">
                      <td className="py-2 px-2 text-center font-bold text-slate-400">{item.id}</td>
                      <td className="py-2 px-1.5 font-medium text-slate-200 max-w-xs truncate" title={item.title}>
                        {item.title}
                      </td>
                      <td className="py-2 px-2 text-center font-mono font-bold text-amber-400">{item.maxScore}</td>
                      {Object.keys(item.scores).map((hName) => {
                        const scoreInfo = item.scores[hName];
                        const isPerfect = scoreInfo.score === item.maxScore;
                        return (
                          <td key={hName} className="py-2 px-2 text-center font-mono">
                            <span className={isPerfect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                              {scoreInfo.score}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* DOMAIN 6: IP REVENUE COMPENSATION */}
      {activeDomain === 'IP_REVENUE' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-[#0b1324] border border-[#213f7a] rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  <span>5. รายรับชดเชย IP หลังปรับลดค่าแรง ปีงบประมาณ 2569</span>
                  <span className="block text-xs font-semibold text-sky-300/90 mt-0.5">(Inpatient Revenue Compensation Monitoring)</span>
                </h3>
                <span className="text-xs text-slate-400">
                  ข้อมูลสะสม ก.ย. 68 - ก.ค. 69 เปรียบเทียบกับประมาณการรายรับ IP ปี 69
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">รวมชดเชยทั้งจังหวัด: </span>
                <span className="text-sm font-black text-emerald-400 font-mono">254.98 ล้านบาท</span>
                <span className="text-xs text-sky-400 ml-1">(77.21%)</span>
              </div>
            </div>

            {/* IP Table */}
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <table className="whitespace-nowrap w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#111c35] text-slate-200 border-b border-[#1e2f4f]">
                    <th className="py-2.5 px-2 font-extrabold">หน่วยบริการ</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">ประมาณการรายรับ IP 69</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">รวมชดเชย IP หลังลดค่าแรง</th>
                    <th className="py-2.5 px-2 font-extrabold text-center">% รายรับ</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">พ.ค. 69</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">มิ.ย. 69</th>
                    <th className="py-2.5 px-2 font-extrabold text-right">ก.ค. 69</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2f4f]/60 text-slate-200">
                  {ipRevenueDataset.map((row) => (
                    <tr key={row.hospitalName} className="hover:bg-[#111c35]/50 transition-colors">
                      <td className="py-2 px-2 font-bold text-white flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{row.hospitalName}</span>
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-slate-300">
                        {row.estimatedIpRevenue.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-emerald-300">
                        {row.totalCompAfterLabor.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-center font-mono font-bold">
                        <span className={\`px-2 py-0.5 rounded-full text-[10px] \${
                          row.revenuePercent >= 100 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                          row.revenuePercent >= 75 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }\`}>
                          {row.revenuePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-slate-300">
                        {row.monthlyDetails[8]?.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-slate-300">
                        {row.monthlyDetails[9]?.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-slate-300">
                        {row.monthlyDetails[10]?.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
`;

fs.writeFileSync('src/components/LatestJuneJulyAuditDashboard.tsx', code, 'utf8');
console.log('LatestJuneJulyAuditDashboard.tsx rewritten successfully');
