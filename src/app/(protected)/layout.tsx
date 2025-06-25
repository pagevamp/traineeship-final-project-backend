"use client";

import React, { Suspense } from "react";
import { DashboardLayout } from "@/features/dashboard/dashboard-layout";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <Suspense fallback={<></>}>
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
};

export default ProtectedLayout;
