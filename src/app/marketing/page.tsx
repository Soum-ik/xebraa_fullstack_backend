"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Star, Sparkles, Send } from "lucide-react";

const HeaderWithForms = () => {

    return (
        <div className="w-full min-h-screen flex items-center justify-center  text-white" >
            {/* Header Section */}
            <header className="p-6"  >
                <div className="max-w-8xl mx-auto flex flex-col justify-between gap-8">
                    {/* Logo Section */}
                    <div className="  ">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-p_dark_blue" />
                            <h1 className="text-[24px] font-inter font-bold text-ti_light_black"> FleetBlox</h1>
                        </div>
                        <p className="mt-2 max-w-md text-pink-200">
                            Share update with our community people
                        </p>
                    </div>

                    {/* Forms Section */}
                    <div className="w-full lg:w-[800px]">
                        <Tabs defaultValue="newsletter" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 border h-12 border-bg_dusty_white">
                                <TabsTrigger
                                    value="newsletter"
                                    className="flex items-center gap-2"
                                >
                                    <Mail className="h-7 w-4" />
                                    Subscribers Users
                                </TabsTrigger>
                                <TabsTrigger
                                    value="interest"
                                    className="flex items-center gap-2"
                                >
                                    <Star className="h-7  w-4" />
                                    {`Interest User's`}
                                </TabsTrigger>
                            </TabsList>

                            {/* Newsletter Form */}
                            <TabsContent value="newsletter">
                                <Card className="border">
                                    <CardContent className="pt-6">
                                        <form className="space-y-4">
                                            <div className="space-y-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    className="text-white placeholder:text-pink-200  "
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Textarea
                                                    placeholder="Description"
                                                    rows={15}
                                                    className=" text-white placeholder:text-pink-200 min-h-[100px]"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full  text-bg_white     transition-all duration-300 flex items-center justify-center gap-2 group  "
                                            >
                                                Subscribe
                                                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Early Interest Form */}
                            <TabsContent value="interest">
                                <Card className="border-0  ">
                                    <CardContent className="pt-6">
                                        <form className="space-y-4">
                                            <div className="space-y-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    className="text-white placeholder:text-pink-200  "
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Textarea
                                                    rows={15}
                                                    placeholder="Description"
                                                    className="text-white placeholder:text-pink-200 min-h-[100px]  "
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full  text-bg_white     transition-all duration-300 flex items-center justify-center gap-2 group  "
                                            >
                                                Subscribe
                                                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeaderWithForms;