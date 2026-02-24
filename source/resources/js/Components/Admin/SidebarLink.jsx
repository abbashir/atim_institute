import {Link} from "@inertiajs/react";

export default function SidebarLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}