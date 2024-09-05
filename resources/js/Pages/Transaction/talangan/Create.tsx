import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const TalanganForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Talangan</CardTitle>
                <CardDescription>
                    Yang anda inputkan akan di rekap ke dalam Rekap Talangan
                    Kontrakan.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Nomimal</Label>
                    <Input
                        type="number"
                        id="name"
                        placeholder="12000"
                        leftAddon={<i>Rp</i>}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name">Keterangan</Label>
                    <Textarea placeholder="Tulis keterangan disini" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Bukti</Label>
                    <Input id="picture" type="file" />
                </div>
            </CardContent>
            <CardFooter>
                <Button variant={"primary"}>Kirim</Button>
            </CardFooter>
        </Card>
    );
};

export default TalanganForm;
