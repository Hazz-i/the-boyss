import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import MainModal from "@/Components/elements/MainModal";

type KasFormProps = {
    auth?: any;
    user?: any;
};

const KasForm = ({ auth, user }: KasFormProps) => {
    const { defaultKas, ledgers }: any = usePage().props;
    const currentUser = user || auth?.user;
    const isKasExist = ledgers?.filter(
        (ledger: any) =>
            currentUser.id === ledger.user_id &&
            ledger.transaction_purpose === "KAS"
    );

    if (!currentUser) {
        return <p>User data is missing</p>;
    }

    const { data, setData, post, processing, reset } = useForm({
        user_id: currentUser.id,
        transaction_purpose: "KAS",
        amount: defaultKas.default_kas,
        bukti: null,
        status: "IN",
    });

    const handleSubmit: FormEventHandler = () => {
        if (data.bukti === "") {
            setData("bukti", null);
        }

        post(route("transaksi.store"), {
            onSuccess: () => {
                reset();
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: "Data Berhasil di tambahkan.",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal",
                    variant: "destructive",
                    description: "Data gagal di tambahkan.",
                });
            },
        });
    };

    return (
        <>
            {isKasExist.length > 0 ? (
                <span className="flex flex-col items-center justify-center py-5 gap-5">
                    <i className="bx bx-check-circle text-5xl text-green-500"></i>
                    <p className="text-green-500 text-wrap text-center w-3/4">
                        Udah bang, kamu sudah melakukan kas bulan ini.
                    </p>
                </span>
            ) : (
                <div className="grid gap-3">
                    <span className="space-y-3">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={currentUser.name}
                                readOnly
                                leftAddon={<i className="bx bx-user"></i>}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="amount">Nominal</Label>
                            <Input
                                id="amount"
                                value={defaultKas.default_kas}
                                readOnly
                                leftAddon={<i>Rp</i>}
                            />
                        </div>
                        <div className="space-y-0">
                            <Label htmlFor="picture">Bukti</Label>
                            <Input id="picture" type="file" />
                        </div>
                    </span>
                    <span>
                        <MainModal
                            title="Konfirmasi"
                            description="Apakah anda yakin untuk mengirim data ini?"
                            trigger={
                                <Button
                                    variant={"primary"}
                                    disabled={processing}
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
                                        <Button variant={"outline"}>
                                            Batal
                                        </Button>
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
            )}
        </>
    );
};

export default KasForm;
