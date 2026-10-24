import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { 
  Building2, CheckCircle2, XCircle, CheckSquare, Layers, Calendar, 
  TrendingUp, TrendingDown, DollarSign, Activity, AlertTriangle, 
  BarChart3, PieChart, ChevronDown, FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ComposedChart, Area
} from 'recharts';
import { richMophData, RichMophOfficialData } from '../data/official_moph_generator';

export function OfficialMophScoringPanel() {
  const quartersList = Array.from(new Set(richMophData.map(d => d.quarter))).sort((a, b) => b.localeCompare(a));
  const hospitalsList = Array.from(new Set(richMophData.map(d => d.id))).sort();
  
  const [activeView, setActiveView] = useState<"OVERVIEW" | "HOSPITAL_DETAILS">("OVERVIEW");
  const [selectedQuarter, setSelectedQuarter] = useState<string>(quartersList[0]);
  const [selectedHospital, setSelectedHospital] = useState<string>("10737");

  // Format currency
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case "A": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
      case "B": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "C": return "text-amber-400 bg-amber-400/10 border-amber-400/30";
      case "D": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      default: return "text-rose-400 bg-rose-400/10 border-rose-400/30";
    }
  };

  const getRiskColor = (risk: number) => {
    switch(risk) {
      case 0: return "text-emerald-400";
      case 1: return "text-amber-400";
      case 2: return "text-orange-500";
      case 3: return "text-rose-500";
      default: return "text-slate-400";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "ผ่าน" || status === "ไม่เกินHGR" || status === "ไม่เกิน 80%") {
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    } else {
      return <XCircle className="w-4 h-4 text-rose-500" />;
    }
  };

  // 1. Overview Data
  const overviewData = useMemo(() => {
    return richMophData.filter(d => d.quarter === selectedQuarter);
  }, [selectedQuarter]);

  const overviewSummary = useMemo(() => {
    const totalRev = overviewData.reduce((acc, curr) => acc + curr.totalRevenue, 0);
    const totalExp = overviewData.reduce((acc, curr) => acc + curr.totalExpense, 0);
    const totalNi = overviewData.reduce((acc, curr) => acc + curr.netIncome, 0);
    const totalEbitda = overviewData.reduce((acc, curr) => acc + curr.ebitda, 0);
    return { totalRev, totalExp, totalNi, totalEbitda };
  }, [overviewData]);

  // 2. Hospital Details Data (Trend)
  const hospitalTrendData = useMemo(() => {
    return richMophData
      .filter(d => d.id === selectedHospital)
      .sort((a, b) => a.quarter.localeCompare(b.quarter));
  }, [selectedHospital]);

  const currentHospitalData = useMemo(() => {
    return richMophData.find(d => d.id === selectedHospital && d.quarter === selectedQuarter);
  }, [selectedHospital, selectedQuarter]);

  // Handle Export PDF Report
  const handleExportPdf = () => {
    try {
      const printTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const printDate = `${new Date().toLocaleDateString('th-TH')} เวลา ${printTime} น.`;
      const quarterLabel = selectedQuarter === '2569Q4'
        ? 'ไตรมาส 4/2569 (ณ ก.ค. 69)'
        : `ไตรมาส ${selectedQuarter.substring(5)}/${selectedQuarter.substring(0,4)}`;

      // High-DPI canvas layout spanning A4 aspect ratio: 1000px width x 1414px height
      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 1414;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not initialize canvas 2D context");

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1000, 1414);

      // Top MOPH Header Bands
      ctx.fillStyle = "#0c4a34"; // MOPH Deep Green
      ctx.fillRect(0, 0, 1000, 44);
      ctx.fillStyle = "#10b981"; // Emerald accent ribbon
      ctx.fillRect(0, 44, 1000, 6);

      // Title & Header Text
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 20px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("รายงานสรุปผลการประเมิน 20 ตัวชี้วัดทางการเงินและการบริหาร (MOPH Official Data)", 50, 90);

      ctx.fillStyle = "#4b5563";
      ctx.font = "13px 'Inter', 'Sarabun', 'Tahoma', 'sans-serif'";
      ctx.fillText("กลุ่มงานประกันสุขภาพ สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์", 50, 115);

      ctx.textAlign = "right";
      ctx.fillText(`รอบการประเมิน: ${quarterLabel}`, 950, 90);
      ctx.fillText(`(พิมพ์เมื่อ: ${printDate})`, 950, 115);
      ctx.textAlign = "left";

      // Divider line
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(50, 130);
      ctx.lineTo(950, 130);
      ctx.stroke();

      if (activeView === "OVERVIEW") {
        // --- OVERVIEW REPORT ---
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 16px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText("ภาพรวมการประเมินประสิทธิภาพทางการเงิน (ทั้ง 8 โรงพยาบาล)", 50, 160);

        // 4 Summary Metric Boxes
        const totalNetIncome = overviewData.reduce((acc, curr) => acc + curr.netIncome, 0);
        const avgScore = (overviewData.reduce((acc, curr) => acc + curr.totalScore, 0) / overviewData.length).toFixed(1);
        const highRiskCount = overviewData.filter(d => d.risk >= 1).length;

        const metrics = [
          { label: "จำนวนหน่วยบริการ", val: `${overviewData.length} แห่ง`, color: "#0284c7" },
          { label: "คะแนนเฉลี่ยรวม", val: `${avgScore} / 15`, color: "#059669" },
          { label: "รายได้สุทธิรวมจังหวัด", val: formatMoney(totalNetIncome), color: totalNetIncome >= 0 ? "#059669" : "#dc2626" },
          { label: "เฝ้าระวัง/ความเสี่ยงสูง", val: `${highRiskCount} แห่ง`, color: highRiskCount > 0 ? "#d97706" : "#059669" }
        ];

        metrics.forEach((m, idx) => {
          const boxX = 50 + idx * 228;
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(boxX, 180, 216, 70);
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 1;
          ctx.strokeRect(boxX, 180, 216, 70);

          ctx.fillStyle = m.color;
          ctx.fillRect(boxX, 180, 5, 70);

          ctx.fillStyle = "#64748b";
          ctx.font = "11px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(m.label, boxX + 15, 202);

          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 15px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(m.val, boxX + 15, 232);
        });

        // Table Header Label
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 15px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText("ตารางเปรียบเทียบผลการประเมิน เกรด และระดับความเสี่ยง (Grades & Risk Summary)", 50, 285);

        // Draw Table Header
        const startY = 300;
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(50, startY, 900, 36);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText("หน่วยบริการ", 65, startY + 23);
        ctx.fillText("กลุ่ม", 260, startY + 23);
        ctx.fillText("เตียง", 335, startY + 23);
        ctx.fillText("กระบวนการ(10)", 395, startY + 23);
        ctx.fillText("ผลงาน(5)", 500, startY + 23);
        ctx.fillText("คะแนนรวม(15)", 575, startY + 23);
        ctx.fillText("งบทดลอง(160.5)", 670, startY + 23);
        ctx.fillText("เกรด", 800, startY + 23);
        ctx.fillText("Risk", 845, startY + 23);
        ctx.fillText("Net Income", 895, startY + 23);

        let rowY = startY + 36;
        overviewData.forEach((row, idx) => {
          ctx.fillStyle = idx % 2 === 0 ? "#ffffff" : "#f8fafc";
          ctx.fillRect(50, rowY, 900, 36);
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 1;
          ctx.strokeRect(50, rowY, 900, 36);

          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(row.name, 65, rowY + 22);

          ctx.font = "11px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillStyle = "#475569";
          ctx.fillText(row.group, 260, rowY + 22);
          ctx.fillText(String(row.beds), 335, rowY + 22);

          ctx.fillStyle = "#1e293b";
          ctx.fillText(row.processScore.toFixed(1), 420, rowY + 22);
          ctx.fillText(row.operationalScore.toFixed(1), 515, rowY + 22);

          ctx.fillStyle = "#0369a1";
          ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(row.totalScore.toFixed(1), 595, rowY + 22);

          ctx.fillStyle = "#4338ca";
          ctx.fillText(`${row.trialBalanceScore} (${((row.trialBalanceScore/160.5)*100).toFixed(1)}%)`, 670, rowY + 22);

          // Grade Badge
          ctx.fillStyle = row.grade === "A" ? "#059669" : row.grade === "B" ? "#2563eb" : row.grade === "C" ? "#d97706" : "#dc2626";
          ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(row.grade, 807, rowY + 22);

          ctx.fillStyle = row.risk === 0 ? "#059669" : row.risk === 1 ? "#d97706" : "#dc2626";
          ctx.fillText(`Risk ${row.risk}`, 845, rowY + 22);

          ctx.fillStyle = row.netIncome >= 0 ? "#059669" : "#dc2626";
          ctx.font = "bold 11px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(formatMoney(row.netIncome), 895, rowY + 22);

          rowY += 36;
        });

        // AR Fund Breakdown Summary Section
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 15px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText("สรุปมูลค่าลูกหนี้ค้างชำระ (AR) แยกตามกองทุนหลักในจังหวัด", 50, rowY + 35);

        const fundStartY = rowY + 50;
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(50, fundStartY, 900, 32);
        ctx.strokeStyle = "#cbd5e1";
        ctx.strokeRect(50, fundStartY, 900, 32);

        ctx.fillStyle = "#334155";
        ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText("กองทุน / สิทธิ์การรักษา", 65, fundStartY + 20);
        ctx.fillText("สัดส่วนประมาณการ", 350, fundStartY + 20);
        ctx.fillText("มูลค่าลูกหนี้รวม 8 รพ.", 650, fundStartY + 20);

        const totalArUc = overviewData.reduce((a, b) => a + b.arUcAmount, 0);
        const totalArCs = overviewData.reduce((a, b) => a + b.arCsAmount, 0);
        const totalArSss = overviewData.reduce((a, b) => a + b.arSssAmount, 0);
        const totalArOther = overviewData.reduce((a, b) => a + b.arOtherAmount, 0);
        const totalArAll = totalArUc + totalArCs + totalArSss + totalArOther;

        const fundsData = [
          { name: "1. บัตรทอง (UC - หลักประกันสุขภาพ)", ratio: "55%", val: totalArUc, color: "#059669" },
          { name: "2. ข้าราชการ/เบิกจ่ายตรง (CSMBS)", ratio: "20%", val: totalArCs, color: "#2563eb" },
          { name: "3. ประกันสังคม (SSS)", ratio: "15%", val: totalArSss, color: "#d97706" },
          { name: "4. ต่างด้าว / แรงงานต่างด้าว / หนี้อื่นๆ", ratio: "10%", val: totalArOther, color: "#7c3aed" },
        ];

        let fY = fundStartY + 32;
        fundsData.forEach(f => {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(50, fY, 900, 30);
          ctx.strokeStyle = "#e2e8f0";
          ctx.strokeRect(50, fY, 900, 30);

          ctx.fillStyle = "#0f172a";
          ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(f.name, 65, fY + 20);
          ctx.fillText(f.ratio, 350, fY + 20);

          ctx.fillStyle = f.color;
          ctx.font = "bold 12px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(formatMoney(f.val), 650, fY + 20);

          fY += 30;
        });

        // Total AR Row
        ctx.fillStyle = "#e0f2fe";
        ctx.fillRect(50, fY, 900, 34);
        ctx.strokeStyle = "#38bdf8";
        ctx.strokeRect(50, fY, 900, 34);
        ctx.fillStyle = "#0369a1";
        ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText("รวมมูลค่าลูกหนี้ค้างชำระทั้งหมด", 65, fY + 22);
        ctx.fillText("100%", 350, fY + 22);
        ctx.fillText(formatMoney(totalArAll), 650, fY + 22);

      } else {
        // --- HOSPITAL DETAILS REPORT ---
        if (!currentHospitalData) return;

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 18px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(`ผลการประเมิน 20 ตัวชี้วัดรายหน่วยงาน: ${currentHospitalData.name}`, 50, 160);

        ctx.fillStyle = "#4b5563";
        ctx.font = "13px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(`กลุ่มบริการ: ${currentHospitalData.group}  |  ขนาด: ${currentHospitalData.beds} เตียง`, 50, 185);

        // Grade & Risk Banner Box
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(50, 205, 900, 80);
        ctx.strokeStyle = "#cbd5e1";
        ctx.strokeRect(50, 205, 900, 80);
        ctx.fillStyle = currentHospitalData.grade === "A" ? "#059669" : currentHospitalData.grade === "B" ? "#2563eb" : "#d97706";
        ctx.fillRect(50, 205, 8, 80);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 28px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(`GRADE ${currentHospitalData.grade}`, 75, 248);

        ctx.font = "bold 14px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillStyle = currentHospitalData.risk === 0 ? "#059669" : "#d97706";
        ctx.fillText(`ระดับความเสี่ยง: Risk ${currentHospitalData.risk}`, 240, 235);

        ctx.fillStyle = "#475569";
        ctx.font = "12px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(`คะแนนรวม: ${currentHospitalData.totalScore.toFixed(1)} / 15.0  (กระบวนการ: ${currentHospitalData.processScore.toFixed(1)}, ผลงาน: ${currentHospitalData.operationalScore.toFixed(1)})`, 240, 260);

        ctx.fillStyle = "#4338ca";
        ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(`คุณภาพงบทดลอง: ${currentHospitalData.trialBalanceScore} คะแนน (${((currentHospitalData.trialBalanceScore/160.5)*100).toFixed(1)}%)`, 580, 235);

        ctx.fillStyle = currentHospitalData.netIncome >= 0 ? "#059669" : "#dc2626";
        ctx.font = "bold 14px 'Inter', 'Sarabun', 'sans-serif'";
        ctx.fillText(`Net Income: ${formatMoney(currentHospitalData.netIncome)}`, 580, 260);

        // 4 Pillars Grid (2x2)
        const pillars = [
          {
            title: "1. ด้านสภาพคล่อง (Liquidity)",
            color: "#0284c7",
            rows: [
              ["อัตราส่วนทุนหมุนเวียน (CR)", `${currentHospitalData.cr.toFixed(2)} เท่า`],
              ["อัตราส่วนทุนหมุนเวียนเร็ว (QR)", `${currentHospitalData.qr.toFixed(2)} เท่า`],
              ["อัตราส่วนเงินสด (Cash Ratio)", `${currentHospitalData.cashRatio.toFixed(2)} เท่า`],
              ["ทุนหมุนเวียนสุทธิ (NWC)", formatMoney(currentHospitalData.nwc)],
              ["เงินบำรุงปลอดภาระผูกพัน", formatMoney(currentHospitalData.unencumberedFund)]
            ]
          },
          {
            title: "2. ด้านผลการดำเนินงาน (Performance)",
            color: "#059669",
            rows: [
              ["EBITDA", formatMoney(currentHospitalData.ebitda)],
              ["รายได้สุทธิ (Net Income)", formatMoney(currentHospitalData.netIncome)],
              ["รายได้รวมประมาณการ", formatMoney(currentHospitalData.totalRevenue)],
              ["ค่าใช้จ่ายรวมประมาณการ", formatMoney(currentHospitalData.totalExpense)],
              ["อัตรากำไรจากการดำเนินงาน", `${(currentHospitalData.opMargin * 100).toFixed(1)}%`]
            ]
          },
          {
            title: "3. ลูกหนี้ เจ้าหนี้ และพัสดุ (AR / AP / Inv)",
            color: "#d97706",
            rows: [
              [`ACP-ข้าราชการ (${currentHospitalData.acpCsDays} วัน)`, formatMoney(currentHospitalData.arCsAmount)],
              [`ACP-บัตรทอง (${currentHospitalData.acpUcDays} วัน)`, formatMoney(currentHospitalData.arUcAmount)],
              [`ACP-ประกันสังคม (${currentHospitalData.acpSssDays} วัน)`, formatMoney(currentHospitalData.arSssAmount)],
              ["ต่างด้าว / หนี้อื่นๆ (ประมาณการ)", formatMoney(currentHospitalData.arOtherAmount)],
              ["ระยะเวลาชำระหนี้ (APP) / คงคลัง (AIP)", `${currentHospitalData.appDays} วัน / ${currentHospitalData.aipDays} วัน`]
            ]
          },
          {
            title: "4. ด้านการใช้ทรัพยากร (Resources)",
            color: "#e11d48",
            rows: [
              ["อัตราครองเตียง (Occupancy Rate)", `${currentHospitalData.bedOccupancyRate}% (${currentHospitalData.bedOccupancyStatus})`],
              ["สัดส่วนค่าแรง (LC Labor)", currentHospitalData.lcLaborStatus],
              ["สัดส่วนค่ายา (MC Drug)", currentHospitalData.mcDrugStatus],
              ["สัดส่วนค่าเวชภัณฑ์ (MC Lab/Supply)", `${currentHospitalData.mcLabStatus} / ${currentHospitalData.mcSupplyStatus}`],
              ["กรอบแผนการเงิน (Planfin Rev/Exp)", `${currentHospitalData.planfinRevenueStatus} / ${currentHospitalData.planfinExpenseStatus}`]
            ]
          }
        ];

        pillars.forEach((p, idx) => {
          const px = 50 + (idx % 2) * 460;
          const py = 305 + Math.floor(idx / 2) * 240;

          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(px, py, 440, 225);
          ctx.strokeStyle = "#cbd5e1";
          ctx.strokeRect(px, py, 440, 225);

          ctx.fillStyle = p.color;
          ctx.fillRect(px, py, 6, 225);

          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 13px 'Inter', 'Sarabun', 'sans-serif'";
          ctx.fillText(p.title, px + 18, py + 26);

          ctx.strokeStyle = "#e2e8f0";
          ctx.beginPath();
          ctx.moveTo(px + 18, py + 36);
          ctx.lineTo(px + 420, py + 36);
          ctx.stroke();

          let ry = py + 60;
          p.rows.forEach(r => {
            ctx.fillStyle = "#475569";
            ctx.font = "11px 'Inter', 'Sarabun', 'sans-serif'";
            ctx.fillText(r[0], px + 18, ry);

            ctx.fillStyle = "#0f172a";
            ctx.font = "bold 11px 'Inter', 'Sarabun', 'sans-serif'";
            ctx.fillText(r[1], px + 220, ry);
            ry += 32;
          });
        });
      }

      // Footer Signatures & Official Stamp
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, 1340);
      ctx.lineTo(950, 1340);
      ctx.stroke();

      ctx.fillStyle = "#64748b";
      ctx.font = "11px 'Inter', 'Sarabun', 'sans-serif'";
      ctx.fillText("ระบบบริหารจัดการและวิเคราะห์ลูกหนี้การเงินคลัง (H-ARD) สำนักงานสาธารณสุขจังหวัดประจวบคีรีขันธ์", 50, 1365);

      ctx.textAlign = "right";
      ctx.fillText("เอกสารนี้ใช้สำหรับงานวิเคราะห์และกำกับติดตามภายในองค์กรเท่านั้น", 950, 1365);
      ctx.textAlign = "left";

      // Export canvas to JPEG image & download via jsPDF
      const imageUri = canvas.toDataURL("image/jpeg", 0.95);
      const pdfReport = new jsPDF("p", "mm", "a4");
      pdfReport.addImage(imageUri, "JPEG", 0, 0, 210, 297);
      
      const fileName = activeView === "OVERVIEW"
        ? `รายงานประเมิน20ตัวชี้วัด_ภาพรวมจังหวัด_${selectedQuarter.replace(/[\s\.\-]+/g, "_")}.pdf`
        : `รายงานประเมิน20ตัวชี้วัด_${(currentHospitalData?.name || selectedHospital).replace(/[\s\.\-]+/g, "_")}_${selectedQuarter.replace(/[\s\.\-]+/g, "_")}.pdf`;

      pdfReport.save(fileName);
    } catch (err) {
      console.error("PDF Export error:", err);
      alert("ไม่สามารถประมวลผลหรือดาวน์โหลดไฟล์ PDF ได้ในขณะนี้");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation */}
      <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-1.5">
              <CheckSquare className="w-6 h-6 text-sky-400" />
              แดชบอร์ด 20 ตัวชี้วัดทางการเงินและการบริหาร <span className="text-sky-400">({selectedQuarter === '2569Q4' ? 'ไตรมาส 4/2569 (ณ ก.ค. 69)' : `ไตรมาส ${selectedQuarter.substring(5)}/${selectedQuarter.substring(0,4)}`})</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">
              วิเคราะห์ผลการประเมินประสิทธิภาพทางการเงิน เปรียบเทียบ รพ. และวิเคราะห์เทรนด์ (MOPH Official Data)
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 w-full md:w-auto p-1 bg-[#111c35] rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView("OVERVIEW")}
              className={`flex-1 md:flex-none px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === "OVERVIEW" 
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" /> ภาพรวมทั้งหมด
              </div>
            </button>
            <button
              onClick={() => setActiveView("HOSPITAL_DETAILS")}
              className={`flex-1 md:flex-none px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === "HOSPITAL_DETAILS" 
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" /> เจาะลึกรายโรงพยาบาล
              </div>
            </button>
          </div>
        </div>

        {/* Global Quarter & Hospital Selector & Export PDF */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="bg-[#111c35] border border-slate-700 rounded-xl flex items-center px-2 py-2.5 w-full sm:w-auto hover:border-sky-500/50 transition-colors">
              <Calendar className="w-5 h-5 text-sky-400 mr-3 shrink-0" />
              <div className="flex flex-col flex-1 relative">
                <span className="text-[11px] text-slate-400 uppercase font-black tracking-wider">รอบการประเมิน (Quarter)</span>
                <div className="relative flex items-center mt-0.5">
                  <span className="text-white text-xs font-bold">{selectedQuarter === '2569Q4' ? 'ไตรมาส 4/2569 (ณ ก.ค. 69)' : `ไตรมาส ${selectedQuarter.substring(5)}/${selectedQuarter.substring(0,4)}`}</span>
                </div>
              </div>
            </div>
            
            {activeView === "HOSPITAL_DETAILS" && (
              <div className="bg-[#111c35] border border-slate-700 rounded-xl flex items-center px-2 py-2.5 w-full sm:w-auto hover:border-purple-500/50 transition-colors">
                <Building2 className="w-5 h-5 text-purple-400 mr-3 shrink-0" />
                <div className="flex flex-col flex-1 relative">
                  <span className="text-[11px] text-slate-400 uppercase font-black tracking-wider">โรงพยาบาล (Hospital)</span>
                  <div className="relative flex items-center">
                    <select
                      className="bg-[#111c35] border-none text-white text-xs outline-none w-full cursor-pointer font-bold mt-0.5 pr-6 appearance-none"
                      value={selectedHospital}
                      onChange={(e) => setSelectedHospital(e.target.value)}
                    >
                      {overviewData.map(h => (
                        <option key={h.id} value={h.id} className="bg-[#0b1324] text-slate-100 font-bold py-2">
                          {h.name} ({h.group})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleExportPdf}
            className="bg-gradient-to-b from-rose-500 to-rose-600 text-white border-t border-x border-rose-400 border-b-4 border-rose-800 shadow-[0_3px_0_0_#991b1b] hover:brightness-105 active:translate-y-[1.5px] active:border-b-2 active:shadow-[0_1.5px_0_0_#991b1b] px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer w-full sm:w-auto"
            title="ดาวน์โหลดรายงานประเมิน 20 ตัวชี้วัดเป็นไฟล์ PDF"
          >
            <FileText className="w-4 h-4 text-rose-100" />
            <span>ส่งออก PDF</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: OVERVIEW */}
      {activeView === "OVERVIEW" && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#111c35] to-[#0b1324] border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign className="w-16 h-16 text-sky-400" /></div>
              <h3 className="text-slate-400 text-[11px] font-bold uppercase mb-1 relative z-10">รายได้รวม (Revenue)</h3>
              <div className="text-xl font-black text-white font-mono relative z-10">{formatMoney(overviewSummary.totalRev)}</div>
            </div>
            <div className="bg-gradient-to-br from-[#111c35] to-[#0b1324] border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="w-16 h-16 text-rose-400" /></div>
              <h3 className="text-slate-400 text-[11px] font-bold uppercase mb-1 relative z-10">ค่าใช้จ่ายรวม (Expense)</h3>
              <div className="text-xl font-black text-white font-mono relative z-10">{formatMoney(overviewSummary.totalExp)}</div>
            </div>
            <div className="bg-gradient-to-br from-[#111c35] to-[#0b1324] border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><PieChart className="w-16 h-16 text-emerald-400" /></div>
              <h3 className="text-slate-400 text-[11px] font-bold uppercase mb-1 relative z-10">ผลต่าง (Net Income)</h3>
              <div className={`text-xl font-black font-mono relative z-10 ${overviewSummary.totalNi >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {overviewSummary.totalNi > 0 ? "+" : ""}{formatMoney(overviewSummary.totalNi)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#111c35] to-[#0b1324] border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Layers className="w-16 h-16 text-amber-400" /></div>
              <h3 className="text-slate-400 text-[11px] font-bold uppercase mb-1 relative z-10">EBITDA รวม</h3>
              <div className={`text-xl font-black font-mono relative z-10 ${overviewSummary.totalEbitda >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {overviewSummary.totalEbitda > 0 ? "+" : ""}{formatMoney(overviewSummary.totalEbitda)}
              </div>
            </div>
          </div>

          {/* Grades Comparison */}
          <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-400" /> 
              เปรียบเทียบผลการประเมินและเกรด (Grades & Risk)
            </h3>
            
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent rounded-xl border border-slate-800/80">
              <table className="whitespace-nowrap w-full text-left text-xs ">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 text-[11px] sm:text-xs uppercase tracking-wider bg-[#080e1a] leading-tight">
                    <th className="py-2.5 px-1.5 rounded-tl-xl font-bold">หน่วยบริการ</th>
                    <th className="py-2.5 px-2 font-bold text-center">กระบวนการ<br/><span className="text-[9px] text-slate-400 font-normal">(10)</span></th>
                    <th className="py-2.5 px-2 font-bold text-center">ผลงาน<br/><span className="text-[9px] text-slate-400 font-normal">(5)</span></th>
                    <th className="py-2.5 px-2 font-bold text-center text-sky-400 bg-sky-900/10">คะแนนรวม<br/><span className="text-[9px] text-sky-400 font-normal">(15)</span></th>
                    <th className="py-2.5 px-2 font-bold text-center text-indigo-400 bg-indigo-900/10">คุณภาพงบทดลอง<br/><span className="text-[9px] text-indigo-400 font-normal">(160.5)</span></th>
                    <th className="py-2.5 px-2 font-bold text-center bg-sky-900/10">Grade</th>
                    <th className="py-2.5 px-2 font-bold text-center bg-sky-900/10">Risk</th>
                    <th className="py-2.5 px-1.5 font-bold text-right rounded-tr-xl">Net Income</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {overviewData.map((row) => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-[#111c35]/80 transition-colors cursor-pointer group"
                      onClick={() => {
                        setSelectedHospital(row.id);
                        setActiveView("HOSPITAL_DETAILS");
                      }}
                      title="คลิกเพื่อดูรายละเอียดเชิงลึกของโรงพยาบาลนี้"
                    >
                      <td className="py-2.5 px-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-purple-500/50 group-hover:bg-purple-900/20 transition-colors shrink-0">
                            <Building2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-100 group-hover:text-purple-300 transition-colors ">{row.name}</div>
                            <div className="text-[9px] text-slate-500 font-mono">{row.group} • เตียง: {row.beds}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-300">{row.processScore.toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-300">{row.operationalScore.toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-center font-black text-xs font-mono text-sky-300 bg-sky-900/5">{row.totalScore.toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-center font-black text-xs font-mono text-indigo-300 bg-indigo-900/5">
                        {row.trialBalanceScore}
                        <div className="text-[9px] text-indigo-400/70 font-medium">
                          {((row.trialBalanceScore / 160.5) * 100).toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-center bg-sky-900/5">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-[11px] border ${getGradeColor(row.grade)}`}>
                          {row.grade}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center bg-sky-900/5">
                        <span className={`font-bold text-[11px] px-2 py-0.5 rounded bg-[#080e1a] border border-slate-800 ${getRiskColor(row.risk)}`}>
                          Risk {row.risk}
                        </span>
                      </td>
                      <td className={`py-2.5 px-1.5 text-right font-mono font-bold ${row.netIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {formatMoney(row.netIncome)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* EBITDA vs Net Income Chart */}
          <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 sm:p-6 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-black text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" /> 
                เปรียบเทียบ EBITDA และ Net Income (รายโรงพยาบาล)
              </h3>
              <span className="text-xs text-cyan-300 font-semibold bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60 flex items-center gap-1 sm:hidden">
                👈 เลื่อนดูซ้าย-ขวาให้ครบ 8 รพ.
              </span>
            </div>

            <div className="w-full overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-2 touch-pan-x">
              <div className="min-w-[650px] md:min-w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 10, right: 15, left: 15, bottom: 45 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      tick={{ fill: '#94a3b8', fontSize: 11 }} 
                      angle={-25} 
                      textAnchor="end" 
                      interval={0}
                      height={55}
                    />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                    <Tooltip 
                      cursor={{ fill: '#1e293b', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                      formatter={(val: number) => formatMoney(val)}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                    <Bar dataKey="ebitda" name="EBITDA" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="netIncome" name="Net Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AR Collection Period by Fund (ACP) */}
          <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 sm:p-6 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-black text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400" /> 
                ระยะเวลาการเรียกเก็บหนี้ (ACP) รายกองทุน
              </h3>
              <span className="text-xs text-cyan-300 font-semibold bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60 flex items-center gap-1 sm:hidden">
                👈 เลื่อนดูซ้าย-ขวาให้ครบ 8 รพ.
              </span>
            </div>

            <div className="w-full overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-2 touch-pan-x">
              <div className="min-w-[650px] md:min-w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 10, right: 15, left: 0, bottom: 45 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      tick={{ fill: '#94a3b8', fontSize: 11 }} 
                      angle={-25} 
                      textAnchor="end" 
                      interval={0}
                      height={55}
                    />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `${val} วัน`} />
                    <Tooltip 
                      cursor={{ fill: '#1e293b', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                      formatter={(val: number) => `${val} วัน`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                    <Bar dataKey="acpUcDays" name="บัตรทอง (UC)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="acpCsDays" name="ข้าราชการ (CSMBS)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="acpSssDays" name="ประกันสังคม (SSS)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AR Amounts Breakdown by Fund */}
          <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 sm:p-6 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-black text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> 
                มูลค่าลูกหนี้ค้างชำระ แยกตามสิทธิ (โดยประมาณ)
              </h3>
              <span className="text-xs text-cyan-300 font-semibold bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60 flex items-center gap-1 sm:hidden">
                👈 เลื่อนดูซ้าย-ขวาให้ครบ 8 รพ.
              </span>
            </div>

            <div className="w-full overflow-x-auto w-full scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-2 touch-pan-x">
              <div className="min-w-[650px] md:min-w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 10, right: 15, left: 20, bottom: 45 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      tick={{ fill: '#94a3b8', fontSize: 11 }} 
                      angle={-25} 
                      textAnchor="end" 
                      interval={0}
                      height={55}
                    />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                    <Tooltip 
                      cursor={{ fill: '#1e293b', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                      formatter={(val: number) => formatMoney(val)}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                    <Bar dataKey="arUcAmount" name="บัตรทอง (UC)" stackId="a" fill="#10b981" />
                    <Bar dataKey="arCsAmount" name="ข้าราชการ (CSMBS)" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="arSssAmount" name="ประกันสังคม (SSS)" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="arOtherAmount" name="ต่างด้าว/อื่นๆ" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: HOSPITAL DETAILS */}
      {activeView === "HOSPITAL_DETAILS" && currentHospitalData && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Top Info Banner */}
          <div className="bg-gradient-to-r from-purple-900/30 to-[#0b1324] border border-purple-500/20 rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 font-black text-4xl shadow-xl ${getGradeColor(currentHospitalData.grade)}`}>
                {currentHospitalData.grade}
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{currentHospitalData.name}</h2>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 font-medium">
                  <span className="bg-[#111c35] px-1.5 py-1 rounded-full border border-slate-700">กลุ่ม: {currentHospitalData.group}</span>
                  <span className="bg-[#111c35] px-1.5 py-1 rounded-full border border-slate-700">ขนาด: {currentHospitalData.beds} เตียง</span>
                  <span className={`px-1.5 py-1 rounded-full font-bold border bg-[#111c35] ${getRiskColor(currentHospitalData.risk)} border-slate-700`}>
                    ระดับความเสี่ยง: Risk {currentHospitalData.risk}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-[#0b1324] border border-slate-800 rounded-xl p-4 flex-1 text-center min-w-[120px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase mb-1">คะแนนรวม</div>
                <div className="text-2xl font-black text-white font-mono">{currentHospitalData.totalScore.toFixed(1)} <span className="text-xs text-slate-500 font-medium">/ 15</span></div>
              </div>
              <div className="bg-[#0b1324] border border-slate-800 rounded-xl p-4 flex-1 text-center min-w-[120px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase mb-1">Net Income</div>
                <div className={`text-xl font-black font-mono mt-1 ${currentHospitalData.netIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {(currentHospitalData.netIncome / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-6 shadow-lg h-[350px]">
            <h3 className="text-xs font-black text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" /> 
              แนวโน้มทางการเงินย้อนหลัง (EBITDA & Net Income Trend)
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <ComposedChart data={hospitalTrendData} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="quarter" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                  formatter={(val: number) => formatMoney(val)}
                />
                <Legend />
                <Area type="monotone" dataKey="ebitda" name="EBITDA" fill="#f59e0b" stroke="#f59e0b" fillOpacity={0.1} strokeWidth={3} />
                <Line type="monotone" dataKey="netIncome" name="Net Income" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 1: Liquidity */}
            <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 shadow-lg">
              <h4 className="text-[11px] font-black text-sky-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">1. สภาพคล่อง (Liquidity)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">Cash Ratio</span>
                  <span className={`font-mono font-bold ${currentHospitalData.cashRatio > 0.8 ? 'text-emerald-400' : 'text-rose-400'}`}>{currentHospitalData.cashRatio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">Current Ratio</span>
                  <span className="font-mono font-bold text-white">{currentHospitalData.cr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">Quick Ratio</span>
                  <span className="font-mono font-bold text-white">{currentHospitalData.qr.toFixed(2)}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800">
                  <div className="text-[11px] text-slate-500 uppercase mb-1">NWC (ทุนสำรองสุทธิ)</div>
                  <div className={`font-mono font-bold text-xs ${currentHospitalData.nwc > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatMoney(currentHospitalData.nwc)}
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Performance */}
            <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 shadow-lg">
              <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">2. ผลการดำเนินงาน (Performance)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">OPM</span>
                  <span className={`font-mono font-bold ${currentHospitalData.opMargin > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{(currentHospitalData.opMargin * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ROA</span>
                  <span className={`font-mono font-bold ${currentHospitalData.roa > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{(currentHospitalData.roa * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">EBITDA</span>
                  <span className={`font-mono font-bold text-[11px] ${currentHospitalData.ebitda > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {(currentHospitalData.ebitda / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300 text-xs">เงินบำรุงหลังหักหนี้</span>
                  <span className={`font-mono font-bold text-[11px] ${currentHospitalData.unencumberedFund > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {(currentHospitalData.unencumberedFund / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            </div>

            {/* Pillar 3: AR & Rights */}
            <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 shadow-lg">
              <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">3. ลูกหนี้ เจ้าหนี้ และพัสดุ</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ACP-ข้าราชการ</span>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">{currentHospitalData.acpCsDays} วัน</div>
                    <div className="text-[11px] text-blue-400 font-mono">{formatMoney(currentHospitalData.arCsAmount)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ACP-บัตรทอง</span>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">{currentHospitalData.acpUcDays} วัน</div>
                    <div className="text-[11px] text-emerald-400 font-mono">{formatMoney(currentHospitalData.arUcAmount)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ACP-ประกันสังคม</span>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">{currentHospitalData.acpSssDays} วัน</div>
                    <div className="text-[11px] text-amber-400 font-mono">{formatMoney(currentHospitalData.arSssAmount)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ต่างด้าว/อื่นๆ</span>
                  <div className="text-right">
                    <div className="text-[11px] text-purple-400 font-mono">{formatMoney(currentHospitalData.arOtherAmount)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-slate-300 text-xs">ระยะเวลาชำระหนี้ (APP)</span>
                  <span className="font-mono font-bold text-white">{currentHospitalData.appDays} วัน</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ระยะเวลาคงคลัง (AIP)</span>
                  <span className="font-mono font-bold text-white">{currentHospitalData.aipDays} วัน</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-slate-300 text-xs">Unit Cost (OP)</span>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(currentHospitalData.unitCostOpStatus)}
                    <span className="font-bold text-xs text-slate-200">{currentHospitalData.unitCostOpStatus}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">Unit Cost (IP)</span>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(currentHospitalData.unitCostIpStatus)}
                    <span className="font-bold text-xs text-slate-200">{currentHospitalData.unitCostIpStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 4: Resources */}
            <div className="bg-[#0b1324] border border-[#1b2a47] rounded-3xl p-5 shadow-lg">
              <h4 className="text-[11px] font-black text-rose-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">4. การใช้ทรัพยากร (Resources)</h4>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">อัตราครองเตียง</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-white">{currentHospitalData.bedOccupancyRate}%</span>
                    {getStatusIcon(currentHospitalData.bedOccupancyStatus)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ค่าแรง (LC)</span>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(currentHospitalData.lcLaborStatus)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ค่ายา (MC-Drug)</span>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(currentHospitalData.mcDrugStatus)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">ค่าวัสดุ (MC-Supply)</span>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(currentHospitalData.mcSupplyStatus)}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
