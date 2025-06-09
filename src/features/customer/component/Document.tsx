import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NID, utility } from "./constant";

const Documents = () => {
  const maxLength = Math.max(NID.length, utility.length);

  return (
    <div className="flex flex-col w-full bg-white rounded-[25px] p-x-2 py-4 md:p-6">
      <div className="flex flex-wrap items-center gap-4 justify-start">
        {Array.from({ length: maxLength }).map((_, index) => (
          <React.Fragment key={index}>
            {NID[index] && (
              <div key={`nid-${NID[index].id}`}>
                <Image
                  src={NID[index].idCard}
                  alt={NID[index].alt}
                  width={220}
                  height={115}
                  className="rounded-lg object-contain"
                />
              </div>
            )}
            {utility[index] && (
              <div key={`utility-${utility[index].id}`}>
                <Image
                  src={utility[index].idCard}
                  alt={utility[index].alt}
                  width={230}
                  height={108}
                  className="rounded-lg object-contain"
                />
              </div>
            )}
          </React.Fragment>
        ))}
        <Button className="w-[130px] h-[115px] bg-[#F1F1F1] rounded-[25px] text-[#1C2B38] hover:bg-[#E0E0E0] mt-2 md:mt-0">
          More
        </Button>
      </div>
    </div>
  );
};

export default Documents;
