"use client";
import Pagination from "@/components/pagination";
import TableComponent from "@/components/table";
import { CUSTOMER_PRODUCT_COLUMN } from "./constant";

const ProductTable = (props: any) => {
  const { data, count, pagination, setState, isLoading } = props;

  return (
    <div className="flex flex-col gap-[15px]">
      <div>
        <TableComponent
          currentPage={pagination.page}
          columns={CUSTOMER_PRODUCT_COLUMN}
          data={data}
          isLoading={isLoading}
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

export default ProductTable;
