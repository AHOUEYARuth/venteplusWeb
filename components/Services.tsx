import React from 'react';
import Service1 from "@/assets/images/sec2.jpg"; // sec2.jpg
import Service2 from "@/assets/images/sec3.svg"; //sec3.svg
import Service3 from "@/assets/images/sec4.svg"; // sec4.svg
import Service4 from "@/assets/images/sec1.jpg"; //sec1.jpg
import Separate from './Separate';
import Link from 'next/link';
import "@/style/style.scss";
import { FaArrowRight } from 'react-icons/fa';
const Services = () => {
    return (
      <div>
        <section className="w-full bg-white pt-[70] sm:px-6 lg:px-8">
          <div className="max-w-[80%] mx-auto">
            <div className="w-full flex flex-col justify-center items-center gap-10 text-center py-10">
              <h2 className="text-3xl font-semibold text-[#1c1c1c]">
                Nos Services
              </h2>
              <Separate />
              <div className="list w-full flex flex-col items-start gap-y-25 ">
                <div className="column item w-full flex  items-center justify-between">
                  <div
                    className="column-img w-[45%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${Service1.src})` }}
                  ></div>
                  <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                    <span className="text-5xl font-bold text-[#F39C12]">
                      01
                    </span>
                    <h3 className="text-3xl text-[#2C3E50] font-semibold">
                      Tableau de Bord
                    </h3>
                    <p className="text-xl text-gray-700">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat assumenda accusantium voluptas, veritatis natus
                      suscipit minima nobis expedita fuga nemo quis eveniet
                      illum eius praesentium autem totam, quasi asperiores
                      sequi?
                    </p>
                    <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                      <Link href="/services" className="">
                        Tout Explorer{" "}
                      </Link>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>

                <div className="column-reverse item w-full flex items-center justify-between">
                  <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                    <span className="text-5xl font-bold text-[#F39C12]">
                      02
                    </span>
                    <h3 className="text-3xl text-[#2C3E50] font-semibold">
                      Gestion Commerciale
                    </h3>
                    <p className="text-xl text-gray-700">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat assumenda accusantium voluptas, veritatis natus
                      suscipit minima nobis expedita fuga nemo quis eveniet
                      illum eius praesentium autem totam, quasi asperiores
                      sequi?
                    </p>
                    <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                      <Link href="/services" className="">
                        Tout Explorer{" "}
                      </Link>
                      <FaArrowRight />
                    </div>
                  </div>
                  <div
                    className="column-img w-[45%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${Service2.src})` }}
                  ></div>
                </div>

                <div className="column item w-full flex items-center justify-between ">
                  <div
                    className="column-img w-[45%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${Service3.src})` }}
                  ></div>
                  <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                    <span className="text-5xl font-bold text-[#F39C12]">
                      03
                    </span>
                    <h3 className="text-3xl text-[#2C3E50] font-semibold">
                      Gestion Comptable
                    </h3>
                    <p className="text-xl text-gray-700">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat assumenda accusantium voluptas, veritatis natus
                      suscipit minima nobis expedita fuga nemo quis eveniet
                      illum eius praesentium autem totam, quasi asperiores
                      sequi?
                    </p>
                    <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                      <Link href="/services" className="">
                        Tout Explorer{" "}
                      </Link>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>

                <div className="column-reverse item w-full flex litems-center justify-between ">
                  <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                    <span className="text-5xl font-bold text-[#F39C12]">
                      04
                    </span>
                    <h3 className="text-3xl text-[#2C3E50] font-semibold">
                      Boutique Virtuelle
                    </h3>
                    <p className="text-xl text-gray-700">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat assumenda accusantium voluptas, veritatis natus
                      suscipit minima nobis expedita fuga nemo quis eveniet
                      illum eius praesentium autem totam, quasi asperiores
                      sequi?
                    </p>
                    <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                      <Link href="/services" className="">
                        Tout Explorer{" "}
                      </Link>
                      <FaArrowRight />
                    </div>
                  </div>
                  <div
                    className="column-img w-[45%] h-[400px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${Service4.src})` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Services;

/* <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={Service1} 
                    alt="Create brands"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Create brands
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We create brands, interactions, communications, and a wide
                    variety of online daily. It is not only a work-motion but
                    also an energy of fulfilling, seemingly impossible tasks.
                  </p>
                </div>

                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-200">
                  Explore service →
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl font-bold text-gray-300">02</div>
                  <div className="space-y-4 flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      Care deeply
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We care deeply with a churning and vibrant business goals.
                      Our inner processes and what around contributing to these
                      goals. Because every personality impacts the focus
                      product, we cherish and consider all viewpoints.
                    </p>
                  </div>
                </div>

                <div className="aspect-square relative rounded-2xl overflow-hidden mt-4">
                  <Image
                    src={Service2} 
                    alt="Care deeply"
                    fill
                    className="object-cover"
                  />
                </div>

                <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  Case study →
                </button>
              </div>
            </div>
          </div> */