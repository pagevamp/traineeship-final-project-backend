import Image from "next/image";

interface BoxProps {
  imgSrc: string;
  title: string;
  number: number | string;
}

const Box = ({ imgSrc, title, number }: BoxProps) => {
  return (
    <div className="w-full h-auto bg-white rounded-[25px] overflow-x-hidden flex flex-col sm:flex-row items-center sm:justify-start px-4 sm:px-4 py-4 sm:py-4 gap-4 sm:gap-4">
      <div className="flex-shrink-0">
        <Image
          src={imgSrc}
          alt={title}
          width={60}
          height={60}
          className="rounded-full object-cover w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
        />
      </div>
      <div className="flex flex-col justify-center text-center sm:text-left w-full min-w-0">
        <span className="text-[14px] sm:text-[16px] font-primary text-[#510688] truncate">
          {title}
        </span>
        <span className="text-[16px] sm:text-[18px] font-secondary font-semibold text-black truncate">
          {number}
        </span>
      </div>
    </div>
  );
};

export default Box;
