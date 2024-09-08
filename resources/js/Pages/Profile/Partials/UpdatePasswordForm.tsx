import React, { useRef, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import MainModal from "@/Components/elements/MainModal";
import { Button } from "@/Components/ui/button";
import SubModal from "@/Components/elements/SubModal";
import { Label } from "@/Components/Label";
import { Input } from "@/Components/ui/input";
import { DialogClose } from "@/Components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function UpdatePasswordForm({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const validateForm = () => {
        if (
            data.current_password &&
            data.password &&
            data.password_confirmation
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                setIsOpen(false);
                toast({
                    variant: "primary",
                    title: "Berhasil",
                    description: "Password udah di perbaharui brok!.",
                });
            },
            onError: () => {
                setIsFormValid(false);
                toast({
                    variant: "destructive",
                    title: "Gagal",
                    description: "Minimal 8 charakter brok!.",
                });
            },
        });
    };

    return (
        <SubModal
            title="Update Password"
            description="Klo mau update password, isi data dulu."
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={
                <span className="grid gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password saat ini</Label>
                        <Input
                            type="password"
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            placeholder="Password lama"
                            onChange={(e) => {
                                setData("current_password", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-key"></i>}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="price">Password</Label>
                        <Input
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            id="price"
                            placeholder="password baru"
                            onChange={(e) => {
                                setData("password", e.target.value);
                                validateForm();
                            }}
                            leftAddon={<i className="bx bx-lock-alt"></i>}
                        />
                        <Input
                            type="password"
                            id="number"
                            value={data.password_confirmation}
                            onChange={(e) => {
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                );
                                validateForm();
                            }}
                            placeholder="konfirmasi password"
                            leftAddon={<i className="bx bx-lock-alt"></i>}
                        />
                    </div>
                </span>
            }
            footer={
                <span className="w-full flex gap-2 items-center justify-center">
                    <DialogClose asChild>
                        <MainModal
                            title="Konfirmasi"
                            description="Yakin Brok mo ganti password?"
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
                                <i className="bx bx-question-mark text-center text-7xl animate-ping"></i>
                            }
                            footer={
                                <span className="grid grid-cols-2 gap-2">
                                    <DialogClose asChild>
                                        <Button variant={"outline"}>
                                            Batal
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        variant={"primary"}
                                        onClick={handleSubmit}
                                        disabled={processing}
                                    >
                                        Konfirmasi
                                    </Button>
                                </span>
                            }
                        />
                    </DialogClose>
                </span>
            }
        />
    );
}
