"use client";

import React from "react";
import { DashboardLayout } from "@/features/dashboard/dashboard-layout";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedLayout;
