
import Logo from "../../../../public/images/NavLogo.svg";
import Image from "next/image";

import Link from "next/link";
import CustomeButton from "@/components/shared/CustomButton";

const Index: React.FC = () => {

  return (
    <div className="fixed lg2:block hidden left-0 right-0 top-0 z-[10000] bg-bg_white/30 shadow-sm backdrop-blur-3xl">
      <div className="z-[400000000] mx-auto flex w-full max-w-[1920px] items-center px-4 py-[18px] sm:px-6 md:px-8 lg:px-10 xl:px-[60px] 2xl:px-[80px] 3xl:px-[100px]">
        <div className="z-[400000000] flex w-full items-center justify-between">
          <div className="flex items-center gap-x-[40px]">
            <Link href="/">
              <Image src={Logo} alt="logo" className="h-[24px] w-[136.923px]" />
            </Link>

          </div>
          <div className="flex items-center gap-[10px]">
            <CustomeButton href="/collections/select-country" text="Get early Access" className="mt-0" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Index;
