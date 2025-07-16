"use client";
import React, { useMemo } from "react";
import DetailPage from "./DetailPage";
import { useParams } from "next/navigation";
import { PageLoader } from "@/components/loaders/page-loader";
import { useGetImporterDetails } from "../hooks";

const Index = () => {
  const params = useParams();
  const { id } = params as { id: string };
  //get importer detail data
  const { data: importerDetails, isLoading } = useGetImporterDetails(id);

  const importerDetail = useMemo(
    () => importerDetails?.data?.data,
    [importerDetails?.data?.data]
  );
  if (isLoading) {
    return <PageLoader />;
  }

  return <DetailPage importerDetail={importerDetail} />;
};

export default Index;
