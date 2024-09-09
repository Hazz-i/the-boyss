import React, { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import MainModal from "@/Components/elements/MainModal";
import { DialogClose } from "@radix-ui/react-dialog";
import SubModal from "@/Components/elements/SubModal";
import { PageProps } from "@/types";

const UpdateUserForm = ({ isOpen, setIsOpen }: any) => {
    const user = usePage<PageProps>().props.auth.user;

    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const { data, setData, put, processing, reset } = useForm({
        username: "",
        whatsapp: "",
        _method: "PUT",
    });

    const validateForm = () => {
        if (data.username || data.whatsapp) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = () => {
        put(route("profile.update", user.id), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                setIsOpen(false);
                toast({
                    variant: "primary",
                    title: "Berhasil",
                    description: "Profile Berhasil di perbaharui.",
                });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Gagal",
                    description: "Profile user gagal di diperbaharui.",
                });
            },
        });
    };

    return (
        <SubModal
            title="Update Profile"
            description="Lengkapi isi data dulu klo mau update."
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={
                <span className="grid gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Username</Label>
                        <Input
                            type="text"
                            id="name"
                            value={data.username}
                            placeholder="username mu"
                            onChange={(e) => {
                                setData("username", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-user"></i>}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="price">Lainya</Label>
                        <Input
                            type="number"
                            value={data.whatsapp}
                            id="price"
                            placeholder="nomor whatsapp"
                            onChange={(e) => {
                                setData("whatsapp", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bxl-whatsapp"></i>}
                        />
                    </div>
                </span>
            }
            footer={
                <span className="w-full flex gap-2 items-center justify-center">
                    <DialogClose asChild>
                        <MainModal
                            title="Konfirmasi"
                            description="Apakah anda yakin untuk mengirim data ini?"
                            trigger={
                                <Button
                                    variant={"primary"}
                                    disabled={processing || !isFormValid}
                                    className="w-full"
                                >
                                    Update
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
                                        <Button variant={"outline"}>
                                            Batal
                                        </Button>
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
                    </DialogClose>
                </span>
            }
        />
    );
};

export default UpdateUserForm;
