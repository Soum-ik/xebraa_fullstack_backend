"use client";
import EmailTypeConstant from '@/app/collections/submit-details/constant'
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Canada from "@/../public/images/canada.png";
import trueIcon from "@/../public/images/true.svg";
import falseIcon from "@/../public/images/false.svg";
import axios from 'axios';
import toast from 'react-hot-toast';


import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Slot from '@/../public/images/slot.svg';
import Plan from '@/../public/images/plan.svg';


import { Country } from '@/app/collections/select-country/page';
import useBrandCarList from '@/hooks/useCompitibily';

interface selectPlan {
    price: string;
    name: string;
    yearly: boolean;
}


interface VinData {
    vin: string;
    isCompatible: boolean;
    endpoints: string[];
}


const SubmitDetails = () => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brandModels, setBrandModels] = useState<Record<string, string | null>>({});
    const { selectedBrands, storedBrandModels, brandCarList, } = useBrandCarList(null)

    // const [brands, setBrands] = useState("");
    const [countries, setCountries] = useState<Country[] | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<selectPlan>()
    const [vinResult, setVinResult] = useState<VinData[] | null>(null);
    const [planData, setPlanData] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        cardHolderName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        countryCode: "+1",
        flag: Canada as unknown as string,
        plan: "",
        planPrice: 0,
        planType: EmailTypeConstant.PlanTypeConstant.MONTHLY,
    });



    useEffect(() => {
        if (typeof window !== "undefined") {
            setBrandModels(JSON.parse(localStorage.getItem("brandModels") || "{}"));
            // setBrands(localStorage.getItem("brands") || "");
            const storedPlan = JSON.parse(localStorage.getItem("price_plan") || "{}");
            const vinList = localStorage.getItem("VINS_RESULT");
            if (vinList) {
                setVinResult(JSON.parse(vinList));
            } else {
                setVinResult(null);
            }
            if (storedPlan) {
                setSelectedPlan(storedPlan);
            }
        }
        const getCountries = async () => {
            const countries = await fetch('https://backend.illama360.com/api/utils/all-countries');
            const response = await countries.json()
            console.log(response);
            setCountries(response.data)
        }
        getCountries()
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const selectCountryCode = (code: string, flag: string) => {
        setFormData((prev) => ({
            ...prev,
            countryCode: code,
            flag: flag,
        }));
        setIsDropdownOpen(false);
    };

    // Filter and determine compatibility status using `useMemo` for memoization
    const filteredCompatibleBrands = useCallback(() => {
        return brandCarList.filter(brand => selectedBrands.includes(brand.brand)).map(brand => ({
            brand: brand.brand,
            brandLogo: brand.brandLogo,
            compatible: storedBrandModels[brand.brand] !== null,
            model: brand.models.filter((model) =>
                brandModels[brand.brand]?.includes(model.name),
            ),
        }));
    }, [brandCarList, selectedBrands, storedBrandModels, brandModels]);




    const submitData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        planId: planData.id,    
        successUrl: "http://localhost:3000/result/paymentSuccess",
        cancelUrl: "http://localhost:3000/result/paymentFaild"
    };

    console.log(submitData, 'submitdata ');


    useEffect(() => {
        if (typeof window !== "undefined") {
            const planData = localStorage.getItem("price_plan");
            if (planData) {
                setPlanData(JSON.parse(planData));
            }
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const { data } = await axios.post("https://backend.illama360.com/api/payment/create-session", submitData);
            console.log(data, "created");

            if (data.statusCode === 200) {
                setLoading(false);
                // toast.success("Purchase completed");
                router.push(data?.data?.sessionUrl);
            } else {
                toast.error("Something went wrong");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log('There was a problem with the fetch operation:', error);
        }
    };



    return (
        <div className="relative flex w-[1160px]  h-[90vh] md:h-[80vh] flex-col  overflow-scroll rounded-lg bg-bg_white px-[20px] py-[20px] xs:px-[30px] sm:px-[50px] md:py-[50px] md:shadow-lg">
            <div className="flex flex-shrink-0 flex-col">
                <h2 className="pre_landing_page_title text-left font-inter text-ti_light_black">
                    Complete your purchase
                </h2>
                <p className="pre_landing_page_text text-left">
                    {`Confirm your vehicle compatibility, then continue to payment.`}
                </p>
            </div>
            <div className="mt-[40px] h-full flex items-start gap-[60px]">
                <div className="flex flex-1 flex-col">
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-inter text-[14px] font-bold text-ti_dark_grey">
                                Summary
                            </h1>
                        </div>
                        <div className="mt-[16px] space-y-[5px] w-full">
                            <div className=' flex items-center justify-between border border-bg_dusty_white p-[16px] rounded-md'>
                                <div className='flex items-center justify-center gap-[20px]'>
                                    <Image src={Plan} alt='Pricing plan' />
                                    <div>
                                        <h1 className=' text-ti_light_black font-inter font-semibold text-[14px]'>{selectedPlan?.name} {selectedPlan?.yearly ? '(Yearly) ' : "(Monthly)"}</h1>
                                        <h5 className=' text-[12px] font-inter leading-[16px] text-ti_dark_grey'>Pricing plan</h5>
                                    </div>
                                </div>
                                <h1 className=' text-ti_light_black  text-[18px] font-semibold font-inter'>${selectedPlan?.price}<span className=' font-inter  text-[12px] leading-[16px] text-ti_dark_grey'>.99 /month</span></h1>
                            </div>
                            <div className=' flex items-center justify-between border border-bg_dusty_white p-[16px] rounded-md'>
                                <div className='flex items-center justify-center gap-[20px]'>
                                    <Image src={Slot} alt='Vehicle slots' />
                                    <div>
                                        <h1 className=' text-ti_light_black font-inter font-semibold text-[14px]'>Vehicle slots</h1>
                                        <h5 className=' text-[12px] font-inter leading-[16px] text-ti_dark_grey'>Minimum purchase amount</h5>
                                    </div>
                                </div>
                                <h1 className=' text-ti_light_black  text-[18px] font-semibold font-inter'>{planData?.slotMinimum}</h1>
                            </div>
                            {/* <div className=' flex items-center justify-between border border-bg_dusty_white  p-[16px] rounded-md'>
                                <div className='flex items-center justify-center gap-[20px]'>
                                    <Image src={PayASGO} alt='Pay as you go' />
                                    <div>
                                        <h1 className=' text-ti_light_black font-inter font-semibold text-[14px]'>Additional vehicle slots</h1>
                                        <h5 className=' text-[12px] font-inter leading-[16px] text-ti_dark_grey'>Pay as you go</h5>
                                    </div>
                                </div>
                                <h1 className=' text-ti_light_black  text-[18px] font-semibold font-inter'>$10<span className=' font-inter  text-[12px] leading-[16px] text-ti_dark_grey'> /vehicle & month</span></h1>
                            </div> */}
                        </div>
                    </div>

                    <div className="my-[20px] w-full border border-bg_dusty_white"></div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-inter text-[14px] font-bold text-ti_dark_grey">
                                Selected vehicles
                            </h1>
                        </div>
                        <div className="mt-[16px] max-h-[330px] space-y-[10px] overflow-y-scroll">
                            {filteredCompatibleBrands().map((brand) => (
                                <div
                                    key={brand.brand}
                                    className="flex items-center justify-between rounded-md border px-[16px] py-[12px]"
                                >
                                    <div className="flex items-center gap-[15px]">
                                        <Image
                                            src={brand.brandLogo}
                                            alt={brand.brand}
                                            width={1000}
                                            height={1000}
                                            className="flex h-[40px] w-[80px] items-center justify-center object-contain mix-blend-multiply"
                                        />
                                        <div className="w-[400px]">
                                            <h1 className="font-inter text-[16px] font-semibold text-ti_black">
                                                {brand.brand}
                                            </h1>
                                            <p className="font-inter text-[12px] font-normal text-ti_dark_grey">
                                                {brand.model.map((item) => item.name).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-[110px]">
                                        {brand.compatible ? (
                                            <div className="flex items-center gap-[5px]">
                                                <Image
                                                    src={trueIcon}
                                                    width={16}
                                                    height={16}
                                                    alt="success"
                                                />
                                                <span className="font-inter text-[14px] text-[#4DB429]">
                                                    Compatible
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-[5px]">
                                                <Image
                                                    src={falseIcon}
                                                    width={16}
                                                    height={16}
                                                    alt="failed"
                                                />
                                                <span className="font-inter text-[14px] text-[#F00]">
                                                    Incompatible
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {vinResult?.map((vin) => (
                                <div
                                    key={vin.vin}
                                    className="flex items-center justify-between rounded-md border px-[16px] py-[16px]"
                                >
                                    <div className="flex items-center gap-[15px]">

                                        <div className="w-[550px]">
                                            <div className="leading-[18px] font-medium text-left text-ti_black font-inter text-sm">
                                                {`VIN - ${vin.vin}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[110px]">
                                        {vin.isCompatible ? (
                                            <div className="flex items-center gap-[5px]">
                                                <Image
                                                    src={trueIcon}
                                                    width={16}
                                                    height={16}
                                                    alt="success"
                                                />
                                                <span className="font-inter text-[14px] text-[#4DB429]">
                                                    Compatible
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-[5px]">
                                                <Image
                                                    src={falseIcon}
                                                    width={16}
                                                    height={16}
                                                    alt="failed"
                                                />
                                                <span className="font-inter text-[14px] text-[#F00]">
                                                    Incompatible
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full max-w-[360px] flex-initial flex-col justify-between rounded-lg px-[20px] pb-[20px] shadow-lg"
                >
                    <div>
                        <div className="">
                            <h1 className="mb-[10px] font-inter text-[14px] font-bold text-ti_dark_grey">
                                Contact info
                            </h1>
                            <div>
                                <input
                                    type="text"
                                    id="fullName"
                                    required
                                    name="fullName"
                                    placeholder="Full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full rounded-sm bg-bg_dusty_white px-[10px] py-[12px] font-inter text-[12px] leading-[16px] text-ti_black outline-none"
                                />
                            </div>
                            <div className="my-[5px] w-full">
                                <input
                                    type="text"
                                    id="email"
                                    required
                                    name="email"
                                    placeholder=" Business email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-sm bg-bg_dusty_white px-[10px] py-[12px] font-inter text-[12px] leading-[16px] text-ti_black outline-none"
                                />
                            </div>
                            <div className="w-full">
                                <div className="relative flex">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="border-gray-200 hover:bg-gray-100 flex h-[40px] w-[80px] items-center space-x-[5px] rounded-l-md border-r bg-bg_dusty_white px-[10px] font-inter text-[12px] text-ti_grey"
                                        >
                                            <Image
                                                src={formData.flag}
                                                alt="Canada"
                                                width={20}
                                                height={20}
                                            />
                                            <span className="text-ti_light_black">
                                                {formData.countryCode}
                                            </span>
                                            <ChevronDown className="ml-1 h-4 w-4 text-ti_light_black" />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="!z-100000000000 border-gray-200 absolute mt-1 w-56 rounded-sm border bg-bg_white shadow-lg">
                                                <ul className="max-h-60 overflow-auto py-1">
                                                    {countries?.map((country) => (
                                                        <li
                                                            key={country.country}
                                                            className="hover:bg-gray-50 flex cursor-pointer items-center gap-[10px] px-3 py-2 font-inter text-[12px] text-ti_light_black"
                                                            onClick={() => selectCountryCode(country.countryCode, country.countryFlag)}
                                                        >
                                                            <Image
                                                                src={country.countryFlag}
                                                                alt={country.country}
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <div>
                                                                <span>{country.country}</span>
                                                                <span className="ml-2 text-ti_black">
                                                                    {country.countryCode}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="flex-1 rounded-r-md bg-bg_dusty_white px-[10px] py-[12px] font-inter text-[12px] leading-[16px] text-ti_black outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="my-[20px] w-full border border-bg_dusty_white"></div>


                    </div>

                    <div>
                        <div>
                            <div className="flex w-full items-center justify-between font-inter text-[12px] font-medium leading-[16px] text-ti_dark_grey">
                                <h1>Subscription fee (Monthly)</h1>
                                <h1 className="text-ti_black">
                                    $
                                    {selectedPlan?.price || "0"}
                                </h1>
                            </div>
                            <div className="mt-[5px] flex w-full items-center justify-between font-inter text-[12px] font-medium leading-[16px] text-ti_dark_grey">
                                <h1>Platform setup (One time)</h1>
                                <h1 className="text-ti_black">$100</h1>
                            </div>
                            <div className="mt-[5px] flex w-full items-center justify-between font-inter text-[12px] font-medium leading-[16px] text-ti_dark_grey">
                                <h1>HST (10%)</h1>
                                <h1 className="text-ti_black">$25</h1>
                            </div>
                            <div className="mt-[16px] flex w-full items-center justify-between font-inter text-[14px] font-bold text-ti_black">
                                <h1>Total</h1>
                                <h1 className="text-[24px] text-ti_black">
                                    $
                                    {
                                        100 +
                                        30 +
                                        // parseInt((selectedPlan?.price || "0").replace(",", ""), 10) +
                                        (selectedPlan?.price ? 0.99 : 0)
                                    }
                                </h1>
                            </div>
                        </div>
                        <div className="mt-[20px] w-full">
                            <button
                                disabled={loading}
                                type="submit"
                                className={`w-full rounded-md ${selectedPlan ? "bg-p_blue" : "bg-p_blue/50"} px-[14px] py-[9.3px] font-inter text-[14px] font-semibold text-bg_white`}
                            >
                                {loading ? "Submitting..." : "Pay"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitDetails;

