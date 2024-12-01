'use client'
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProgressUpdater } from '@/hooks/useProgress';
import close from '@/../public/images/access_point/down.svg'
import open from '@/../public/images/access_point/up.svg'
import AccessPoint from './access';
import { getCode } from 'country-list';
import axios from 'axios';
import { CarBrandsData } from '../page';
import Loader from '@/components/Loader';

interface CustomPageProps {
    params: {
        model: string
    }
}

const ModelSelector = ({ params }: CustomPageProps) => {
    const { setCustomProgress, progress } = useProgressUpdater();
    const [totalBrands, setTotalBrands] = useState(0);
    const [isOpen, setIsOpen] = useState('');
    const router = useRouter();
    const modelParam = params.model;
    const [loading, setLoading] = useState(false)
    // remove duplicate function
    const removeDuplicates = (data: CarBrandsData): CarBrandsData => {
        const brandSet = new Set<string>();
        return data.reduce<CarBrandsData>((acc, brand) => {
            if (!brandSet.has(brand.brand)) {
                brandSet.add(brand.brand);

                // Deduplicate models by name
                const modelSet = new Set<string>();
                const uniqueModels = brand.models.filter((model) => {
                    if (!modelSet.has(model.name)) {
                        modelSet.add(model.name);
                        return true;
                    }
                    return false;
                });

                acc.push({ ...brand, models: uniqueModels });
            }
            return acc;
        }, []);
    };
    const [brandCarList, setBrandCarList] = useState<CarBrandsData>([])


    useEffect(() => {
        const country = localStorage.getItem('country')
        let countrySelect: string;
        if (country) {
            const code = getCode(country);
            if (code === "US" || code === "CA") {
                countrySelect = code
            } else {
                countrySelect = "EUROPE"
            }
        }
        const fetchCountry = async () => {
            try {
                setLoading(true)
                const { data } = await axios(`https://backend.illama360.com/api/dummy/check-compatibility-matrix?region=${countrySelect}`)
                const uniqueBrandList = removeDuplicates(data.data);
                setBrandCarList(uniqueBrandList);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        fetchCountry()
    }, []);



    // search filtering
    const filteredModels = React.useMemo(() => {
        return brandCarList.filter((brand) => {
            const decodedBrandNames = decodeURIComponent(modelParam).split(',');
            setTotalBrands(decodedBrandNames.length);
            return decodedBrandNames.includes(brand.brand);
        });
    }, [brandCarList, modelParam]);

    const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
    const [selectedModels, setSelectedModels] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const storedBrandModels = JSON.parse(localStorage.getItem('brandModels') || '{}');
            const currentBrand = filteredModels[currentBrandIndex]?.brand;
            return storedBrandModels[currentBrand] || [];
        }
        return [];
    });

    // select the model
    const handleModelSelect = (model: string) => {
        const currentBrand = modelData.brand;
        const storedModels = JSON.parse(localStorage.getItem('brandModels') || '{}');

        // Initialize current brand's models if not exists
        if (!storedModels[currentBrand]) {
            storedModels[currentBrand] = [];
        }

        // Get current brand's selected models
        const currentBrandModels = storedModels[currentBrand] || [];

        let updatedModels;
        if (currentBrandModels.includes(model)) {
            // Remove model if already selected
            updatedModels = currentBrandModels.filter((selectedModel: string) => selectedModel !== model);
        } else {
            // Add model if not selected
            updatedModels = [...currentBrandModels, model];
        }

        // Update state and localStorage
        setSelectedModels(updatedModels);
        storedModels[currentBrand] = updatedModels.length ? updatedModels : null;
        localStorage.setItem('brandModels', JSON.stringify(storedModels));
    };


    const calculateProgress = 60 / totalBrands;

    // handle Next Button
    const handleNext = () => {
        if (currentBrandIndex < filteredModels.length - 1) {
            setCurrentBrandIndex(prev => prev + 1);
            setCustomProgress(progress + calculateProgress);
        } else {
            router.push('/collections/compatible');
        }
    };


    const handleNotFindModel = () => {
        if (currentBrandIndex < filteredModels.length - 1) {
            const storedModels = JSON.parse(localStorage.getItem('brandModels') || '{}');
            storedModels[modelData.brand] = null;
            localStorage.setItem('brandModels', JSON.stringify(storedModels));
            setCurrentBrandIndex(prev => prev + 1);
            setCustomProgress(progress + calculateProgress);
        } else {
            const storedModels = JSON.parse(localStorage.getItem('brandModels') || '{}');
            storedModels[modelData.brand] = null;
            localStorage.setItem('brandModels', JSON.stringify(storedModels));
            router.push('/collections/compatible');
        }
    }

    const modelData = filteredModels[currentBrandIndex];

    const backButton = () => {
        if (currentBrandIndex > 0) {
            setCurrentBrandIndex(prev => prev - 1)
            setCustomProgress(progress - calculateProgress);
        } else {
            router.push('/collections/select-brand');
            setCustomProgress(progress - 10);
        }
    }

    const currentBrandModels = JSON.parse(localStorage.getItem('brandModels') || '{}')[modelData?.brand]

    const showAccessPoint = (modelName: string) => {
        if (isOpen === modelName) {
            setIsOpen('')
        } else {
            setIsOpen(modelName)
        }
    }



    return (
        <div className="relative bg-bg_white rounded-lg md:shadow-lg w-full max-w-[650px] 
        md:h-[780px] h-screen flex flex-col px-4 xs:px-6 sm:px-12 md-[60px] py-[20px] md:py-[60px]">
            {/* Header Section - Fixed at top */}
            <div className="flex-shrink-0 ">
                <div onClick={backButton} className="flex items-center gap-1.5 mb-4 cursor-pointer">
                    <ArrowLeft size={20} className="text-ti_dark_grey" />
                    <span className="text-ti_dark_grey font-inter font-semibold text-sm">Back</span>
                </div>

                <div className="mb-10 flex items-center flex-col">
                    <h2 className="font-inter text-2xl font-bold text-ti_light_black">Select your car models</h2>
                    <p className="text-ti_dark_grey text-sm">
                        Choose your car models of each of your selected brands
                    </p>
                </div>

                {/* Brand Info */}
                <div className="mb-8 flex items-center flex-col">
                    {modelData?.brandLogo && (
                        <Image
                            className="h-[50px] w-auto object-contain"
                            src={modelData.brandLogo}
                            alt="brand logo"
                            width={100}
                            height={100}
                        />
                    )}
                    <h1 className="text-p_dark_blue font-inter font-semibold text-3xl mt-0.5">
                        {modelData?.brand.replace(/[-_]/g, ' ')}
                    </h1>
                    <h3 className="text-ti_dark_grey font-medium font-inter text-sm">
                        {modelData?.year}
                    </h3>
                </div>
            </div>

            {/* Scrollable Content Area - Takes remaining space */}
            <div className="flex-1 overflow-y-auto ">
                <div className="space-y-2.5">
                    {loading ? (
                        <Loader />
                    ) : (
                        modelData?.models.map((model) => (
                            <div
                                key={model.name}
                                className={`flex justify-between flex-col items-center border p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${selectedModels.includes(model.name)
                                    ? 'bg-blue-50 border-p_light_blue select_car_collection_bg'
                                    : 'border-bg_dusty_white'
                                    }`}
                                onClick={() => handleModelSelect(model.name)}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedModels.includes(model.name)}
                                            onChange={() => handleModelSelect(model.name)}
                                            className="mr-2"
                                        />
                                        <span className="font-semibold text-ti_black font-inter text-sm">
                                            {model.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showAccessPoint(model.name);
                                        }}
                                        className="w-5 h-5 flex items-center justify-center"
                                    >
                                        <Image
                                            className="size-[18px] object-cover"
                                            src={isOpen === model.name ? open : close}
                                            alt="toggle"
                                        />
                                    </button>
                                </div>
                                {isOpen === model.name && <AccessPoint permission={model.endpoints} />}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer Section - Fixed at bottom */}
            {/* Fixed Footer */}
            <div className="flex-shrink-0 mt-6 flex lg:flex-row flex-col-reverse items-center gap-4">
                <button onClick={handleNotFindModel} className=" lg:w-1/2 pre_landing_page_btn w-full font-inter text-ti_grey px-[14px] py-[8px]   text-[14px] rounded-md">
                    {`I can't find my car brand`}
                </button>
                <button
                    className={`w-full lg:w-1/2 pre_landing_page_btn text-bg_white px-[14px] py-[10px] font-inter rounded-md ${currentBrandModels?.length > 0 ? 'bg-p_blue' : 'bg-p_blue/50'}`}
                    disabled={!currentBrandModels || currentBrandModels.length <= 0}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default ModelSelector;
