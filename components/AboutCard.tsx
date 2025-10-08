import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <div className="lg:w-[470px] lg:h-[300px] md:w-[600px] md:h-[250px] bg-[#F9FAFB] flex flex-col items-start justify-between rounded-xl text-start p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl text-[#2C3E50] font-semibold">{title}</h3>
      <p className="text-xl mt-5 text-gray-700">{description}</p>
    </div>
  );
};

export default InfoCard;
