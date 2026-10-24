import React from 'react';
import { MonthlyAuditReport, HospitalARData } from '../types';
import { 
  Building2, 
  TrendingUp, 
  ShieldAlert, 
  Layers, 
  Search, 
  Activity, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  FileDown,
  FileText
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ExecutiveARSummaryProps {
  currentReport: MonthlyAuditReport;
  selectedHospital: string;
  setSelectedHospital: (name: string) => void;
  scenariosMultiplier: { gov: number; ext: number };
  activeTab: string;
}

export function ExecutiveARSummary({ 
  currentReport, 
  selectedHospital, 
  setSelectedHospital,
  scenariosMultiplier,
  activeTab
}: ExecutiveARSummaryProps) {
  
  // Calculate aggregated metrics for the selected month (subject to multiplier based on applied simulation scenario!)
  const rawData = currentReport.data;
  
  // Dynamic filter
  let filteredData = selectedHospital === "ALL" 
    ? rawData 
    : rawData.filter(h => h.hospitalName === selectedHospital);

  // If ALERT active, show only schools/hospitals with a non-zero discrepancy
  if (activeTab === "ALERT") {
    filteredData = filteredData.filter(h => h.govInsuranceDiff !== 0 || h.extInsuranceDiff !== 0);
  }

  const totalGovGL = filteredData.reduce((sum, h) => sum + h.govGL, 0);
  const totalGovIns = filteredData.reduce((sum, h) => sum + h.govInsurance, 0);
  
  // Discrepancy under simulation impact!
  const rawGovDiff = filteredData.reduce((sum, h) => sum + h.govInsuranceDiff, 0);
  const govDiff = rawGovDiff * (1 - scenariosMultiplier.gov / 100);

  const totalExtGL = filteredData.reduce((sum, h) => sum + h.extGL, 0);
  const totalExtIns = filteredData.reduce((sum, h) => sum + h.extInsurance, 0);
  
  const rawExtDiff = filteredData.reduce((sum, h) => sum + h.extInsuranceDiff, 0);
  const extDiff = rawExtDiff * (1 - scenariosMultiplier.ext / 100);

  const grandTotalAR = totalGovGL + totalExtGL;
  const grandTotalInsurance = totalGovIns + totalExtIns;

  const exportToExcel = () => {
    const exportData = filteredData.map((h) => {
      const hGovDiff = h.govInsuranceDiff * (1 - scenariosMultiplier.gov / 100);
      const hExtDiff = h.extInsuranceDiff * (1 - scenariosMultiplier.ext / 100);
      
      return {
        "สถานพยาบาล": h.hospitalName,
        "ยอดตามGL (ภาครัฐ)": h.govGL,
        "ยอด GFMIS (ภาครัฐ)": h.govGFMIS,
        "ยอดประกัน (ภาครัฐ)": h.govInsurance,
        "ส่วนต่าง (รัฐ)": hGovDiff,
        "ยอดตามGL (บุคคลภายนอก)": h.extGL,
        "ยอดประกัน (ภายนอก)": h.extInsurance,
        "ส่วนต่าง (ภายนอก)": hExtDiff
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AR Summary");
    
    // Auto-size columns
    const maxWidths = [
      { wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 15 },
      { wch: 25 }, { wch: 20 }, { wch: 15 }
    ];
    worksheet['!cols'] = maxWidths;

    XLSX.writeFile(workbook, `ตารางวิเคราะห์งบกระทบยอดลูกหนี้_${currentReport.monthName}.xlsx`);
  };

  const exportToPDF = async () => {
    const tableElement = document.getElementById('audit-table-container');
    if (!tableElement) {
      alert("ไม่พบตารางข้อมูล");
      return;
    }

    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("เบราว์เซอร์บล็อกหน้าต่าง Pop-up กรุณาอนุญาตเพื่อใช้งานระบบนี้");
        return;
      }

      // Clone table to manipulate without affecting DOM
      const tableClone = tableElement.cloneNode(true) as HTMLElement;
      
      const buttons = tableClone.querySelectorAll('button');
      buttons.forEach(b => b.remove());

      const tableHtml = tableClone.innerHTML;
      const title = `ตารางวิเคราะห์งบกระทบยอดลูกหนี้_${currentReport.monthName}`;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Sarabun', sans-serif;
                padding: 30px;
                background: #ffffff;
                color: #000000;
              }
              h2 {
                text-align: center;
                margin-bottom: 20px;
                font-size: 20px;
                color: #111;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
                margin: 0 auto;
              }
              th, td {
                border: 1px solid #cbd5e1;
                padding: 10px;
                text-align: left;
              }
              th {
                background-color: #f1f5f9 !important;
                color: #0f172a !important;
                font-weight: 700;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              /* Strip dark mode styles */
              * { color: #000000 !important; }
              @media print {
                @page { size: landscape; margin: 15mm; }
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <h2>${title}</h2>
            <table>
              ${tableHtml}
            </table>
            <script>
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error: any) {
      console.error("Error generating Print view:", error);
      alert(`ไม่สามารถส่งออกไฟล์ PDF ได้: ${error?.message || error}`);
    }
  };

  return (
    <div className="space-y-6" id="executive-ar-summary">
      {/* Visual KPI Cards for Executive Board - Larger fonts and darker contrast */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5" id="kpi-grid">
        
        {/* KPI 1: Grand Total AR */}
        <div className={`bg-[#0b1324] rounded-2xl border p-6 shadow-md transition-all duration-300 hover:scale-101 ${
          activeTab === "ALL" 
            ? "border-[#38bdf8]/50 ring-1 ring-[#38bdf8]/30 shadow-[#38bdf8]/10" 
            : "border-[#1b2a47] hover:border-[#253965]"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ลูกหนี้รวมสะสม (AR Balance)</span>
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{grandTotalAR.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p className="text-xs text-slate-400 mt-2 font-medium">ยอดรวมสัญญารักษาพยาบาลสะสม</p>
          </div>
        </div>

        {/* KPI 2: Gov Sector AR */}
        <div className={`bg-[#0b1324] rounded-2xl border p-6 shadow-md transition-all duration-300 hover:scale-101 ${
          activeTab === "GOV" 
            ? "border-orange-500/50 ring-2 ring-orange-500/20 shadow-orange-500/10 scale-102 bg-orange-950/10" 
            : "border-[#1b2a47] hover:border-[#253965]"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ลูกหนี้หน่วยงานภาครัฐ</span>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#34d399] tracking-tight">{totalGovGL.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p className="text-xs text-slate-400 mt-2 font-medium">คิดเป็น {grandTotalAR > 0 ? ((totalGovGL / grandTotalAR) * 100).toFixed(1) : "0.0"}% ของลูกหนี้ทั้งหมด</p>
          </div>
        </div>

        {/* KPI 3: External Private AR */}
        <div className={`bg-[#0b1324] rounded-2xl border p-6 shadow-md transition-all duration-300 hover:scale-101 ${
          activeTab === "EXT" 
            ? "border-emerald-500/50 ring-2 ring-emerald-500/20 shadow-emerald-500/10 scale-102 bg-emerald-950/10" 
            : "border-[#1b2a47] hover:border-[#253965]"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ลูกหนี้บุคคลภายนอก</span>
            <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#38bdf8] tracking-tight">{totalExtGL.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p className="text-xs text-slate-400 mt-2 font-medium">สิทธิชำระเงินเองและประกันภัยภายนอก</p>
          </div>
        </div>

        {/* KPI 4: Discrepancy Alert */}
        <div className={`bg-[#0b1324] rounded-2xl border p-6 shadow-md transition-all duration-300 hover:scale-101 ${
          activeTab === "ALERT" 
            ? "border-red-500/50 ring-2 ring-red-500/30 shadow-red-500/20 scale-102 bg-red-950/20" 
            : "border-[#1b2a47] hover:border-[#253965]"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ผลต่างทางบัญชีสะสม</span>
            <div className={`p-2.5 rounded-xl border ${Math.abs(govDiff) + Math.abs(extDiff) > 0 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div className="mt-5">
            <h3 className={`text-2xl sm:text-3xl font-extrabold ${(Math.abs(govDiff) + Math.abs(extDiff) > 0) ? 'text-rose-400' : 'text-slate-300'} tracking-tight`}>
              {(Math.abs(govDiff) + Math.abs(extDiff)).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-slate-300 mt-2 font-semibold flex items-center gap-1.5">
              {Math.abs(govDiff) + Math.abs(extDiff) > 0 ? '⚠️ พบข้อมูลส่วนต่างระหว่างระบบบัญชี' : '✔️ แนวกระทบยอดลงตัวถูกต้อง'}
            </span>
          </div>
        </div>
      </div>

      {/* Hospital Breakdown and Records grid */}
      <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-6 lg:p-8 shadow-md" id="hospital-grid-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">ตารางวิเคราะห์งบกระทบยอดลูกหนี้รายสถานพยาบาล <span className="text-emerald-400">({currentReport.monthName})</span></h3>
            <p className="text-xs text-slate-400 mt-1">เปรียบเทียบข้อมูล ยอดตามบัญชีแยกประเภท GL และบัญชีระบบประกันสุขภาพ</p>
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={exportToExcel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Excel</span>
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>

            {/* Quick Filter Selection */}
            <div className="flex items-center gap-1.5 bg-[#070c16] rounded-xl p-2 px-1.5 border border-[#1e2f4f]">
              <span className="text-xs font-bold text-slate-300">เลือกสถานบริการ:</span>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="p-1.5 text-xs bg-[#121a2e] border border-[#2b3c5c] text-white rounded-lg outline-none focus:border-emerald-500 font-bold cursor-pointer"
              >
                <option value="ALL" className="bg-[#0b1324] text-slate-100 font-bold py-2">แสดงโรงพยาบาลทั้งหมด (8 แห่ง)</option>
                {rawData.map((h) => (
                  <option key={h.hospitalName} value={h.hospitalName} className="bg-[#0b1324] text-slate-100 font-bold py-2">{h.hospitalName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ALERT mode descriptive banner */}
        {activeTab === "ALERT" && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/35 rounded-xl flex items-center justify-between gap-1.5.5 text-xs font-semibold text-rose-450 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 animate-pulse" />
              <div>
                <span className="font-extrabold block text-white text-xs">🚨 โหมดเฝ้าระวัง: กำลังแสดงผลเฉพาะรายการ "ตรวจสอบด่วนที่มีประวัติงบต่างขั้ว"</span>
                <span className="text-xs sm:text-[11px] text-slate-400 font-medium">ระบบทำการกรองแสดงผลเฉพาะหน่วยบริการที่มียอดความคลาดเคลื่อนสะสมค้างรับระหว่าง GL และประกันสุขภาพ (พบทั้งหมด {filteredData.length} โรงพยาบาล)</span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedHospital("ALL")} 
              className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/35 text-white rounded text-xs font-bold tracking-tight transition  cursor-pointer"
            >
              ดูทุกแห่ง
            </button>
          </div>
        )}

        {/* Audit Data Table */}
        <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent rounded-xl border border-[#1b2a47]" id="audit-table-container">
          <table className="whitespace-nowrap w-full text-left border-collapse text-slate-300">
            <thead>
              <tr className="bg-[#10192e] text-[#f8fafc] font-bold border-b border-[#1b2a47] text-xs uppercase tracking-wider">
                <th className="py-2.5 px-2 rounded-l-lg leading-tight">สถานพยาบาล</th>
                <th className={`py-2.5 px-2 text-right leading-tight transition-all duration-300 ${activeTab === "GOV" ? "bg-orange-950/40 text-orange-400 font-bold" : ""}`}>ยอดตามGL<br/><span className="text-[11px] font-medium opacity-80 normal-case">(ภาครัฐ)</span></th>
                <th className={`py-2.5 px-2 text-right text-slate-400 leading-tight transition-all duration-300 ${activeTab === "GFMIS" ? "bg-yellow-950/30 text-yellow-400 font-bold" : ""}`}>ยอด GFMIS<br/><span className="text-[11px] font-medium opacity-80 normal-case">(ภาครัฐ)</span></th>
                <th className={`py-2.5 px-2 text-right text-[#60a5fa] bg-indigo-950/20 leading-tight transition-all duration-300 ${activeTab === "GOV" ? "bg-orange-950/60 text-orange-300 font-bold" : ""}`}>ยอดประกัน<br/><span className="text-[11px] font-medium opacity-80 normal-case">(ภาครัฐ)</span></th>
                <th className={`py-2.5 px-2 text-center text-rose-450 font-extrabold leading-tight transition-all duration-300 ${activeTab === "ALERT" ? "bg-rose-950/20 text-rose-400" : ""}`}>ส่วนต่าง<br/><span className="text-[11px] font-medium opacity-80 normal-case">(รัฐ)</span></th>
                
                <th className={`py-2.5 px-2 text-right border-l border-[#1b2a47] text-slate-300 leading-tight transition-all duration-300 ${activeTab === "EXT" ? "bg-emerald-950/40 text-emerald-450 font-bold" : ""}`}>ยอดตามGL<br/><span className="text-[11px] font-medium opacity-80 normal-case">(บุคคลภายนอก)</span></th>
                <th className={`py-2.5 px-2 text-right text-[#34d399] bg-emerald-950/20 animate-pulse-slow leading-tight transition-all duration-300 ${activeTab === "EXT" ? "bg-emerald-950/60 text-emerald-300 font-bold" : ""}`}>ยอดประกัน<br/><span className="text-[11px] font-medium opacity-80 normal-case">(ภายนอก)</span></th>
                <th className={`py-2.5 px-2 text-center text-rose-450 font-extrabold rounded-r-lg leading-tight transition-all duration-300 ${activeTab === "ALERT" ? "bg-rose-950/20 text-rose-400" : ""}`}>ส่วนต่าง<br/><span className="text-[11px] font-medium opacity-80 normal-case">(ภายนอก)</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2a47] text-xs">
              {filteredData.map((h, idx) => {
                // Apply visual simulation multiplier
                const hGovDiff = h.govInsuranceDiff * (1 - scenariosMultiplier.gov / 100);
                const hExtDiff = h.extInsuranceDiff * (1 - scenariosMultiplier.ext / 100);
                const isDiscrepant = Math.abs(hGovDiff) > 0 || Math.abs(hExtDiff) > 0;

                return (
                  <tr 
                    key={h.hospitalName} 
                    className={`hover:bg-[#1a2b4b]/60 transition-colors cursor-pointer ${
                      isDiscrepant ? 'bg-amber-950/10' : ''
                    } ${selectedHospital === h.hospitalName ? 'bg-emerald-950/20 border-l-4 border-l-emerald-500' : ''}`}
                    onClick={() => setSelectedHospital(h.hospitalName)}
                  >
                    {/* Hospital cell */}
                    <td className="py-2.5 px-2 font-bold text-white leading-tight">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold leading-tight">{h.hospitalName}</span>
                          {isDiscrepant && (
                            <span className="mt-0.5 px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[9px] font-extrabold self-start">
                              พบส่วนต่าง
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Government AR cells */}
                    <td className={`py-2.5 px-1.5 text-right font-mono text-xs transition-all duration-300 ${activeTab === "GOV" ? "text-orange-300 font-bold bg-orange-950/15" : "text-slate-200"}`}>{h.govGL.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={`py-2.5 px-1.5 text-right font-mono text-xs transition-all duration-300 ${activeTab === "GFMIS" ? "text-yellow-400 font-bold bg-yellow-950/20 animate-pulse" : "text-slate-400"}`}>{h.govGFMIS.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={`py-2.5 px-1.5 text-right font-mono text-xs font-bold transition-all duration-300 ${activeTab === "GOV" ? "bg-orange-950/25 text-orange-200" : "bg-indigo-950/10 text-[#60a5fa]"}`}>{h.govInsurance.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    
                    <td className={`py-2.5 px-1.5 text-center font-bold font-mono text-xs transition-all duration-300 ${activeTab === "ALERT" && hGovDiff !== 0 ? "bg-rose-950/20" : ""}`}>
                      {hGovDiff === 0 ? (
                        <span className="text-emerald-400 flex items-center justify-center gap-1 font-bold"><CheckCircle className="w-3.5 h-3.5" /> 0.00</span>
                      ) : (
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold leading-none ${hGovDiff > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                          {hGovDiff > 0 ? '+' : ''}{hGovDiff.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      )}
                    </td>

                    {/* External AR cells */}
                    <td className={`py-2.5 px-1.5 text-right font-mono text-xs border-l border-[#1b2a47] transition-all duration-300 ${activeTab === "EXT" ? "text-emerald-300 font-bold bg-emerald-950/15" : "text-slate-200"}`}>{h.extGL.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={`py-2.5 px-1.5 text-right font-mono text-xs font-bold transition-all duration-300 ${activeTab === "EXT" ? "bg-emerald-950/25 text-emerald-300" : "bg-emerald-950/10 text-emerald-400"}`}>{h.extInsurance.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    
                    <td className={`py-2.5 px-1.5 text-center font-bold font-mono text-xs transition-all duration-300 ${activeTab === "ALERT" && hExtDiff !== 0 ? "bg-rose-950/20" : ""}`}>
                      {hExtDiff === 0 ? (
                        <span className="text-emerald-400 flex items-center justify-center gap-1 font-bold"><CheckCircle className="w-3.5 h-3.5" /> 0.00</span>
                      ) : (
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold leading-none ${hExtDiff > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                          {hExtDiff > 0 ? '+' : ''}{hExtDiff.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Remarks and system notes from reports */}
        <div className="mt-6 p-5 bg-[#060b13] border border-[#1b2a47] rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#f1f5f9]">
            <AlertCircle className="w-5 h-5 text-[#60a5fa] shrink-0" />
            <span>พฤติกรรมความคลาดเคลื่อนทางงบการเงิน ประจำรอบรายงาน:</span>
          </div>
          <ul className="text-xs text-slate-300 list-disc list-inside space-y-2 pl-1 leading-relaxed">
            {currentReport.remarks.map((rmk, i) => (
              <li key={i} className="font-semibold">{rmk}</li>
            ))}
            <li className="text-slate-400 font-medium">สถานพยาบาลอื่นๆ นอกเหนือจากที่พบความเห็น มีรอยต่อกระทบยอดคงค้างเป็นปกติ (ยอดคลาดเคลื่อนสะสมเป็นศูนย์)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
