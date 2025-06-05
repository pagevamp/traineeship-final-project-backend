"use client";

import { DashboardLayout } from "@/features/dashboard/dashboard-layout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedLayout;
