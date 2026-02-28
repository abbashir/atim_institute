import React from 'react';

const TextareaField = ({ label, required, rows = 4, error, ...props }) => {
  return (
    <div className="w-full">
      <label className="mb-2.5 block text-black font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <textarea
        rows={rows}
        {...props}
        className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-slate-50 placeholder:text-slate-400 ${
          error ? 'border-rose-500' : 'border-slate-200'
        } ${props.disabled ? 'bg-slate-50 opacity-70' : ''}`}
      ></textarea>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};

export default TextareaField;