import React from "react";
import SalesCard from "@/features/dashboard-component/sales-card";
import UserDetailsCard from "@/features/dashboard-component/user-details-card";
import OrdersCard from "@/features/dashboard-component/orders-card";
import TopSellingCard from "@/features/dashboard-component/top-selling-card";
import SalesCommissionsCard from "@/features/dashboard-component/sales-commissions-card";
import DashboardUserComponent from "@/features/dashboard-component/dashboard-user-component";

const Index = () => {
  return (
    <div className="py-4">
      <div className="mx-auto space-y-4">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <UserDetailsCard />
          </div>
          <div>
            <SalesCard />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="lg:col-span-2">
            <OrdersCard />
          </div>

          <div className="lg:col-span-2">
            <TopSellingCard />
          </div>
          <div className="lg:col-span-4">
            <SalesCommissionsCard />
          </div>
        </div>

        <div>
          <DashboardUserComponent />
        </div>
      </div>
    </div>
  );
};

export default Index;
