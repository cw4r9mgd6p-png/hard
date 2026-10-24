import React from 'react';
import { MonthlyAuditReport } from '../types';
import { Clock, Calendar, ShieldAlert, Download } from 'lucide-react';
import { XLSX } from '../utils/xlsxHelper';
import { jsPDF } from 'jspdf';

interface AgingReportPanelProps {
  currentReport: MonthlyAuditReport;
}

export function AgingReportPanel({ currentReport }: AgingReportPanelProps) {
  // Check if current report has aging data (only June currently has it)
  const hasAgingData = currentReport.data.some(h => h.govAging || h.extAging);

  if (!hasAgingData) {
    return (
      <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-8 text-center text-slate-400">
        <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-50" />
        <h3 className="text-lg font-bold text-white mb-1">ไม่มีข้อมูลอายุหนี้ (Aging Report) สำหรับเดือนนี้</h3>
        <p className="text-xs">ระบบจะแสดงผลอายุหนี้เมื่อมีข้อมูลที่ถูกนำเข้าระบบแล้ว (มีข้อมูลตั้งแต่เดือน มิถุนายน 2569)</p>
      </div>
    );
  }

  // Aggregate totals
  let totalGovLess90 = 0, totalGov90to1Y = 0, totalGovMore1Y = 0, totalGov = 0;
  let totalExtLess90 = 0, totalExt90to1Y = 0, totalExtMore1Y = 0, totalExt = 0;

  currentReport.data.forEach(h => {
    if (h.govAging) {
      totalGovLess90 += h.govAging.lessThan90Days;
      totalGov90to1Y += h.govAging.between90DaysAnd1Year;
      totalGovMore1Y += h.govAging.moreThan1Year;
      totalGov += h.govAging.total;
    }
    if (h.extAging) {
      totalExtLess90 += h.extAging.lessThan90Days;
      totalExt90to1Y += h.extAging.between90DaysAnd1Year;
      totalExtMore1Y += h.extAging.moreThan1Year;
      totalExt += h.extAging.total;
    }
  });

  const handleExportExcel = () => {
    try {
      const aoa: any[][] = [
        [`รายงานอายุหนี้ (Aging Report) - ${currentReport.monthName}`],
        [`จำแนกตามระยะเวลาค้างชำระ (ลูกหนี้ภาครัฐ และ บุคคลภายนอก)`],
        [`ข้อมูล ณ เดือน: ${currentReport.monthName} (พิมพ์เมื่อ: ${new Date().toLocaleDateString("th-TH")} เวลา ${new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })} น.)`],
        [],
        [
          "หน่วยเบิกจ่าย", 
          "ลูกหนี้ภาครัฐ 90 วัน", 
          "ลูกหนี้ภาครัฐ เกิน 90 วัน ไม่เกิน 1 ปี", 
          "ลูกหนี้ภาครัฐ เกิน 1 ปี", 
          "รวมลูกหนี้ภาครัฐ", 
          "ลูกหนี้บุคคลภายนอก 90 วัน", 
          "ลูกหนี้บุคคลภายนอก เกิน 90 วัน ไม่เกิน 1 ปี", 
          "ลูกหนี้บุคคลภายนอก เกิน 1 ปี", 
          "รวมลูกหนี้บุคคลภายนอก"
        ]
      ];

      currentReport.data.forEach(h => {
        aoa.push([
          h.hospitalName,
          h.govAging?.lessThan90Days || 0,
          h.govAging?.between90DaysAnd1Year || 0,
          h.govAging?.moreThan1Year || 0,
          h.govAging?.total || 0,
          h.extAging?.lessThan90Days || 0,
          h.extAging?.between90DaysAnd1Year || 0,
          h.extAging?.moreThan1Year || 0,
          h.extAging?.total || 0
        ]);
      });

      aoa.push([
        "รวมทั้งสิ้น",
        totalGovLess90,
        totalGov90to1Y,
        totalGovMore1Y,
        totalGov,
        totalExtLess90,
        totalExt90to1Y,
        totalExtMore1Y,
        totalExt
      ]);

      const worksheet = XLSX.utils.aoa_to_sheet(aoa);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Aging Report");
      XLSX.writeFile(workbook, `aging_report_${currentReport.monthId}.xlsx`);
    } catch (e) {
      console.error(e);
      alert("ไม่สามารถส่งออกไฟล์ได้");
    }
  };

  const handleExportPdf = () => {
    try {
      const printTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const printDate = `${new Date().toLocaleDateString('th-TH')} เวลา ${printTime} น.`;

      // Create high-DPI canvas (A4 Landscape aspect ratio: ~ 1414 x 1000)
      const canvas = document.createElement("canvas");
      canvas.width = 1414;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not construct 2D context");

      // Draw Paper base background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1414, 1000);

      // Top green MOPH themed ribbon bar
      ctx.fillStyle = "#0d1d3d";
      ctx.fillRect(0, 0, 1414, 40);

      // Point of print ribbon
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(0, 40, 1414, 8);

      // Report Header Section
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 24px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText(`รายงานอายุหนี้ (Aging Report) - ${currentReport.monthName}`, 60, 100);

      ctx.font = "14px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillStyle = "#64748b";
      ctx.fillText("จำแนกตามระยะเวลาค้างชำระ (ลูกหนี้ภาครัฐ และ บุคคลภายนอก)", 60, 128);

      ctx.textAlign = "right";
      ctx.fillText(`ข้อมูล ณ เดือน: ${currentReport.monthName}`, 1354, 110);
      ctx.fillText(`(พิมพ์เมื่อ: ${printDate})`, 1354, 128);
      ctx.textAlign = "left";

      // Subtle horizontal divider line
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 150);
      ctx.lineTo(1354, 150);
      ctx.stroke();

      // Table Headers
      let yOffset = 180;
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(60, yOffset, 1294, 50);
      
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      
      ctx.fillText("หน่วยเบิกจ่าย", 80, yOffset + 30);
      
      // Gov
      ctx.fillStyle = "#ea580c";
      ctx.fillText("ภาครัฐ 90 วัน", 250, yOffset + 30);
      ctx.fillText("ภาครัฐ เกิน 90 วัน", 370, yOffset + 30);
      ctx.fillText("ภาครัฐ เกิน 1 ปี", 490, yOffset + 30);
      ctx.fillText("รวมลูกหนี้ภาครัฐ", 600, yOffset + 30);
      
      // Ext
      ctx.fillStyle = "#059669";
      ctx.fillText("บุคคลภายนอก 90 วัน", 730, yOffset + 30);
      ctx.fillText("บุคคลภายนอก เกิน 90 วัน", 890, yOffset + 30);
      ctx.fillText("บุคคลภายนอก เกิน 1 ปี", 1070, yOffset + 30);
      ctx.fillText("รวมบุคคลภายนอก", 1230, yOffset + 30);

      yOffset += 50;

      // Table Rows
      ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
      currentReport.data.forEach((h, index) => {
        // Zebra striping
        if (index % 2 === 0) {
          ctx.fillStyle = "#f1f5f9";
          ctx.fillRect(60, yOffset, 1294, 40);
        }
        
        ctx.fillStyle = "#1e293b";
        ctx.fillText(h.hospitalName, 80, yOffset + 25);
        
        const formatMoney = (n: number | undefined) => n ? n.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
        
        // Gov
        ctx.fillStyle = "#334155";
        ctx.fillText(formatMoney(h.govAging?.lessThan90Days), 250, yOffset + 25);
        ctx.fillText(formatMoney(h.govAging?.between90DaysAnd1Year), 370, yOffset + 25);
        ctx.fillText(formatMoney(h.govAging?.moreThan1Year), 490, yOffset + 25);
        ctx.fillStyle = "#ea580c";
        ctx.fillText(formatMoney(h.govAging?.total), 600, yOffset + 25);
        
        // Ext
        ctx.fillStyle = "#334155";
        ctx.fillText(formatMoney(h.extAging?.lessThan90Days), 730, yOffset + 25);
        ctx.fillText(formatMoney(h.extAging?.between90DaysAnd1Year), 890, yOffset + 25);
        ctx.fillText(formatMoney(h.extAging?.moreThan1Year), 1070, yOffset + 25);
        ctx.fillStyle = "#059669";
        ctx.fillText(formatMoney(h.extAging?.total), 1230, yOffset + 25);

        yOffset += 40;
      });

      // Total Row
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(60, yOffset, 1294, 50);
      
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("รวมทั้งสิ้น", 80, yOffset + 30);
      
      const formatMoney = (n: number) => n.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      
      // Gov Total
      ctx.fillStyle = "#1e293b";
      ctx.fillText(formatMoney(totalGovLess90), 250, yOffset + 30);
      ctx.fillText(formatMoney(totalGov90to1Y), 370, yOffset + 30);
      ctx.fillText(formatMoney(totalGovMore1Y), 490, yOffset + 30);
      ctx.fillStyle = "#ea580c";
      ctx.fillText(formatMoney(totalGov), 600, yOffset + 30);
      
      // Ext Total
      ctx.fillStyle = "#1e293b";
      ctx.fillText(formatMoney(totalExtLess90), 730, yOffset + 30);
      ctx.fillText(formatMoney(totalExt90to1Y), 890, yOffset + 30);
      ctx.fillText(formatMoney(totalExtMore1Y), 1070, yOffset + 30);
      ctx.fillStyle = "#059669";
      ctx.fillText(formatMoney(totalExt), 1230, yOffset + 30);

      // Signature: ผู้จัดทำและผู้ตรวจสอบ
      const sigLineY = yOffset + 120;
      const sigNameY = yOffset + 140;
      const sigTitleY = yOffset + 160;
      
      ctx.fillStyle = "#334155";
      ctx.textAlign = "center";

      // ผู้จัดทำ
      const sigX1 = 350;
      ctx.fillText("......................................................", sigX1, sigLineY);
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("( นายสุทธิรัตน์  สุทธิสำแดง )", sigX1, sigNameY);
      ctx.fillStyle = "#475569";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("นักวิชาการสาธารณสุขชำนาญการ", sigX1, sigTitleY);
      ctx.fillText("ผู้จัดทำ", sigX1, sigTitleY + 20);

      // ผู้ตรวจสอบ
      const sigX2 = 1064;
      ctx.fillStyle = "#334155";
      ctx.fillText("......................................................", sigX2, sigLineY);
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("(นางสาวสุนิสา  ลิสกุลรักษ์)", sigX2, sigNameY);
      ctx.fillStyle = "#475569";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("หัวหน้ากลุ่มงานประกันสุขภาพ", sigX2, sigTitleY);
      ctx.fillText("ผู้ตรวจสอบ", sigX2, sigTitleY + 20);
      
      ctx.textAlign = "left";

      // Convert to PDF
      const imageUri = canvas.toDataURL("image/jpeg", 0.95);
      const pdfReport = new jsPDF("l", "mm", "a4");
      pdfReport.addImage(imageUri, "JPEG", 0, 0, 297, 210);
      pdfReport.save(`aging_report_${currentReport.monthId}.pdf`);

    } catch (e) {
      console.error(e);
      alert("ไม่สามารถประมวลผล PDF ได้ในขณะนี้");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <Calendar className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">รายงานอายุหนี้ (Aging Report) <span className="text-blue-400">({currentReport.monthName})</span></h2>
            <p className="text-xs text-slate-400 font-medium">จำแนกตามระยะเวลาค้างชำระ (ลูกหนี้ภาครัฐ และ บุคคลภายนอก)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2 py-2 rounded-xl border border-emerald-500/30 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span className="font-semibold text-xs">ส่งออก Excel</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 py-2 rounded-xl border border-red-500/30 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span className="font-semibold text-xs">ส่งออก PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Government Aging */}
        <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-orange-950/40 to-transparent p-4 border-b border-[#1b2a47]">
            <h3 className="text-orange-400 font-bold flex items-center gap-2">
              ลูกหนี้การค้า - หน่วยงานภาครัฐ (รหัส 1102050101)
            </h3>
          </div>
          <div className="p-0 overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <table className="whitespace-nowrap w-full text-left text-xs text-slate-300">
              <thead className="bg-[#060a12]/80 border-b border-[#1b2a47]">
                <tr>
                  <th className="py-3 px-2 font-bold">หน่วยเบิกจ่าย</th>
                  <th className="py-3 px-2 text-right font-bold text-emerald-400">90 วัน</th>
                  <th className="py-3 px-2 text-right font-bold text-amber-400">เกิน 90 วัน ไม่เกิน 1 ปี</th>
                  <th className="py-3 px-2 text-right font-bold text-rose-400">เกิน 1 ปี</th>
                  <th className="py-3 px-2 text-right font-bold text-white">รวมทั้งสิ้น</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b2a47]/50 font-mono text-[11px]">
                {currentReport.data.map((h, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-2 font-sans font-semibold text-white">{h.hospitalName}</td>
                    <td className="py-3 px-2 text-right text-emerald-300">{h.govAging?.lessThan90Days.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                    <td className="py-3 px-2 text-right text-amber-300">{h.govAging?.between90DaysAnd1Year.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                    <td className="py-3 px-2 text-right text-rose-300">{h.govAging?.moreThan1Year.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                    <td className="py-3 px-2 text-right font-bold text-orange-200">{h.govAging?.total.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#060a12] border-t-2 border-[#1e2f4f]">
                <tr className="font-bold text-xs">
                  <td className="py-2.5 px-2 text-white">รวมทั้งสิ้น</td>
                  <td className="py-2.5 px-2 text-right text-emerald-400">{totalGovLess90.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className="py-2.5 px-2 text-right text-amber-400">{totalGov90to1Y.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className="py-2.5 px-2 text-right text-rose-400">{totalGovMore1Y.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className="py-2.5 px-2 text-right text-orange-300">{totalGov.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* External Aging */}
        <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-emerald-950/40 to-transparent p-4 border-b border-[#1b2a47]">
            <h3 className="text-emerald-400 font-bold flex items-center gap-2">
              ลูกหนี้การค้า - บุคคลภายนอก (รหัส 1102050102)
            </h3>
          </div>
          <div className="p-0 overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <table className="whitespace-nowrap w-full text-left text-xs text-slate-300">
              <thead className="bg-[#060a12]/80 border-b border-[#1b2a47]">
                <tr>
                  <th className="py-3 px-2 font-bold">หน่วยเบิกจ่าย</th>
                  <th className="py-3 px-2 text-right font-bold text-emerald-400">90 วัน</th>
                  <th className="py-3 px-2 text-right font-bold text-amber-400">เกิน 90 วัน ไม่เกิน 1 ปี</th>
                  <th className="py-3 px-2 text-right font-bold text-rose-400">เกิน 1 ปี</th>
                  <th className="py-3 px-2 text-right font-bold text-white">รวมทั้งสิ้น</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b2a47]/50 font-mono text-[11px]">
                {currentReport.data.map((h, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-2 font-sans font-semibold text-white">{h.hospitalName}</td>
                    <td className="py-3 px-2 text-right text-emerald-300">{h.extAging?.lessThan90Days.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                    <td className="py-3 px-2 text-right text-amber-300">{h.extAging?.between90DaysAnd1Year.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                    <td className="py-3 px-2 text-right text-rose-300">{h.extAging?.moreThan1Year.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                    <td className="py-3 px-2 text-right font-bold text-emerald-200">{h.extAging?.total.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2}) || '-'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#060a12] border-t-2 border-[#1e2f4f]">
                <tr className="font-bold text-xs">
                  <td className="py-2.5 px-2 text-white">รวมทั้งสิ้น</td>
                  <td className="py-2.5 px-2 text-right text-emerald-400">{totalExtLess90.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className="py-2.5 px-2 text-right text-amber-400">{totalExt90to1Y.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className="py-2.5 px-2 text-right text-rose-400">{totalExtMore1Y.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className="py-2.5 px-2 text-right text-emerald-300">{totalExt.toLocaleString('th-TH', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
