// components/ui/InfoBox.tsx

import Image from "next/image";

interface BoxProps {
  imgSrc: string;
  title: string;
  number: number | string;
}

const Box = ({ imgSrc, title, number }: BoxProps) => {
  return (
    <div className="w-full h-[120px] bg-white rounded-[25px] flex items-center px-[26px] py-[25px]">
      <div className="flex items-center gap-4 w-full">
        <Image
          src={imgSrc}
          alt={title}
          width={70}
          height={70}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="text-[16px] font-primary text-[#510688]">
            {title}
          </span>
          <span className="text-[18px] font-[Inter] font-semibold text-[#000000]">
            {number}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Box;
