
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'SEN', value: 65 },
  { name: 'SEL', value: 80 },
  { name: 'RAB', value: 72 },
  { name: 'KAM', value: 78 },
  { name: 'JUM', value: 55 },
  { name: 'SAB', value: 88 },
  { name: 'MIN', value: 82 },
];

const RealTimeChart: React.FC = () => {
  return (
    <div className="bg-[#111d1a] p-8 rounded-2xl border border-white/5 h-full">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="font-black text-lg text-white tracking-tight">Kesehatan Konektivitas</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Waktu Aktif Sistem & Kekuatan Sinyal (7 Hari)</p>
        </div>
        <div className="text-right">
          <h4 className="text-3xl font-black text-white leading-none tracking-tighter">98.5%</h4>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Sangat Baik</p>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#475569', fontSize: 10, fontWeight: '900', letterSpacing: '0.1em'}} 
              dy={15}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#111d1a', border: '1px solid #10b98120', borderRadius: '12px' }}
              itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorGreen)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RealTimeChart;
