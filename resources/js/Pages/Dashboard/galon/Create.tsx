import React, { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import MainModal from "@/Components/elements/MainModal";
import { DialogClose } from "@radix-ui/react-dialog";
import GalonActiveForm from "./Active";
import SubModal from "@/Components/elements/SubModal";
import { PageProps } from "@/types";

const DriverGalonForm = ({ galonDrivers }: any) => {
    const user = usePage<PageProps>().props.auth.user;

    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        status: false,
        number: "",
    });

    const validateForm = () => {
        if (data.name && data.number) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleSubmit: FormEventHandler = () => {
        post(route("galon.store"), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                setIsOpen(false);
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: `${data.name} Berhasil di tambahkan Ke List Galon.`,
                });
            },
            onError: () => {
                toast({
                    title: "Gagal",
                    description: "Kang galon gagal di tambahkan.",
                });
            },
        });
    };

    return (
        <div
            className="w-full grid p-5 border rounded-xl bg-[#5CA4C5] dark:bg-[#76ABAE] gap-5 shadow-lg"
            id="galon"
        >
            <span className="w-full flex items-center justify-between">
                <div className=" flex items-center justify-center text-gray-200 dark:text-[#EEEEEE] gap-1">
                    <i className="bx bxs-droplet font-extrabold text-xl"></i>
                    <h1 className="text-lg font-semibold">List Kang Galon</h1>
                </div>

                <button
                    className="flex items-center gap-2 text-[#5CA4C5] bg-gray-200 dark:text-[#76ABAE] dark:bg-[#EEEEEE] px-2 h-full rounded-md animate-pulse"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className="bx bx-plus"></i>
                </button>
            </span>

            <span className="flex flex-wrap gap-2 items-center justify-center pb-3">
                {galonDrivers.length === 0 ? (
                    <h1 className="text-gray-200 dark:text-[#EEEEEE] font-bold">
                        Belum ada data
                    </h1>
                ) : (
                    galonDrivers.map((driver: any) => (
                        <div key={driver.id}>
                            <GalonActiveForm driver={driver} />
                        </div>
                    ))
                )}
            </span>

            {isOpen && (
                <SubModal
                    title="Tambah Nomor Galon"
                    description="yang murah murah aja ga sii :v"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    content={
                        <span className="grid gap-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="password">Nama Galon</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    placeholder="nama kang galon"
                                    onChange={(e) => {
                                        setData("name", e.target.value);
                                        validateForm();
                                    }}
                                    leftAddon={<i className="bx bx-user"></i>}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="price">Nomor</Label>
                                <Input
                                    type="text"
                                    id="number"
                                    value={data.number}
                                    onChange={(e) => {
                                        setData("number", e.target.value);
                                        validateForm();
                                    }}
                                    placeholder="nomor telepon kang galon"
                                    leftAddon={<i className="bx bx-phone"></i>}
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
                                            disabled={
                                                processing || !isFormValid
                                            }
                                            className="w-full"
                                        >
                                            Tambah
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
                                                    Tambah
                                                </Button>
                                            </DialogClose>
                                        </span>
                                    }
                                />
                            </DialogClose>
                        </span>
                    }
                />
            )}
        </div>
    );
};

export default DriverGalonForm;
