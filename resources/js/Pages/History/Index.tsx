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
import PaginationItems from "@/Components/elements/PaginationItems";
import { formatDate, formatAmount, months } from "@/formater";

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
                        <h1>History Bulanan</h1>
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

                    <div className="border-2 shadow-sm rounded-xl">
                        {ledgers.data.map((ledger: any, index: number) => (
                            <span
                                key={index}
                                className={`flex items-center justify-between p-2 ${
                                    (index + 1) % 2 === 0 ? "bg-gray-200" : ""
                                }`}
                            >
                                <span className="flex gap-2 items-center">
                                    <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6]">
                                        <i
                                            className={`bx ${
                                                ledger.transaction_purpose.includes(
                                                    "Listrik"
                                                )
                                                    ? "bx-power-off"
                                                    : ledger.transaction_purpose.includes(
                                                          "Kas"
                                                      )
                                                    ? "bx-wallet"
                                                    : "bx-water"
                                            } font-extrabold`}
                                        ></i>
                                    </div>
                                    <div className="grid">
                                        <h1 className="font-semibold text-lg">
                                            {ledger.transaction_purpose}
                                        </h1>
                                        <small>
                                            {formatDate(ledger.created_at)}
                                        </small>
                                    </div>
                                </span>
                                <div className="flex flex-col justify-center items-end">
                                    {ledger.status === "OUT" ? (
                                        <p className="font-semibold text-lg text-red-500">
                                            - {formatAmount(ledger.amount)}
                                        </p>
                                    ) : (
                                        <p className="font-semibold text-lg text-green-500">
                                            + {formatAmount(ledger.amount)}
                                        </p>
                                    )}
                                    <small className="font-semibold">
                                        {ledger.user_id}
                                    </small>
                                </div>
                            </span>
                        ))}

                        {ledgers.links.length > 3 && (
                            <PaginationItems Links={ledgers.links} />
                        )}
                    </div>
                </span>

                <span className="grid gap-2">
                    <h1>History Talngan</h1>

                    <div className="border-2 shadow-sm rounded-xl max-h-[30vh] overflow-y-scroll">
                        <span className="flex items-center justify-between bg-gray-200 p-2">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6]">
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
                                <p className="font-semibold text-lg text-red-500">
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
