'use client'
import { Tabs, } from "@/components/ui/tabs";
import BillingToggle from '@/app/collections/submit-details/toggler'

// import manage from '@/../public/images/manage.svg'
// import manage_select from '@/../public/images/manage-select.svg'
// import business from '@/../public/images/business.svg'
// import business_select from '@/../public/images/bussiness-select.svg'
// import Image from "next/image";

import { useEffect, useState } from "react"; 
import Card from "./Card";

const PriceingPlan = () => {
  // const [selectedValue, setSelectedValue] = useState("manage");
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState([])
  useEffect(() => {
    const response = async () => {
      const res = await fetch( 'https://backend.illama360.com/api/subscription/plans')
      const data = await res.json()
      setPlans(data.data)
    }
    response()
  }, [])

  console.log(plans);
  

  return (
    // <div className="relative bg-bg_white rounded-lg md:shadow-lg w-full max-w-[800px] h-[90vh] md:h-[80vh] flex flex-col px-[20px] xs:px-[30px] sm:px-[60px] py-[20px] md:py-[60px] ">
    //   <div className=" mb-[40px] flex-shrink-0 flex flex-col items-center">
    //     <h2 className="pre_landing_page_title font-inter">
    //       Pricing plan
    //     </h2>
    //     <p className="pre_landing_page_text">
    //       {`Choose a plan that fits your business needs and proceed to payment`}
    //     </p>
    //   </div>

    //   <Tabs defaultValue="manage" className="">


    //     {/* /////// Nav switcher ///////////// */}
    //     {/* <TabsList defaultValue='manage' className="grid -mt-[4px] mx-auto grid-cols-2 border min-h-max  max-w-max rounded-full border-bg_dusty_white/10 font-inter space-x-[10px]">
    //       <TabsTrigger
    //         onClick={() => setSelectedValue("manage")}
    //         value="manage"

    //         className="flex items-center gap-[10px] rounded-full px-[16px] py-[12px] "
    //       >
    //         <Image src={selectedValue === 'business' ? manage_select : manage} alt="mange" className="text-ti_royel_blue" />
    //         <div className="flex items-start justify-start flex-col">
    //           <h5 className={`text-[14px] font-inter font-bold  ${selectedValue === 'manage' && 'text-p_blue'} `}>Manage</h5>
    //           <h2 className=" text-[12px] font-inter leading-[16px] text-ti_dark_grey">Digital Garage Management</h2>
    //         </div>
    //       </TabsTrigger>
    //       <TabsTrigger
    //         onClick={() => setSelectedValue("business")}
    //         value="business"
    //         className="flex items-center gap-[10px] rounded-full px-[16px] py-[12px]"
    //       >
    //         <Image src={selectedValue === 'manage' ? business : business_select} alt="business" />
    //         <div className="  flex items-start  justify-start flex-col">
    //           <h5 className={`text-[14px] font-inter font-bold  ${selectedValue === 'business' && 'text-p_blue'} `}>Business</h5>
    //           <h2 className=" text-[12px] font-inter leading-[16px] text-ti_dark_grey">Complete Rental Solutions</h2>
    //         </div>
    //       </TabsTrigger>
    //     </TabsList> */}

    //     <div className="flex-1 overflow-y-auto min-h-0">
    //       <div className="flex items-center justify-between font-inter   mb-[20px]">
    //         <h1 className=" text-ti_dark_grey font-inter font-bold">Select your digital garage plan</h1>
    //         <BillingToggle isYearly={isYearly}
    //           setIsYearly={setIsYearly} />
    //       </div>

    //       <div className=" ">
    //         <div className="flex justify-between gap-[20px] w-full">
    //           <Card data={pricingPlan[0]} isYearly={isYearly} />
    //           <Card data={pricingPlan[1]} isYearly={isYearly} />
    //         </div>
    //         <div className=" mt-[20px]">
    //           <h1 className=" font-medium text-center text-ti_grey text-[10px] font-inter ">*A one-time platform setup fee of $99 applies.</h1>
    //         </div>
    //       </div>
    //     </div>

    //   </Tabs>
    // </div >

    <div className="relative bg-bg_white rounded-lg md:shadow-lg w-full max-w-[800px] h-[90vh] md:h-[80vh] flex flex-col px-[20px] xs:px-[30px] sm:px-[60px] py-[20px] md:py-[60px] ">
      <div className="mb-[40px] flex-shrink-0 flex flex-col items-center">
        <h2 className="pre_landing_page_title font-inter">
          Pricing plan
        </h2>
        <p className="pre_landing_page_text">
          {`Choose a plan that fits your business needs and proceed to payment`}
        </p>
      </div>

      <Tabs defaultValue="manage" className="flex-1 overflow-hidden overflow-y-auto">
        {/* Main content area */}
        <div className="flex items-center justify-between font-inter mb-[20px] flex-shrink-0">
          <h1 className="text-ti_dark_grey font-inter font-bold">Select your digital garage plan</h1>
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </div>
        <div className="">

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="flex flex-col space-y-[20px]">
              <div className="flex justify-between gap-[20px] w-full">
                <Card data={plans[0]} isYearly={isYearly} />
                <Card data={plans[1]} isYearly={isYearly} />
              </div>
              <div className="mt-[20px]">
                <h1 className="font-medium text-center text-ti_grey text-[10px] font-inter">
                  *A one-time platform setup fee of $99 applies.
                </h1>
              </div>
            </div>
          </div>

        </div>
      </Tabs>
    </div>
  );
};

export default PriceingPlan;

