"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Pagination from "@/components/pagination";
import TableComponent from "@/components/table";
import { USER_COLUMN } from "../constant";

const InternalUserTable = (props: any) => {
  const { data, count, pagination, setState, isLoading } = props;

  const router = useRouter();

  const userActions = [
    {
      label: (
        <Icon
          icon="heroicons:eye-16-solid"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "View",
      onClick: (row: any) => router.push(`/users/${row.id}`),
    },
    {
      label: (
        <Icon
          icon="material-symbols:edit-outline-rounded"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "Edit",
      onClick: (row: any) => router.push(`/users/create?id=${row?.id}`),
    },
  ];

  return (
    <div className="flex flex-col gap-[15px]">
      <div>
        <TableComponent
          currentPage={pagination.page}
          columns={USER_COLUMN}
          data={data}
          isLoading={isLoading}
          actions={userActions}
        />
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={pagination.page}
          totalPages={
            count / pagination.recordsPerPage > 0
              ? Math.ceil(count / pagination.recordsPerPage)
              : Math.floor(count / pagination.recordsPerPage) + 1
          }
          onPageChange={(page: number) => {
            setState((prevState: any) => ({
              ...prevState,
              pagination: {
                ...prevState.pagination,
                page,
              },
            }));
          }}
        />
      </div>
    </div>
  );
};

export default InternalUserTable;
