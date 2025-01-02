import CustomeButton from "@/components/shared/CustomButton";
import linkdin from '@/../public/images/Footer/Linkedin.svg'
// import Discord from '@/../public/images/Footer/Discord.svg'
// import Instagram from '@/../public/images/Footer/Instagram.svg'
// import X from '@/../public/images/Footer/X.com.svg'
// import Youtube from '@/../public/images/Footer/Youtube.svg'
import Image from "next/image";

const Index: React.FC = () => {
  return (
    <div>

      <div className="h-auto w-full   bg-bg_dark_blue">
        <div className="mx-auto  max-w-[1920px]">
          <div className="  pb-[50px]   sm:pb-[75px]   md:pb-[100px] custom_padding xl:px-[110px] xl:pb-[70px] 2xl:px-[170px] 2xl:pb-[125px] 3xl:px-[310px]">
            {/* animation */}
            <div className="relative flex flex-col items-center justify-center py-[120px]">
              <h1 className="footer_title z-[300] font-montserrat text-[36px] xl:text-[33px] 2xl:text-[40px] 2.5xl:text-[52px]">
                Get Up to 15% Off — Show Early <br /> Interest Before We Launch!
              </h1>
              <CustomeButton href="/collections/select-country" text="Get my discount" className=" capitalize z-[110] mt-[32px]" />


              <div className="absolute lg2:-top-[50px] z-[90] lg2:size-[450px] size-[300px] xxxs:size-[340px] rounded-full bg-p_light_blue opacity-20 lg2:blur-[210px] blur-[123px] 2xl:size-[600px]"></div>
            </div>

            <div className=" z-[300] flex items-center  justify-center flex-col gap-[10px]">
              <div className="flex z-[300] cursor-pointer items-center gap-[10px] text-bg_white">
                <a target="_blank" href="https://www.linkedin.com/company/105785475">
                  <Image className  =" size-[24px]" src={linkdin} alt="linkdin" /></a>
              </div>
              <h5 className="footer_text font-semibold">©2024 Fleetblox</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
