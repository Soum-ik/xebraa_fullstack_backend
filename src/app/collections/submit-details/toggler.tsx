import React, { useState } from 'react';
import EmailTypeConstant from './constant';
const PricingToggle = ({ setPlanType }: { setPlanType: (planType: string) => void }) => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="flex items-center gap-4">
            <h1 className={`text-[14px] font-inter font-semibold ${!isYearly ? 'text-p_blue' : 'text-ti_grey'}`}>
                Monthly
            </h1>

            <button
                onClick={() => { setIsYearly(!isYearly); setPlanType(!isYearly ? EmailTypeConstant.PlanTypeConstant.YEARLY : EmailTypeConstant.PlanTypeConstant.MONTHLY) }}
                className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out bg-p_blue"
                 
                role="switch"
                aria-checked={isYearly}
            >
                <span
                    className={`inline-block size-4 transform rounded-full bg-bg_white shadow-lg transition-transform duration-200 ease-in-out ${isYearly ? 'translate-x-7' : 'translate-x-1'
                        }`}
                />
            </button>

            <h1 className={`text-[14px] font-inter font-semibold ${isYearly ? 'text-p_blue' : 'text-ti_grey'}`}>
                Yearly
            </h1>
        </div>
    );
};

export default PricingToggle;