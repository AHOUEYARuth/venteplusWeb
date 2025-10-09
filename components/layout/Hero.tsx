import React from 'react';

interface HeroProps {
  title: string;
}

const Hero: React.FC<HeroProps> = ({ title}) => {
  return (
    <section className="w-full sm:w-[100%] relative h-[60vh]  flex justify-center items-center text-center overflow-hidden mt-[80]">
      <div className="absolute inset-0 bg-gradient-to-t from--[#F39C12]/70 via-[#F39C12]/40 to-transparent" />

      <div className="container justify-center  mx-auto px-4 relative z-10 flex flex-col items-center gap-4 text-white">
        <div className="lg:w-[50%] md:w-full sm:w-[100%]">
          <h1 className="lg:text-5xl md:text-5xl text-sm font-bold drop-shadow-lg">
           {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;