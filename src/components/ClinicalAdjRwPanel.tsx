import React, { useState, useMemo } from 'react';
import { XLSX } from '../utils/xlsxHelper';
import { jsPDF } from 'jspdf';
import { adjRwPeriods, AdjRwPeriodReport, ClinicalAdjRwData } from '../clinicalAdjRwData';
import { 
  Building2, 
  Search, 
  FileSpreadsheet, 
  FileText, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Download, 
  Stethoscope, 
  Sparkles,
  Award,
  Calendar,
  Layers2,
  ListFilter
} from 'lucide-react';

interface ClinicalAdjRwPanelProps {
  selectedPeriodId: string;
  setSelectedPeriodId: (id: string) => void;
  showToastMessage: (msg: string, type: "success" | "info" | "error") => void;
}

export const calcBedMetrics = (hospitalCode: string, sumAdjRw: number, beds: number) => {
  let unitCost = 22500;
  if (hospitalCode === "10737" || hospitalCode === "11320") unitCost = 24500;
  else if (hospitalCode === "11317") unitCost = 21500;
  else unitCost = 18500;

  const estIpdExpense = sumAdjRw * unitCost;
  const adjRwPerBed = beds > 0 ? sumAdjRw / beds : 0;
  const costPerBed = beds > 0 ? estIpdExpense / beds : 0;

  return {
    estIpdExpense,
    adjRwPerBed,
    costPerBed,
    unitCost
  };
};

export function ClinicalAdjRwPanel({ 
  selectedPeriodId, 
  setSelectedPeriodId, 
  showToastMessage 
}: ClinicalAdjRwPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof ClinicalAdjRwData | "adjRwPerBed" | "costPerBed">("sumAdjRw");
  const [sortAsc, setSortAsc] = useState(false);

  // Retrieve selected period
  const activePeriod = useMemo(() => {
    return adjRwPeriods.find(p => p.periodId === selectedPeriodId) || adjRwPeriods[0];
  }, [selectedPeriodId]);

  // Calculations for summary stats
  const stats = useMemo(() => {
    const list = activePeriod.data;
    const totalBeds = list.reduce((sum, h) => sum + h.beds, 0);
    const totalSent = list.reduce((sum, h) => sum + h.sentCount, 0);
    const totalCalc = list.reduce((sum, h) => sum + h.calculatedCount, 0);
    const totalDays = list.reduce((sum, h) => sum + h.totalDaysOfStay, 0);
    const grandSumAdjRw = list.reduce((sum, h) => sum + h.sumAdjRw, 0);
    const avgCmi = list.reduce((sum, h) => sum + h.cmi, 0) / (list.length || 1);
    
    // Average occupancy rate (weighted by beds)
    const totalCapacity = list.reduce((sum, h) => sum + (h.beds * h.monthsSent * 30), 0);
    const weightedOccRate = totalCapacity > 0 ? (totalDays / totalCapacity) * 105 : 0; // standard estimation

    const avgAdjRwPerBed = totalBeds > 0 ? grandSumAdjRw / totalBeds : 0;

    const totalEstExpense = list.reduce((sum, h) => {
      const m = calcBedMetrics(h.hospitalCode, h.sumAdjRw, h.beds);
      return sum + m.estIpdExpense;
    }, 0);
    const avgCostPerBed = totalBeds > 0 ? totalEstExpense / totalBeds : 0;

    return {
      totalBeds,
      totalSent,
      totalCalc,
      totalDays,
      grandSumAdjRw,
      avgCmi,
      weightedOccRate,
      avgAdjRwPerBed,
      totalEstExpense,
      avgCostPerBed
    };
  }, [activePeriod]);

  // Handle columns sorting
  const handleSort = (field: keyof ClinicalAdjRwData | "adjRwPerBed" | "costPerBed") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let list = [...activePeriod.data];

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(h => 
        h.hospitalName.toLowerCase().includes(query) || 
        h.hospitalCode.includes(query) ||
        h.type.toLowerCase().includes(query)
      );
    }

    // Sort order
    list.sort((a, b) => {
      let valA: any = a[sortField as keyof ClinicalAdjRwData];
      let valB: any = b[sortField as keyof ClinicalAdjRwData];

      if (sortField === "adjRwPerBed") {
        valA = calcBedMetrics(a.hospitalCode, a.sumAdjRw, a.beds).adjRwPerBed;
        valB = calcBedMetrics(b.hospitalCode, b.sumAdjRw, b.beds).adjRwPerBed;
      } else if (sortField === "costPerBed") {
        valA = calcBedMetrics(a.hospitalCode, a.sumAdjRw, a.beds).costPerBed;
        valB = calcBedMetrics(b.hospitalCode, b.sumAdjRw, b.beds).costPerBed;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      }
    });

    return list;
  }, [activePeriod, searchQuery, sortField, sortAsc]);

  // Clinical PDF Export (High-fidelity MOPH structured design with high-quality Canvas text render)
  const exportClinicalPdf = () => {
    try {
      const pName = activePeriod.periodName;
      
      const printTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const printDate = `${new Date().toLocaleDateString('th-TH')} เวลา ${printTime} น.`;

      // 1414 x 1000 High-DPI canvas for beautiful landscape rendering
      const canvas = document.createElement("canvas");
      canvas.width = 1414;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not initialize canvas graphics context");

      // White Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1414, 1000);

      // Deep Emerald Header Banner
      ctx.fillStyle = "#0b2518"; // Dark Deep Emerald
      ctx.fillRect(0, 0, 1414, 135);
      
      ctx.fillStyle = "#10b981"; // Light Emerald Accent line
      ctx.fillRect(0, 135, 1414, 6);

      // Title & Thai Metadata
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("รายงานผลสัมฤทธิ์คัดกรองรหัสโรคและน้ำหนักสัมพัทธ์ (Clinical AdjRW & CMI)", 45, 52);
      
      ctx.fillStyle = "#a7f3d0"; // Soft Light Emerald
      ctx.font = "13px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText(`สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์ • รอบรายงานประเมิน: ${pName}`, 45, 84);
      ctx.fillText(`ถอดรหัสและวินิจฉัยข้อมูลโรคสากลสำหรับกระทรวงสาธารณสุขวิเคราะห์ภาพรวม 8 หน่วยบริการในพื้นที่`, 45, 106);

      // Print Date on the far right
      ctx.textAlign = "right";
      ctx.fillStyle = "#a7f3d0";
      ctx.fillText(`ข้อมูล ณ รอบรายงาน: ${activePeriod.periodName}`, 1369, 84);
      ctx.fillText(`(พิมพ์เมื่อ: ${printDate})`, 1369, 106);
      ctx.textAlign = "left";

      // 2. Summary stats layout
      ctx.fillStyle = "#f8fafc"; // Soft Gray bg
      ctx.fillRect(45, 165, 1324, 75);
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.strokeRect(45, 165, 1324, 75);

      // Sidebar indicator line in stats layout
      ctx.fillStyle = "#10b981";
      ctx.fillRect(45, 165, 6, 75);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 14px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("สถิติสำคัญจังหวัด (Provincial Performance Stats):", 70, 195);
      
      ctx.fillStyle = "#334155";
      ctx.font = "13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText(`ขนาดเตียงคุมทั้งหมด: ${stats.totalBeds} เตียง`, 70, 222);
      ctx.fillText(`จำนวนส่งเคลมเคส: ${stats.totalSent.toLocaleString()} ราย`, 310, 222);
      ctx.fillText(`ผลรวมค่าน้ำหนักสัมพัทธ์ Sum AdjRW: ${stats.grandSumAdjRw.toLocaleString("th-TH", { minimumFractionDigits: 2 })}`, 600, 222);
      ctx.fillText(`คะแนนตรวจเฉลี่ย CMI จังหวัด: ${stats.avgCmi.toFixed(4)}`, 1040, 222);

      // 3. Render Table
      const headers = [
        "รหัส", "ชื่อหน่วยบริการ", "กลุ่ม", "เตียง", "เดือน", "จำนวนส่ง", "คำนวณ", "วันนอนรวม", "ครองเตียง(%)", "Sum AdjRW", "CMI", "เกณฑ์", "ประเมิน"
      ];

      // Draw table header values
      const tableY = 265;
      ctx.fillStyle = "#064e3b"; // deep emerald table head
      ctx.fillRect(45, tableY, 1324, 34);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";

      // Column widths inside canvas space (sum is 1324px)
      const canvasColWidths = [65, 234, 65, 65, 54, 104, 104, 104, 109, 130, 104, 81, 110];
      const startX = 45;
      
      // Print headers
      let currentX = startX;
      headers.forEach((h, idx) => {
        ctx.textAlign = "center";
        ctx.fillText(h, currentX + canvasColWidths[idx] / 2, tableY + 22);
        currentX += canvasColWidths[idx];
      });
      ctx.textAlign = "left";

      // Rows
      ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
      let rowY = tableY + 34;

      activePeriod.data.forEach((row, idx) => {
        // Stripe rows
        ctx.fillStyle = idx % 2 === 0 ? "#f1f5f9" : "#ffffff";
        ctx.fillRect(45, rowY, 1324, 32);

        // bottom border line
        ctx.strokeStyle = "#dae2ed";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(45, rowY + 32);
        ctx.lineTo(1369, rowY + 32);
        ctx.stroke();

        const isPass = row.cmi >= row.threshold;

        // Draw cells
        let cellX = startX;

        // Draw hospital Code (Centered)
        ctx.textAlign = "center";
        ctx.fillStyle = "#1e293b";
        ctx.fillText(row.hospitalCode, cellX + canvasColWidths[0]/2, rowY + 20);
        cellX += canvasColWidths[0];

        // Draw hospital Name (Left aligned)
        ctx.textAlign = "left";
        ctx.fillStyle = "#0f172a";
        ctx.fillText(row.hospitalName, cellX + 12, rowY + 20);
        cellX += canvasColWidths[1];

        // Group (Centered)
        ctx.textAlign = "center";
        ctx.fillStyle = "#334155";
        ctx.fillText(row.type, cellX + canvasColWidths[2]/2, rowY + 20);
        cellX += canvasColWidths[2];

        // Beds (Right aligned)
        ctx.textAlign = "right";
        ctx.fillText(row.beds.toString(), cellX + canvasColWidths[3] - 12, rowY + 20);
        cellX += canvasColWidths[3];

        // Months Sent (Centered)
        ctx.textAlign = "center";
        ctx.fillText(row.monthsSent.toString(), cellX + canvasColWidths[4]/2, rowY + 20);
        cellX += canvasColWidths[4];

        // Sent Count (Right aligned)
        ctx.textAlign = "right";
        ctx.fillText(row.sentCount.toLocaleString(), cellX + canvasColWidths[5] - 12, rowY + 20);
        cellX += canvasColWidths[5];

        // Calculated Count (Right)
        ctx.fillText(row.calculatedCount.toLocaleString(), cellX + canvasColWidths[6] - 12, rowY + 20);
        cellX += canvasColWidths[6];

        // Days of Stay (Right)
        ctx.fillText(row.totalDaysOfStay.toLocaleString(), cellX + canvasColWidths[7] - 12, rowY + 20);
        cellX += canvasColWidths[7];

        // Occupancy Rate (Right)
        ctx.fillText(row.occupancyRate.toFixed(2) + "%", cellX + canvasColWidths[8] - 12, rowY + 20);
        cellX += canvasColWidths[8];

        // Sum AdjRW (Right, bold)
        ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(row.sumAdjRw.toLocaleString(), cellX + canvasColWidths[9] - 12, rowY + 20);
        cellX += canvasColWidths[9];

        // CMI (Right, bold)
        ctx.fillText(row.cmi.toFixed(4), cellX + canvasColWidths[10] - 12, rowY + 20);
        cellX += canvasColWidths[10];

        // Threshold (Right)
        ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(row.threshold.toFixed(1), cellX + canvasColWidths[11] - 12, rowY + 20);
        cellX += canvasColWidths[11];

        // Pass/Fail text (Centered)
        ctx.textAlign = "center";
        ctx.font = "bold 12.5px 'Inter', 'Sarabun', 'sans-serif'";
        if (isPass) {
          ctx.fillStyle = "#047857"; // Emerald green
          ctx.fillText("ผ่าน", cellX + canvasColWidths[12]/2, rowY + 20);
        } else {
          ctx.fillStyle = "#b91c1c"; // Rose red
          ctx.fillText("ไม่ผ่าน", cellX + canvasColWidths[12]/2, rowY + 20);
        }
        ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.textAlign = "left";

        rowY += 32;
      });

      // 4. Verification Lines & Signatures on landscape Canvas
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(45, 810);
      ctx.lineTo(1369, 810);
      ctx.stroke();

      ctx.fillStyle = "#64748b";
      ctx.font = "italic 11px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.textAlign = "center";
      ctx.fillText("ระบบเฝ้าระวังวินิจฉัยรหัสโรคสัมพัทธ์ภูมิภาค • สำนักงานเขตสุขภาพที่ 5 และกรมบัญชีกลาง ประเทศไทย (กลุ่มงานประกันสุขภาพ สสจ.ประจวบคีรีขันธ์)", 707, 835);

      // Signature values coordinates
      const sigLineY = 900;
      const sigNameY = 922;
      const sigTitleY = 942;

      ctx.fillStyle = "#334155";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";

      // 1. ผู้จัดทำ (Prepared by)
      const sigX1 = 350;
      ctx.fillText("......................................................", sigX1, sigLineY);
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("( นายสุทธิรัตน์  สุทธิสำแดง )", sigX1, sigNameY);
      ctx.fillStyle = "#475569";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("นักวิชาการสาธารณสุขชำนาญการ", sigX1, sigTitleY);
      ctx.fillText("ผู้จัดทำ", sigX1, sigTitleY + 20);

      // 2. ผู้ตรวจสอบ (Reviewed by)
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

      // Feed high-res canvas image strictly into Landscape A4 PDF page setup
      const imageUri = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imageUri, "JPEG", 0, 0, 297, 210);

      pdf.save(`รายงานสถิติรหัสโรค_Clinical_AdjRW_${selectedPeriodId}.pdf`);
      showToastMessage(`ดาวน์โหลดระบบรายงานวินิจฉัยโรคและสิทธิ์การส่งคลังสำหรับช่วง ${pName} ในรูปแบบ PDF สำเร็จ!`, "success");
    } catch (err) {
      console.error(err);
      showToastMessage("ไม่สามารถดาวน์โหลดเอกสาร PDF ทางการแพทย์ได้เนื่องจากหน่วยความจำล้น", "error");
    }
  };

  // Clinical Excel Export function
  const exportClinicalExcel = () => {
    try {
      const pName = activePeriod.periodName;
      const titleRow1 = [`รายงานประเมินและวิเคราะห์ประสิทธิภาพการลงรายละเอียดรหัสโรคและ CMI รายหน่วยบริการ`];
      const titleRow2 = [`รอบรายงานประเมินคลังข้อมูลและสิทธิ์รักษาสะสม: ${pName}`];
      const titleRow3 = [`สังกัดกลุ่มจังหวัด: จังหวัดประจวบคีรีขันธ์ (เขตสุขภาพที่ 5)`];
      const titleRow4 = [`ข้อมูล ณ รอบรายงาน: ${activePeriod.periodName} (พิมพ์เมื่อ: ${new Date().toLocaleDateString("th-TH")} เวลา ${new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })} น.) (กลุ่มงานประกันสุขภาพ สสจ.ประจวบฯ)`];

      const headers = [
        "รหัส โรงพยาบาล",
        "ชื่อโรงพยาบาล",
        "ประเภท",
        "จำนวนเตียง",
        "จำนวนเดือนที่ส่ง",
        "จำนวนส่ง",
        "จำนวนคำนวณ",
        "วันนอนรวม",
        "อัตราครองเตียง (%)",
        "Sum AdjRW",
        "CMI (Case Mix Index)",
        "Min AdjRW",
        "Max AdjRW",
        "เกณฑ์เป้าหมายขั้นต่ำจังหวัด",
        "ผลประเมิน"
      ];

      const rows = activePeriod.data.map((row) => [
        row.hospitalCode,
        row.hospitalName,
        row.type,
        row.beds,
        row.monthsSent,
        row.sentCount,
        row.calculatedCount,
        row.totalDaysOfStay,
        row.occupancyRate,
        row.sumAdjRw,
        row.cmi,
        row.minAdjRw,
        row.maxAdjRw,
        row.threshold,
        row.cmi >= row.threshold ? "ผ่านเกณฑ์" : "ต่ำกว่าเกณฑ์"
      ]);

      const aoa = [
        titleRow1,
        titleRow2,
        titleRow3,
        titleRow4,
        [], // empty spacer
        headers,
        ...rows
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(aoa);

      // Center-align all cells (both text and numbers) as requested
      for (const key in worksheet) {
        if (key.startsWith('!')) continue;
        const cell = worksheet[key];
        if (cell && typeof cell === 'object') {
          cell.s = {
            alignment: {
              horizontal: 'center',
              vertical: 'center',
              wrapText: true
            }
          };
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Clinical Obj Weights");

      // Auto-fit column widths
      const maxLens = headers.map(key => key.length);
      rows.forEach(row => {
        row.forEach((val, colIdx) => {
          const valLen = String(val).length;
          if (valLen > maxLens[colIdx]) {
            maxLens[colIdx] = valLen;
          }
        });
      });
      worksheet["!cols"] = maxLens.map(len => ({ wch: Math.max(len + 4, 12) }));

      XLSX.writeFile(workbook, `Clinical_AdjRW_Performance_${selectedPeriodId}.xlsx`);
      showToastMessage(`ดาวน์โหลดสรุปแผนภูมิประสิทธิผลทางการตรวจรหัสโรคและ CMI เป็นไฟล์ Excel พร้อมส่วนหัวเรื่องของข้อมูลเรียบร้อย!`, "success");
    } catch (err: any) {
      console.error(err);
      showToastMessage(`ไม่สามารถประมวลผลเป็นไฟล์ Excel ได้ในขณะนี้: ${err?.message || err}`, "error");
    }
  };

  // Render SVG CMI Chart Against Goal line for all 8 hospitals
  const chartWidth = 720;
  const chartHeight = 220;
  const padding = { top: 30, right: 30, bottom: 45, left: 45 };

  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const maxCmiOnChart = 2.4; // max CMI in dataset is ~2.03

  return (
    <div className="space-y-6 animate-fade-in" id="clinical-adjrw-module">
      
      {/* HEADER CONTROLS BAR (LIGHT TO DARK SLATE GRADIENT) */}
      <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-xl flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6" id="clinical-filter-bar">
        
        {/* Module Title */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Stethoscope className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-extrabold text-base tracking-tight leading-tight flex items-center gap-1.5">
              ระบบวินิจฉัยรหัสโรคสัมพัทธ์และ CMI รายโรงพยาบาล ({activePeriod.periodName})
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </h3>
            <span className="text-slate-400 text-[11px] font-mono">
              ข้อมูลสหสัมพันธ์สากล (Clinical AdjRW Engine) • วิเคราะห์กระบวนการเบิกจ่ายการแพทย์
            </span>
          </div>
        </div>

        {/* Search Input inline */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1.5 w-4 h-4 text-slate-405" />
          <input
            type="text"
            placeholder="ค้นหาตามรหัส/ชื่อหน่วยบริการ/ประเภท..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111c35]/80 placeholder-slate-500 text-white text-[11px] font-extrabold pl-10 pr-4 py-2.5 rounded-xl border border-[#213f7a]/80 outline-none focus:border-emerald-500 transition duration-300"
          />
        </div>

        {/* Action Buttons for file management */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={exportClinicalExcel}
            className="bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-t border-x border-emerald-400 border-b-4 border-emerald-800 shadow-[0_3px_0_0_#065f46] hover:brightness-105 active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#065f46] px-2.5 py-2.5 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            title="ส่งออกชุดข้อมูล AdjRW แบบคลินิกสิกาเป็นไฟล์ Excel"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
            <span>ส่งออก Excel</span>
          </button>

          <button
            onClick={exportClinicalPdf}
            className="bg-gradient-to-b from-rose-500 to-rose-650 text-white border-t border-x border-rose-450 border-b-4 border-rose-805 shadow-[0_3px_0_0_#991b1b] hover:brightness-105 active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#991b1b] px-2.5 py-2.5 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            title="เซฟตารางรหัสและคะแนนน้ำหนักคลังนี้เป็น PDF ทางการ"
          >
            <FileText className="w-4 h-4 text-rose-105" />
            <span>ส่งออก PDF</span>
          </button>
        </div>

      </div>

      {/* SELECT PERIOD DROPDOWN */}
      <div className="space-y-2">
        <label className="text-xs text-slate-300 uppercase font-black tracking-wide font-sans block mb-1">
          เลือกช่วงเวลารอบสะสมตรวจสอบ (PDF Reports Period Selection):
        </label>
        
        <div className="relative max-w-sm">
          <select
            value={selectedPeriodId}
            onChange={(e) => setSelectedPeriodId(e.target.value)}
            className="w-full bg-[#111c35] text-white hover:bg-[#152342] text-xs md:text-base font-black px-2 py-3 rounded-xl border border-[#213f7a] focus:border-blue-500 outline-none transition cursor-pointer shadow-lg"
          >
            {[...adjRwPeriods].reverse().map((period) => (
              <option key={period.periodId} value={period.periodId} className="text-xs md:text-base font-bold bg-[#0b1324] text-white">
                {period.periodName} (สะสม {period.data[0]?.monthsSent || 6} เดือน)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* BENTO STATS BOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1.5" id="clinical-bento-stats">
        
        {/* STAT 1: Beds */}
        <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-1.5.5 shadow flex items-center gap-1.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-tight  truncate">ขนาดเตียงคุมรวม</span>
            <span className="text-lg font-black text-white font-mono">{stats.totalBeds} <span className="text-[11px] text-slate-400 font-normal">เตียง</span></span>
          </div>
        </div>

        {/* STAT 2: Total Sent */}
        <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-1.5.5 shadow flex items-center gap-1.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-tight  truncate">จำนวนส่งผลงานรวม</span>
            <span className="text-lg font-black text-white font-mono">{stats.totalSent.toLocaleString()} <span className="text-[11px] text-slate-400 font-normal">เคส</span></span>
          </div>
        </div>

        {/* STAT 3: SumAdjRW */}
        <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-1.5.5 shadow flex items-center gap-1.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-tight  truncate">ผลรวม Sum AdjRW</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              {stats.grandSumAdjRw.toLocaleString("th-TH", { maximumFractionDigits: 1 })}
            </span>
          </div>
        </div>

        {/* STAT 4: AdjRW per Bed */}
        <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-1.5.5 shadow flex items-center gap-1.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-tight  truncate" title="AdjRW / เตียงเฉลี่ย">AdjRW / เตียงเฉลี่ย</span>
            <span className="text-lg font-black text-cyan-300 font-mono">
              {stats.avgAdjRwPerBed.toFixed(2)} <span className="text-[11px] text-slate-400 font-normal">RW/เตียง</span>
            </span>
          </div>
        </div>

        {/* STAT 5: Est Cost per Bed */}
        <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-1.5.5 shadow flex items-center gap-1.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 font-mono font-bold text-[11px]">
            ฿
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-tight  truncate" title="ค่าใช้จ่ายประเมิน/เตียง">ค่าใช้จ่ายประเมิน/เตียง</span>
            <span className="text-lg font-black text-purple-200 font-mono">
              {(stats.avgCostPerBed / 1000).toLocaleString("th-TH", { maximumFractionDigits: 0 })}k <span className="text-[11px] text-slate-400 font-normal">บาท</span>
            </span>
          </div>
        </div>

        {/* STAT 6: Occupancy Rate */}
        <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-1.5.5 shadow flex items-center gap-1.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 font-mono font-bold text-[11px]">
            %
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-tight  truncate">อัตราครองเตียงเฉลี่ย</span>
            <span className={`text-lg font-black font-mono ${stats.weightedOccRate > 80 ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
              {stats.weightedOccRate.toFixed(1)}%
            </span>
          </div>
        </div>

      </div>

      {/* DUAL COLUMN MIDDLE SECTION: CHART AGAINST TARGETS LINE & COMPARATIVE STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COMPONENT - MULTI-HOSPITAL CMI COMPARISON PANEL (SVG CHART INTEGRATION) */}
        <div className="lg:col-span-8 bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg space-y-4">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
            <span className="text-white font-extrabold text-xs flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              แผนภาพเปรียบเทียบดัชนี CMI เทียบกับเป้าหมายขั้นต่ำรายโรงพยาบาล ({activePeriod.periodName})
            </span>
            <span className="text-[11px] text-slate-405 font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
              เป้าหลัก: F/S=0.6, M=1.0, S=1.2
            </span>
          </div>

          <div className="w-full flex justify-center bg-[#070d18] p-1.5 rounded-2xl border border-slate-900 overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto min-w-[650px] select-none text-slate-350">
              
              {/* Grid Lines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const cmiVal = (i * 0.5).toFixed(1);
                const y = padding.top + graphHeight - (i * 0.5 / maxCmiOnChart) * graphHeight;
                return (
                  <g key={i}>
                    <line 
                      x1={padding.left} 
                      y1={y} 
                      x2={chartWidth - padding.right} 
                      y2={y} 
                      stroke="#13233c" 
                      strokeWidth="1" 
                    />
                    <text x={padding.left - 6} y={y + 3.5} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                      {cmiVal}
                    </text>
                  </g>
                );
              })}

              {/* Render Bars and goal markers */}
              {activePeriod.data.map((h, idx) => {
                const groupWidth = graphWidth / activePeriod.data.length;
                const barSpacing = 20;
                const bWidth = groupWidth - barSpacing;
                const bX = padding.left + (idx * groupWidth) + barSpacing / 2;

                // CMI Bar coordinates
                const bHeight = (h.cmi / maxCmiOnChart) * graphHeight;
                const bY = padding.top + graphHeight - bHeight;

                // Threshold goal line coordinates
                const thresholdHeight = (h.threshold / maxCmiOnChart) * graphHeight;
                const thresholdY = padding.top + graphHeight - thresholdHeight;

                const pass = h.cmi >= h.threshold;

                return (
                  <g key={idx} className="group cursor-help">
                    {/* Shadow for chart bar */}
                    <rect 
                      x={bX} 
                      y={bY} 
                      width={bWidth} 
                      height={bHeight} 
                      rx="3.5"
                      fill={pass ? "url(#emerald-chart-grad)" : "url(#rose-chart-grad)"} 
                      className="transition-all duration-500 hover:brightness-125 hover:stroke-[#ffffff] hover:stroke-0.5"
                    />

                    {/* Value label on top of bar */}
                    <text 
                      x={bX + bWidth / 2} 
                      y={bY - 4} 
                      textAnchor="middle" 
                      fontSize="9" 
                      fontWeight="bold" 
                      fill={pass ? "#34d399" : "#ff8787"}
                      fontFamily="monospace"
                    >
                      {h.cmi.toFixed(3)}
                    </text>

                    {/* Goal Line Indicator Pill overlay */}
                    <line 
                      x1={bX - 5}
                      y1={thresholdY}
                      x2={bX + bWidth + 5}
                      y2={thresholdY}
                      stroke={pass ? "#10b981" : "#f43f5e"}
                      strokeWidth="2"
                    />

                    {/* School labels (short version) */}
                    <text 
                      x={bX + bWidth / 2} 
                      y={padding.top + graphHeight + 15} 
                      textAnchor="middle" 
                      fontSize="9.5" 
                      fontWeight="bold" 
                      fill="#e2e8f0"
                    >
                      {h.hospitalName.replace("รพ.", "")}
                    </text>

                    {/* Capacity label at the bottom */}
                    <text 
                      x={bX + bWidth / 2} 
                      y={padding.top + graphHeight + 28} 
                      textAnchor="middle" 
                      fontSize="8" 
                      fill="#64748b"
                      fontFamily="monospace"
                    >
                      {h.beds} B / {h.type}
                    </text>
                  </g>
                );
              })}

              {/* Chart Axises */}
              <line 
                x1={padding.left} 
                y1={padding.top + graphHeight} 
                x2={chartWidth - padding.right} 
                y2={padding.top + graphHeight} 
                stroke="#1b3053" 
                strokeWidth="1.5" 
              />
              
              {/* Gradients definitions */}
              <defs>
                <linearGradient id="emerald-chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#022c22" />
                </linearGradient>
                <linearGradient id="rose-chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#31050d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <p className="text-[11px] text-slate-450 text-center italic mt-1 leading-normal">
            * สัญลักษณ์แท่งแสดงคะแนน CMI ของหน่วยบริการ โดย <span className="text-[#10b981] font-bold">เส้นนอนสีเขียว</span> บ่งบอกถึงเกณฑ์ตรวจขั้นต่ำของระดับโรงพยาบาล (ผ่านเกณฑ์) และ <span className="text-[#ef4444] font-bold">เส้นนอนสีแดง</span> บ่งชี้เมื่อ CMI ของกลุ่มโรงพยาบาลยังต่ำกว่าระดับเป้าหมายที่จังหวัดระบุ
          </p>
        </div>

        {/* RIGHT COLUMN - PRANBURI HOSPITAL FOCUS CARD */}
        <div className="lg:col-span-4 bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-white font-extrabold text-xs flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-amber-400" />
                จุดสังเกตเด่น: รพ.ปราณบุรี (11319)
              </span>
            </div>

            {/* Fetch Pranburi row data */}
            {(() => {
              const pranRow = activePeriod.data.find(h => h.hospitalCode === "11319");
              if (!pranRow) return <p className="text-[11px] text-slate-400">หาข้อมูลไม่พบ</p>;
              
              const isPass = pranRow.cmi >= pranRow.threshold;

              return (
                <div className="space-y-3.5 text-[11px]">
                  <p className="text-slate-300 leading-relaxed">
                    จากการวิเคราะห์สัดส่วนรหัสโรค สิทธิ์รักษาพยาบาลและระยะเวลารักษาสะสมของ <span className="text-white font-bold">{pranRow.hospitalName}</span> ในเซสชั่นนี้ มีน้ำหนักสัมพัทธ์ทางคลินิกร่วมดังนี้:
                  </p>

                  <div className="bg-[#0e172a] p-1.5.5 rounded-2xl border border-slate-800 space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">ขนาดเตียงวินิจฉัยจริง:</span>
                      <span className="text-white font-bold">{pranRow.beds} เตียง (ประเภท {pranRow.type})</span>
                    </div>

                    <div className="flex justify-between border-t border-slate-900 pt-2">
                      <span className="text-slate-400">ส่งตรวจเบิกเคลม:</span>
                      <span className="text-white font-bold font-mono">{pranRow.sentCount.toLocaleString()} เคส</span>
                    </div>

                    <div className="flex justify-between border-t border-slate-900 pt-2">
                      <span className="text-slate-400">ค่าน้ำหนักสะสม SumAdjRW:</span>
                      <span className="text-white font-bold font-mono">{pranRow.sumAdjRw.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                    </div>

                    <div className="flex justify-between border-t border-slate-900 pt-2 items-center">
                      <span className="text-slate-400">ดัชนี CMI (ดัชนีระดับโรค):</span>
                      <span className={`font-mono font-black text-xs ${isPass ? "text-emerald-400" : "text-rose-450"}`}>
                        {pranRow.cmi.toFixed(4)}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-slate-900 pt-2 items-center">
                      <span className="text-slate-400">เป้าหลักเกณฑ์มาตรฐาน:</span>
                      <span className="text-[#38bdf8] font-mono font-bold">{pranRow.threshold.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-xl border flex items-start gap-2.5 ${isPass ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-350" : "bg-rose-500/10 border-rose-500/25 text-rose-350"}`}>
                    {isPass ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-450 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-extrabold block text-xs uppercase">
                        ผลการประเมินรหัสและ CMI ประจำช่วง
                      </span>
                      <p className="text-[11px] mt-0.5 leading-relaxed">
                        {isPass 
                          ? `ผ่านเกณฑ์เป้าหมายจังหวัด (สูงกว่าเกณฑ์ ${pranRow.threshold} เป็นการรักษาร่วมในเคสซับซ้อนสมบูรณ์)` 
                          : `ต่ำกว่าเป้าหมายขั้นต่ำ ${pranRow.threshold} โปรดปรับกระบวนการบันทึกข้อมูลเวชระเบียน`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

          <div className="pt-4 border-t border-slate-800 text-[10.5px] text-slate-450 leading-relaxed italic">
            * ระบบวิเคราะห์นี้สนับสนุนการประเมินเกณฑ์ตัวชี้วัดที่ 11 (SumAdjRW) ในตารางย่อยมาตรฐานแผนกคลังของกระทรวงสาธารณสุข
          </div>
        </div>

      </div>

      {/* ADJRW & COST PER BED ANALYTICAL SECTION */}
      <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg space-y-6" id="adjrw-bed-analysis">
        
        {/* Section Header */}
        <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-1.5">
          <div>
            <h4 className="text-white font-extrabold text-base tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              บทวิเคราะห์ความสัมพันธ์: AdjRW ผลผลิตต่อเตียง และค่าใช้จ่ายต่อเตียง (Bed Productivity Matrix)
            </h4>
            <p className="text-slate-400 text-[11px] mt-1">
              วิเคราะห์ความซับซ้อนของโรค (AdjRW) เทียบกับขนาดเตียงคุม อัตราครองเตียง และภาระค่าใช้จ่ายดำเนินงานผู้ป่วยใน (IPD Expense per Bed)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-1.5 py-1 bg-cyan-950/60 text-cyan-300 rounded-xl border border-cyan-800/60">
              AdjRW เฉลี่ยจังหวัด: {stats.avgAdjRwPerBed.toFixed(2)} RW/เตียง
            </span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-1 bg-purple-950/60 text-purple-300 rounded-xl border border-purple-800/60">
              ค่าใช้จ่าย/เตียง: {(stats.avgCostPerBed / 1000).toLocaleString("th-TH", { maximumFractionDigits: 0 })}k บาท
            </span>
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: GRAPH BARS & MANAGEMENT SUMMARY BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Hospital-by-Hospital Bar comparison */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] font-extrabold text-slate-200 block mb-2">
              เปรียบเทียบผลผลิต AdjRW ต่อ 1 เตียงคุม (AdjRW per Bed Efficiency Ranking)
            </span>

            <div className="space-y-2.5">
              {[...activePeriod.data]
                .sort((a, b) => (b.sumAdjRw / b.beds) - (a.sumAdjRw / a.beds))
                .map((h) => {
                  const m = calcBedMetrics(h.hospitalCode, h.sumAdjRw, h.beds);
                  const maxAdjRwBed = 125;
                  const percent = Math.min(100, (m.adjRwPerBed / maxAdjRwBed) * 100);

                  const isHigh = m.adjRwPerBed >= 90;
                  const isMid = m.adjRwPerBed >= 60 && m.adjRwPerBed < 90;

                  return (
                    <div key={h.hospitalCode} className="bg-[#080f1e] p-1.5 rounded-2xl border border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]">
                      
                      {/* Name & Badge */}
                      <div className="w-48 shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-100">{h.hospitalName}</span>
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                            {h.beds} เตียง ({h.type})
                          </span>
                        </div>
                        <span className="text-[10.5px] text-slate-400 font-mono block mt-0.5">
                          ครองเตียง {h.occupancyRate.toFixed(1)}% | {h.sumAdjRw.toLocaleString(undefined, { maximumFractionDigits: 0 })} RW
                        </span>
                      </div>

                      {/* Bar Visualization */}
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-cyan-300 font-bold">{m.adjRwPerBed.toFixed(2)} AdjRW/เตียง</span>
                          <span className="text-purple-300 font-bold">{(m.costPerBed / 1000).toLocaleString("th-TH", { maximumFractionDigits: 0 })}k บาท/เตียง</span>
                        </div>
                        
                        <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden flex">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${
                              isHigh 
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400" 
                                : isMid 
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-400" 
                                  : "bg-gradient-to-r from-amber-500 to-orange-400"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Analytical Insights Summary */}
          <div className="lg:col-span-5 bg-[#070e1c] p-5 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4 text-[11px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-extrabold text-white text-xs">
                  สรุปผลการวิเคราะห์เชิงบริหาร (Management Clinical Insights)
                </span>
              </div>

              <div className="space-y-3 text-slate-300 leading-relaxed">
                <div className="p-1.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
                  <span className="font-bold text-emerald-300 block text-[11px]">
                    1. รพ. ผลผลิตสูงซับซ้อน (High-Complexity Beds)
                  </span>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">รพ.ประจวบคีรีขันธ์</strong> และ <strong className="text-white">รพ.หัวหิน</strong> ผลิตผลงาน <span className="text-emerald-300 font-mono font-bold">&gt;105 AdjRW/เตียง</span> เนื่องจากเป็นศูนย์รับส่งต่อ (Referral Center) รักษาโรคยุ่งยากซับซ้อน ทำให้อัตราใช้ประโยชน์เตียงและค่าใช้จ่ายต่อเตียงสมน้ำสมเนื้อกับภาระโรค
                  </p>
                </div>

                <div className="p-1.5 rounded-xl bg-blue-950/20 border border-blue-800/40 space-y-1">
                  <span className="font-bold text-blue-300 block text-[11px]">
                    2. รพ. ประสิทธิภาพสมดุล (Optimal Balance)
                  </span>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">รพ.บางสะพาน</strong>, <strong className="text-white">รพ.บางสะพานน้อย</strong> และ <strong className="text-white">รพ.ทับสะแก</strong> มี AdjRW ต่อเตียง <span className="text-blue-300 font-mono font-bold">66 - 92 RW/เตียง</span> และมีครองเตียงสูง 78-91% บ่งชี้การบริหารทรัพยากรเตียงค่อนข้างเต็มศักยภาพ
                  </p>
                </div>

                <div className="p-1.5 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-1">
                  <span className="font-bold text-amber-300 block text-[11px]">
                    3. ศักยภาพการขยายเคสเพื่อเพิ่มความคุ้มค่า (Capacity Target)
                  </span>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">รพ.สามร้อยยอด</strong>, <strong className="text-white">รพ.ปราณบุรี</strong> และ <strong className="text-white">รพ.กุยบุรี</strong> มี AdjRW/เตียงอยู่ที่ <span className="text-amber-300 font-mono font-bold">40 - 56 RW/เตียง</span> สามารถรับโอนเคสระยะฟื้นฟู (Intermediate Care) หรือเคสผ่าตัดวันเดียว เพื่อกระจายการใช้เตียงให้คุ้มค่ายิ่งขึ้น
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[10.5px] text-slate-400 italic">
              * หมายเหตุ: ค่าใช้จ่ายประเมินต่อเตียงคำนวณจากฐานต้นทุนดำเนินงานผู้ป่วยในมาตรฐานราย AdjRW (Unit Cost base 18,500 - 24,500 บาท/RW ตามระดับ รพ.)
            </div>
          </div>

        </div>

      </div>

      {/* CORE CLINICAL DATA TABLE */}
      <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3.5">
          <span className="text-white font-extrabold text-xs flex items-center gap-2">
            <Layers2 className="w-4.5 h-4.5 text-emerald-400" />
            ตารางฐานสถิติตามส่งและน้ำหนัก CMI ประเมินรายหน่วยบริการ (PKK Clinical Weights Registry) ({activePeriod.periodName})
          </span>
          <span className="text-xs text-slate-405 font-mono px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
            จำนวนรายงานที่กรองพิจารณาทั้งหมด: {processedData.length} โรงพยาบาล
          </span>
        </div>

        {/* Responsive layout table with custom compact headers styling */}
        <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent w-full rounded-2xl border border-slate-900">
          <table className="whitespace-nowrap w-full text-left border-collapse" id="clinical-weights-table">
            <thead>
              <tr className="bg-[#071328] border-b border-slate-800 text-slate-200 leading-tight">
                <th 
                  onClick={() => handleSort("hospitalCode")}
                  className="py-2.5 px-1 sm:px-1.5 text-[11px] sm:text-xs text-center font-bold font-mono tracking-tight cursor-pointer hover:bg-slate-900 transition "
                >
                  รหัส รพ.
                </th>
                <th 
                  onClick={() => handleSort("hospitalName")}
                  className="py-2.5 px-1 sm:px-1.5 text-[11px] sm:text-xs font-bold tracking-tight cursor-pointer hover:bg-slate-900 transition "
                >
                  ชื่อหน่วยบริการ
                </th>
                <th 
                  onClick={() => handleSort("type")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-center font-bold cursor-pointer hover:bg-slate-900 transition "
                >
                  ประเภท
                </th>
                <th 
                  onClick={() => handleSort("beds")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold cursor-pointer hover:bg-slate-900 transition "
                >
                  เตียง
                </th>
                <th 
                  onClick={() => handleSort("monthsSent")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-center font-bold cursor-pointer hover:bg-slate-900 transition leading-tight text-center"
                >
                  เดือน<br/>ส่ง
                </th>
                <th 
                  onClick={() => handleSort("sentCount")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  จำนวน<br/>ส่ง
                </th>
                <th 
                  onClick={() => handleSort("calculatedCount")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  จำนวน<br/>คำนวณ
                </th>
                <th 
                  onClick={() => handleSort("totalDaysOfStay")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  วันนอน<br/>รวม
                </th>
                <th 
                  onClick={() => handleSort("occupancyRate")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  ครองเตียง<br/>(%)
                </th>
                <th 
                  onClick={() => handleSort("sumAdjRw")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold text-amber-300 cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  Sum<br/>AdjRW
                </th>
                <th 
                  onClick={() => handleSort("adjRwPerBed")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold text-cyan-300 cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  AdjRW/<br/>เตียง
                </th>
                <th 
                  onClick={() => handleSort("costPerBed")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-bold text-purple-300 cursor-pointer hover:bg-slate-900 transition leading-tight"
                >
                  ค่าใช้จ่าย/<br/>เตียง
                </th>
                <th 
                  onClick={() => handleSort("cmi")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-right font-black text-emerald-400 cursor-pointer hover:bg-slate-900 transition "
                >
                  CMI
                </th>
                <th 
                  onClick={() => handleSort("threshold")}
                  className="py-2.5 px-1 text-[11px] sm:text-xs text-center font-bold cursor-pointer hover:bg-slate-900 transition "
                >
                  เกณฑ์
                </th>
                <th className="py-2.5 px-1 text-[11px] sm:text-xs text-center font-extrabold text-blue-400 ">
                  ประเมิน
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40 text-[11px] sm:text-xs">
              {processedData.length > 0 ? (
                processedData.map((row) => {
                  const pass = row.cmi >= row.threshold;
                  const isHighlightPranburi = row.hospitalCode === "11319";
                  const metrics = calcBedMetrics(row.hospitalCode, row.sumAdjRw, row.beds);

                  return (
                    <tr 
                      key={row.hospitalCode} 
                      className={`hover:bg-slate-900/60 transition duration-150 ${isHighlightPranburi ? "bg-emerald-950/20 border-y border-emerald-520/30" : ""}`}
                    >
                      <td className="py-2.5 px-1 sm:px-1.5 text-center font-mono font-bold text-slate-400 ">
                        {row.hospitalCode}
                      </td>
                      <td className="py-2.5 px-1 sm:px-1.5 font-bold text-slate-100 ">
                        {row.hospitalName}
                        {isHighlightPranburi && (
                          <span className="ml-1 text-[8px] sm:text-[9px] bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded font-bold font-mono uppercase border border-emerald-500/20">
                            Pranburi
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-1 text-center font-extrabold text-[#38bdf8] ">
                        {row.type}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono font-bold text-slate-300 ">
                        {row.beds}
                      </td>
                      <td className="py-2.5 px-1 text-center font-mono text-slate-400 ">
                        {row.monthsSent}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono text-slate-300 ">
                        {row.sentCount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono text-slate-400 ">
                        {row.calculatedCount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono text-slate-300 ">
                        {row.totalDaysOfStay.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono font-bold text-slate-300 ">
                        {row.occupancyRate.toFixed(2)}%
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono font-extrabold text-amber-300 ">
                        {row.sumAdjRw.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono font-bold text-cyan-300 ">
                        {metrics.adjRwPerBed.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono font-bold text-purple-300 ">
                        {(metrics.costPerBed / 1000).toLocaleString("th-TH", { maximumFractionDigits: 0 })}k ฿
                      </td>
                      <td className="py-2.5 px-1 text-right font-mono font-black text-emerald-400 text-xs ">
                        {row.cmi.toFixed(4)}
                      </td>
                      <td className="py-2.5 px-1 text-center font-mono text-[#38bdf8] font-bold ">
                        {row.threshold.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-1 text-center ">
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-black border ${
                          pass 
                            ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" 
                            : "bg-rose-500/10 border-rose-500/25 text-rose-450 animate-pulse"
                        }`}>
                          {pass ? "ผ่าน" : "ไม่ผ่าน"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={15} className="py-12 text-center text-slate-450 font-bold">
                    ไม่พบข้อมูลหน่วยบริการที่ค้นหาในรอบประเมินนี้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
