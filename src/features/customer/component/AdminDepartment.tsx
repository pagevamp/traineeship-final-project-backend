import { Upload, FilePenLine, Download } from "lucide-react";
import Image from "next/image";
import { actions } from "./constant";

const Admin = () => {
  return (
    <div className="w-full bg-white rounded-[25px] px-4 md:px-[49px] py-6 md:h-[126px] flex flex-col items-center justify-center">
      <h2 className="font-primary text-[16px] text-[#1C2B38] text-center mb-4">
        Admin Department
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 md:gap-x-[61px] w-full justify-items-center">
        {actions.map(({ label, image, color }, idx) => (
          <div
            key={idx}
            className="w-full max-w-[300px] h-[48px] border rounded-lg flex items-center justify-center gap-6 px-4"
            style={{ borderColor: color }}
          >
            <span className="font-primary text-[14px]" style={{ color }}>
              {label}
            </span>
            <Image src={image} alt="icons" width={20} height={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
