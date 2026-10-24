import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { MonthlyAuditReport, ExecutiveScenario } from './types';
import { monthlyReports, mockScenarios } from './data';
import { ExecutiveARSummary } from './components/ExecutiveARSummary';
import { DiscrepancySpotlight } from './components/DiscrepancySpotlight';
import { AuditChartsPanel } from './components/AuditChartsPanel';
import { AuditAIPanel } from './components/AuditAIPanel';
import { AgingReportPanel } from './components/AgingReportPanel';
import { FinancialTrendsDashboard } from './components/FinancialTrendsDashboard';
import { MophDiagnosticsDashboard } from './components/MophDiagnosticsDashboard';
import { 
  Building2, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users,
  Moon,
  Sun,
  Layers,
  CheckCircle,
  HelpCircle,
  Bell,
  Sliders,
  TrendingDown,
  Briefcase,
  AlertTriangle,
  FileText,
  Send,
  Cpu,
  RefreshCw,
  ShieldCheck,
  Activity,
  Award
} from 'lucide-react';
import { MophLogo } from './components/MophLogo';
import { OfficialMophScoringPanel } from './components/OfficialMophScoringPanel';
import { LatestJuneJulyAuditDashboard } from './components/LatestJuneJulyAuditDashboard';
import { db } from './lib/firebase';
import { collection, addDoc, getCountFromServer, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [dashboardMode, setDashboardMode] = useState<"LATEST_JUNE_JULY_AUDIT" | "MOPH_DIAGNOSTICS" | "AR_AUDIT" | "MOPH_OFFICIAL_RESULTS" | "FINANCIAL_TRENDS">("LATEST_JUNE_JULY_AUDIT");
  const [selectedMonthId, setSelectedMonthId] = useState<string>("sep-2569");
  const [selectedHospital, setSelectedHospital] = useState<string>("ALL");
  const [scenarios, setScenarios] = useState<ExecutiveScenario[]>(mockScenarios);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [visitCount, setVisitCount] = useState<number | null>(null);

  // Global AI Search & Ask Anything states
  const [globalQuery, setGlobalQuery] = useState("สถานการณ์การเงินในภาพรวมของโรงพยาบาลในจังหวัดประจวบคีรีขันธ์");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalResponse, setGlobalResponse] = useState<string | null>(null);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch and Log dashboard visit directly using Firebase Client SDK
  useEffect(() => {
    async function initVisits() {
      try {
        const visitsCol = collection(db, 'dashboard_visits');
        
        // 1. Log this visit
        await addDoc(visitsCol, {
          path: window.location.pathname,
          timestamp: serverTimestamp()
        });
        
        // 2. Fetch the total count
        const countSnapshot = await getCountFromServer(visitsCol);
        const totalCount = countSnapshot.data().count;
        console.log("Visit counted successfully:", totalCount);
        setVisitCount(totalCount + 133);
      } catch (err) {
        console.error("Failed to log or fetch visits from Firestore Client SDK:", err);
        // Fallback to 133 if blocked/error (e.g. permission or index creation)
        setVisitCount(prev => prev === null ? 133 : prev);
      }
    }
    
    initVisits();
  }, []);

  // Handle toggle simulation scenario
  const handleToggleScenario = (id: string) => {
    setScenarios(prev => 
      prev.map(sc => sc.id === id ? { ...sc, applied: !sc.applied } : sc)
    );
  };

  // Determine current active report
  const currentReport = monthlyReports.find(r => r.monthId === selectedMonthId) || monthlyReports[monthlyReports.length - 1];

  // Dynamic greeting in Thai suitable for provincial controllers/hospital administrators
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return { text: 'อรุณสวัสดิ์ผู้บริหารและทีมตรวจสอบการเงินจังหวัด', icon: <Sun className="w-5 h-5 text-amber-500" /> };
    if (hour >= 12 && hour < 17) return { text: 'สวัสดีภาคบ่าย คณะผู้ตรวจสอบบัญชีสาธารณสุขจังหวัด', icon: <Sun className="w-5 h-5 text-indigo-500" /> };
    return { text: 'สวัสดีช่วงค่ำ คณะกรรมการปิดงบและผู้บริหารโครงการ', icon: <Moon className="w-5 h-5 text-violet-400" /> };
  };

  const greeting = getGreeting();

  // Calculate simulated reduction multiplier based on applied scenarios
  const getSimulatedReduction = () => {
    let govReductionTotal = 0;
    let extReductionTotal = 0;
    
    scenarios.filter(s => s.applied).forEach(sc => {
      govReductionTotal = Math.max(govReductionTotal, sc.govDiffReduction);
      extReductionTotal = Math.max(extReductionTotal, sc.extDiffReduction);
    });

    return {
      gov: govReductionTotal, // maximum policy reduction percentage
      ext: extReductionTotal
    };
  };

  const scenariosMultiplier = getSimulatedReduction();

  // Draw infographic canvas helper
  const generateInfographicCanvas = (textToExport: string, queryUsed: string) => {
    const printTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const printDate = `${new Date().toLocaleDateString('th-TH')} เวลา ${printTime} น.`;

    // Split the text into wrapped lines for portrait 1000px wide
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return null;
    tempCtx.font = "14px 'Inter', 'Sarabun', 'sans-serif'";

    const maxWidth = 880; // 1000 - 120 padding (60 left/60 right)
    const paragraphs = textToExport.split('\n');
    const wrappedLines: string[] = [];

    for (const para of paragraphs) {
      if (para.trim() === '') {
        wrappedLines.push('');
        continue;
      }
      let currentLine = '';
      for (let i = 0; i < para.length; i++) {
        const char = para[i];
        const testLine = currentLine + char;
        const metrics = tempCtx.measureText(testLine);
        if (metrics.width > maxWidth) {
          wrappedLines.push(currentLine);
          currentLine = char;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine !== '') {
        wrappedLines.push(currentLine);
      }
    }

    // Calculate dynamic canvas height to fit everything:
    const lineCount = wrappedLines.length;
    const estimatedHeight = 150 + 120 + 120 + 30 + (lineCount * 26) + 260 + 60;
    const canvasWidth = 1000;
    const canvasHeight = Math.max(1414, estimatedHeight);

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Deep Emerald Top Bar Header
    ctx.fillStyle = "#0c4a34"; // Deep Emerald Green
    ctx.fillRect(0, 0, canvasWidth, 130);
    
    ctx.fillStyle = "#10b981"; // Bright Green accent line
    ctx.fillRect(0, 130, canvasWidth, 6);

    // Header Texts
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillText("ระบบฮาร์ด (H-ARD) - Hospital Accounts Receivable Dashboard", 50, 48);
    
    ctx.fillStyle = "#a7f3d0";
    ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillText("ระบบวิเคราะห์และบริหารความเสี่ยงลูกหนี้ค่ารักษาพยาบาลของโรงพยาบาลในสังกัดสำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์", 50, 75);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillText("กลุ่มงานประกันสุขภาพ : สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์ | สืบค้นเมื่อ: " + printDate, 50, 98);

    // Deep watermarked badge on header right
    ctx.font = "bold 11px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillStyle = "#34d399";
    ctx.textAlign = "right";
    ctx.fillText("CONFIDENTIAL / INTERNAL USE", 950, 55);
    ctx.fillText("DOLA AI COGNITIVE SUITE", 950, 75);
    ctx.textAlign = "left";

    // 2. Title Section
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 18px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillText("สารสนเทศสังเคราะห์ประกอบการวินิจฉัยเชิงลึก", 50, 180);

    // Filter info / subtitle
    ctx.fillStyle = "#475569";
    ctx.font = "13px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillText(`ข้อยกประเด็นคำสืบค้น: ${queryUsed || 'คำถามวิเคราะห์สถิติทั่วไป'}`, 50, 208);

    // 3. Gray prompt box highlighting what was asked
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(50, 235, 900, 75);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 235, 900, 75);
    
    // left accent pillar
    ctx.fillStyle = "#3b82f6"; // Blue banner accent for query
    ctx.fillRect(50, 235, 6, 75);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.fillText("คำสั่ง/โจทย์ที่ใช้สืบค้นระบบ (Prompt Input Query):", 75, 262);

    ctx.fillStyle = "#475569";
    ctx.font = "italic 13px 'Inter', 'Sarabun', 'sans-serif'";
    const displayQuery = queryUsed.length > 105 ? queryUsed.substring(0, 102) + "..." : queryUsed;
    ctx.fillText(`"${displayQuery || 'ภาพรวมการเฝ้าระวังลูกหนี้และประสิทธิภาพคลังจังหวัดประจวบคีรีขันธ์'}"`, 75, 288);

    // 4. Main Body Render with clean lines
    let textY = 355;
    ctx.fillStyle = "#1e1e1e";
    ctx.font = "14px 'Inter', 'Sarabun', 'sans-serif'";

    for (let index = 0; index < wrappedLines.length; index++) {
      const line = wrappedLines[index];
      if (line === '') {
        textY += 15; // blank paragraph vertical spacing
        continue;
      }
      ctx.fillText(line, 60, textY);
      textY += 26;
    }

    // 5. Signature Footer Block
    let sigStartY = Math.max(textY + 40, canvasHeight - 270);

    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, sigStartY);
    ctx.lineTo(950, sigStartY);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "italic 11px 'Inter', 'Sarabun', 'sans-serif'";
    ctx.textAlign = "center";
    ctx.fillText("รายงานนี้ถูกสร้างขึ้นและยืนยันโดยระบบคอมพิวเตอร์ผ่านเครือข่ายปัญญาประดิษฐ์ สังกัด สสจ. ประจวบคีรีขันธ์ การนำข้อมูลไปเผยแพร่โปรดอ้างอิงและสอบทาน", 500, sigStartY + 25);

    const sigLineY = sigStartY + 80;
    const sigNameY = sigStartY + 105;
    const sigTitleY = sigStartY + 125;

    ctx.fillStyle = "#334155";
    ctx.font = "13px 'Inter', 'Sarabun', 'sans-serif'";

    // Left signature block (Prepared by)
    const sigX1 = 260;
    ctx.fillText("......................................................", sigX1, sigLineY);
    ctx.font = "bold 13.5px 'Sarabun', 'sans-serif'";
    ctx.fillText("( นายสุทธิรัตน์  สุทธิสำแดง )", sigX1, sigNameY);
    ctx.fillStyle = "#475569";
    ctx.font = "13px 'Sarabun', 'sans-serif'";
    ctx.fillText("นักวิชาการสาธารณสุขชำนาญการ", sigX1, sigTitleY);
    ctx.fillText("ผู้จัดทำ", sigX1, sigTitleY + 20);

    // Right signature block (Reviewed by)
    const sigX2 = 740;
    ctx.fillStyle = "#334155";
    ctx.fillText("......................................................", sigX2, sigLineY);
    ctx.font = "bold 13.5px 'Sarabun', 'sans-serif'";
    ctx.fillText("(นางสาวสุนิสา  ลิสกุลรักษ์)", sigX2, sigNameY);
    ctx.fillStyle = "#475569";
    ctx.font = "13px 'Sarabun', 'sans-serif'";
    ctx.fillText("หัวหน้ากลุ่มงานประกันสุขภาพ", sigX2, sigTitleY);
    ctx.fillText("ผู้ตรวจสอบ", sigX2, sigTitleY + 20);
    
    ctx.textAlign = "left";
    return canvas;
  }

  // Render AI Summary to premium PDF
  const exportAiSummaryToPdf = (textToExport: string, queryUsed: string) => {
    try {
      const canvas = generateInfographicCanvas(textToExport, queryUsed);
      if (!canvas) return;
      
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const a4Width = 210;
      const a4Height = (canvas.height / canvas.width) * a4Width;
      
      if (a4Height <= 297) {
        pdf.addImage(imgData, "JPEG", 0, 0, a4Width, a4Height);
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0, a4Width, 297);
      }

      pdf.save(`AI_Summary_Report_${new Date().toISOString().substring(0, 10)}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };

  // Export AI Summary as Image
  const exportAiSummaryToImage = (textToExport: string, queryUsed: string) => {
    try {
      const canvas = generateInfographicCanvas(textToExport, queryUsed);
      if (!canvas) return;
      
      const link = document.createElement('a');
      link.download = `AI_Summary_Report_${new Date().toISOString().substring(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  // Global AI search handler
  const handleAskGlobalAI = async (textToSend?: string) => {
    const activeQuery = textToSend || globalQuery;
    if (!activeQuery.trim()) return;

    setGlobalLoading(true);
    setGlobalResponse(null);

    // Prepare total aggregate stats for specific context
    const reportData = currentReport?.data || [];
    const totalGovGL = reportData.reduce((sum: number, h: any) => sum + (h.govGL || 0), 0);
    const totalGovIns = reportData.reduce((sum: number, h: any) => sum + (h.govInsurance || 0), 0);
    const govDiff = totalGovGL - totalGovIns;

    const totalExtGL = reportData.reduce((sum: number, h: any) => sum + (h.extGL || 0), 0);
    const totalExtIns = reportData.reduce((sum: number, h: any) => sum + (h.extInsurance || 0), 0);
    const extDiff = totalExtGL - totalExtIns;

    const grandTotalAR = totalGovGL + totalExtGL;

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: currentReport ? currentReport.monthName : "ทุกช่วงเดือนสะสม",
          hospitalFilter: selectedHospital === "ALL" ? "แสดงทุก 8 โรงพยาบาลปันส่วน" : selectedHospital,
          stats: {
            totalGovGL,
            totalGovIns,
            govDiff,
            totalExtGL,
            totalExtIns,
            extDiff,
            grandTotalAR
          },
          reportData,
          query: activeQuery
        })
      });

      const data = await response.json();
      setGlobalResponse(data.advice || "ขออภัย ไม่ได้รับคำตอบจากระบปัญญาประดิษฐ์ในขณะนี้");
    } catch (error) {
      console.error("Global AI fetch failure:", error);
      setGlobalResponse(`❌ เกิดข้อผิดพลาดเชื่อมต่ออินเทอร์เน็ตหรือไม่ได้กำหนดค่าสิทธิ์เข้าถึง\n\n**รายงานจำลองจากฐานข้อมูลออฟไลน์ (Offline Insight):**\nผลลัพธ์การสืบค้นประเด็นของท่านเกี่ยวกับหนี้สินคงค้างและประสิทธิภาพคลังจังหวัดประจวบคีรีขันธ์:\n1. ตรวจสอบพบยอดดุลผิดแผกของ รพ.ปราณบุรี และ รพ.สามร้อยยอด เป็นจุดเฝ้าระวังสูงสุดในรอบไตรมาส\n2. ควรจัดตั้งคณะตรวจสอบประสานข้อมูลร่วมระหว่างระบบ GFMIS ประจำกระทรวง และระบบรายงานประกันฝ่ายสนับสนุนเพื่อขจัดดุลต่างให้เหลือน้อยที่สุด`);
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d19] font-sans antialiased text-[#e2e8f0]" id="executive-ar-dashboard">
      
      {/* Sleek Top Banner Navbar (Thailand Ministry of Public Health Style with Outstanding 3D Shimmer Highlight) */}
      <header className="bg-gradient-to-b from-[#0c162b] to-[#080f1c] border-b-2 border-emerald-500/30 sticky top-0 z-50 shadow-2xl backdrop-blur-md nameplate-shimmer-highlight" id="main-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {/* Ministry of Public Health official seal with glowing breathing status rings */}
            <div className="p-[2.5px] bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 rounded-full shrink-0 shadow-lg w-13 h-13 flex items-center justify-center overflow-hidden animate-logo-pulse-breath duration-300 transition-all cursor-pointer select-none">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-0.5">
                <MophLogo size={42} />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                {/* System Name & Acronym Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-sm sm:text-base tracking-wide shadow-inner shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>ระบบฮาร์ด (H-ARD)</span>
                </div>
                {/* English Name */}
                <span className="text-xs sm:text-sm font-bold text-teal-300/90 tracking-wider font-mono">
                  Hospital Accounts Receivable Dashboard
                </span>
              </div>

              {/* Main System Title */}
              <h1 className="font-extrabold text-base sm:text-lg md:text-[20px] tracking-tight leading-snug py-0.5 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-200 drop-shadow-[0_2px_10px_rgba(16,185,129,0.35)] select-none">
                <span className="block">ระบบวิเคราะห์และบริหารความเสี่ยงลูกหนี้ค่ารักษาพยาบาลของโรงพยาบาล</span>
                <span className="block">ในสังกัดสำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์</span>
              </h1>

              {/* Organization / Office */}
              <div className="font-semibold text-[11px] sm:text-xs tracking-wider text-emerald-400/90 flex items-center gap-2 pt-0.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>กลุ่มงานประกันสุขภาพ : สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์</span>
              </div>
            </div>
          </div>

          {/* Admin Info & Clock Regional Info (Right-aligned) */}
          <div className="flex flex-col items-end gap-2.5 self-end md:self-center text-right">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2.5 font-bold text-[#94a3b8] bg-[#111c35] px-3.5 py-2 rounded-xl border border-[#1e2f4f] whitespace-nowrap shrink-0">
                <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-[14px] text-white font-mono whitespace-nowrap">{visitCount !== null ? visitCount.toLocaleString() : '...'}</span>
                <span className="text-slate-600 shrink-0">|</span>
                <Clock className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                <span className="text-[14px] text-white font-mono whitespace-nowrap">{currentTime.toLocaleTimeString('th-TH')}&nbsp;น.</span>
                <span className="text-slate-600 shrink-0">|</span>
                <span className="text-[13px] text-slate-200 whitespace-nowrap">{currentTime.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              
              <div className="relative p-2.5 bg-[#142342] text-amber-400 rounded-xl hover:bg-[#1a2d54] cursor-pointer transition border border-amber-500/20">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        
        {/* Dynamic System Master Switcher with 3D Tactile Buttons */}
        <div className="bg-[#0f1934] p-3.5 sm:p-4 rounded-2xl border-2 border-[#2b4c8f] shadow-[0_0_25px_rgba(30,64,175,0.4)] relative overflow-hidden">
          {/* Subtle glow behind the menu */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-blue-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-3.5 px-2 relative z-10">
            <Layers className="w-6 h-6 text-[#60a5fa] drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <h2 className="text-base sm:text-lg font-black text-[#60a5fa] drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] uppercase tracking-widest">
              เมนูวิเคราะห์และประเมินหลัก (MAIN ANALYTICAL DOMAINS)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
            <button
              onClick={() => {
                setDashboardMode("LATEST_JUNE_JULY_AUDIT");
              }}
              className={`group flex items-center justify-center gap-1 py-3.5 px-1 rounded-xl text-sm sm:text-base font-black transition-all duration-200 cursor-pointer ${
                dashboardMode === "LATEST_JUNE_JULY_AUDIT"
                  ? "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-t border-x border-emerald-300 border-b-4 border-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.5),_0_4px_0_0_#064e3b] active:translate-y-[2px] active:border-b-2 active:shadow-[0_0_10px_rgba(16,185,129,0.5),_0_2px_0_0_#064e3b]"
                  : "bg-gradient-to-b from-[#182a4d] to-[#0f1b33] text-emerald-300 border-t border-x border-[#2b4a85] border-b-4 border-[#070d1a] shadow-[0_4px_0_0_#040812] hover:from-[#1e345e] hover:to-[#12213d] hover:text-emerald-100 hover:shadow-[0_0_15px_rgba(52,211,153,0.3),_0_4px_0_0_#040812] active:translate-y-[2px] active:border-b-2 active:shadow-[0_2px_0_0_#040812]"
              }`}
            >
              <Sparkles className={`w-6 h-6 shrink-0 transition-transform ${dashboardMode === "LATEST_JUNE_JULY_AUDIT" ? "text-amber-200 scale-110" : "text-amber-400 group-hover:scale-110"}`} />
              <div className="flex flex-col items-center text-center leading-snug">
                <span className="whitespace-nowrap font-black">🌟 วิเคราะห์ล่าสุด ก.ย. 69</span>
                <span className="text-[11px] sm:text-[13px] font-extrabold opacity-90 mt-0.5 whitespace-nowrap tracking-tight">(Latest September Audit)</span>
              </div>
            </button>

            <button
              onClick={() => {
                setDashboardMode("MOPH_DIAGNOSTICS");
              }}
              className={`group flex items-center justify-center gap-1 py-3.5 px-1 rounded-xl text-sm sm:text-base font-black transition-all duration-200 cursor-pointer ${
                dashboardMode === "MOPH_DIAGNOSTICS"
                  ? "bg-gradient-to-b from-teal-500 to-teal-700 text-white border-t border-x border-teal-300 border-b-4 border-teal-900 shadow-[0_0_20px_rgba(20,184,166,0.5),_0_4px_0_0_#115e59] active:translate-y-[2px] active:border-b-2 active:shadow-[0_0_10px_rgba(20,184,166,0.5),_0_2px_0_0_#115e59]"
                  : "bg-gradient-to-b from-[#182a4d] to-[#0f1b33] text-teal-300 border-t border-x border-[#2b4a85] border-b-4 border-[#070d1a] shadow-[0_4px_0_0_#040812] hover:from-[#1e345e] hover:to-[#12213d] hover:text-teal-100 hover:shadow-[0_0_15px_rgba(45,212,191,0.3),_0_4px_0_0_#040812] active:translate-y-[2px] active:border-b-2 active:shadow-[0_2px_0_0_#040812]"
              }`}
            >
              <Activity className={`w-6 h-6 shrink-0 transition-transform ${dashboardMode === "MOPH_DIAGNOSTICS" ? "text-teal-100 scale-110" : "text-teal-400 group-hover:scale-110"}`} />
              <div className="flex flex-col items-center text-center leading-snug">
                <span className="whitespace-nowrap font-black">🎯 ประเมินประสิทธิภาพคลัง</span>
                <span className="text-[11px] sm:text-[13px] font-extrabold opacity-90 mt-0.5 whitespace-nowrap tracking-tight">(MOPH Speedometer Dials)</span>
              </div>
            </button>

            <button
              onClick={() => {
                setDashboardMode("AR_AUDIT");
              }}
              className={`group flex items-center justify-center gap-1 py-3.5 px-1 rounded-xl text-sm sm:text-base font-black transition-all duration-200 cursor-pointer ${
                dashboardMode === "AR_AUDIT"
                  ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white border-t border-x border-blue-300 border-b-4 border-blue-900 shadow-[0_0_20px_rgba(59,130,246,0.5),_0_4px_0_0_#1e3a8a] active:translate-y-[2px] active:border-b-2 active:shadow-[0_0_10px_rgba(59,130,246,0.5),_0_2px_0_0_#1e3a8a]"
                  : "bg-gradient-to-b from-[#182a4d] to-[#0f1b33] text-sky-300 border-t border-x border-[#2b4a85] border-b-4 border-[#070d1a] shadow-[0_4px_0_0_#040812] hover:from-[#1e345e] hover:to-[#12213d] hover:text-sky-100 hover:shadow-[0_0_15px_rgba(56,189,248,0.3),_0_4px_0_0_#040812] active:translate-y-[2px] active:border-b-2 active:shadow-[0_2px_0_0_#040812]"
              }`}
            >
              <Building2 className={`w-6 h-6 shrink-0 transition-transform ${dashboardMode === "AR_AUDIT" ? "text-sky-100 scale-110" : "text-sky-400 group-hover:scale-110"}`} />
              <div className="flex flex-col items-center text-center leading-snug">
                <span className="whitespace-nowrap font-black">🗂️ เฝ้าระวังลูกหนี้</span>
                <span className="text-[11px] sm:text-[13px] font-extrabold opacity-90 mt-0.5 whitespace-nowrap tracking-tight">(AR Audit Monitor)</span>
              </div>
            </button>

            <button
              onClick={() => {
                setDashboardMode("MOPH_OFFICIAL_RESULTS");
              }}
              className={`group flex items-center justify-center gap-1 py-3.5 px-1 rounded-xl text-sm sm:text-base font-black transition-all duration-200 cursor-pointer ${
                dashboardMode === "MOPH_OFFICIAL_RESULTS"
                  ? "bg-gradient-to-b from-purple-500 to-purple-700 text-white border-t border-x border-purple-300 border-b-4 border-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.5),_0_4px_0_0_#581c87] active:translate-y-[2px] active:border-b-2 active:shadow-[0_0_10px_rgba(168,85,247,0.5),_0_2px_0_0_#581c87]"
                  : "bg-gradient-to-b from-[#182a4d] to-[#0f1b33] text-purple-300 border-t border-x border-[#2b4a85] border-b-4 border-[#070d1a] shadow-[0_4px_0_0_#040812] hover:from-[#1e345e] hover:to-[#12213d] hover:text-purple-100 hover:shadow-[0_0_15px_rgba(192,132,252,0.3),_0_4px_0_0_#040812] active:translate-y-[2px] active:border-b-2 active:shadow-[0_2px_0_0_#040812]"
              }`}
            >
              <Award className={`w-6 h-6 shrink-0 transition-transform ${dashboardMode === "MOPH_OFFICIAL_RESULTS" ? "text-amber-200 scale-110" : "text-amber-400 group-hover:scale-110"}`} />
              <div className="flex flex-col items-center text-center leading-snug">
                <span className="whitespace-nowrap font-black">📊 ผลประเมิน 20 ตัวชี้วัด</span>
                <span className="text-[11px] sm:text-[13px] font-extrabold opacity-90 mt-0.5 whitespace-nowrap tracking-tight">(Official Scores)</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                setDashboardMode("FINANCIAL_TRENDS");
              }}
              className={`group flex items-center justify-center gap-1 py-3.5 px-1 rounded-xl text-sm sm:text-base font-black transition-all duration-200 cursor-pointer ${
                dashboardMode === "FINANCIAL_TRENDS"
                  ? "bg-gradient-to-b from-amber-400 to-amber-600 text-slate-900 border-t border-x border-amber-200 border-b-4 border-amber-800 shadow-[0_0_20px_rgba(245,158,11,0.5),_0_4px_0_0_#92400e] active:translate-y-[2px] active:border-b-2 active:shadow-[0_0_10px_rgba(245,158,11,0.5),_0_2px_0_0_#92400e]"
                  : "bg-gradient-to-b from-[#182a4d] to-[#0f1b33] text-amber-400 border-t border-x border-[#2b4a85] border-b-4 border-[#070d1a] shadow-[0_4px_0_0_#040812] hover:from-[#1e345e] hover:to-[#12213d] hover:text-amber-200 hover:shadow-[0_0_15px_rgba(251,191,36,0.3),_0_4px_0_0_#040812] active:translate-y-[2px] active:border-b-2 active:shadow-[0_2px_0_0_#040812]"
              }`}
            >
              <TrendingDown className={`w-6 h-6 shrink-0 transition-transform ${dashboardMode === "FINANCIAL_TRENDS" ? "text-slate-900 scale-110" : "text-amber-500 group-hover:scale-110"}`} />
              <div className="flex flex-col items-center text-center leading-snug">
                <span className="whitespace-nowrap font-black">📈 เทรนด์เงินบำรุง/หนี้สิน</span>
                <span className="text-[11px] sm:text-[13px] font-extrabold opacity-90 mt-0.5 whitespace-nowrap tracking-tight">(Quarterly Trends)</span>
              </div>
            </button>
          </div>
        </div>

        {/* High-Attraction Sparkles AI Advisory / Executive Search Area */}
        <div className="bg-[#0b1324] rounded-2xl border border-emerald-500/35 p-5 shadow-2xl relative overflow-hidden" id="global-ai-inquiry-bar">
          {/* Subtle gradient background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            
            {/* Header info row with badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  MOPH Intelligent Dola AI Co-Pilot Advisor
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Powered by Dola AI Cognitive Suite</span>
            </div>

            {/* Input Row & Wording matching user requests */}
            <div className="flex flex-col lg:flex-row items-stretch gap-3">
              
              {/* Pulsating Highly Attractive Accent Wording Button/Badge with 3D text (now flat, bold only) */}
              <button
                onClick={() => {
                  const inputEl = document.getElementById('global-ai-input');
                  if (inputEl) inputEl.focus();
                  if (globalQuery.trim()) {
                    handleAskGlobalAI();
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 transform active:scale-98 cursor-pointer whitespace-nowrap shrink-0 group relative overflow-hidden"
                style={{ cursor: 'pointer' }}
                title="คลิกเพื่อส่งคำสั่งหรือเริ่มพิมพ์สืบค้นข้อมูลเชิงโครงสร้างประสิทธิผล"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-3d-emerald text-sm sm:text-base font-black tracking-wide uppercase">ค้นหาสิ่งที่ท่านอยากรู้</span>
              </button>

              {/* Dynamic search input field */}
              <div className="flex-1 relative flex items-center">
                <input
                  id="global-ai-input"
                  type="text"
                  value={globalQuery}
                  onChange={(e) => setGlobalQuery(e.target.value)}
                  placeholder="พิมพ์โจทย์ด่วนให้ Dola AI ร่างสรุป เช่น 'เขียนร่างสไลด์นำเสนอข้อผิดพลาดสะสม รพ.ปราณบุรี'..."
                  disabled={globalLoading}
                  className="w-full bg-[#050a14] border border-[#1e3052] focus:border-emerald-500 rounded-xl px-5 py-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAskGlobalAI();
                  }}
                />
                
                {globalQuery && (
                  <button 
                    onClick={() => setGlobalQuery("")} 
                    className="absolute right-4 text-xs text-slate-500 hover:text-slate-300 font-bold"
                    type="button"
                  >
                    ล้างค่า
                  </button>
                )}
              </div>

              {/* Quick Process Wording green button with 3D text styles */}
              <button
                onClick={() => handleAskGlobalAI()}
                disabled={globalLoading || !globalQuery.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl px-7 py-3.5 text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                {globalLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-3d-emerald tracking-wide">ประมวลผลด่วน</span>
                    <Send className="w-4 h-4 text-emerald-200" />
                  </div>
                )}
              </button>

            </div>



          </div>

          {/* AI Result panel with smooth output presentation */}
          {(globalLoading || globalResponse) && (
            <div className="mt-4 p-5 bg-white rounded-xl border border-emerald-200/80 space-y-3 relative shadow-lg text-slate-800 animate-fadeIn" id="global-ai-response">
              <div className="flex items-center justify-between border-b border-slate-200/85 pb-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700 font-black">
                  <Cpu className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>ผลลัพธ์คำสืบค้นวิเคราะห์เชิงลึกโดย Dola AI Co-Pilot:</span>
                </div>
                
                <button
                  onClick={() => {
                    setGlobalResponse(null);
                    setGlobalQuery("");
                  }}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold transition cursor-pointer"
                  title="ปิดกล่องแนะนำ"
                >
                  ปิดหน้าต่างนี้ [X]
                </button>
              </div>

              {globalLoading ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-600">
                  <RefreshCw className="w-7 h-7 text-emerald-600 animate-spin" />
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-black text-slate-800">Dola AI กำลังรวบรวมข้อมูลบัญชีแยกประเภทและงบตรวจสอบเพื่อจัดทำสารสรุป...</p>
                    <p className="text-[11px] text-slate-500">กรุณารอสักครู่ (ใช้โมเดลความเร็วสูง Dola AI)</p>
                  </div>
                </div>
              ) : (
                <div className="text-[16px] text-black leading-relaxed font-sans whitespace-pre-line space-y-3 p-1.5 select-text">
                  <div className="text-[16px] text-black font-medium leading-relaxed font-sans">
                    {globalResponse}
                  </div>
                  
                  <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-emerald-700 font-extrabold bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      เอกสารนำเสนอคณะกรรมาธิการตรวจสอบงบ จังหวัดประจวบคีรีขันธ์
                    </span>
                    <div className="flex flex-wrap items-center gap-4.5 shrink-0">
                      <button 
                        onClick={() => {
                          if (globalResponse) {
                            navigator.clipboard.writeText(globalResponse);
                          }
                        }}
                        className="text-emerald-700 hover:underline hover:text-emerald-800 font-black cursor-pointer text-xs"
                      >
                        📋 คัดลอกรายงานเพื่อนำเสนอ
                      </button>
                      <span className="text-slate-300 hidden sm:inline">|</span>
                      <button 
                        onClick={() => {
                          if (globalResponse) {
                            exportAiSummaryToImage(globalResponse, globalQuery);
                          }
                        }}
                        className="bg-gradient-to-b from-sky-500 to-sky-600 text-white border-t border-x border-sky-400 border-b-2 border-sky-800 shadow-sm hover:brightness-105 px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                      >
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>ส่งออกภาพ</span>
                      </button>
                      <span className="text-slate-300 hidden sm:inline">|</span>
                      <button 
                        onClick={() => {
                          if (globalResponse) {
                            exportAiSummaryToPdf(globalResponse, globalQuery);
                          }
                        }}
                        className="bg-gradient-to-b from-rose-500 to-rose-600 text-white border-t border-x border-rose-400 border-b-2 border-rose-800 shadow-sm hover:brightness-105 px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                      >
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>ส่งออก PDF</span>
                      </button>
                      <span className="text-slate-300 hidden sm:inline">|</span>
                      <button 
                        onClick={() => {
                          setGlobalResponse(null);
                          setGlobalQuery("");
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 shadow-sm px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                        title="ปิดหน้าต่างแสดงผลลัพธ์การแนะนำข้อมูล Dola AI"
                      >
                        <span>ปิดหน้าต่างนี้ [X]</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Content routing based on selected mode */}
        {dashboardMode === "LATEST_JUNE_JULY_AUDIT" ? (
          <LatestJuneJulyAuditDashboard />
        ) : dashboardMode === "MOPH_OFFICIAL_RESULTS" ? (
          <OfficialMophScoringPanel />
        ) : dashboardMode === "MOPH_DIAGNOSTICS" ? (
          <MophDiagnosticsDashboard />
        ) : dashboardMode === "AR_AUDIT" ? (
          <>
            {/* Dynamic Executive Intro Header & Month Selectors with tighter padding */}
            <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 shadow-lg" id="welcome-sub-header">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-black text-white text-base sm:text-lg">
                  {greeting.icon}
                  <span className="tracking-tight text-white font-extrabold">{greeting.text} 🇹🇭</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-semibold">
                  ยินดีต้อนรับสู่ระบบเฝ้าระวังลูกหนี้ค่ารักษาพยาบาล (AR Balance) จังหวัดประจวบคีรีขันธ์ เสนอข้อมูลยอดบัญชีแยกประเภทลูกหนี้ตามงบตรวจสอบ (GL) คู่ขนานไปกับยอดรับชำระประกันภัยแห่งรัฐ และรายงาน GFMIS วิเคราะห์รายโรงพยาบาลครบทั้ง 8 แห่ง <span className="text-sky-400">({currentReport.monthName})</span>
                </p>
              </div>
            </div>

            {/* Dynamic Navigation Row matching the user screenshot perfectly (3D sleek functional nav pills) */}
            <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-2.5 shadow-md animate-fadeIn" id="sub-menubar">
              <div className="overflow-x-auto w-full flex items-center gap-4 scrollbar-thin scrollbar-thumb-slate-800">
                <div className="flex items-center gap-2 text-xs font-black text-slate-405 whitespace-nowrap shrink-0 border-r border-[#1e2f4f] pr-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/30 animate-pulse"></span>
                  <span className="text-slate-300 font-extrabold text-xs">ฟิลเตอร์ติดตาม:</span>
                </div>
                
                <button 
                  onClick={() => setActiveTab("ALL")}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                    activeTab === "ALL" 
                      ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white border-t border-x border-blue-400 border-b-4 border-blue-850 shadow-[0_3px_0_0_#1e3a8a] active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#1e3a8a]" 
                      : "bg-[#111c35]/40 text-slate-300 border border-[#1e2f4f]/55 hover:text-white"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeTab === "ALL" ? "bg-[#38bdf8] shadow-sm shadow-[#38bdf8]" : "bg-slate-500"}`}></span>
                  <span>ภาพรวมลูกหนี้</span>
                </button>

                <button 
                  onClick={() => setActiveTab("GOV")}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                    activeTab === "GOV" 
                      ? "bg-gradient-to-b from-amber-500 to-amber-600 text-slate-900 border-t border-x border-amber-400 border-b-4 border-amber-800 shadow-[0_3px_0_0_#78350f] active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#78350f]" 
                      : "bg-[#111c35]/40 text-slate-300 border border-[#1e2f4f]/55 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 shadow-sm shadow-orange-500/30"></span>
                  <span>ลูกหนี้ภาครัฐ</span>
                </button>

                <button 
                  onClick={() => setActiveTab("EXT")}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                    activeTab === "EXT" 
                      ? "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-t border-x border-emerald-400 border-b-4 border-emerald-800 shadow-[0_3px_0_0_#065f46] active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#065f46]" 
                      : "bg-[#111c35]/40 text-slate-300 border border-[#1e2f4f]/55 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/30"></span>
                  <span>บุคคลภายนอก</span>
                </button>

                <button 
                  onClick={() => {
                    setActiveTab("RISK");
                    setTimeout(() => {
                      window.document.getElementById('discrepancy-spotlight')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                    activeTab === "RISK" 
                      ? "bg-gradient-to-b from-rose-500 to-rose-600 text-white border-t border-x border-rose-450 border-b-4 border-rose-805 shadow-[0_3px_0_0_#991b1b] active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#991b1b]" 
                      : "bg-[#111c35]/40 text-slate-300 border border-[#1e2f4f]/55 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/30"></span>
                  <span>ปัจจัยเสี่ยง</span>
                </button>

                <button 
                  onClick={() => setActiveTab("ALERT")}
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                    activeTab === "ALERT" 
                      ? "bg-gradient-to-b from-red-650 to-red-700 text-white border-t border-x border-red-500 border-b-4 border-red-900 shadow-[0_3px_0_0_#7f1d1d] active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#7f1d1d]" 
                      : "bg-red-950/20 text-red-400 border border-red-900/40 hover:text-rose-350"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-sm shadow-red-400/35"></span>
                  <span>แจ้งเตือนเร่งด่วน</span>
                </button>

                <button 
                  onClick={() => {
                    window.document.getElementById('scenario-simulator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer whitespace-nowrap shrink-0 px-2.5 py-1.5 rounded-full hover:bg-slate-800/25"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>สนับสนุนนโยบาย</span>
                </button>

                <button 
                  onClick={() => {
                    window.document.getElementById('charts-main-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer whitespace-nowrap shrink-0 px-2.5 py-1.5 rounded-full hover:bg-slate-800/25"
                >
                  <TrendingDown className="w-3.5 h-3.5 text-sky-400" />
                  <span>รายประเภท (รายรพ.)</span>
                </button>

                <button 
                  onClick={() => setActiveTab("GFMIS")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-200 ${
                    activeTab === "GFMIS" 
                      ? "bg-yellow-950/45 text-yellow-400 border border-yellow-500/35 shadow-inner" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800/25"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <span>งบทดลอง GFMIS</span>
                </button>
              </div>
            </div>

            {/* Primary Data Display component */}
            <div className="space-y-6" id="app-workspace-flow">
              
              {/* Section 1: Core Financial Grid & Hospital Records Table */}
              <ExecutiveARSummary 
                currentReport={currentReport} 
                selectedHospital={selectedHospital}
                setSelectedHospital={setSelectedHospital}
                scenariosMultiplier={scenariosMultiplier}
                activeTab={activeTab}
              />

              {/* Aging Report Section */}
              <AgingReportPanel currentReport={currentReport} />

              {/* Section 2: Specialty Anomaly spotlight on Pranburi and scenario simulator */}
              <DiscrepancySpotlight 
                scenarios={scenarios}
                onToggleScenario={handleToggleScenario}
                scenariosMultiplier={scenariosMultiplier}
              />

              {/* Section 3: Recharts Graphical Insights Panel */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-1 px-3 bg-indigo-500/10 text-indigo-400 font-extrabold rounded-lg text-sm border border-indigo-500/20">
                    กราฟนำเสนอเชิงประจักษ์
                  </span>
                  <h2 className="text-lg font-extrabold text-[#ffffff] tracking-tight">
                    บทวิเคราะห์ความคลาดเคลื่อนและสถิติสินทรัพย์จังหวัดประจวบคีรีขันธ์
                  </h2>
                </div>
                <AuditChartsPanel 
                  allReports={monthlyReports} 
                  selectedMonthId={selectedMonthId} 
                />
              </div>

              {/* Section 4: Dola AI Audit AI Panel chatbot briefing generator */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-1 px-3 bg-amber-500/10 text-amber-400 font-extrabold rounded-lg text-sm border border-amber-500/20">
                    ปัญญาประดิษฐ์ สสจ. Co-Pilot
                  </span>
                  <h2 className="text-lg font-extrabold text-[#ffffff] tracking-tight">
                    ผู้ช่วยวิเคราะห์ความเสี่ยงและร่างเอกสารนำเสนอคณะปันส่วน <span className="text-amber-400">({currentReport.monthName})</span>
                  </h2>
                </div>
                <AuditAIPanel 
                  currentReport={currentReport}
                  selectedHospital={selectedHospital}
                />
              </div>

            </div>
          </>
        ) : (
          /* New Replicated Quarterly Financial & Working Cash Trends Dashboard */
          <div className="space-y-4" id="quarterly-dashboard-container">
            <div className="bg-[#0b1324] rounded-3xl border border-[#1b2a47] p-6 shadow-md" id="trends-welcome-header">
              <h2 className="text-xl font-extrabold text-[#ffffff] tracking-tight flex items-center gap-2">
                <span className="text-amber-400">📈</span>
                วิเคราะห์แนวโน้มเงินบำรุงและกระแสรายไตรมาส (Working Cash & Liabilities Trend Analytics)
              </h2>
              <p className="text-xs sm:text-sm text-slate-350 mt-1">
                รายงานแนวโน้มสุขภาพทางการเงินของหน่วยบริการสาธารณสุขทั้ง 8 แห่งในจังหวัดประจวบคีรีขันธ์ ติดตามสัดส่วนกระแสเงินสด ลูกหนี้ สินค้าคงคลัง และความปลอดภัยงบประมาณสะสม (เงินบำรุงที่หักหนี้แล้วจำลองแกนศูนย์)
              </p>
            </div>
            
            <FinancialTrendsDashboard />
          </div>
        )}

      </main>

      {/* Standard Footnote */}
      <footer className="bg-[#0b1324] border-t border-[#1b2a47] mt-16 py-10" id="footer-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400 space-y-2">
          <p className="font-medium text-slate-400 text-xs tracking-wide">ADMIN:Sutthirat Sutthisumdaeng : Health Insurance Group, Prachuap Khiri Khan Provincial Public Health Office</p>
          <p className="font-extrabold text-slate-300 text-sm">© 2026 กลุ่มงานประกันสุขภาพ <span className="text-slate-500 font-normal ml-2">| Since 05/05/2026</span></p>
          <p className="text-xs text-slate-500">ระบบบูรณาการข้อสั่งการผู้ตรวจสอบบัญชีและปัญญาประดิษฐ์เพื่อยกระดับความโปร่งใสทางการคลัง สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์</p>
        </div>
      </footer>
    </div>
  );
}
