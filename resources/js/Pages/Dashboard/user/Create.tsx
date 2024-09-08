import React, { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import MainModal from "@/Components/elements/MainModal";
import { DialogClose } from "@radix-ui/react-dialog";
import SubModal from "@/Components/elements/SubModal";

const UserForm = ({ isOpen, setIsOpen }: any) => {
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    const validateForm = () => {
        if (data.name && data.password && data.password_confirmation) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = async () => {
        post(route("user.store"), {
            onSuccess: (response) => {
                reset();
                setIsFormValid(false);
                setIsOpen(false);

                const statusMessage =
                    response.props?.status || "User berhasil ditambahkan.";
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: `${statusMessage}`,
                });
            },
            onError: () => {
                setIsOpen(false);
                toast({
                    title: "Gagal",
                    variant: "destructive",
                    description: "User gagal ditambahkan.",
                });
            },
        });
    };

    return (
        <SubModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Tambah Anggota Kontrakan"
            description="Member baru brok!"
            content={
                <span className="grid gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            type="text"
                            value={data.name}
                            placeholder="Nama member"
                            onChange={(e) => {
                                setData("name", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-user"></i>}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            value={data.username}
                            placeholder="Username member"
                            onChange={(e) => {
                                setData("username", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-user"></i>}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            value={data.password}
                            placeholder="Password member"
                            onChange={(e) => {
                                setData("password", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-key"></i>}
                        />
                        <Input
                            type="password"
                            value={data.password_confirmation}
                            placeholder="Konfirmasi password member"
                            onChange={(e) => {
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                );
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-key"></i>}
                        />
                    </div>
                </span>
            }
            footer={
                <span className="w-full flex gap-2 items-center justify-center">
                    <DialogClose asChild>
                        <MainModal
                            title="Konfirmasi"
                            description="Apakah anda yakin untuk menambahkan member ini ke kontrakan?"
                            trigger={
                                <Button
                                    variant={"primary"}
                                    disabled={processing || !isFormValid}
                                    className="w-full"
                                >
                                    Tanbah
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
                                    <Button
                                        type="submit"
                                        variant={"primary"}
                                        onClick={handleSubmit}
                                    >
                                        Tambah
                                    </Button>
                                </span>
                            }
                        />
                    </DialogClose>
                </span>
            }
        />
    );
};

export default UserForm;
