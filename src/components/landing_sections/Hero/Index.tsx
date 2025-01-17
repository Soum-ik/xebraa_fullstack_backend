import React from "react";

import CustomeButton from "@/components/shared/CustomButton";
import { HeroSection } from "@/Static_data/data";
import Image from "next/image";

// hero backend
import HeroBanner from "@/../public/images/HeroBanner.svg";
import HeroPng from "@/../public/images/PHN.png";
import Tab from "@/../public/images/Tab.png";

import Logo from "../../../../public/images/NavLogo.svg";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="mx-auto w-full">
      {/* hero background */}
      <Image
        alt="image"
        src={HeroBanner}
        className="absolute left-0 right-0 top-0 z-[-1] mx-auto min-h-[539.656px] w-full object-cover"
      />
      <div className="absolute -top-[150px] right-0 size-[500px] rounded-full bg-p_blue opacity-60 blur-[160px]"></div>

      <div className="relative mx-auto flex max-w-[1980px] flex-col items-start justify-between overflow-hidden lg2:flex-row lg2:gap-[60px]">
        <div className="absolute left-0 top-0 size-[156px] flex-shrink-0 rounded-full bg-bg_yellow opacity-50 blur-[40px] lg2:-top-[260px] lg2:left-[150px] lg2:size-[698px] lg2:blur-[180px] 2.5xl:left-[0px]"></div>

        {/* left side content */}
        <div className="custom_padding z-[1] mx-auto mt-[40px] w-full max-w-[1920px] lg2:mt-[130px] lg2:w-3/5 lg2:pl-[80px] lg2:pr-[0px] 3xl:mx-auto 3xl:ml-[30px] 3xl:px-[100px]">
          <div className="mb-[40px] flex lg2:hidden">
            <Link href="/">
              <Image
                src={Logo}
                alt="logo"
                className="h-[24px] w-[136.923px] object-contain"
              />
            </Link>
          </div>

          <h5 className="hero_title font-openSans text-[18px] text-[#7D7D7D] lg:text-[20px] 2xl:text-[22px]">
            Cloud Based Fleet Management
          </h5>
          <h1 className="hero_title pt-[10px] font-montserrat text-[40px] text-ti_royel_blue 2xl:text-[40px] 2.5xl:text-[48px] 3xl:text-[52px]">
            Optimize Your Fleet  <br className="hidden lg2:block" />{" "}
            Operations with FleetBlox
          </h1>

          <p className="hero_text mt-[16px] leading-[24px] max-w-[800px] text-[16px] text-website_text_color_dark_grey xl:w-[500px] 2xl:w-[800px] 2xl:max-w-[600px] 2.5xl:w-[800px] 2.5xl:max-w-[700px] 3xl:max-w-[900px]">
            Boost your fleet performance with FleetBlox, the all-in-one cloud-based AI platform designed to make fleet management simple and efficient.
          </p>
          <div className="mt-[32px] flex flex-col items-center gap-[10px] md:gap-[20px] md:max-w-max md:flex-row">
            <CustomeButton
              href="/collections/select-country"
              text="Get early Access"
              className="w-full"
            />
            {/* <div className="group min-w-max   font-openSans text-[16px] font-semibold text-p_dark_blue">
              And Get Up to 15% Discount
            </div> */}
          </div>
          <div className="mt-[50px] hidden max-w-max lg2:block">
            <h4 className="font-openSans text-[16px] font-semibold text-ti_grey">
              What We Provide
            </h4>
            <div className="mt-[10px] space-y-[10px]">
              {HeroSection.map((item, idx) => (
                <div
                  className="flex items-center gap-[10px] py-[5px]"
                  key={idx}
                >
                  <Image
                    className="size-[20px]"
                    alt={item.title}
                    src={item.icon}
                  />
                  <h1 className="font-openSans text-[16px] font-semibold leading-[24px] text-ti_dark_grey">
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side content */}
        <div className="relative mt-[60px] flex h-[320px] w-full items-center justify-center lg2:my-[60px] lg2:ml-[120px] lg2:mt-[130px] lg2:block lg2:h-[690px] lg2:w-1/2 lg2:px-0 2xl:-ml-[15px]">
          <Image
            alt="Tab"
            src={Tab}
            className="absolute top-0 ml-[14px] mt-[3px] xxxs:h-[240.804px] xxs:w-[350px] xs:h-[300px] xs:w-[450px] lg2:ml-[4px] md:w-[550px] md:h-[350px] lg2:h-[544px] lg2:min-w-[853px]"
          />

          <div className="absolute top-3 flex h-[200px]  w-[310px] xxxs:w-[345px] xxs:w-[320px] xs:h-[250px] xs:w-[405px] md:-ml-[8px] lg2:ml-[0px] lg2:left-6 lg2:top-4 md:h-[300px] md:w-[500px] lg2:h-[468px] lg2:w-[780px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full rounded-xl object-fill md:rounded-2xl lg2:rounded-3xl"
            >
              <source
                src="/videos/HeroVideo.mp4"
                className=""
                type="video/mp4"
              />
            </video>
          </div>

          <Image
            alt="image"
            // className="absolute -left-[120px] object-contain xl:bottom-[10px] xl:h-[350px] xl:w-[300px] 2xl:-left-[180px] 2xl:bottom-[110px] 2xl:h-[400px] 2xl:w-[400px] 2.5xl:-left-[185px] 2.5xl:bottom-[0px] 2.5xl:h-[550px] 2.5xl:w-[500px]"
            className="absolute -left-[150px] bottom-[25px] hidden h-[550px] w-[330px] lg2:block"
            src={HeroPng}
            quality={60}
          />
        </div>



        <div className="custom_padding   sm:mt-[60px] w-full lg2:hidden">
          <h4 className="font-openSans text-[16px] font-semibold text-ti_grey">
            What We Provide
          </h4>
          <div className="mt-[10px] space-y-[10px]">
            {HeroSection.map((item, idx) => (
              <div className="flex items-start gap-[10px] py-[5px]" key={idx}>
                <Image
                  className="size-[28px]"
                  alt={item.title}
                  src={item.icon}
                />
                <h1 className="font-openSans text-[16px] font-semibold leading-[24px] text-[#333333]">
                  {item.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
