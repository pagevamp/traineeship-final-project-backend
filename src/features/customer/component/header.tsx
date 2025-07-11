"use client";

import { useMemo, useState } from "react";
import { headerDetails } from "./constant";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { capitalize } from "lodash";
import { Button } from "@/components/ui/button";
import { CUSTOMER_STATUS, DEPARTMENT_NAME } from "@/utils/handlers/roles";
import Link from "next/link";

const Header = ({ profileDetail }: { profileDetail?: any }) => {
  const firstInitial = useMemo(
    () =>
      profileDetail?.user?.firstName
        ? profileDetail?.user?.firstName?.charAt(0).toUpperCase() || "A"
        : profileDetail?.firstName?.charAt(0).toUpperCase() || "A",
    [profileDetail?.firstName, profileDetail?.user?.firstName]
  );

  const [ftlOpen, setFtlOpen] = useState(false);
  const [ltlOpen, setLtlOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <span className="font-primary text-[20px] text-[#1C2B38]">
          Company Information
        </span>

        {profileDetail?.currentActiveTransfer?.status ===
          CUSTOMER_STATUS.APPROVED &&
          profileDetail?.currentActiveTransfer?.department?.name ===
            DEPARTMENT_NAME.ADMIN_DEPARTMENT && (
            <Button
              variant={"default"}
              className="flex items-center px-8 text-white rounded hover:bg-primary"
            >
              Approved
            </Button>
          )}
        {profileDetail?.currentActiveTransfer?.status ===
          CUSTOMER_STATUS.REJECTED && (
          <Link href="/re-apply">
            <Button
              variant={"customGradient"}
              className="flex items-center px-8 text-white rounded"
            >
              {profileDetail?.currentActiveTransfer?.status ===
              CUSTOMER_STATUS.REJECTED
                ? "Re-apply"
                : ""}
            </Button>
          </Link>
        )}
        {profileDetail?.currentActiveTransfer?.status ===
          CUSTOMER_STATUS.RE_SUBMITTED && (
          <Button
            variant={"default"}
            className="flex items-center px-8 text-white rounded hover:bg-primary"
          >
            Pending
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-[24px]">
        <Avatar className="h-40 w-40 text-secondary text-xl bg-orange-500 flex items-center justify-center text-white outline-none">
          {firstInitial}
        </Avatar>

        <div className="w-full sm:max-w-[823px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {headerDetails
            .filter((detail) => detail.key !== "shipmentType")
            .map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>
                  <Icon icon={detail.icon} width="14" height="22" />
                </div>
                <p>
                  <span className="font-secondary text-[12px] font-normal">
                    {detail.label}:{" "}
                  </span>
                  <span className="font-primary text-[14px]">
                    {detail.key === "vehicleType" ? (
                      profileDetail?.[detail?.key]?.type
                    ) : detail?.key === "destinationCountry" ? (
                      profileDetail?.[detail?.key]?.join(", ")
                    ) : detail.key === "companyType" ? (
                      <span className="capitalize">
                        {capitalize(
                          profileDetail?.[detail?.key]?.split("_")?.join(" ")
                        )}
                      </span>
                    ) : (
                      profileDetail?.[detail?.key] ?? "N/A"
                    )}
                  </span>
                </p>
              </div>
            ))}

          {(() => {
            const shipmentDetail = headerDetails.find(
              (d) => d.key === "shipmentType"
            );
            if (!shipmentDetail) return null;
            const shipmentType = profileDetail?.shipmentType;
            const shipmentFtl = profileDetail?.shipmentFtl;
            const shipmentLtl = profileDetail?.shipmentLtl;
            return (
              <div className="flex flex-col gap-2 w-full col-span-2">
                <div className="flex items-center gap-2">
                  <Icon icon={shipmentDetail.icon} width="14" height="22" />
                  <span className="font-secondary text-[12px] font-normal">
                    {shipmentDetail.label}:
                  </span>
                  <span className="font-primary text-[14px] font-bold ml-1">
                    {shipmentType || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(shipmentType === "BOTH" || shipmentType === "FTL") &&
                    shipmentFtl && (
                      <div className="">
                        <button
                          type="button"
                          className="flex items-center gap-2 font-semibold text-[#FF6502] focus:outline-none"
                          onClick={() => setFtlOpen((o) => !o)}
                        >
                          <span className="font-secondary font-medium text-sm">
                            FTL Shipment Details
                          </span>
                          {ftlOpen && (
                            <span className={`transition-transform`}>
                              <Icon
                                icon="mingcute:up-line"
                                width="24"
                                height="24"
                              />
                            </span>
                          )}
                          {!ftlOpen && (
                            <span className={`transition-transform`}>
                              <Icon
                                icon="mingcute:down-line"
                                width="24"
                                height="24"
                              />
                            </span>
                          )}
                        </button>
                        {ftlOpen && (
                          <div className="text-xs text-gray-700 mt-1 space-y-2">
                            <div>
                              <span className="font-secondary text-[12px]">
                                No. of Trips:
                              </span>{" "}
                              <span className="font-primary text-[14px]">
                                {shipmentFtl.noOfTrips ?? "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="font-secondary text-[12px]">
                                Service Needed:
                              </span>{" "}
                              <span className="font-primary text-[14px] capitalize">
                                {capitalize(
                                  shipmentFtl.serviceNeeded
                                    ?.split("_")
                                    ?.join(" ")
                                ) ?? "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="font-secondary text-[12px]">
                                Type of Equipments:
                              </span>{" "}
                              <span className="font-primary text-[14px]">
                                {shipmentFtl.typeOfEquipments ?? "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="font-secondary text-[12px]">
                                Equipment Capacity:
                              </span>{" "}
                              <span className="font-primary text-[14px]">
                                {shipmentFtl.equipmentCapacity ?? "N/A"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  {(shipmentType === "BOTH" || shipmentType === "LTL") &&
                    shipmentLtl && (
                      <div>
                        <button
                          type="button"
                          className="flex items-center gap-2 font-semibold text-[#00B69B] focus:outline-none"
                          onClick={() => setLtlOpen((o) => !o)}
                        >
                          <span className="font-secondary text-sm font-medium">
                            LTL Shipment Details
                          </span>
                          {ltlOpen && (
                            <span className={`transition-transform`}>
                              <Icon
                                icon="mingcute:up-line"
                                width="24"
                                height="24"
                              />
                            </span>
                          )}
                          {!ltlOpen && (
                            <span className={`transition-transform`}>
                              <Icon
                                icon="mingcute:down-line"
                                width="24"
                                height="24"
                              />
                            </span>
                          )}
                        </button>
                        {ltlOpen && (
                          <div className="text-xs text-gray-700 mt-1 space-y-2">
                            <div>
                              <span className="font-secondary text-[12px]">
                                No. of Shipments Per Lane:
                              </span>{" "}
                              <span className="font-primary text-[14px]">
                                {shipmentLtl.noOfShipmentsPerLane ?? "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="font-secondary text-[12px]">
                                Weight Per Shipment Per Lane:
                              </span>{" "}
                              <span className="font-primary text-[14px]">
                                {shipmentLtl.weightPerShipmentPerLane ?? "N/A"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Header;
