'use client';
import Image from "next/image";
import Faild from "@/../public/images/Faild.svg";
import start from "@/../public/images/start-with-us.jpg";
import { useEffect } from "react";
import Logo from "@/../public/images/Logo.png";
import Link from "next/link";

const Successfull = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('brands');
            localStorage.removeItem('brandModels');
            localStorage.removeItem('country');
        }
    }, []);

    return (
        <div className="relative h-screen w-screen">
            <Image
                src={start}
                alt="start with us"
                className="absolute inset-0 h-screen w-screen object-cover hidden xl:block"
            />
            <Link href={'/'}>
                <Image
                    src={Logo}
                    alt="start with us"
                    className="absolute left-10 top-10 hidden xl:block"
                />
            </Link>

            <div className="z-[1000000]  min-h-screen items-center justify-center overflow-auto bg-bg_white  flex">
                <div className="relative flex h-[780px] w-full max-w-[650px] flex-col rounded-lg bg-bg_white px-[20px] xs:px-[30px] sm:px-[60px]  py-[20px] md:py-[60px] lg:shadow-lg">
                    <div className="flex flex-shrink-0 flex-col items-center justify-center">
                        <Image alt="failed image" className="mb-[10px]" src={Faild} />
                        <h2 className="pre_landing_page_title font-inter">
                        Incomplete checkout
                        </h2>
                        <p className="pre_landing_page_text">
                            {`Please check your details and try again. If the issue persists, contact our support team for assistance`}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Successfull;
