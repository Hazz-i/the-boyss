import SquareHome from "@/Components/elements/SquareHome";
import SubModal from "@/Components/elements/SubModal";
import { Button } from "@/Components/ui/button";
import { DialogClose } from "@/Components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useForm, usePage } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

const UserGalonUpdateForm = ({ user }: any) => {
    const [isDone, setIsDone] = React.useState<boolean>(false);

    const { setData, put, processing, reset } = useForm({
        galon: false,
        _method: "PUT",
    });

    const handleSubmit: FormEventHandler = () => {
        setData("galon", true);

        put(route("user-galon.update", user[0].id), {
            onSuccess: () => {
                reset();
                setIsDone(false);

                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: `Urutan galon berhasil diubah.`,
                });
            },
            onError: () => {
                setIsDone(false);
                toast({
                    title: "Gagal",
                    variant: "destructive",
                    description: "Urutan galon gagal di ubah.",
                });
            },
        });
    };

    return (
        <>
            <SquareHome
                text={`done`}
                className="animate-pulse duration-700 border-2 text-white"
                icon="bx-check"
                color="bg-[#5CA4C5]"
                onclickEvent={() => setIsDone(true)}
            />
            {isDone && (
                <SubModal
                    title="Konfirmasi Galon"
                    description="Udah pesen galon bang?"
                    isOpen={isDone}
                    setIsOpen={setIsDone}
                    content={
                        <i className="bx bx-question-mark text-center text-7xl animate-bounce"></i>
                    }
                    footer={
                        <span className="grid grid-cols-2 gap-2">
                            <DialogClose asChild>
                                <Button variant={"outline"}>Belum</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    type="submit"
                                    variant={"primary"}
                                    onClick={handleSubmit}
                                >
                                    Udah
                                </Button>
                            </DialogClose>
                        </span>
                    }
                />
            )}
        </>
    );
};

export default UserGalonUpdateForm;
