"use client";
import React from "react";
import Header from "./Header";
import { useParams } from "next/navigation";
import { useGetUserDetail } from "../../hooks";
import { PageLoader } from "@/components/loaders/page-loader";

const Index = () => {
  const params = useParams();
  const { id } = params as { id: string };

  // fetching user details
  const { data: userDetail, isLoading, isError } = useGetUserDetail(id);
  const getUserDetail = userDetail?.data?.data;

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-full mx-auto">
        <div className="mb-4">
          <Header userDetail={getUserDetail} />
        </div>
      </div>
    </div>
  );
};

export default Index;
