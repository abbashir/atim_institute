import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ label, required, options, error, ...props }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black font-medium">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative z-20">
      <select
        {...props}
        className={`relative z-20 w-full appearance-none rounded border py-3 px-5 outline-none transition focus:border-indigo-600 active:border-indigo-600 bg-transparent ${
          props.value === "" ? 'text-slate-400' : 'text-black'
        } ${error ? 'border-rose-500' : 'border-slate-200'}`}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} disabled={opt.disabled} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 text-slate-400 pointer-events-none">
        {/*<ChevronDown size={20} />*/}
      </span>
    </div>
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

export default SelectField;