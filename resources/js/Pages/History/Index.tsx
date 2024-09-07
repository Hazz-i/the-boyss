import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
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
import { months } from "@/formater";
import HistorySmWidth from "@/Components/elements/HistorySmWidth";

export default function History({
    auth,
    transactions,
    queryParams = null,
    talangans,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    transactions: any;
    queryParams: any;
    talangans: any;
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

                    {transactions.data.length === 0 ? (
                        <div className="flex items-center justify-center h-20 rounded-lg shadow-md border">
                            Tidak ada data
                        </div>
                    ) : (
                        <HistorySmWidth
                            items={transactions.data}
                            links={transactions.links}
                        />
                    )}
                </span>

                <span className="grid gap-2">
                    <h1 className="text-lg font-bold">History Talangan</h1>
                    {talangans.data.length === 0 ? (
                        <div className="flex items-center justify-center h-20 rounded-lg shadow-md border">
                            Tidak ada data
                        </div>
                    ) : (
                        <HistorySmWidth
                            items={talangans.data}
                            links={talangans.links}
                        />
                    )}
                </span>
            </div>
        </AuthenticatedLayout>
    );
}
