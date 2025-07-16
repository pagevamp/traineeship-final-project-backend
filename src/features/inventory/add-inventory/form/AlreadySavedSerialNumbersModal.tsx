import { Button } from "@/components/ui/button";
import { AlertTriangle, Edit3, Trash2, X } from "lucide-react";
import React from "react";

const AlreadySavedSerialNumbersModal = (props: any) => {
  const {
    closeModal,
    data,
    defaultValues,
    handleDuplicateSerialNumbers,
    setModalShownForSavedSKU,
    setAlreadySavedSerialNumbers,
  } = props;

  function extractDuplicateVariations(productData: any, duplicate: any) {
    const result: any[] = [];

    productData?.productVariations?.forEach((variation: any, index: number) => {
      variation?.stockKeepingUnit?.forEach((skuObj: any) => {
        if (duplicate?.includes(skuObj.sku)) {
          result.push({
            index,
            name: variation?.productSizeName,
            serial: skuObj.sku,
          });
        }
      });
    });

    return result;
  }

  const result = extractDuplicateVariations(defaultValues, data);

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden font-secondary">
      {/* Header */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-800">
                Duplicate Serial Numbers Found
              </h2>
              <p className="text-red-600 text-sm">
                The following serial numbers are already in use
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setAlreadySavedSerialNumbers(null);
              setModalShownForSavedSKU(false);
              closeModal();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="w-full">
            <tr className="w-full">
              <th className="text-left border-2 border-black p-2 font-bold">
                S.N.
              </th>
              <th className="text-left border-2 border-black p-2 font-bold">
                Serial No.
              </th>
              <th className="text-left border-2 border-black p-2 font-bold">
                Size
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {result &&
              result?.length > 0 &&
              result?.map((data: any, idx: number) => (
                <tr
                  className="w-full text-left border-2 border-black p-2"
                  key={idx}
                >
                  <td className="text-left border-2 border-black p-2">
                    {idx + 1}
                  </td>
                  <td className="text-left border-2 border-black p-2">
                    {data?.serial}
                  </td>
                  <td className="text-left border-2 border-black p-2">
                    {data?.name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div>
              <p className="text-yellow-800 font-medium text-sm">
                Action Required
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                Each product must have a unique serial number. Please remove or
                modify the duplicates before saving.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-50 border-t border-gray-200 p-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            className="px-4 py-2 text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2 text-sm"
            onClick={() => {
              setAlreadySavedSerialNumbers(null);
              setModalShownForSavedSKU(false);
              closeModal();
            }}
          >
            <Edit3 className="w-4 h-4" />
            <span>Fix Manually</span>
          </button>

          <button
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 text-sm"
            onClick={() => {
              handleDuplicateSerialNumbers(result);
              setAlreadySavedSerialNumbers(null);
              setModalShownForSavedSKU(false);
              closeModal();
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove Duplicates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlreadySavedSerialNumbersModal;
