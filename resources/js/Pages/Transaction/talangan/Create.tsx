import React, { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import MainModal from "@/Components/elements/MainModal";
import { Textarea } from "@/Components/ui/textarea";

type TalanganFormProps = {
    auth?: any;
    user?: any;
};

const TalanganForm = ({ auth, user }: TalanganFormProps) => {
    const currentUser = user || auth?.user;
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    if (!currentUser) {
        return <p>User data is missing</p>;
    }

    const { data, setData, post, processing, reset } = useForm({
        user_id: currentUser.id,
        tujuan: "",
        amount: 0,
        bukti: null,
        dikembalikan: false,
    });

    const validateForm = () => {
        if (data.tujuan && data.amount) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = () => {
        if (data.bukti === "") {
            setData("bukti", null);
        }

        post(route("talangan.store"), {
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
        <div className="grid gap-3">
            <span className="space-y-3">
                <div className="space-y-1">
                    <Label htmlFor="amount">Nominal</Label>
                    <Input
                        id="amount"
                        leftAddon={<i>Rp</i>}
                        placeholder="12000"
                        value={data.amount === 0 ? "" : data.amount}
                        onChange={(e) => {
                            setData("amount", parseFloat(e.target.value)),
                                validateForm();
                        }}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="amount">Keterangan</Label>

                    <Textarea
                        placeholder="tuliskan tujuan talangan"
                        value={data.tujuan}
                        onChange={(e) => {
                            setData("tujuan", e.target.value), validateForm();
                        }}
                    />
                </div>
                <div className="space-y-0">
                    <Label htmlFor="picture">Bukti</Label>
                    <Input id="picture" type="file" />
                </div>
            </span>
            <span>
                <MainModal
                    title="Konfirmasi"
                    description="Apakah anda yakin untuk mengirim data ini?"
                    trigger={
                        <Button
                            variant={"primary"}
                            disabled={processing || !isFormValid}
                            className="w-full"
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
                                <Button
                                    variant={"primary"}
                                    onClick={handleSubmit}
                                >
                                    Kirim
                                </Button>
                            </DialogClose>
                        </span>
                    }
                />
            </span>
        </div>
    );
};

export default TalanganForm;
