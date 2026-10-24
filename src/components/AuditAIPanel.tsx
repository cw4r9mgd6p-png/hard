import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { MonthlyAuditReport } from '../types';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Cpu, 
  RefreshCw,
  TrendingDown,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface AuditAIPanelProps {
  currentReport: MonthlyAuditReport;
  selectedHospital: string;
}

export function AuditAIPanel({ currentReport, selectedHospital }: AuditAIPanelProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Render AI Summary to premium PDF with standard signatures
  const exportAiSummaryToPdf = (textToExport: string, queryUsed: string) => {
    try {
      if (!textToExport) return;
      
      const printTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const printDate = `${new Date().toLocaleDateString('th-TH')} เวลา ${printTime} น.`;

      // Split the text into wrapped lines for portrait 1000px wide
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
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
      if (!ctx) return;

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
      ctx.font = "bold 20px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("รายงานวิเคราะห์สรุป Dola AI Co-Pilot สำหรับผู้บริหารสาธารณสุข", 50, 55);
      
      ctx.fillStyle = "#a7f3d0";
      ctx.font = "13px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์ • กลุ่มงานประกันสุขภาพ (MOPH AI Advisor System)", 50, 85);
      ctx.fillText(`สืบค้นและประมวลผลข้อมูล ณ วันพิมพ์: ${printDate}`, 50, 108);

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

      // Save PDF
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const a4Width = 210;
      const a4Height = (canvasHeight / canvasWidth) * a4Width;
      
      if (a4Height <= 297) {
        pdf.addImage(imgData, "JPEG", 0, 0, a4Width, a4Height);
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0, a4Width, 297);
      }

      pdf.save(`AI_Audit_Summary_${new Date().toISOString().substring(0, 10)}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };

  // Predefined prompts suitable for board presentation
  const suggestedQueries = [
    {
      label: "📌 ร่างบันทึกสรุปเสนอผู้บริหารระดับจังหวัด",
      text: "เขียนร่างสารสรุปข้อความเพื่อนำเสนอคณะกรรมการจัดทำงบจังหวัดประจวบคีรีขันธ์ เกี่ยวกับภาพรวมลูกหนี้ค่ารักษาและมาตรการตรวจสอบด่วน ณ ปัจจุบัน"
    },
    {
      label: "🔍 เจาะลึกรอยต่อความต่าง รพ.ปราณบุรี",
      text: "เจาะลึกวิเคราะห์เชิงบัญชีทำไมยอด GL ของ รพ.ปราณบุรี ถึงมีความไม่คู่ขนานกับรายงานฝ่ายประกันภัย ตลอดช่วง 4 เดือน ยอดสวิงมีสาเหตุหลักจากอะไร?"
    },
    {
      label: "💡 มาตรการลดส่วนคลาดเคลื่อนเร่งด่วน",
      text: "แนะนำแผนปฏิบัติการ 3 ขั้นตอนสำหรับ สสจ. ในฐานะผู้กำกับดูแล เพื่อลดความคลาดเคลื่อนทางบัญชีลูกหนี้คงค้างให้เข้าใกล้ศูนย์ในไตรมาสถัดไป"
    }
  ];

  const handleAskAI = async (textToSend: string) => {
    const activeQuery = textToSend || query;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setAiResponse(null);

    // Prepare total aggregate stats for specific context
    const totalGovGL = currentReport.data.reduce((sum, h) => sum + h.govGL, 0);
    const totalGovIns = currentReport.data.reduce((sum, h) => sum + h.govInsurance, 0);
    const govDiff = totalGovGL - totalGovIns;

    const totalExtGL = currentReport.data.reduce((sum, h) => sum + h.extGL, 0);
    const totalExtIns = currentReport.data.reduce((sum, h) => sum + h.extInsurance, 0);
    const extDiff = totalExtGL - totalExtIns;

    const grandTotalAR = totalGovGL + totalExtGL;

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: currentReport.monthName,
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
          query: activeQuery
        })
      });

      const data = await response.json();
      setAiResponse(data.advice);
    } catch (error) {
      console.error("AI fetch failure:", error);
      setAiResponse(`❌ เกิดข้อผิดพลาดเชื่อมต่ออินเทอร์เน็ตหรือไม่ได้เปิดใช้งานคีย์ความปลอดภัย\n\n**บทรายงานจำลองสรุปทางการเงิน (Offline Co-Pilot Insight):**\nจากแนวโน้มข้อมูลสะสม บัญชีพักเคลมสิทธิ์รักษาพยาบาล (E-Claim) ของ รพ.ปราณบุรี มีความเห็นต่างขั้วสูงเป็นพิเศษตั้งแต่วันที่ 25 พฤศจิกายน 2568 โดยยอดแยกประเภท GL รับรู้รายหนี้ล่วงหน้า แต่ฝั่งตอบรับเคลมล้างระบบติดสถานะรอยืนยันสิทธิตามไตรมาส จึงขอเสนอเสนอให้ตั้งคณะทำงานจัดคู่หนี้ร่วมแก้ไขส่วนต่างรายไตรมาสให้เป็นมาตรฐานเดียวกัน`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-6 lg:p-8 shadow-xl text-slate-100 space-y-6" id="audit-ai-panel">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Dola AI Executive Advisory Suite</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            ปัญญาประดิษฐ์ประมวลผลดุลบัญชี (Ministry Auditing Co-Pilot)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ระบุความเสี่ยง คาดการณ์มูลสินส่วนต่าง และเรียบเรียงร่างเอกสารรายงานคณะผู้บริหารเพื่อตัดยอดคลังจังหวัด
          </p>
        </div>
        <div className="self-start sm:self-center px-2 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-[11px] text-emerald-400 font-extrabold flex items-center gap-2 select-none">
          <Cpu className="w-4 h-4" />
          <span>Dola AI Cognitive Portal</span>
        </div>
      </div>

      {/* Suggested Template Queries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="ai-templates">
        {suggestedQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(q.text);
              handleAskAI(q.text);
            }}
            disabled={loading}
            className="text-left p-4.5 bg-[#060b13] hover:bg-[#10192e] border border-[#1e2f4f] hover:border-emerald-500/50 rounded-xl transition duration-200 cursor-pointer disabled:opacity-50 space-y-2"
          >
            <span className="font-extrabold text-[#f1f5f9] text-xs block">{q.label}</span>
            <span className="text-xs text-slate-400 leading-relaxed block line-clamp-1.5">{q.text}</span>
          </button>
        ))}
      </div>

      {/* Primary Input */}
      <div className="space-y-2.5" id="ai-chat-input">
        <div className="flex flex-col sm:flex-row gap-1.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="พิมพ์โจทย์ด่วนให้ Dola AI ร่างสรุป เช่น 'เขียนร่างสไลด์นำเสนอข้อผิดพลาดสะสม รพ.ปราณบุรี'..."
            disabled={loading}
            className="flex-1 bg-[#060b13] border border-[#1e2f4f] rounded-xl px-5 py-2.5 text-xs outline-none focus:border-emerald-500 text-slate-100 placeholder:text-slate-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskAI("");
            }}
          />
          <button
            onClick={() => handleAskAI("")}
            disabled={loading || !query.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl px-6 py-2.5 text-xs font-black transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-40"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>ประมวลผลด่วน</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Output Result Section */}
      {(loading || aiResponse) && (
        <div className="mt-5 p-5 lg:p-6 bg-white rounded-xl border border-emerald-200/80 space-y-4 shadow-lg text-slate-800 animate-fadeIn" id="ai-response-display">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-black">
              <Cpu className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span>ผลการวิเคราะห์สืบค้นโดย Dola AI Co-Pilot ปลดล็อคคลังจังหวัด:</span>
            </div>
            <button
              onClick={() => {
                setAiResponse(null);
                setQuery("");
              }}
              className="text-slate-400 hover:text-slate-700 text-[11px] font-bold transition cursor-pointer"
              title="ปิดกล่องแนะนำ"
            >
              ปิดหน้าต่างนี้ [X]
            </button>
          </div>

          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-1.5 text-slate-650">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
              <div className="text-center space-y-1.5 animate-pulse">
                <p className="text-xs font-black text-slate-800">กำลังคำนวณและประมวลผลข้อสั่งการลูกหนี้สะสมจังหวัด...</p>
                <p className="text-[11px] text-slate-500">จับคู่รายงานกระทรวง GL, GFMIS คู่ต่างขั้วเชิงสถิติสำเร็จรูป</p>
              </div>
            </div>
          ) : (
            <div className="text-[16px] text-black leading-relaxed font-sans whitespace-pre-line space-y-3 p-1.5 select-text">
              <div className="text-[16px] text-black font-medium leading-relaxed font-sans">
                {aiResponse}
              </div>
              
              <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-emerald-700 font-extrabold bg-emerald-50/50 p-1.5 rounded-lg border border-emerald-100 border-dashed">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>รายงานอ้างอิงและจำลองกฎระเบียบงบแสดงสถานะทางการคลัง จังหวัดประจวบคีรีขันธ์ ปีงบประมาณ 2568-2569</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 py-1">
                  <button 
                    onClick={() => {
                      if (aiResponse) {
                        navigator.clipboard.writeText(aiResponse);
                      }
                    }}
                    className="text-emerald-700 hover:underline hover:text-emerald-800 font-extrabold cursor-pointer text-[12.5px] "
                  >
                    📋 คัดลอกรายงาน
                  </button>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <button 
                    onClick={() => {
                      if (aiResponse) {
                        exportAiSummaryToPdf(aiResponse, query);
                      }
                    }}
                    className="bg-gradient-to-b from-rose-500 to-rose-600 text-white border-t border-x border-rose-400 border-b-2 border-rose-800 shadow-sm hover:brightness-105 px-1.5 py-1.5 rounded-lg text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5 text-white" />
                    <span>ส่งออก PDF</span>
                  </button>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <button 
                    onClick={() => {
                      setAiResponse(null);
                      setQuery("");
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 shadow-sm px-1.5 py-1.5 rounded-lg text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
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
  );
}
