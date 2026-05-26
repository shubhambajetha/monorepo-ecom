import React from 'react';

import HomeAdmin from '@/app/components/admin/HomeAdmin';
import SideBar from '@/app/components/admin/SideBar';

const page = () => {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <HomeAdmin />
      </main>
    </div>
  );
};

export default page;
