import React, { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import MainModal from "@/Components/elements/MainModal";
import { DialogClose } from "@radix-ui/react-dialog";
import GalonActiveForm from "./Active";
import SubModal from "@/Components/elements/SubModal";

const ShowGalon = ({ galonDrivers, auth }: any) => {
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        status: false,
        price: 0,
        number: "",
    });

    const validateForm = () => {
        if (data.name && data.price && data.number) {
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
                    description: "Nomor Kang Galon Berhasil di tambahkan.",
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
            className="w-full grid p-5 border rounded-xl bg-[#5CA4C5] gap-5 shadow-lg"
            id="galon"
        >
            <span className="w-full flex items-center justify-between">
                <div className=" flex items-center justify-center text-gray-200 gap-1">
                    <i className="bx bxs-droplet font-extrabold text-xl"></i>
                    <h1 className="text-lg font-semibold">List Kang Galon</h1>
                </div>

                {(auth.user.role.toLowerCase() === "developer" ||
                    auth.user.role.toLowerCase() === "developer") && (
                    <button
                        className="flex items-center gap-2 text-[#5CA4C5] bg-gray-200 px-2 h-full rounded-md animate-pulse"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className="bx bx-plus"></i>
                    </button>
                )}
            </span>

            <span className="flex flex-wrap gap-2 items-center justify-center pb-3">
                {galonDrivers.length === 0 ? (
                    <h1 className="text-gray-200 font-bold">Belum ada data</h1>
                ) : (
                    galonDrivers.map((driver: any) => (
                        <div key={driver.id}>
                            {auth.user.role.toLowerCase() === "developer" ? (
                                <GalonActiveForm driver={driver} />
                            ) : (
                                <button
                                    className={`py-1 px-3 ${
                                        driver.status === 1
                                            ? "bg-gray-200 text-[#368CB6]"
                                            : "border text-gray-200"
                                    } rounded-md`}
                                >
                                    <small className="font-bold">
                                        {driver.name}
                                    </small>
                                </button>
                            )}
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
                                <Label htmlFor="price">Harga</Label>
                                <Input
                                    type="number"
                                    value={data.price ? data.price : ""}
                                    id="price"
                                    placeholder="Harga galon"
                                    onChange={(e) => {
                                        setData(
                                            "price",
                                            parseFloat(e.target.value)
                                        );
                                        validateForm();
                                    }}
                                    leftAddon={<i>Rp</i>}
                                />
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
                                            disabled={processing}
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

export default ShowGalon;
