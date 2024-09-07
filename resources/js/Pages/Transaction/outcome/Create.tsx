import MainModal from "@/Components/elements/MainModal";
import { Button } from "@/Components/ui/button";
import { DialogClose } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import { toast } from "@/hooks/use-toast";

const OutcomeCreate = ({ auth }: any) => {
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const { data, setData, post, processing, reset } = useForm({
        user_id: auth.user.id,
        transaction_purpose: "",
        amount: 0,
        bukti: null,
        status: "OUT",
    });

    const validateForm = () => {
        if (data.transaction_purpose && data.amount) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = () => {
        if (data.bukti === "") {
            setData("bukti", null);
        }

        post(route("transaksi.store"), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: "Data Berhasil di tambahkan.",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal",
                    variant: "destructive",
                    description: "Data gagal di tambahkan.",
                });
            },
        });
    };

    return (
        <form className="shadow rounded-lg grid gap-5 py-3 px-5 bg-white dark:bg-black">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Nominal</Label>
                <Input
                    type="number"
                    id="name"
                    placeholder="12000"
                    leftAddon={<i>Rp</i>}
                    required
                    value={data.amount === 0 ? "" : data.amount}
                    onChange={(e) => {
                        setData("amount", parseFloat(e.target.value)),
                            validateForm();
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Keterangan</Label>
                <Textarea
                    placeholder="Tulis keterangan disini"
                    required
                    value={data.transaction_purpose}
                    onChange={(e) => {
                        setData("transaction_purpose", e.target.value),
                            validateForm();
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Bukti</Label>
                <Input id="picture" type="file" />
            </div>
            <MainModal
                title="Konfirmasi"
                description="Apakah anda yakin untuk mengirim data ini?"
                trigger={
                    <Button
                        variant={"primary"}
                        disabled={!isFormValid || processing}
                    >
                        Kirim
                    </Button>
                }
                content={
                    <span className="py-2 border rounded-md bg-gray-300 shadow-inner">
                        <i className="w-3/4 bx bx-ghost text-7xl animate-walk text-white/80"></i>
                    </span>
                }
                footer={
                    <span className="w-full flex gap-2 items-center justify-center">
                        <DialogClose asChild>
                            <Button variant={"outline"}>Batal</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant={"primary"} onClick={handleSubmit}>
                                Kirim
                            </Button>
                        </DialogClose>
                    </span>
                }
            />
        </form>
    );
};

export default OutcomeCreate;
