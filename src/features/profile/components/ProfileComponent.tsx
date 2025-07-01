"use client";
import React, { useMemo } from "react";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { PageLoader } from "@/components/loaders/page-loader";
import Header from "@/features/customer/component/header";
import InfoBar from "@/features/customer/component/InfoBar";

const ProfileComponent = () => {
  const { data: profileInformationData, isLoading } = useProfileInformation();
  const profileDetail = useMemo(
    () => profileInformationData?.data?.data,
    [profileInformationData?.data?.data]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="mb-4">
        <Header profileDetail={profileDetail} />
      </div>
      <div className="mb-4 w-full">
        <InfoBar profileDetail={profileDetail} />
      </div>
    </div>
  );
};

export default ProfileComponent;
