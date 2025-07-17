"use client";
import React, { useMemo } from "react";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { PageLoader } from "@/components/loaders/page-loader";
import Header from "@/features/customer/component/header";
import InfoBar from "@/features/customer/component/InfoBar";
import { USER_ROLE } from "@/utils/handlers/roles";
import ImporterProfile from "./ImporterProfile";

const ProfileComponent = () => {
  const { data: profileInformationData, isLoading } = useProfileInformation();
  const profileDetail = useMemo(
    () => profileInformationData?.data?.data,
    [profileInformationData?.data?.data]
  );

  const userType = useMemo(
    () => profileDetail?.user?.userType,
    [profileDetail]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      {userType === USER_ROLE.IMPORTER ? (
        <ImporterProfile profileData={profileDetail} />
      ) : (
        <>
          <div className="mb-4">
            <Header profileDetail={profileDetail} />
          </div>
          <div className="mb-4 w-full">
            <InfoBar profileDetail={profileDetail} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileComponent;
