import React, { ChangeEvent, FormEventHandler, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/Label";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import MainModal from "@/Components/elements/MainModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { formatAmount } from "@/formater";
import { PageProps } from "@/types";

type TalanganRevertFormProps = {
    talangans: {
        id: number;
        user: PageProps;
        user_id: number;
        amount: number;
        tujuan: string;
        dikembalikan: number;
        created_at: string;
        updated_at: string;
    }[];
};

const TalanganRevertForm = ({ talangans }: TalanganRevertFormProps) => {
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<string>(``);

    const talanganSelected = talangans.find((talangan: any) => {
        return talangan.id == position;
    });

    const talanganFitered = talangans.filter((talangan: any) => {
        return talangan.dikembalikan == 0;
    });

    const { data, setData, post, processing, reset } = useForm<{
        dikembalikan: boolean;
        amount: number;
        bukti: File | null;
    }>({
        dikembalikan: false,
        amount: 0,
        bukti: null,
    });

    useEffect(() => {
        talanganSelected && setData("amount", talanganSelected?.amount ?? 0);
    }, [talanganSelected]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData("bukti", file);
    };

    const handleSubmit: FormEventHandler = () => {
        post(route("talangan.update", position), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                toast({
                    title: "Berhasil",
                    variant: "primary",
                    description: "Talangan sudah berhasil di kemablikan!.",
                });
            },
            onError: () => {
                toast({
                    title: "Terjadi Kesalahan",
                    variant: "destructive",
                    description: "Talangan gagal di kembalikan.",
                });
            },
        });
    };

    return (
        <div className="grid gap-3 shadow rounded-lg py-3 px-5 bg-white dark:bg-black">
            <span className="space-y-3">
                <div className="space-y-1">
                    <Label htmlFor="amount">Nominal</Label>

                    <span className="flex gap-1 items-center">
                        <Input
                            id="amount"
                            leftAddon={<i>Rp</i>}
                            value={
                                talanganSelected ? talanganSelected.amount : ""
                            }
                            placeholder="Nominal Talangan"
                            disabled
                            onChange={(e) => {
                                setData("amount", parseFloat(e.target.value));
                            }}
                            width="w-full"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"outline"}>
                                    Pilih Talangan
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuRadioGroup
                                    value={position}
                                    onValueChange={(talangan) => {
                                        setPosition(talangan);
                                        setIsFormValid(true);
                                        setData("dikembalikan", true);
                                    }}
                                >
                                    {talanganFitered.map(
                                        (talangan: any, index: number) => (
                                            <DropdownMenuRadioItem
                                                key={index}
                                                value={talangan.id}
                                            >
                                                {talangan.user.name} -{" "}
                                                {formatAmount(talangan.amount)}
                                            </DropdownMenuRadioItem>
                                        )
                                    )}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </span>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="amount">Keterangan</Label>

                    <Input
                        id="amount"
                        value={
                            talanganSelected
                                ? `${talanganSelected.user.name} - ${talanganSelected.tujuan}`
                                : ""
                        }
                        placeholder="Keterangan"
                        disabled
                    />
                </div>
                <div className="space-y-0">
                    <Label htmlFor="picture">Bukti</Label>
                    <Input id="picture" type="file" onChange={handleFileChange} />
                </div>
            </span>
            <span>
                <MainModal
                    title="Konfirmasi"
                    description="Apakah anda yakin untuk mengirim data ini?"
                    trigger={
                        <Button
                            variant={"primary"}
                            disabled={processing || !isFormValid || !data.bukti}
                            className="w-full"
                        >
                            Kirim
                        </Button>
                    }
                    content={
                        <i className=" bx bxs-bell-ring text-7xl animate-pulse text-center"></i>
                    }
                    footer={
                        <span className="grid grid-cols-2 gap-2">
                            <DialogClose asChild>
                                <Button variant={"outline"}>Batal</Button>
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
    );
};

export default TalanganRevertForm;
