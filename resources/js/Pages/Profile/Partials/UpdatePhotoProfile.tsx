import React, { ChangeEvent, FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import MainModal from "@/Components/elements/MainModal";
import { DialogClose } from "@radix-ui/react-dialog";
import SubModal from "@/Components/elements/SubModal";
import { PageProps } from "@/types";

const UpdatePhotoProfile = ({ isOpen, setIsOpen }: any) => {
    const user = usePage<PageProps>().props.auth.user;

    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const { data, setData, post, processing, reset } = useForm<{
        image: File | null,
    }>({
        image: null,
    });

    const validateForm = () => {
        setIsFormValid(!!data.image);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData("image", file);
        validateForm();
    };

    const handleSubmit: FormEventHandler = () => {
        post(route("profile.update_photo", user.id), {
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
            title="Update Photo Profile"
            description="KAREPMU LE MEH NGGO POTO OPO, PENTING ORA SARU."
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={
                <span className="grid gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="image">Photo Baru</Label>
                            <Input id="image" type="file" onChange={handleFileChange} />
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
                                    disabled={processing || !data.image}
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

export default UpdatePhotoProfile;
