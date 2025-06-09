import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NID, utility } from "./constant";

const Documents = () => {
  const maxLength = Math.max(NID.length, utility.length);

  return (
    <div className="flex flex-col w-full bg-[#ffffff] rounded-[25px] ">
      <div className="flex items-center  gap-4 ">
        {Array.from({ length: maxLength }).map((_, index) => (
          <React.Fragment key={index}>
            {NID[index] && (
              <div key={`nid-${NID[index].id}`}>
                <Image
                  src={NID[index].idCard}
                  alt={NID[index].alt}
                  width={230}
                  height={115}
                />
              </div>
            )}
            {utility[index] && (
              <div key={`utility-${utility[index].id}`}>
                <Image
                  src={utility[index].idCard}
                  alt={utility[index].alt}
                  width={265}
                  height={108}
                />
              </div>
            )}
          </React.Fragment>
        ))}
        <Button className="w-[135px] h-[125px] bg-[#F1F1F1] rounded-[25px] text-[#1C2B38] ml-[60px] mr-[27px] hover:bg-[#E0E0E0]">
          More
        </Button>
      </div>
    </div>
  );
};

export default Documents;
