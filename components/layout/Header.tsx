import Hero from "@/assets/images/hero4.svg";
import "@/style/main.css";
const Header = () => {
  return (
    <section
      className="w-full sm:w-[100%] relative min-h-[calc(100vh-104px)]  flex justify-center items-center text-center overflow-hidden bg-contain  bg-no-repeat mt-[80]"
      style={{ backgroundImage: `url(${Hero.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from--[#F39C12]/70 via-[#F39C12]/40 to-transparent" />

      <div className="container md:justify-center  lg:justify-end mx-auto px-4 relative z-10 flex flex-col items-end gap-4 text-white">
        <div className="lg:w-[50%] md:w-full sm:w-[100%]">
          <h1 className="lg:text-5xl md:text-5xl text-sm font-bold drop-shadow-lg">
            Digitalisez votre marché en
            <span className="text-[#000000]"> un clic</span>
          </h1>

          <p className="p  md:text-2xl text-gray-100 drop-shadow text-white">
            Remplacez le cahier par une solution simple, visuelle et adaptée à
            votre quotidien
          </p>

          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            <button className="bg-[#F39C12] cursor-pointer text-white text-xl px-6 py-2 rounded-full transition hover:bg-white hover:text-[#2C3E50]">
              Commencer
            </button>
            <button className="bg-white text-[#2C3E50] cursor-pointer text-xl px-6 py-2 rounded-full transition hover:bg-[#F39C12] hover:text-white">
              explorer
            </button>
            <button className="bg-white text-[#2C3E50] cursor-pointer text-xl px-6 py-2 rounded-full transition hover:bg-[#F39C12] hover:text-white">
              en savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
