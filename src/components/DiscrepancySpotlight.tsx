import React from 'react';
import { ExecutiveScenario } from '../types';
import { 
  Building, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  CheckSquare, 
  Square,
  Activity,
  Award,
  BookOpen
} from 'lucide-react';

interface DiscrepancySpotlightProps {
  scenarios: ExecutiveScenario[];
  onToggleScenario: (id: string) => void;
  scenariosMultiplier: { gov: number; ext: number };
}

export function DiscrepancySpotlight({ 
  scenarios, 
  onToggleScenario,
  scenariosMultiplier
}: DiscrepancySpotlightProps) {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="discrepancy-spotlight">
      
      {/* Case Study Card (2 Cols) */}
      <div className="lg:col-span-2 bg-[#0b1324] rounded-2xl border border-[#1b2a47] p-6 lg:p-8 shadow-md flex flex-col justify-between" id="case-study-card">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="p-1 px-1.5 bg-rose-500/15 text-rose-450 font-black rounded text-[11px] uppercase tracking-wider border border-rose-500/20">
              กรณีศึกษาวิเคราะห์ความเสี่ยง
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-400" /> รพ.ปราณบุรี (Pranburi Hospital)
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#ffffff] tracking-tight leading-snug">
            พฤติกรรมยอดลูกหนี้คลาดเคลื่อนสะสมข้ามปีงบประมาณ
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            ทีมตรวจสอบกระทรวงและฝ่ายประกันวินิจฉัยเชิงลึก 4 เดือนติดต่อกัน พบว่า รพ.ปราณบุรี เป็นสถานบริการเด่นที่ยอดหนี้ไม่สัมพันธ์ตรงกันระหว่างบัญชีแยกประเภททั่วไป (GL) และรายงานฝั่งงานประกันสุขภาพคลังจังหวัด
          </p>

          {/* Timeline of Pranburi anomalies */}
          <div className="mt-6 space-y-4" id="anomalies-timeline">
            <h4 className="text-xs font-extrabold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" /> ลำดับเหตุการณ์ระบุข้อสังเกตและพฤติกรรมดุลบัญชี:
            </h4>

            {/* October 2568 */}
            <div className="flex gap-1.5 text-xs">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-[#16243b] text-[#cbd5e1] font-black text-[11px] flex items-center justify-center border border-[#2b3c5c]">1</span>
                <span className="w-0.5 h-12 bg-[#1b2a47]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-100 text-xs">ตุลาคม 2568 (จุดกำเนิดความคลาดเคลื่อนจากการปัดเศษทศนิยม)</p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  ยอดตาม GL ลูกหนี้ฝั่งภาครัฐสูงกว่าฝ่ายประกันภัยเป็นหนแรกจำนวนเฉลี่ยเพียง <strong>0.50 บาท</strong> คาดคะเนว่าเกิดจากเศษทศนิยมคำนวณปันส่วนสิทธิ์รักษาพยาบาล
                </p>
              </div>
            </div>

            {/* November 2568 */}
            <div className="flex gap-1.5 text-xs">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 font-black text-[11px] flex items-center justify-center border border-rose-500/20">2</span>
                <span className="w-0.5 h-14 bg-[#1b2a47]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-rose-400 text-xs">พฤศจิกายน 2568 (ยอดสวิงขัดแย้งประวัติศาสตร์ - ประเด็นเข้มข้น)</p>
                <div className="text-slate-300 text-xs space-y-1 leading-relaxed">
                  <p>• ยอดหนี้ภาครัฐ: ระบบรายงานปรับตัวต่ำกว่า GL สุทธิเท่ากับ <strong className="text-rose-450">-147,048.80 บาท</strong> (ปัญหาบันทึกพักเคลมล่าช้า)</p>
                  <p>• ยอดหนี้บุคคลภายนอก: ส่วนตลาดยืดดุลสูงสุด GL แซงรายงานประกันภัยถึง <strong className="text-rose-400">+2,756,050.15 บาท</strong> เป็นหัวข้อหารือใหญ่ในเขตสุขภาพ 5</p>
                </div>
              </div>
            </div>

            {/* December 2568 */}
            <div className="flex gap-1.5 text-xs">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-indigo-500/10 text-[#60a5fa] font-black text-[11px] flex items-center justify-center border border-indigo-500/20">3</span>
                <span className="w-0.5 h-12 bg-[#1b2a47]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-100 text-xs">ธันวาคม 2568 (พยายามกระทบยอดปันส่วนชั่วคราว)</p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  ส่วนต่างขั้วตีกลับมาเป็นยอดบวก <strong>+36,344.20 บาท</strong> ฝ่ายบริหารชี้แจงกระบวนการตัดเคลมสิทธิ์หลักทอง (UC) ทยอยตอบรับจากส่วนกลาง
                </p>
              </div>
            </div>

            {/* January 2569 */}
            <div className="flex gap-1.5 text-xs">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 font-black text-[11px] flex items-center justify-center border border-amber-500/20">4</span>
                <span className="w-0.5 h-12 bg-[#1b2a47]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-100 text-xs">มกราคม 2569</p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  ยอดลูกหนี้ค้างชำระตามบัญชี GL และงานประกันภัย เริ่มแสดงผลใกล้เคียงกัน แต่ยังคงมีรายการปรับปรุงในบางหน่วยบริการ
                </p>
              </div>
            </div>

            {/* February - April 2569 */}
            <div className="flex gap-1.5 text-xs">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 font-black text-[11px] flex items-center justify-center border border-emerald-500/20">5</span>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-100 text-xs">กุมภาพันธ์ - เมษายน 2569</p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  ยอดลูกหนี้ค้างชำระมีความเสถียรขึ้นอย่างต่อเนื่องจากการตรวจสอบและกระทบยอดข้อมูลรายเดือนอย่างเป็นระบบ
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Visual advice box - High readability */}
        <div className="mt-5 p-4.5 bg-[#0a1220] border border-indigo-500/30 rounded-xl flex items-start gap-1.5 text-xs text-slate-200">
          <Award className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
          <p className="leading-relaxed">
            <strong>ความเห็นและมาตรการปรับปรุงทางการเงินจังหวัด:</strong> 1) เร่งรัดล้างยอดบัญชีพักระหว่างรอสิทธิ์เคลมหลักฐาน และ 2) เพิ่มคุณภาพวิเคราะห์แยกหมวดหมู่สิทธิ์รองของผู้รับบริการเพื่อหลีกเลี่ยงระบบสวิงข้ามสิทธิ์ ส่งผลต่องบแสดงสถานะ สป.สธ.
          </p>
        </div>
      </div>

      {/* Interactive Scenario Simulator (1 Col) - Stark contrast and beautiful action tiles */}
      <div className="bg-[#0b1324] border border-[#1b2a47] rounded-2xl p-6 lg:p-8 shadow-xl text-slate-200 flex flex-col justify-between" id="scenario-simulator">
        <div>
          <div className="flex items-center gap-1.5 text-[#fbbf24] font-bold text-xs mb-2">
            <Sliders className="w-5 h-5 animate-pulse text-amber-400" />
            <span className="tracking-widest uppercase font-mono">EXECUTIVE ACTION CENTER</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
            ระบบจำลองสั่งการเชิงบริหาร (Simulation)
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-5">
            ในฐานะประธานผู้บริหารและทีมกำกับดูแล จังหวัดประจวบคีรีขันธ์ สั่งคลิกใช้นโยบายเร่งด่วนด้านล่าง เพื่อทดลองประเมินพฤติกรรมลดส่วนต่างทันที:
          </p>

          {/* Scenarios Checklist selection - Touch target robust */}
          <div className="space-y-3.5" id="directives-checklist">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => onToggleScenario(sc.id)}
                className={`w-full text-left p-1.5.5 rounded-xl border transition-all duration-200 text-xs flex gap-1.5.5 ${
                  sc.applied 
                    ? 'bg-emerald-950/25 border-emerald-500/80 text-white shadow-md shadow-emerald-500/10' 
                    : 'bg-[#060a12] border-[#1e2f4f] hover:border-slate-500/30 text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {sc.applied ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 fill-emerald-950/50" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="font-extrabold leading-tight text-white text-xs">{sc.title}</p>
                  <p className="text-xs sm:text-[11px] text-slate-450 leading-tight">{sc.description}</p>
                  <span className="inline-block text-xs sm:text-[11px] text-emerald-350 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">{sc.impactLabel}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Multiplier outcome indicator */}
        <div className="mt-6 pt-5 border-t border-[#1b2a47] space-y-3.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-semibold">ข้อสั่งการเร่งด่วน:</span>
            <span className="font-black text-white bg-emerald-500/15 px-1.5 py-1 rounded border border-emerald-500/30 text-[11px]">
              เปิดใช้งาน {scenarios.filter(s => s.applied).length} / 3 มาตรการ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-center" id="outcome-multipliers">
            <div className="bg-[#060a12] p-1.5 rounded-lg border border-[#1b2a47]">
              <span className="text-xs text-slate-400 block font-bold">ประสิทธิการกระทบยอด</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 mt-1 block">+{scenariosMultiplier.gov}%</span>
            </div>
            <div className="bg-[#060a12] p-1.5 rounded-lg border border-[#1b2a47]">
              <span className="text-xs text-slate-400 block font-bold">สลายส่วนต่างหนี้สูญ</span>
              <span className="text-base sm:text-lg font-black text-[#38bdf8] mt-1 block">+{scenariosMultiplier.ext}%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
