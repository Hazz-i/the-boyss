import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { formatDate, formatAmount, months } from "@/formater";
import HistorySmWidth from "@/Components/elements/HistorySmWidth";
import { Modal } from "@/Components/elements/Modal";

export default function History({
    auth,
    mustVerifyEmail,
    status,
    ledgers,
    queryParams = null,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    ledgers: any;
    queryParams: any;
}>) {
    queryParams = queryParams || null;

    // Function to handle month change in dropdown
    const searchMonthChanged = (month: string) => {
        router.get(route("history.index"), {
            ...queryParams, // Include existing query parameters
            month, // Add the selected month
        });
    };
    const [position, setPosition] = React.useState<string>(
        months[new Date().getMonth()]
    );

    useEffect(() => {
        queryParams !== null && setPosition(queryParams.month);
    }, [queryParams]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">History</h2>}
        >
            <Head title="History" />

            <div className="px-2 grid gap-2 pb-24">
                <span className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold">History Bulanan</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-[#5CA4C5]">
                                    {position}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    Pilih Bulan
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={position}
                                    onValueChange={(month) => {
                                        setPosition(month);
                                        searchMonthChanged(month);
                                    }}
                                >
                                    {months.map((month, index) => (
                                        <DropdownMenuRadioItem
                                            key={index}
                                            value={month}
                                        >
                                            {month}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {ledgers.data.length === 0 ? (
                        <div className="flex items-center justify-center h-20 rounded-lg shadow-md border">
                            Tidak ada data
                        </div>
                    ) : (
                        <HistorySmWidth
                            items={ledgers.data}
                            links={ledgers.links}
                        />
                    )}
                </span>

                <span className="grid gap-2">
                    <h1 className="text-lg font-bold">History Talangan</h1>

                    <div className="border-2 shadow-sm rounded-xl max-h-[30vh] overflow-y-scroll">
                        <span className="flex items-center justify-between p-2 text-white/80 bg-[#5CA4C5]">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg bg-[#368CB6]">
                                    <i className="bx bx-drink font-extrabold"></i>
                                </div>
                                <div className="grid">
                                    <h1 className="font-semibold text-lg">
                                        Bayar Listrik
                                    </h1>
                                    <small>02-09-2024</small>
                                </div>
                            </span>
                            <div className="flex flex-col justify-center items-end">
                                <p className="font-semibold text-lg text-red-600">
                                    - Rp.150.000
                                </p>
                                <small className="font-semibold">wahid</small>
                            </div>
                        </span>
                        <span className="flex items-center justify-between p-2 text-white/80 bg-[#368CB6]">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg bg-[#5CA4C5]">
                                    <i className="bx bx-drink font-extrabold"></i>
                                </div>
                                <div className="grid">
                                    <h1 className="font-semibold text-lg">
                                        Bayar Listrik
                                    </h1>
                                    <small>02-09-2024</small>
                                </div>
                            </span>
                            <div className="flex flex-col justify-center items-end">
                                <p className="font-semibold text-lg text-green-400">
                                    - Rp.150.000
                                </p>
                                <small className="font-semibold">wahid</small>
                            </div>
                        </span>
                        <span className="flex items-center justify-between p-2 text-white/80 bg-[#5CA4C5]">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg bg-[#368CB6]">
                                    <i className="bx bx-drink font-extrabold"></i>
                                </div>
                                <div className="grid">
                                    <h1 className="font-semibold text-lg">
                                        Bayar Listrik
                                    </h1>
                                    <small>02-09-2024</small>
                                </div>
                            </span>
                            <div className="flex flex-col justify-center items-end">
                                <p className="font-semibold text-lg text-red-600">
                                    - Rp.150.000
                                </p>
                                <small className="font-semibold">wahid</small>
                            </div>
                        </span>
                    </div>
                </span>
            </div>
        </AuthenticatedLayout>
    );
}
