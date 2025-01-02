import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";


export interface PricingPlan {
    name: string;
    description: string;
    price: string | number;
    features: string[];
    compliment?: string;
    isYearly?: boolean,
    slotMinimum: number
}

const Card: React.FC<{ data: PricingPlan, isYearly: boolean }> = ({ data, isYearly }) => {
 
    const router = useRouter()

    const handleNext = () => {
        router.push('/collections/submit-details')
        const price_plan = { ...data, isYearly }
        localStorage.setItem('price_plan', JSON.stringify(price_plan))
    }

    return (
        <div
            className={`w-[320px] border border-bg_dusty_white rounded-md p-[20px]`}
        >
            <div className="flex flex-col items-start justify-between gap-[20px]">
                {/* {name !== "Smart Fleet" && name !== 'Smart Fleet Pro' && (
                    <button
                        className={`hero_btn group absolute right-[0px] top-[10px] rounded-[3px] bg-[#02636F] px-[10px] py-[4px] text-[14px] font-semibold text-bg_white`}
                    >
                        <span>Upcoming</span>
                    </button>
                )} */}
                <div className="flex w-full  flex-col  font-openSans">
                    <div>
                        <h5 className="text-[18px] font-bold text-ti_royel_blue">
                            {data?.name}
                        </h5>
                        <p className="text-ti_dark_grey text-[16px] font-normal leading-[24px]">
                            {data?.description}
                        </p>
                    </div>
                    <div className=" flex items-center gap-[1px] mt-[10px] font-inter text-[36px] font-bold text-ti_black">
                        <h1 className="text-ti_black text-[32px] font-bold">
                            {'$'}{data?.price}
                        </h1>

                        <h1 className="mt-[7px] font-openSans text-[14px] font-semibold text-ti_grey">
                            <span className="mr-[5px] text-ti_black">{`.99`}</span>
                            {`/month`}
                        </h1>
                    </div>

                    <h1 className=" text-ti_dark_grey font-inter text-[12px] leading-[16px] ">Minimum slot purchase: <span className=" text-ti_black font-medium">{data?.slotMinimum}</span></h1>

                    {isYearly && <h1 className=" mt-[5px] font-inter text-[12px] leading-[17px] font-medium text-ti_light_black">Billed Annually</h1>}


                    <button
                        onClick={handleNext}
                        className={`hero_btn group relative   bg-p_blue transition-all duration-500 ease-in-out    py-[8px] mt-[15px] mb-[20px] px-[14px] text-[14px] hover:group-default font-inter font-semibold`}  >
                        <span className="">Choose plan</span>
                    </button>

                    <div className=" space-y-[16px] mt-[5px]">
                        {/* {data?.compliment && (
                            <p className="text-[12px] font-inter leading-[16px] text-ti_dark_grey">{data.compliment}</p>
                        )} */}
                        {/* {data?.features && data?.features.map((feature, idx) => (
                            <div className="" key={idx}>
                                <div className="flex items-center gap-[10px]">
                                    <Check className="rounded-full bg-p_blue  text-bg_white p-[3px]" size={16} />
                                    <h1 className="text-ti_light_black text-[12px] leading-[16px] font-inter">{feature}</h1>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Card;
