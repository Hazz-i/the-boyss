import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { InputForm } from "@/Components/elements/InputForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import OutcomeCreate from "./outcome/Create";
import DefaultKasForm from "./defaultKas/Create";
import TalanganForm from "./talangan/Create";
import KasForm from "./kas/Create";

export default function Transaction({
    auth,
    mustVerifyEmail,
    status,
    ledgers,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    ledgers: any;
}>) {
    const [more, setMore] = React.useState<boolean>(false);
    const kasFilter = ledgers?.filter(
        (ledger: any) =>
            auth.user.id === ledger.user_id &&
            ledger.transaction_purpose === "KAS"
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Transaction</h2>}
        >
            <Head title="Transaction" />

            <div className="px-2 grid gap-5 pb-24">
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
                            <TalanganForm />
                        </TabsContent>
                    </Tabs>
                </span>

                <span className="grid gap-2">
                    <h1>Pengeluaran</h1>
                    <OutcomeCreate auth={auth} />
                </span>
                <span className="grid gap-2">
                    <h1>Default Kas</h1>
                    <DefaultKasForm />
                </span>
            </div>
        </AuthenticatedLayout>
    );
}
