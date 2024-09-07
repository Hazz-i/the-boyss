import MainModal from "@/Components/elements/MainModal";
import { Button } from "@/Components/ui/button";
import { DialogClose } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

const UpdatePassWithAuthForm = ({ user }: any) => {
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const { data, setData, put, processing, reset } = useForm({
        password: "",
        _method: "PUT",
    });

    const validateForm = () => {
        if (data.password.length > 5) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = () => {
        put(route("user.updateWithAuth", user.id), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                toast({
                    variant: "primary",
                    title: "Berhasil",
                    description: `Berhasil merubah password user ${user.name}.`,
                });
            },
            onError: () => {
                toast({
                    title: "Terjadi Kesalahan",
                    description: "password gagal di perbaharui!.",
                });
            },
        });
    };
    return (
        <span className="flex gap-2 items-center justify-between ">
            <Input
                type="text"
                placeholder="password"
                width="w-full"
                value={data.password}
                onChange={(e) => {
                    setData("password", e.target.value);
                    validateForm();
                }}
                leftAddon={<i className="bx bx-key"></i>}
            />
            <MainModal
                title="Konfirmasi"
                description={`Apakah anda yakin untuk mengganti password milik \"${user.name}\" ?`}
                trigger={
                    <Button
                        variant="outline"
                        className="boder border-red-500 text-red-500"
                        disabled={!isFormValid || processing}
                    >
                        Reset
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
                                type="submit"
                                variant={"primary"}
                                onClick={handleSubmit}
                            >
                                Konfirmasi
                            </Button>
                        </DialogClose>
                    </span>
                }
            />
        </span>
    );
};

export default UpdatePassWithAuthForm;
