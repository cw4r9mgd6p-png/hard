import React, { useState } from "react";
import { XLSX } from "../utils/xlsxHelper";
import { jsPDF } from "jspdf";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart,
  ReferenceLine
} from "recharts";
import { 
  hospitalTrends, 
  QuarterlyTrendPoint 
} from "../financialTrendsData";
import { 
  Download, 
  Filter, 
  TrendingUp, 
  BarChart3, 
  Info, 
  CheckCircle, 
  AlertOctagon, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  FileSpreadsheet,
  FileText,
  Sparkles
} from "lucide-react";

export function FinancialTrendsDashboard() {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("11321"); // Default: รพ. สามร้อยยอด
  const [selectedGroup, setSelectedGroup] = useState<string>("HGR"); // HGR, M1, F1, F2, F3, S

  const [activeQuarterIndex, setActiveQuarterIndex] = useState<number>(() => {
    const defaultHospital = hospitalTrends.find(h => h.id === "11321") || hospitalTrends[0];
    return defaultHospital ? defaultHospital.data.length - 1 : 18;
  }); // Default to latest available quarter

  // Find active hospital trend
  const currentHospitalTrend = hospitalTrends.find(h => h.id === selectedHospitalId) || hospitalTrends[0];
  const activeDataPoint = currentHospitalTrend.data[activeQuarterIndex];

  // List of hospitals for navigation/dropdown
  const hospitalList = hospitalTrends.map(h => ({ id: h.id, name: h.hospitalName }));

  // Helper to format values in Thai Baht format
  const formatBaht = (num: number) => {
    return num.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Helper to format values in Millions with 'M' for graph labels
  const formatMillions = (num: number) => {
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(0) + "k";
    }
    return num.toString();
  };

  // Simulated download action
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Toast notifications matching user requests
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" | null; visible: boolean }>({
    message: "",
    type: null,
    visible: false
  });

  const showToastMessage = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4500);
  };

  const handleExportExcel = () => {
    try {
      const hospitalName = currentHospitalTrend.hospitalName;
      
      const titleRow1 = [`รายงานข้อมูลสรุปกระแสเงินสดและสินทรัพย์ระยะสั้น คลังและเงินบำรุง`];
      const titleRow2 = [`หน่วยบริการ: ${hospitalName} (${currentHospitalTrend.id}) จังหวัดประจวบคีรีขันธ์`];
      const titleRow3 = [`ประเภทกลุ่มขนาด: กลุ่ม ${getHospitalGroupCode(currentHospitalTrend.id)}  | ข้อมูล ณ ไตรมาส: ${activeDataPoint.quarter} (พิมพ์เมื่อ: ${new Date().toLocaleDateString("th-TH")} เวลา ${new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })} น.)`];
      const titleRow4 = [`กลุ่มงานประกันสุขภาพ : สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์`];
      
      const headers = [
        "ไตรมาส/ปีงบประมาณ",
        "เงินสดและเงินฝากธนาคาร (บาท)",
        "ลูกหนี้หมุนเวียนคงค้าง (บาท)",
        "สินค้าคงคลังยาเวชภัณฑ์ (บาท)",
        "สินทรัพย์หมุนเวียนรวม (บาท)",
        "หนี้สินหมุนเวียนค้างชำระ (บาท)",
        "เงินบำรุงหลังหักหนี้สุทธิ (บาท) (Unencumbered)"
      ];

      const rows = currentHospitalTrend.data.map(d => [
        d.quarter,
        d.cash,
        d.ar,
        d.inventory,
        d.currentAssets,
        d.currentLiabilities,
        d.netMaintenance
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "สถานะเงินบำรุง");

      // Set nice wider column widths for easier readability
      worksheet['!cols'] = [
        { wch: 20 },
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 38 }
      ];

      XLSX.writeFile(workbook, `รายงานฐานะคลังและเงินบำรุง_${hospitalName.replace(/[\s\.\-]+/g, "_")}.xlsx`);
      showToastMessage(`ส่งออกสรุปฐานะคลังและเงินบำรุงของ ${hospitalName} เป็นไฟล์ Excel (.xlsx) พร้อมหัวเรื่องและคู่มือข้อมูลครบถ้วนสำเร็จแล้ว!`, "success");
    } catch (error: any) {
      console.error(error);
      showToastMessage(`ไม่สามารถส่งออกไฟล์ Excel ได้ในขณะนี้: ${error?.message || error}`, "error");
    }
  };

  const handleExportPdf = () => {
    try {
      const hospitalName = currentHospitalTrend.hospitalName;
      const groupCode = getHospitalGroupCode(currentHospitalTrend.id);
      // Print date-time format including Hours and Minutes in Thai style
      const printTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const printDate = `${new Date().toLocaleDateString('th-TH')} เวลา ${printTime} น.`;
      const statusText = activeDataPoint.netMaintenance >= 200000000 ? "แข็งแกร่งสูง (ปกติ)" 
                       : activeDataPoint.netMaintenance >= 50000000 ? "ปกติ" 
                       : activeDataPoint.netMaintenance >= 0 ? "เตือนเฝ้าระวัง" 
                       : "วิกฤตขาดสภาพคล่อง";
      
      // High-DPI canvas layout spanning A4 aspect ratio representation: 1000px width x 1414px height
      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 1414;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not construct 2D context");

      // Draw Paper base background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1000, 1414);

      // Top green MOPH themed ribbon bar
      ctx.fillStyle = "#0d1d3d";
      ctx.fillRect(0, 0, 1000, 40);

      // Point of print
      ctx.fillStyle = "#10b981";
      ctx.fillRect(0, 40, 1000, 8);

      // Report Header Section
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 24px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("รายงานวิเคราะห์สถานะคลังและดัชนีวินิจฉัยรวม (MOPH Audit Report)", 60, 100);

      ctx.font = "14px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillStyle = "#64748b";
      ctx.fillText("กลุ่มงานประกันสุขภาพ : สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์", 60, 128);
      ctx.textAlign = "right";
      ctx.fillText(`ข้อมูล ณ ไตรมาส: ${activeDataPoint.quarter}`, 940, 110);
      ctx.fillText(`(พิมพ์เมื่อ: ${printDate})`, 940, 128);
      ctx.textAlign = "left";

      // Subtle horizontal divider line
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 146);
      ctx.lineTo(940, 146);
      ctx.stroke();

      // Info Blocks Cards Function
      const makeBlock = (x: number, y: number, w: number, h: number, heading: string, subText: string, prefixColor: string) => {
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = prefixColor;
        ctx.fillRect(x, y, 6, h);

        ctx.fillStyle = "#64748b";
        ctx.font = "bold 13px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
        ctx.fillText(heading, x + 20, y + 26);

        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 18px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
        ctx.fillText(subText, x + 20, y + 56);
      };

      makeBlock(60, 170, 420, 78, "โรงพยาบาลเป้าหมายผู้รับบริการประเมิน", hospitalName, "#10b981");
      makeBlock(500, 170, 440, 78, "ระเบียงความจุและระดับบริการจังหวัด", `กลุ่มขนาด: กลุ่ม ${groupCode}`, "#3b82f6");

      // Dynamic subtitle for focus point
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 18px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText(`ฐานะคลังและเงินบำรุงล่าสุดประจำรอบศึกษา: ${activeDataPoint.quarter}`, 60, 285);

      // Financial Details Canvas Row Block
      ctx.fillStyle = "#fafbfc";
      ctx.fillRect(60, 305, 880, 210);
      ctx.strokeStyle = "#e2e8f0";
      ctx.strokeRect(60, 305, 880, 210);

      const tableRow = (label: string, valueStr: string, textY: number, bold = false) => {
        ctx.fillStyle = bold ? "#1e293b" : "#475569";
        ctx.font = bold ? "bold 14px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'" : "14px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
        ctx.fillText(label, 80, textY);
        ctx.textAlign = "right";
        ctx.fillText(valueStr, 920, textY);
        ctx.textAlign = "left"; // reset alignment
      };

      tableRow("1) ยอดมูลค่าเงินสดคงเหลือและบัญชีเงินฝากธนาคารสะสม", `${formatBaht(activeDataPoint.cash)} บาท`, 340);
      tableRow("2) บัญชีลูกหนี้หมุนเวียนคงค้างระหว่างสิทธิเรียกเก็บ (AR)", `${formatBaht(activeDataPoint.ar)} บาท`, 375);
      tableRow("3) มูลค่าสินค้าคงคลังยา เวชภัณฑ์คงเหลือเฉลี่ยสะสม", `${formatBaht(activeDataPoint.inventory)} บาท`, 410);
      tableRow("4) บัญชีหนี้สินหมุนเวียนค้างชำระ (Current Liabilities)", `${formatBaht(activeDataPoint.currentLiabilities)} บาท`, 445);

      // Line breaking
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 465);
      ctx.lineTo(920, 465);
      ctx.stroke();

      tableRow("เงินบำรุงรายจังหวัดคงเหลือหลังหักหนี้สิ้นหมุนเวียน (Unencumbered Fund)", `${formatBaht(activeDataPoint.netMaintenance)} บาท`, 495, true);

      // Liquidity performance evaluation visual alert container
      ctx.fillStyle = activeDataPoint.netMaintenance >= 200000000 ? "#f0fdf4" 
                    : activeDataPoint.netMaintenance >= 50000000 ? "#f0f9ff" 
                    : activeDataPoint.netMaintenance >= 0 ? "#fffbeb" 
                    : "#fef2f2";
      ctx.strokeStyle = activeDataPoint.netMaintenance >= 200000000 ? "#10b981" 
                      : activeDataPoint.netMaintenance >= 50000000 ? "#3b82f6" 
                      : activeDataPoint.netMaintenance >= 0 ? "#f59e0b" 
                      : "#ef4444";
      ctx.lineWidth = 1.5;
      ctx.fillRect(60, 538, 880, 72);
      ctx.strokeRect(60, 538, 880, 72);

      ctx.fillStyle = "#334155";
      ctx.font = "13.5px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("ผลการจัดเกรดและดัชนีชี้วัดสถานภาพคล่องพยาบาล:", 80, 580);

      ctx.fillStyle = activeDataPoint.netMaintenance >= 0 ? "#047857" : "#b91c1c";
      ctx.font = "bold 16px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText(`${statusText} - (ทุนสำรองสุทธิจัดกลุ่ม)`, 400, 580);

      // History section
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 16px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("ประวัติข้อมูลและรายละเอียดการเปลี่ยนแปลงย้อนหลัง (Historical Balance Sheets)", 60, 650);

      // Mini ledger table headings
      ctx.fillStyle = "#0d1d3d";
      ctx.fillRect(60, 675, 880, 36);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("ปี/ไตรมาส", 80, 698);
      ctx.fillText("เงินสดคงเหลือ (บาท)", 200, 698);
      ctx.fillText("ลูกหนี้ (บาท)", 380, 698);
      ctx.fillText("หนี้สินค้างชำระ (บาท)", 560, 698);
      ctx.fillText("เงินบำรุงสุทธิหลังหักหนี้ (บาท)", 720, 698);

      // Fill values
      let ledgerY = 711;
      currentHospitalTrend.data.slice(-8).forEach((d, index) => {
        ctx.fillStyle = index % 2 === 0 ? "#f8fafc" : "#ffffff";
        ctx.fillRect(60, ledgerY, 880, 34);
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(60, ledgerY, 880, 34);

        ctx.fillStyle = "#334155";
        ctx.font = "12px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
        ctx.fillText(d.quarter, 80, ledgerY + 21);
        ctx.fillText(formatBaht(d.cash), 200, ledgerY + 21);
        ctx.fillText(formatBaht(d.ar), 380, ledgerY + 21);
        ctx.fillText(formatBaht(d.currentLiabilities), 560, ledgerY + 21);
        
        ctx.fillStyle = d.netMaintenance >= 0 ? "#047857" : "#b91c1c";
        ctx.font = "bold 12px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
        ctx.fillText(formatBaht(d.netMaintenance), 720, ledgerY + 21);

        ledgerY += 34;
      });

      // Verification Line footer
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 1100);
      ctx.lineTo(940, 1100);
      ctx.stroke();

      ctx.fillStyle = "#64748b";
      ctx.font = "italic 10px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.textAlign = "center";
      ctx.fillText("ระบบบันทึกสรุปรายงาน   กลุ่มงานประกันสุขภาพ :   สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์     เขตสุขภาพที่ 5    กระทรวงสาธารณสุข", 500, 1120);

      ctx.fillStyle = "#334155";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";
      
      // Signature: ผู้จัดทำและผู้ตรวจสอบ
      const sigLineY = 1180;
      const sigNameY = 1200;
      const sigTitleY = 1220;
      
      ctx.fillStyle = "#334155";
      ctx.textAlign = "center";

      // ผู้จัดทำ
      const sigX1 = 250;
      ctx.fillText("......................................................", sigX1, sigLineY);
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("( นายสุทธิรัตน์  สุทธิสำแดง )", sigX1, sigNameY);
      ctx.fillStyle = "#475569";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("นักวิชาการสาธารณสุขชำนาญการ", sigX1, sigTitleY);
      ctx.textAlign = "center";
      ctx.fillText("ผู้จัดทำ", sigX1, sigTitleY + 20);

      // ผู้ตรวจสอบ
      const sigX2 = 750;
      ctx.fillStyle = "#334155";
      ctx.fillText("......................................................", sigX2, sigLineY);
      ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("(นางสาวสุนิสา  ลิสกุลรักษ์)", sigX2, sigNameY);
      ctx.fillStyle = "#475569";
      ctx.font = "12.5px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("หัวหน้ากลุ่มงานประกันสุขภาพ", sigX2, sigTitleY);
      ctx.fillText("ผู้ตรวจสอบ", sigX2, sigTitleY + 20);
      ctx.textAlign = "left";

      // Export canvas representation using jsPDF inside browser environment
      const imageUri = canvas.toDataURL("image/jpeg", 0.95);
      const pdfReport = new jsPDF("p", "mm", "a4");
      pdfReport.addImage(imageUri, "JPEG", 0, 0, 210, 297);
      pdfReport.save(`รายงานประเมินคลัง_${hospitalName.replace(/[\s\.\-]+/g, "_")}.pdf`);

      showToastMessage(`ดาวน์โหลดเอกสารสำหรับ ${hospitalName} เป็น PDF สำเร็จเรียบร้อยแล้ว`, "success");
    } catch (e) {
      console.error(e);
      showToastMessage("ไม่สามารถประมวลผล PDF ได้ในขณะนี้", "error");
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        handleExportPdf();
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      } catch (e) {
        setIsDownloading(false);
        showToastMessage("ไม่สามารถประมวลผล PDF ได้ในขณะนี้", "error");
      }
    }, 1200);
  };

  // Real clipboard share action
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      try {
        navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        showToastMessage("คัดลอกลิงก์แดชบอร์ดสำหรับแชร์ลงคลิปบอร์ดเรียบร้อยแล้ว!", "success");
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        setShareSuccess(true);
        showToastMessage("ลิงก์แชร์พร้อมแล้ว! คัดลอกเบราว์เซอร์ URL เพื่อส่งแชร์", "info");
        setTimeout(() => setShareSuccess(false), 3000);
      }
    }, 800);
  };

  // Find the exact hospital code prefix (like M1, F2, etc.) dynamically based on dataset
  const getHospitalGroupCode = (hospitalId: string) => {
    switch (hospitalId) {
      case "10737": return "S"; // รพ. ประจวบ
      case "11320": return "S"; // รพ. หัวหิน
      case "11317": return "M1"; // รพ. บางสะพาน
      case "11319": return "F1"; // รพ. ปราณบุรี
      case "11321": return "F1"; // รพ. สามร้อยยอด
      case "11315": return "F2"; // รพ. กุยบุรี
      case "11316": return "F2"; // รพ. ทับสะแก
      case "11318": return "F2"; // รพ. บางสะพานน้อย
      default: return "F2";
    }
  };

  return (
    <div className="space-y-6" id="quarterly-financial-trends-section">
      
      {/* 1. TOP SELECTOR BAR & SUB-HEADER (Faithfully matching user slides) */}
      <div className="bg-[#101b34] rounded-2xl border border-[#1b315c] p-5 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-5 shadow-lg">
        
        {/* Left indicators */}
        <div className="flex flex-wrap items-center gap-1.5">
          
          <div className="flex items-center gap-2 bg-[#0c1325] px-1.5.5 py-2 rounded-xl border border-[#1f2f54]">
            <span className="text-xs text-slate-300 font-bold">จังหวัด:</span>
            <span className="text-xs font-black text-emerald-400">ประจวบคีรีขันธ์ (1)</span>
          </div>

          <div className="flex items-center gap-2 bg-[#0c1325] px-1.5.5 py-2 rounded-xl border border-[#1f2f54]">
            <span className="text-xs text-slate-300 font-bold">กลุ่ม:</span>
            <span className="text-xs font-black text-sky-400">กลุ่มรพ.ทั่วไป/ชุมชน</span>
          </div>

          {/* Service group badge matching orange/yellow tags from screenshot */}
          <div className="bg-amber-500/10 text-amber-400 px-1.5.5 py-2 rounded-xl text-xs font-black border border-amber-500/20 shadow-md">
            กลุ่ม {getHospitalGroupCode(selectedHospitalId)}
          </div>
        </div>

        {/* Hospital Dropdown Select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-1.5 flex-1 lg:max-w-3xl xl:max-w-4xl w-full">
          <div className="flex-1 min-w-[200px] sm:min-w-[260px] md:min-w-[320px]">
            <label className="block text-xs font-extrabold text-slate-200 mb-1.5 tracking-wide">
              หน่วยบริการ (รพ.):
            </label>
            <select
              value={selectedHospitalId}
              onChange={(e) => setSelectedHospitalId(e.target.value)}
              className="w-full bg-[#070c18] border border-[#213f7a] text-white text-xs rounded-xl px-2 py-3 font-black focus:outline-none focus:border-emerald-500 transition shadow-lg cursor-pointer"
            >
              {hospitalList.map(h => (
                <option key={h.id} value={h.id} className="text-xs font-bold bg-[#0b1324] text-white">
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          {/* Download Action button matching visual styles with w-full support on mobile */}
          <div className="shrink-0">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black cursor-pointer transition-all duration-150 shadow-lg border border-transparent ${
                downloadSuccess 
                  ? "bg-[#10b981] hover:bg-[#059669] text-white" 
                  : "bg-slate-700 hover:bg-slate-600 text-slate-200"
              }`}
            >
              {isDownloading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{downloadSuccess ? "ดาวน์โหลดแล้ว" : "ดาวน์โหลด"}</span>
            </button>
          </div>

        </div>

      </div>

      {/* 2. DUAL MAIN PANELS: GRAPH AREA (LEFT 70%) & STATE CARDS KPI SIDEBAR (RIGHT 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: INTERACTIVE VISUAL CHARTS (3/4 of grid width) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* CHART 1: เงินสด เงินฝาก, ลูกหนี้หมุนเวียน, มูลค่าสินค้าคงคลัง */}
          <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
                  <h3 className="text-xs font-extrabold text-white tracking-tight">
                    แนวโน้มกระแสเงินสด หมวดเงินสด, ลูกหนี้หมุนเวียน และสินค้าคงคลัง (สินทรัพย์ระยะสั้น)
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  วิเคราะห์ความสมดุลทางการบริหารเงินสดสำรองเทียบกับกระบวนการแปลงสภาพเบิกจ่ายค่ารักษา (2565Q1 - 2569Q2)
                </p>
              </div>
              <div className="bg-slate-800/40 text-slate-350 px-2.5 py-1 rounded text-[11px] font-mono font-bold">
                จำนวน 18 ไตรมาส
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={currentHospitalTrend.data} 
                  margin={{ top: 15, right: 30, left: 10, bottom: 5 }}
                  onClick={(state) => {
                    if (state && state.activeTooltipIndex !== undefined) {
                      setActiveQuarterIndex(state.activeTooltipIndex);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#131f36" />
                  <XAxis 
                    dataKey="quarter" 
                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 'bold' }} 
                    stroke="#1e2f4f" 
                  />
                  <YAxis 
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                    tick={{ fontSize: 11, fill: '#94a3b8' }} 
                    stroke="#1e2f4f" 
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c1527', border: '1px solid #1e3a8a', borderRadius: '12px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#38bdf8' }}
                    formatter={(value: any, name: any) => [
                      <span className="font-mono text-white text-[11px] font-bold">{formatBaht(Number(value))}</span>,
                      <span className="text-[11px] text-slate-300 mr-2">{name}</span>
                    ]}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12, fontWeight: 'bold' }} 
                  />
                  
                  {/* Lines mapped strictly to screenshot coordinates and colors */}
                  <Line 
                    type="monotone" 
                    dataKey="cash" 
                    name="เงินสด" 
                    stroke="#1d76db" // Vibrant blue
                    strokeWidth={3} 
                    dot={{ r: 5, stroke: '#1d76db', strokeWidth: 2, fill: '#0a101f' }}
                    activeDot={{ r: 7 }}
                  />
                  
                  <Line 
                    type="monotone" 
                    dataKey="ar" 
                    name="ลูกหนี้หมุนเวียน" 
                    stroke="#ea822f" // Orange
                    strokeWidth={3} 
                    dot={{ r: 5, stroke: '#ea822f', strokeWidth: 2, fill: '#0a101f' }}
                    activeDot={{ r: 7 }}
                  />

                  <Line 
                    type="monotone" 
                    dataKey="inventory" 
                    name="สินค้าคงคลัง" 
                    stroke="#db3d89" // Hot Pink/Magenta
                    strokeWidth={2} 
                    dot={{ r: 4, stroke: '#db3d89', strokeWidth: 1.5, fill: '#0a101f' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-xl mt-2 border border-slate-800/60">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>คลิกบนแกนกราฟหรือจุดไตรมาสเพื่ออัปเดตแผงการเงินด้านขวา (ปัจจุบันเลือก: <strong className="text-sky-400 font-mono">{currentHospitalTrend.data[activeQuarterIndex].quarter}</strong>)</span>
              </span>
              <span className="text-slate-500">ข้อมูลอิงตารางงบทดลองและตรวจสอบบำรุงจริง</span>
            </div>

          </div>

          {/* CHART 2: สินทรัพย์หมุนเวียน หนี้สินหมุนเวียน และเงินบำรุงคงเหลือ */}
          <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h3 className="text-xs font-extrabold text-white tracking-tight">
                    แนวโน้มสินทรัพย์หมุนเวียน, หนี้สินหมุนเวียน และเงินบำรุงคงเหลือ (หักหนี้สินหมุนเวียนแล้ว)
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  กราฟแท่งสีเขียวเปรียบเทียบภาระสินทรัพย์สุทธิต่อยอดกระแสคงคลังจริง (แท่งที่ดิ่งลงใต้แกน 0 คือยอดเงินบำรุงติดลบเป็นความเสี่ยง)
                </p>
              </div>
              <div className="bg-slate-800/40 text-slate-350 px-2.5 py-1 rounded text-[11px] font-mono font-bold">
                Composed Analytics
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={currentHospitalTrend.data}
                  margin={{ top: 15, right: 30, left: 10, bottom: 5 }}
                  onClick={(state) => {
                    if (state && state.activeTooltipIndex !== undefined) {
                      setActiveQuarterIndex(state.activeTooltipIndex);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#131f36" />
                  <XAxis 
                    dataKey="quarter" 
                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 'bold' }} 
                    stroke="#1e2f4f" 
                  />
                  <YAxis 
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                    tick={{ fontSize: 11, fill: '#94a3b8' }} 
                    stroke="#1e2f4f" 
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c1527', border: '1px solid #10b981', borderRadius: '12px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#10b981' }}
                    formatter={(value: any, name: any) => [
                      <span className="font-mono text-white text-[11px] font-bold">{formatBaht(Number(value))}</span>,
                      <span className="text-[11px] text-slate-300 mr-2">{name}</span>
                    ]}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="rect"
                    wrapperStyle={{ fontSize: 12, fontWeight: 'bold' }} 
                  />

                  {/* Negative Reference Line */}
                  <ReferenceLine y={0} stroke="#475569" strokeWidth={1} />

                  {/* Net Maintenance (Green bars) - Condition color based on positive/negative */}
                  <Bar 
                    dataKey="netMaintenance" 
                    name="เงินบำรุงคงเหลือ(หักหนี้แล้ว)" 
                    fill="#15803d" // Base green
                    radius={[4, 4, 0, 0]}
                  >
                    {currentHospitalTrend.data.map((entry, index) => {
                      const isNegative = entry.netMaintenance < 0;
                      return (
                        <rect
                          key={`cell-${index}`}
                          fill={isNegative ? "#991b1b" : "#166534"} // Alarmed red vs operational green
                          opacity={index === activeQuarterIndex ? 1.0 : 0.7}
                          className="transition-all duration-300 cursor-pointer"
                        />
                      );
                    })}
                  </Bar>

                  {/* Asset Lines */}
                  <Line 
                    type="monotone" 
                    dataKey="currentAssets" 
                    name="สินทรัพย์หมุนเวียน" 
                    stroke="#1080db" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, stroke: '#1080db', strokeWidth: 1.5, fill: '#0a101f' }}
                  />

                  {/* Liabilities Lines */}
                  <Line 
                    type="monotone" 
                    dataKey="currentLiabilities" 
                    name="หนี้สินหมุนเวียน" 
                    stroke="#b91c1c" 
                    strokeWidth={2} 
                    dot={{ r: 4, stroke: '#b91c1c', strokeWidth: 1.5, fill: '#0a101f' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-3 text-[11px]">
              <span className="text-slate-400">สถานะสุขภาพทางการเงินของโรงพยาบาลในสังกัดไตรมาสล่าสุด:</span>
              <span className={`px-1.5 py-1 rounded-full font-bold font-mono text-xs ${
                activeDataPoint.netMaintenance >= 0 
                  ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/20" 
                  : "bg-red-950/40 text-red-300 border border-red-500/20"
              }`}>
                {activeDataPoint.netMaintenance >= 0 
                  ? "✓ OPERATIONAL STRENGTH (มีสภาพคล่องส่วนเกิน)" 
                  : "⚠ DEFICIT FLOW ALERT (ขาดสภาพคล่องสะสม)"}
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: STATE CARDS SIDEBAR - MATCHES SCREENSHOT METRICS PIXEL-PERFECTLY (1/4 width) */}
        <div className="lg:col-span-1 space-y-4" id="right-kpi-metrics-sidebar">
          
          <div className="bg-[#121e35] rounded-2xl border border-[#213862] p-4 text-center">
            <span className="text-[11px] text-slate-350 tracking-wider font-extrabold uppercase block">แผงสรุปตรวจสอบงบ</span>
            <div className="mt-1 flex items-center justify-center gap-1.5">
              <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                {activeDataPoint.quarter}
              </span>
              <span className="text-[11px] text-slate-400">ของหน่วยตรวจ</span>
            </div>
          </div>

          {/* Card 1: เงินสดเงินฝาก (บาท) */}
          <div className="bg-[#e4f3eb] rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all duration-300 hover:scale-101 border border-emerald-200" id="card-cash">
            <div className="flex items-center justify-between text-emerald-900">
              <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">เงินสดเงินฝาก (บาท)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-700 shrink-0" />
            </div>
            <div className="mt-2 text-right">
              <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-[#004d2c] leading-tight select-all">
                {formatBaht(activeDataPoint.cash)}
              </span>
            </div>
          </div>

          {/* Card 2: ลูกหนี้หมุนเวียน (บาท) */}
          <div className="bg-[#e1f0fa] rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all duration-300 hover:scale-101 border border-cyan-200" id="card-ar">
            <div className="flex items-center justify-between text-cyan-900">
              <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">ลูกหนี้หมุนเวียน (บาท)</span>
              <TrendingUp className="w-4 h-4 text-cyan-600 shrink-0" />
            </div>
            <div className="mt-2 text-right">
              <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-[#093b5c] leading-tight select-all">
                {formatBaht(activeDataPoint.ar)}
              </span>
            </div>
          </div>

          {/* Card 3: มูลค่าสินค้าคงคลัง (บาท) */}
          <div className="bg-[#e6effc] rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all duration-300 hover:scale-101 border border-indigo-200" id="card-inventory">
            <div className="flex items-center justify-between text-indigo-950">
              <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">มูลค่าสินค้าคงคลัง (บาท)</span>
              <BarChart3 className="w-4 h-4 text-indigo-700 shrink-0" />
            </div>
            <div className="mt-2 text-right">
              <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-[#0b2853] leading-tight select-all">
                {formatBaht(activeDataPoint.inventory)}
              </span>
            </div>
          </div>

          {/* Card 4: สินทรัพย์หมุนเวียน (บาท) */}
          <div className="bg-[#ecf3ff]/10 rounded-2xl p-4 border border-[#2b4c80] hover:bg-[#ecf3ff]/15 transition duration-200 relative overflow-hidden" id="card-assets">
            <div className="flex items-center justify-between text-blue-300">
              <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">สินทรัพย์หมุนเวียน (บาท)</span>
              <span className="text-[11px] font-bold bg-[#1d4ed8]/35 text-white py-0.5 px-2 rounded-full">TOTAL</span>
            </div>
            <div className="mt-2 text-right">
              <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-[#82b4ff] leading-tight select-all">
                {formatBaht(activeDataPoint.currentAssets)}
              </span>
            </div>
          </div>

          {/* Card 5: หนี้สินหมุนเวียน (บาท) */}
          <div className="bg-[#ffebeb]/10 rounded-2xl p-4 border border-[#e11d48]/50 hover:bg-[#ffebeb]/15 transition duration-200 relative overflow-hidden" id="card-liabilities">
            <div className="flex items-center justify-between text-rose-300">
              <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">หนี้สินหมุนเวียน (บาท)</span>
              <ArrowDownRight className="w-4 h-4 text-rose-500 shrink-0" />
            </div>
            <div className="mt-2 text-right">
              <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-[#fda4af] leading-tight select-all">
                {formatBaht(activeDataPoint.currentLiabilities)}
              </span>
            </div>
          </div>

          {/* Card 6: เงินบำรุงคงเหลือ (บาท) - CONDITIONAL BACKGROUND FOR ALARMS */}
          {activeDataPoint.netMaintenance >= 0 ? (
            /* Positive Card - standard soft light cyan design */
            <div className="bg-[#ffd2d2]/15 rounded-2xl p-4 border border-rose-500/20 shadow-md relative overflow-hidden transition-all duration-300 hover:scale-101" id="card-net-maint-pos">
              <div className="flex items-center justify-between text-pink-400">
                <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">เงินบำรุงคงเหลือ(หักหนี้แล้ว) (บาท)</span>
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
              </div>
              <div className="mt-2 text-right">
                <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-emerald-400 leading-tight select-all">
                  {formatBaht(activeDataPoint.netMaintenance)}
                </span>
              </div>
            </div>
          ) : (
            /* Negative Card - ALARM STYLE (Light pink background, red bold text like in user screenshot for Bangsaphan Noi) */
            <div className="bg-[#fde8e8] rounded-2xl p-4 border border-[#f8b4b4] shadow-md relative overflow-hidden transition-all duration-300 hover:scale-101 animate-bounce" id="card-net-maint-neg">
              <div className="flex items-center justify-between text-[#9b1c1c]">
                <span className="text-[11px] sm:text-[13px] font-extrabold tracking-tight">เงินบำรุงคงเหลือ(หักหนี้แล้ว) (บาท)</span>
                <AlertOctagon className="w-4 h-4 text-[#e11d48] shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div className="mt-2 text-right">
                <span className="block font-mono text-base sm:text-lg md:text-xl xl:text-2xl font-extrabold text-[#b8181c] leading-tight select-all">
                  {formatBaht(activeDataPoint.netMaintenance)}
                </span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 3. TABLE OF HISTORICAL DETAILED VALUES (Value addition for administrators) */}
      <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <h4 className="text-xs font-extrabold text-white">ตารางสรุปรายละเอียดเงินบำรุงและหนี้สินรายไตรมาส ({currentHospitalTrend.data[currentHospitalTrend.data.length - 1].quarter})</h4>
            <p className="text-[11px] text-slate-400">ตรวจสอบยอดบัญชีของ {currentHospitalTrend.hospitalName} ครบทุกมิติ</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleExportExcel}
              className="flex items-center gap-1 bg-[#1a2d4a] hover:bg-[#253e66] text-white px-1.5 py-1.5 rounded-lg text-[11px] font-bold border border-[#2d4d7c] transition shrink-0 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>ส่งออก Excel</span>
            </button>
            <button 
              onClick={handleExportPdf}
              className="flex items-center gap-1 bg-[#1a2d4a] hover:bg-[#253e66] text-white px-1.5 py-1.5 rounded-lg text-[11px] font-bold border border-[#2d4d7c] transition shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span>ส่งออก PDF</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent rounded-xl border border-[#142340]">
          <table className="whitespace-nowrap w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0e172a] text-[#94a3b8] text-[11px] uppercase font-extrabold border-b border-[#142340]">
                <th className="p-1.5 ">ไตรมาส</th>
                <th className="p-1.5 text-right ">เงินสดเงินฝาก (บาท)</th>
                <th className="p-1.5 text-right ">ลูกหนี้หมุนเวียน (บาท)</th>
                <th className="p-1.5 text-right ">มูลค่าสินค้าคงคลัง (บาท)</th>
                <th className="p-1.5 text-right ">สินทรัพย์หมุนเวียน (บาท)</th>
                <th className="p-1.5 text-right ">หนี้สินหมุนเวียน (บาท)</th>
                <th className="p-1.5 text-right ">เงินบำรุงคงเหลือหักหนี้ (บาท)</th>
                <th className="p-1.5 text-center ">สถานะสภาพคล่อง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#142340] text-[11px] font-mono">
              {[...currentHospitalTrend.data].reverse().map((d, index) => {
                const isActive = d.quarter === activeDataPoint.quarter;
                return (
                  <tr 
                    key={d.quarter} 
                    className={`hover:bg-[#15243f]/30 transition-colors cursor-pointer ${
                      isActive ? "bg-emerald-950/20 text-white font-bold" : "text-slate-300"
                    }`}
                    onClick={() => {
                      // Find real index in original non-reversed data
                      const originalIndex = currentHospitalTrend.data.findIndex(p => p.quarter === d.quarter);
                      if (originalIndex !== -1) {
                        setActiveQuarterIndex(originalIndex);
                      }
                    }}
                  >
                    <td className="p-1.5 font-sans font-extrabold text-[#38bdf8] ">
                      {d.quarter}
                      {isActive && <span className="ml-1.5 text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded  inline-block">Active</span>}
                    </td>
                    <td className="p-1.5 text-right text-emerald-300 ">{formatBaht(d.cash)}</td>
                    <td className="p-1.5 text-right text-orange-300 ">{formatBaht(d.ar)}</td>
                    <td className="p-1.5 text-right text-pink-300 ">{formatBaht(d.inventory)}</td>
                    <td className="p-1.5 text-right text-slate-200 ">{formatBaht(d.currentAssets)}</td>
                    <td className="p-1.5 text-right text-red-300 ">{formatBaht(d.currentLiabilities)}</td>
                    <td className={`p-1.5 text-right font-extrabold  ${d.netMaintenance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatBaht(d.netMaintenance)}
                    </td>
                    <td className="p-1.5 text-center font-sans ">
                      {d.netMaintenance >= 200000000 ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold  inline-block">แข็งแกร่งสูง</span>
                      ) : d.netMaintenance >= 50000000 ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-[#1d4ed8]/20 text-blue-450 border border-blue-500/20 font-bold  inline-block">ปกติ</span>
                      ) : d.netMaintenance >= 0 ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold  inline-block">เตือนเผ้าระวัง</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-red-500/10 text-red-400 border border-red-500/20 font-bold  inline-block">วิกฤตขาดสภาพคล่อง</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Toast Notification element */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300">
          <div className={`flex items-center gap-1.5 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-bold text-white max-w-md ${
            toast.type === "success" 
              ? "bg-[#0b2518] border-emerald-500/30 text-emerald-400" 
              : toast.type === "error"
              ? "bg-[#250b0b] border-rose-500/30 text-rose-450"
              : "bg-[#0b1b35] border-sky-500/30 text-sky-400"
          }`}>
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-slate-200">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
