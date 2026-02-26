import React, { useState } from 'react';
import Header from "@/Components/Admin/Header.jsx";
import Sidebar from "@/Components/Admin/Sidebar.jsx";
import Breadcrumb from "@/Components/Admin/Breadcrumb.jsx";
import {Head} from "@inertiajs/react";
import { Toaster } from 'react-hot-toast';

const AdminLayout = ({ children, pageName}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Global Toaster for Notifications */}
        <Toaster />
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <Head title={pageName} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-6">
            {/* Render Breadcrumb if pageName is provided */}
            {pageName && <Breadcrumb pageName={pageName} />}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;