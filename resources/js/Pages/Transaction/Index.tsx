import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import OutcomeCreate from "./outcome/Create";
import DefaultKasForm from "./defaultKas/Update";
import TalanganForm from "./talangan/Create";
import KasForm from "./kas/Create";
import TalanganRevertForm from "./talanganRevert/Create";

export default function Transaction({
    auth,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>) {
    const { talangans, currentSaldo }: any = usePage().props;
    const talanganFiltered = talangans.filter((talangan: any) => {
        return talangan.dikembalikan == 0;
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Transaction</h2>}
        >
            <Head title="Transaction" />

            <div className="px-2 grid gap-3 pb-24">
                <span className="grid gap-2">
                    <h1>Transaction</h1>
                    <Tabs defaultValue="kas" className="w-xs">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="kas">Kas</TabsTrigger>
                            <TabsTrigger value="talangan">Talangan</TabsTrigger>
                        </TabsList>
                        <TabsContent value="kas">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kas</CardTitle>
                                    <CardDescription>
                                        Yang anda inputkan akan di rekap ke
                                        dalam Rekap Kas Kontrakan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <KasForm auth={auth} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="talangan">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Talangan</CardTitle>
                                    <CardDescription>
                                        Yang anda inputkan akan di rekap ke
                                        dalam Rekap talangan Kontrakan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <TalanganForm auth={auth} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </span>

                {(auth.user.role.toLowerCase() === "bendahara" ||
                    auth.user.role.toLowerCase() === "developer") && (
                    <>
                        <span className="grid gap-2">
                            <h1>Pengeluaran</h1>
                            {currentSaldo <= 0 ? (
                                <span className="shadow rounded-lg grid gap-5 py-10 px-5 bg-white dark:bg-black text-center">
                                    <p className="font-semibold">
                                        Saldo Kas Udah Abis
                                        <br />
                                        <small>
                                            Untuk sementara masukan rekap ke
                                            talngan 😊
                                        </small>
                                    </p>
                                </span>
                            ) : (
                                <OutcomeCreate auth={auth} />
                            )}
                        </span>
                        {currentSaldo <= 0 ? (
                            <span className="shadow rounded-lg grid gap-5 py-10 px-5 bg-white dark:bg-black text-center">
                                <p className="font-semibold">
                                    Saldo Kas Udah Abis
                                    <br />
                                    <small>
                                        Untuk sementara ini belum bisa melakukan
                                        pengembalian talangan
                                    </small>
                                </p>
                            </span>
                        ) : (
                            talanganFiltered.length > 0 && (
                                <span className="grid gap-2">
                                    <h1>Pengembalian Talangan</h1>
                                    <TalanganRevertForm talangans={talangans} />
                                </span>
                            )
                        )}

                        <span className="grid gap-2">
                            <h1>Default Kas</h1>
                            <DefaultKasForm />
                        </span>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
