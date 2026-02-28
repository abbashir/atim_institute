import React from 'react';

const StatCard = ({ title, value, subValue, icon: Icon, colorClass }) => (
  <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <h4 className="mt-1 text-2xl font-bold text-black">{value}</h4>
        {subValue && <p className="mt-1 text-xs text-slate-400">{subValue}</p>}
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export default StatCard;