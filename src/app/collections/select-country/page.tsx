'use client'
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { countries } from '@/Static_data/data';
import Image from 'next/image';
import { Country } from '@/Interface/interface';
import { useRouter } from 'next/navigation';
import { useProgressUpdater } from '@/hooks/useProgress';

import { getCode } from 'country-list'


const SelectCountry = () => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const country = localStorage.getItem('country');
            setSelectedCountry(country);
        }
    }, []);



    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountrySelect = (country: Country) => {
        if (selectedCountry === country.name) {
            setSelectedCountry(null);
            localStorage.removeItem('country');
        } else {
            setSelectedCountry(country.name);
            localStorage.setItem('country', country.name);
        }
    };

    const { setCustomProgress, progress } = useProgressUpdater();

    const handleNext = () => {
        let countryCode;

        if (selectedCountry) {
            countryCode = getCode(selectedCountry);
            if (countryCode === 'US' || countryCode === 'CA') {

            } else {
                countryCode = 'EUROPE';
            }
        }

        router.push(`/collections/select-brand?country=${countryCode}`);
        setCustomProgress(progress + 10);
    };


    return <div className="relative bg-bg_white rounded-lg md:shadow-lg w-full max-w-[650px]  h-screen md:h-[780px] flex flex-col px-[20px] xs:px-[30px] sm:px-[60px] py-[20px] md:py-[60px]">
        {/* Fixed Header */}
        <div className="flex-shrink-0 mb-[40px]">
            <h2 className="pre_landing_page_title font-inter">Select your country</h2>
            <p className="pre_landing_page_text font-inter">
                Select your country of residence or business location
            </p>
        </div>

        {/* Search Bar - Fixed */}
        <div className="flex-shrink-0 relative mb-[16px] bg-bg_dusty_white py-[10px] px-[10px] flex items-center gap-[8px] rounded-md">
            <Search className="text-ti_grey" size={18} />
            <input
                type="text"
                placeholder="Search"
                // className="w-full bg-bg_dusty_white text-ti_grey font-inter text-[12px] leading-[16px] outline-none"
                className={`w-full bg-bg_dusty_white font-inter text-xs leading-4 outline-none ${searchQuery ? "text-ti_light_black" : "text-ti_grey"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Scrollable Country List - Takes remaining space */}
        <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto">
                <div className="space-y-[10px] font-inter">
                    {filteredCountries?.map((country) => (
                        <div
                            key={country.name}
                            className={`w-full flex items-center border border-bg_dusty_white p-[16px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selectedCountry === country.name ? 'select_car_collection_bg border-p_light_blue' : ''
                                }`}
                            onClick={() => handleCountrySelect(country as unknown as Country)}
                        >
                            <Image
                                src={country.flag.src}
                                alt={country.name}
                                width={28}
                                height={28}
                                className="mr-3"
                            />
                            <span className="flex-1 leading-[18px] font-medium text-left text-ti_black font-inter text-[14px]">
                                {country.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Fixed Footer Buttons */}
        <div className="flex-shrink-0 mt-[40px] flex lg:flex-row flex-col-reverse items-center gap-4">
            <button
                onClick={() => router.push('/result/not-compatible')}
                className="lg:w-1/2 pre_landing_page_btn w-full font-inter text-ti_grey px-[14px] py-[8px] rounded-md"
            >
                {`I can't find my country`}
            </button>
            <button
                className={`w-full lg:w-1/2 pre_landing_page_btn text-bg_white font-inter px-[14px] py-[10px] rounded-md ${selectedCountry ? 'bg-p_blue' : 'bg-p_blue/50'
                    }`}
                disabled={!selectedCountry}
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    </div>

};

export default SelectCountry;
