import MainModal from "@/Components/elements/MainModal";
import { Button } from "@/Components/ui/button";
import { DialogClose } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";

const GalonActiveForm = ({ driver }: any) => {
    const { put } = useForm({
        status: true,
        _method: "PUT",
    });

    const handleSubmit = () => {
        put(route("galon.update", driver.id), {
            onSuccess: () => {
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: "Nomor Kang Galon Aktif berhasil diupdate.",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal",
                    description: "Kang Galon gagal diupdate.",
                });
            },
        });
    };

    return (
        <MainModal
            key={driver.id}
            title="Yakin bang?"
            description="Kang galon ini akan menjadi nomor utama?"
            trigger={
                <button
                    className={`py-1 px-3 ${
                        driver.status === 1
                            ? "bg-gray-200 text-[#368CB6]"
                            : "border text-gray-200"
                    } rounded-md`}
                    disabled={driver.status}
                >
                    <small className="font-bold">{driver.name}</small>
                </button>
            }
            content={
                <span className="py-2">
                    <i className="w-full bx bxs-sleepy text-9xl text-center animate-pulse duration-700"></i>
                </span>
            }
            footer={
                <span className="w-full flex gap-2 items-center justify-center">
                    <DialogClose asChild>
                        <Button variant={"outline"} className="w-1/2">
                            Ga jadi
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className="w-1/2"
                            variant={"primary"}
                            onClick={handleSubmit}
                        >
                            Yakin
                        </Button>
                    </DialogClose>
                </span>
            }
        />
    );
};

export default GalonActiveForm;
