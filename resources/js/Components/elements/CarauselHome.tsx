import * as React from "react";

import { Card, CardContent } from "@/Components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { describe } from "node:test";

export function CarauselHome() {
    const CarauselCards = [
        {
            icon: "bxs-wallet",
            title: "Kas",
            saldo: "Rp. 1.000.000",
            describe: "Semua sudah membayar kas",
            kas: "150.000",
        },
        {
            icon: "bxl-slack",
            title: "Talangan",
            saldo: "Rp. 1.000.000",
            describe: "talangan yang belum diambil",
        },
    ];
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            orientation="horizontal"
            className="w-full max-w-xs"
        >
            <CarouselContent className=" p-1">
                {CarauselCards.map((card, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-1/2">
                        <div className="p-1">
                            <Card
                                className={`${
                                    index % 2 !== 0
                                        ? "bg-[#5CA4C5] text-white"
                                        : ""
                                }`}
                            >
                                <CardContent className="flex items-start justify-center flex-col py-5 gap-5">
                                    <div className="flex items-center justify-between w-full">
                                        <span
                                            className={`flex items-center gap-2 font-bold ${
                                                index % 2 !== 0
                                                    ? "text-gray-200"
                                                    : "text-gray-500 "
                                            }`}
                                        >
                                            <div
                                                className={`boder ${
                                                    index % 2 !== 0
                                                        ? "bg-[#368CB6]"
                                                        : "bg-[#E5E6EC]"
                                                } py-1 px-2 dark:bg-gray-800 rounded-xl`}
                                            >
                                                <i
                                                    className={`bx ${card.icon} text-xl`}
                                                />
                                            </div>
                                            <h1 className="text-2xl ">
                                                {card.title}
                                            </h1>
                                            {card.kas && (
                                                <small className="text-green-500 pt-2">
                                                    Rp. {card.kas}
                                                </small>
                                            )}
                                        </span>
                                        <small
                                            className={` ${
                                                index % 2 !== 0
                                                    ? "text-gray-200"
                                                    : "text-gray-500 "
                                            }`}
                                        >
                                            09-24
                                        </small>
                                    </div>
                                    <p className="text-2xl font-bold w-full text-center">
                                        {card.saldo};
                                    </p>
                                    <p className="w-full text-center font-mono">
                                        {card.describe}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    );
}
