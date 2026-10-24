import React from 'react';
import { MonthlyAuditReport } from '../types';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, BarChart4, AlertTriangle, Presentation } from 'lucide-react';

interface AuditChartsPanelProps {
  allReports: MonthlyAuditReport[];
  selectedMonthId: string;
}

export function AuditChartsPanel({ allReports, selectedMonthId }: AuditChartsPanelProps) {
  
  // 1. Prepare data for dynamic active month comparison by hospital
  const activeReport = allReports.find(r => r.monthId === selectedMonthId) || allReports[0];
  
  const hospitalComparisonData = activeReport.data.map(h => {
    return {
      name: h.hospitalName,
      'ลูกหนี้ภาครัฐ (GL)': h.govGL / 1000000, // Show in millions for clean presentation
      'ลูกหนี้บุคคลภายนอก (GL)': h.extGL / 1000000,
      'รวมลูกหนี้สุทธิ (ล้านบาท)': (h.govGL + h.extGL) / 1000000
    };
  }).sort((a, b) => b['รวมลูกหนี้สุทธิ (ล้านบาท)'] - a['รวมลูกหนี้สุทธิ (ล้านบาท)']);

  // 2. Prepare data for Monthly Overall Trend (aggregates)
  const monthlyTrendData = allReports.map(r => {
    const totalGov = r.data.reduce((sum, h) => sum + h.govGL, 0) / 1000000;
    const totalExt = r.data.reduce((sum, h) => sum + h.extGL, 0) / 1000000;
    
    return {
      monthLabel: r.monthName,
      'ลูกหนี้รัฐ (ล้านบาท)': Number(totalGov.toFixed(2)),
      'ลูกหนี้บุคคลภายนอก (ล้านบาท)': Number(totalExt.toFixed(2)),
      'รวมลูกหนี้สะสมรพ.ทั้งจังหวัด': Number((totalGov + totalExt).toFixed(2))
    };
  });

  // 3. Prepare data for Pranburi Discrepancy trend
  const pranburiDiscrepancyTrend = allReports.map(r => {
    const pranburi = r.data.find(h => h.hospitalName === "รพ.ปราณบุรี");
    return {
      monthLabel: r.monthName,
      'ผลต่างรัฐ (พันบาท)': pranburi ? Number((pranburi.govInsuranceDiff / 1000).toFixed(2)) : 0,
      'ผลต่างบุคคลนอก (พันบาท)': pranburi ? Number((pranburi.extInsuranceDiff / 1000).toFixed(2)) : 0
    };
  });

  // Custom tooltips
  const formatMillions = (val: any) => `${Number(val).toFixed(2)} ล้านบาท`;
  const formatThousands = (val: any) => `${Number(val).toLocaleString()} พันบาท`;

  return (
    <div className="space-y-6" id="audit-charts-panel">
      
      {/* Upper Double Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="charts-main-row">
        
        {/* Chart 1: Over-time cumulative balance trend */}
        <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h4 className="text-base sm:text-lg font-extrabold text-[#ffffff] tracking-tight">แนวโน้มสินทรัพย์ลูกหนี้ค่ารักษาพยาบาล จังหวัดประจวบคีรีขันธ์</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">แสดงยอดลูกหนี้ค้างชำระในจังหวัดเป็นหน่วยล้านบาท (ตุลาคม 2568 - {allReports[allReports.length - 1].monthName})</p>
          </div>

          <div className="h-72 w-full" id="trend-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2f47" />
                <XAxis dataKey="monthLabel" tick={{ fontSize: 13, fill: '#cbd5e1', fontWeight: 'bold' }} stroke="#334155" />
                <YAxis tick={{ fontSize: 13, fill: '#cbd5e1', fontWeight: 'bold' }} stroke="#334155" />
                <Tooltip 
                  formatter={formatMillions}
                  contentStyle={{ backgroundColor: '#090f1d', borderRadius: '12px', border: '1px solid #1b2a47', color: '#f8fafc' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 13, color: '#f8fafc', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="ลูกหนี้รัฐ (ล้านบาท)" stroke="#10b981" fillOpacity={1} fill="url(#colorGov)" strokeWidth={3} />
                <Area type="monotone" dataKey="ลูกหนี้บุคคลภายนอก (ล้านบาท)" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorExt)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Comparative Hospital Sizes */}
        <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <BarChart4 className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base sm:text-lg font-extrabold text-[#ffffff] tracking-tight">
                สัดส่วนลูกหนี้ตามจ่าย GL แยกตามโรงพยาบาล ประจํารอบ: {activeReport.monthName}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mb-4 text-left">
              เปรียบเทียบขนาดลูกหนี้จำแนกประเภทแต่ละโรงพยาบาลในจังหวัด (หน่วย: ล้านบาท)
            </p>
          </div>

          <div className="h-72 w-full" id="share-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hospitalComparisonData} layout="vertical" margin={{ top: 10, right: 10, left: 15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e2f47" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#cbd5e1' }} stroke="#334155" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#f1f5f9', fontWeight: 'bold' }} stroke="#334155" width={100} />
                <Tooltip 
                  formatter={formatMillions}
                  contentStyle={{ backgroundColor: '#090f1d', borderRadius: '12px', border: '1px solid #1b2a47', color: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 'medium' }} />
                <Bar dataKey="ลูกหนี้ภาครัฐ (GL)" stackId="a" fill="#1e3a8a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="ลูกหนี้บุคคลภายนอก (GL)" stackId="a" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Under Row: Detailed Anomaly Pattern Chart */}
      <div className="bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-6 shadow-md flex flex-col justify-between" id="anomaly-pattern-chart-row">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h4 className="text-base sm:text-lg font-extrabold text-[#ffffff] tracking-tight">วิเคราะห์รอยต่อผลต่างบัญชี รพ.ปราณบุรี ตลอด {allReports.length} เดือน ({allReports[0].monthName}-{allReports[allReports.length - 1].monthName})</h4>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            แสดงค่าความคลาดเคลื่อนทางบัญชี GL หักลบ ยอดงานประกัน เพื่อเป็นแนวทางการแก้ปัญหาประชาร่วม (หน่วย: พันบาท)
          </p>
        </div>

        <div className="h-64 w-full" id="disparity-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={pranburiDiscrepancyTrend} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2f47" />
              <XAxis dataKey="monthLabel" tick={{ fontSize: 12, fill: '#cbd5e1' }} stroke="#334155" />
              <YAxis tick={{ fontSize: 12, fill: '#cbd5e1' }} stroke="#334155" />
              <Tooltip 
                formatter={formatThousands}
                contentStyle={{ backgroundColor: '#090f1d', borderRadius: '12px', border: '1px solid #1b2a47', color: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 'bold' }} />
              <Bar dataKey="ผลต่างบุคคลนอก (พันบาท)" fill="#f43f5e" barSize={35} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="ผลต่างรัฐ (พันบาท)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
