import React from "react";

interface HeadingProps {
  title?: string | React.ReactElement;
  description?: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-6 text-center">
      <h1 className="font-primary text-[26px]">{title}</h1>
      <p className="text-[#9C9AA5] text-sm font-normal">{description}</p>
    </div>
  );
};

export default Heading;
