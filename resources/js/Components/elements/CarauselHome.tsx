import * as React from "react";

import { Card, CardContent } from "@/Components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { formatAmount, formatDate, months } from "@/formater";
import { usePage } from "@inertiajs/react";

type CarauselProps = {
    kas: number;
    peopleRemaining: number;
    currentSaldo: number;
    talangan: any;
};

export function CarauselHome({
    kas,
    peopleRemaining,
    currentSaldo,
    talangan,
}: CarauselProps): JSX.Element {
    const { defaultKas, talangans }: any = usePage().props;

    const talanganFiltered = talangans.filter((talangan: any) => {
        return talangan.dikembalikan == 0;
    });

    const CarauselCards = [
        {
            icon: "bx-dollar",
            title: "Saldo",
            saldo: `${formatAmount(currentSaldo)}`,
            describe: `${
                currentSaldo == 0
                    ? "🥵 Saldo Abis bang"
                    : currentSaldo === 0.5 * kas
                    ? "🫣 Saldo tinggal setegah"
                    : "🤫🙂‍↔️ Masi kaya broh.."
            }`,
        },
        {
            icon: "bxs-wallet",
            title: "Kas",
            saldo: `${formatAmount(kas)}`,
            describe: `${
                peopleRemaining == 0
                    ? "semua sudah bayar kas"
                    : `${peopleRemaining} orang belum bayar kas`
            }`,
            kas: `${defaultKas ? formatAmount(defaultKas.default_kas) : ""}`,
        },
        {
            icon: "bxl-slack",
            title: "Talangan",
            saldo: `${formatAmount(talangan)}`,
            describe: `${
                talanganFiltered.length > 0
                    ? `${talanganFiltered.length} Talangan belm di kembalikan`
                    : "Semua talangan sudah di kembalikan"
            }`,
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
                                                    : "text-gray-500"
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
                                                <small className="text-green-300 pt-2">
                                                    {card.kas}
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
                                            {months[new Date().getMonth()]}
                                        </small>
                                    </div>
                                    <p className="text-2xl font-bold w-full text-center">
                                        {card.saldo};
                                    </p>
                                    <p
                                        className={`w-full text-center text-sm py-1  rounded-lg`}
                                    >
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
