import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CustomerRegister2Props, FieldName } from "../types";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";
import {
  DESTINATION_COUNTRY,
  getNatureOfBusinessOptions,
  ServiceNeeded,
  SHIPMENT_TYPE,
  TypeOfEquipment,
} from "../constant";
import { Icon } from "@iconify/react/dist/iconify.js";

const Register2 = (props: CustomerRegister2Props) => {
  const {
    register,
    control,
    setValue,
    trigger,
    errors,
    defaultValues,
    getVehicleType,
    isVehicleTypeLoading,
  } = props;

  const vehicleType = useMemo(
    () => getVehicleType?.data?.data?.items,
    [getVehicleType?.data?.data?.items]
  );
  return (
    <motion.div
      className="text-[16px] w-full px-3 mt-[10px] flex justify-center"
      initial={{ x: 10, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 gap-y-[18px] mb-8 w-full max-w-[500px]">
        <div>
          <Controller
            name="natureOfBusiness"
            control={control}
            render={({ field, fieldState: { error } }: any) => {
              return (
                <div>
                  <Selectbox
                    options={getNatureOfBusinessOptions()}
                    value={field?.value}
                    onChange={(value) => {
                      setValue("natureOfBusiness", value?.value);
                      trigger("natureOfBusiness");
                    }}
                    placeholder="Select Nature of Business"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                    label="Nature of Business"
                    error={error?.message}
                  />
                  {error && (
                    <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                      <Icon
                        icon="solar:close-square-bold"
                        width="14"
                        height="14"
                        className="text-destructive"
                      />
                      <span className="mt-0">{error?.message}</span>
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <Controller
            name="vehicleType.id"
            control={control}
            render={({ field, fieldState: { error } }: any) => {
              return (
                <div>
                  <Selectbox
                    options={
                      isVehicleTypeLoading
                        ? [{ label: "Loading...", value: "" }]
                        : vehicleType?.map((type: any) => ({
                            label: type?.type,
                            value: type.id,
                          }))
                    }
                    value={field?.value}
                    onChange={(value) => {
                      setValue("vehicleType.id", value?.value);
                      trigger("vehicleType.id");
                    }}
                    placeholder="Select Type Of Truck"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                    label="Type Of Truck"
                    error={error?.message}
                  />
                  {error && (
                    <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                      <Icon
                        icon="solar:close-square-bold"
                        width="14"
                        height="14"
                        className="text-destructive"
                      />
                      <span className="mt-0">{error?.message}</span>
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <Controller
            name="destinationCountry"
            control={control}
            render={({ field, fieldState: { error } }: any) => {
              return (
                <div>
                  <Selectbox
                    options={DESTINATION_COUNTRY?.map((destination: any) => ({
                      label: destination?.label,
                      value: destination?.value,
                    }))}
                    value={field?.value}
                    onChange={(value) => {
                      setValue("destinationCountry", value?.value);
                      trigger("destinationCountry");
                    }}
                    placeholder="Select Destination Country"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                    label="Destination Country"
                    error={error?.message}
                  />
                  {error && (
                    <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                      <Icon
                        icon="solar:close-square-bold"
                        width="14"
                        height="14"
                        className="text-destructive"
                      />
                      <span className="mt-0">{error?.message}</span>
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <Controller
            name="shipmentType"
            control={control}
            render={({ field, fieldState: { error } }: any) => {
              return (
                <div>
                  <Selectbox
                    options={SHIPMENT_TYPE?.map((type: any) => ({
                      label: type?.label,
                      value: type?.value,
                    }))}
                    value={field?.value}
                    onChange={(value) => {
                      const selectedType = value?.value;
                      setValue("shipmentType", selectedType);
                      trigger("shipmentType");

                      const resetFields: Record<FieldName, any> = {
                        "shipmentFtl.equipmentCapacity": "",
                        "shipmentFtl.noOfTrips": undefined,
                        "shipmentFtl.serviceNeeded": "",
                        "shipmentFtl.typeOfEquipments": "",
                        "shipmentLtl.noOfShipmentsPerLane": undefined,
                        "shipmentLtl.weightPerShipmentPerLane": undefined,
                      };

                      Object.entries(resetFields).forEach(([field, val]) => {
                        setValue(field as FieldName, val);
                      });

                      // Trigger all related fields at once
                      trigger(Object.keys(resetFields) as FieldName[]);
                    }}
                    placeholder="Select Shipment Type"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                    label="Shipment Type"
                    error={error?.message}
                  />
                  {error && (
                    <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                      <Icon
                        icon="solar:close-square-bold"
                        width="14"
                        height="14"
                        className="text-destructive"
                      />
                      <span className="mt-0">{error?.message}</span>
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>
        {(defaultValues?.shipmentType === "FTL" ||
          defaultValues?.shipmentType === "BOTH") && (
          <>
            <div>
              <Input
                type="text"
                name="shipmentFtl.noOfTrips"
                register={register}
                placeholder="Enter No. of trips/month"
                labelName="No. of trips/month"
                required
                numberType
                error={errors?.shipmentFtl?.noOfTrips?.message}
              />
            </div>

            <div>
              <Controller
                name="shipmentFtl.typeOfEquipments"
                control={control}
                render={({ field, fieldState: { error } }: any) => {
                  return (
                    <div>
                      <Selectbox
                        options={TypeOfEquipment?.map((type: any) => ({
                          label: type?.label,
                          value: type?.value,
                        }))}
                        value={field?.value}
                        onChange={(value) => {
                          setValue(
                            "shipmentFtl.typeOfEquipments",
                            value?.value
                          );
                          trigger("shipmentFtl.typeOfEquipments");
                        }}
                        placeholder="Select Type Of Equipment"
                        emptyText="No data found."
                        className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                        label="Type Of Equipment"
                        error={error?.message}
                      />
                      {error && (
                        <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                          <Icon
                            icon="solar:close-square-bold"
                            width="14"
                            height="14"
                            className="text-destructive"
                          />
                          <span className="mt-0">{error?.message}</span>
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div>
              <Controller
                name="shipmentFtl.serviceNeeded"
                control={control}
                render={({ field, fieldState: { error } }: any) => {
                  return (
                    <div>
                      <Selectbox
                        options={ServiceNeeded?.map((service: any) => ({
                          label: service?.label,
                          value: service?.value,
                        }))}
                        value={field?.value}
                        onChange={(value) => {
                          setValue("shipmentFtl.serviceNeeded", value?.value);
                          trigger("shipmentFtl.serviceNeeded");
                        }}
                        placeholder="Select Service Needed"
                        emptyText="No data found."
                        className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                        label="Service Needed"
                        error={error?.message}
                      />
                      {error && (
                        <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                          <Icon
                            icon="solar:close-square-bold"
                            width="14"
                            height="14"
                            className="text-destructive"
                          />
                          <span className="mt-0">{error?.message}</span>
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div>
              <Input
                type="text"
                name="shipmentFtl.equipmentCapacity"
                register={register}
                placeholder="Enter Equipment Capacity"
                labelName="Equipment Capacity"
                required
                error={errors?.shipmentFtl?.equipmentCapacity?.message}
              />
            </div>
          </>
        )}
        {(defaultValues?.shipmentType === "LTL" ||
          defaultValues?.shipmentType === "BOTH") && (
          <>
            <div>
              <Input
                type="text"
                name="shipmentLtl.noOfShipmentsPerLane"
                register={register}
                placeholder="Enter No. of Shipments Per Lane"
                labelName="No. of Shipments Per Lane"
                required
                numberType
                error={errors?.shipmentLtl?.noOfShipmentsPerLane?.message}
              />
            </div>

            <div>
              <Input
                type="text"
                name="shipmentLtl.weightPerShipmentPerLane"
                register={register}
                placeholder="Enter Weight Per Shipment Per Lane"
                labelName="Weight Per Shipment Per Lane"
                required
                numberType
                error={errors?.shipmentLtl?.weightPerShipmentPerLane?.message}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Register2;
