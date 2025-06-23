"use client";

import Image from "next/image";
import { UserDetail } from "../../types";

interface HeaderProps {
  userDetail: UserDetail;
}
const Header = ({ userDetail }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <span className="font-primary text-[20px] text-[#1C2B38]">
          User Information
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-[24px]">
        <div className="w-full sm:max-w-[823px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center flex-wrap gap-2">
            <Image src={"/pencil.svg"} alt={`icon`} width={14} height={22} />
            <span className="font-secondary whitespace-nowrap text-[12px] font-normal">
              {"Full Name"}:
            </span>
            <span className="font-primary text-[14px] font-normal font-weight-200">
              {userDetail?.firstName || "N/A"} {userDetail?.lastName}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Image
              src={"/system_security_update.svg"}
              alt={`icon`}
              width={14}
              height={22}
            />

            <span className="font-secondary whitespace-nowrap text-[12px] font-normal">
              {"Employee Id"}:
            </span>
            <span className="font-primary text-[14px] font-normal font-weight-200">
              {userDetail?.employeeId}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Image
              src={"/share_location.svg"}
              alt={`icon`}
              width={14}
              height={22}
            />

            <span className="font-secondary flex-wrap text-[12px] font-normal">
              {"Email"}:
            </span>
            <span className="font-primary text-[14px] font-normal font-weight-200">
              {userDetail?.email}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Image
              src={"/share_location.svg"}
              alt={`icon`}
              width={14}
              height={22}
            />

            <span className="font-secondary whitespace-nowrap text-[12px] font-normal">
              {"Phone Number"}:
            </span>
            <span className="font-primary text-[14px] font-normal font-weight-200">
              {`${userDetail?.countryCode || "N/A"} - ${
                userDetail?.phoneNumber || "N/A"
              }`}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Image
              src={"/document_scanner.svg"}
              alt={`icon`}
              width={14}
              height={22}
            />

            <span className="font-secondary whitespace-nowrap text-[12px] font-normal">
              {"Department"}:
            </span>
            <span className="font-primary text-[14px] font-normal font-weight-200">
              {userDetail?.departments?.[0]?.department?.name || "N/A"}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Image src={"/pencil.svg"} alt={`icon`} width={14} height={22} />

            <span className="font-secondary whitespace-nowrap text-[12px] font-normal">
              {"Designation"}:
            </span>
            <span className="font-primary text-[14px] font-normal font-weight-200">
              {userDetail?.departments?.[0]?.designation?.name || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
