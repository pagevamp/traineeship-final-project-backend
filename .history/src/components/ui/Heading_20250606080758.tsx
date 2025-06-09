interface HeadingProps {
  title?: string;
  description?: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-[45px] text-center">
      <h1 className="font-primary text-[30px]">{title}</h1>
      <p className="text-[#9C9AA5] font-normal">{description}</p>
    </div>
  );
};

export default Heading;
