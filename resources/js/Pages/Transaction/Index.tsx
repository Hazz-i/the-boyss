import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link } from "@inertiajs/react";
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

export default function Transaction({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Transaction</h2>}
        >
            <Head title="Transaction" />

            <div className="px-2 grid gap-5 pb-24">
                <span className="grid gap-2">
                    <h1>Transaction</h1>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Kas</TabsTrigger>
                            <TabsTrigger value="password">Talangan</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kas</CardTitle>
                                    <CardDescription>
                                        Yang anda inputkan akan di rekap ke
                                        dalam Rekap Kas Kontrakan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={auth.user.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="picture">Bukti</Label>
                                        <Input id="picture" type="file" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="bg-[#5CA4C5]">
                                        Kirim
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Talangan</CardTitle>
                                    <CardDescription>
                                        Change your password here. After saving,
                                        you'll be logged out.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">
                                            Current password
                                        </Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">
                                            New password
                                        </Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="bg-[#5CA4C5]">
                                        Save password
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </span>

                <span className="grid gap-2">
                    <h1>Pengeluaran</h1>
                    <form
                        action="POST"
                        className="shadow rounded-lg grid gap-5 py-3 px-5 bg-white dark:bg-black"
                    >
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Nominal</Label>
                            <Input
                                type="number"
                                id="price"
                                placeholder="12.000"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Keterangan</Label>
                            <Input
                                type="text"
                                id="description"
                                placeholder="Deskripsi"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Bukti</Label>
                            <Input id="picture" type="file" />
                        </div>
                        <Button className="bg-[#5CA4C5]">Kirim</Button>
                    </form>
                </span>
                <span className="grid gap-2">
                    <h1>Default Kas</h1>
                    <div className="shadow rounded-lg grid gap-5 py-3 px-5 bg-white dark:bg-black">
                        <InputForm />
                    </div>
                </span>
            </div>
        </AuthenticatedLayout>
    );
}
