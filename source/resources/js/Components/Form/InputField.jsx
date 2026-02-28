import React from 'react';

const InputField = ({ label, required, type = "text", error, ...props }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black font-medium">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type={type}
      {...props}
      className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:bg-slate-50 placeholder:text-slate-400 ${
        error ? 'border-rose-500' : 'border-slate-200'
      }`}
    />
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

export default InputField;