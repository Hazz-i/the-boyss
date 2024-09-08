import React, { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import MainModal from "@/Components/elements/MainModal";
import { formatAmount } from "@/formater";

const DefaultKasForm = () => {
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const { defaultKas }: any = usePage().props;

    const { data, setData, processing, reset, put } = useForm({
        default_kas: 0,
        _method: "PUT",
    });

    const validateForm = () => {
        if (data.default_kas) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = () => {
        put(route("default-kas.update", defaultKas.id), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: "Default Kas berhasil diupdate.",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal",
                    variant: "destructive",
                    description: "Default Kas gagal diupdate.",
                });
            },
        });
    };

    return (
        <div className="grid gap-3 shadow rounded-lg py-3 px-5 bg-white dark:bg-black">
            <span className="space-y-3">
                <div className="space-y-1">
                    <span className="flex items-center gap-1">
                        <Label htmlFor="defaultKas">Default</Label> -
                        <small className="text-green-500">
                            ({formatAmount(defaultKas.default_kas)})
                        </small>
                    </span>
                    <Input
                        id="defaultKas"
                        leftAddon={<i>Rp</i>}
                        placeholder="12000"
                        value={data.default_kas === 0 ? "" : data.default_kas}
                        onChange={(e) => {
                            setData("default_kas", parseFloat(e.target.value)),
                                validateForm();
                        }}
                    />
                </div>
            </span>
            <span>
                <MainModal
                    title="Konfirmasi"
                    description="Apakah anda yakin untuk mengubah default kas?"
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

export default DefaultKasForm;
