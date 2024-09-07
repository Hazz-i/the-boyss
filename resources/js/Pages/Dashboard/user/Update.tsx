import MainModal from "@/Components/elements/MainModal";
import SubModal from "@/Components/elements/SubModal";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { DialogClose } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import UpdatePassWithAuthForm from "./UpdatePass";

const UserUpdateForm = ({
    userId,
    isOpen,
    setIsOpen,
    users,
}: {
    userId: number;
    isOpen: boolean;
    users: any;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const user = users.filter((user: any) => user.id === userId);
    const [position, setPosition] = React.useState(`${user[0].role}`);

    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    const { setData, put, processing, reset, data } = useForm({
        role: "",
        _method: "PUT",
    });

    const handleSubmit = () => {
        put(route("role.update", user[0].id), {
            onSuccess: () => {
                reset();
                setIsFormValid(false);
                setIsOpen(false);
                toast({
                    variant: "primary",
                    title: "Berhasil",
                    description: `Berhasil merubah role user ${user[0].name} menjadi ${position}.`,
                });
            },
            onError: () => {
                toast({
                    title: "Terjadi Kesalahan",
                    description: "Gagal memperbaharui role.",
                });
            },
        });
    };

    return (
        <SubModal
            title={`${user[0].username.toUpperCase()}`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={
                <span className="grid gap-2">
                    <span className="w-full py-2 flex items-center justify-center">
                        <Avatar className="w-32 h-32">
                            <AvatarImage
                                src={`${
                                    user.image
                                        ? user.image
                                        : "https://github.com/shadcn.png"
                                }`}
                                alt="@shadcn"
                            />
                        </Avatar>
                    </span>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Username</Label>
                        <Input
                            type="text"
                            id="name"
                            value={user[0].name}
                            disabled
                            leftAddon={<i className="bx bx-user"></i>}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="price">Lainya</Label>
                        {user[0].whatsapp && (
                            <Input
                                type="number"
                                value={user[0].whatsapp}
                                id="price"
                                disabled
                                leftAddon={<i className="bx bxl-whatsapp"></i>}
                            />
                        )}
                    </div>
                    <UpdatePassWithAuthForm user={user[0]} />
                    <span className="flex gap-2 items-center justify-between ">
                        <Input
                            type="text"
                            id="number"
                            value={position}
                            placeholder="email"
                            width="w-full"
                            leftAddon={
                                <i
                                    className={`bx ${
                                        user[0].role.toLowerCase() ===
                                        "developer"
                                            ? "bx-group"
                                            : user[0].role.toLowerCase() ===
                                              "bendahara"
                                            ? "bx-ball"
                                            : "bx-group"
                                    }`}
                                ></i>
                            }
                            disabled
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Ubah Role</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    Panel Position
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={position}
                                    onValueChange={(role) => {
                                        setPosition(role),
                                            setIsFormValid(true),
                                            setData("role", role);
                                    }}
                                >
                                    <DropdownMenuRadioItem
                                        value="Developer"
                                        disabled={user[0].role === "Developer"}
                                    >
                                        Developer
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem
                                        value="Anggota"
                                        disabled={user[0].role === "Anggota"}
                                    >
                                        Anggota
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem
                                        value="Bendahara"
                                        disabled={user[0].role === "Bendahara"}
                                    >
                                        Bendahara
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </span>
                </span>
            }
            footer={
                <span className="w-full flex gap-2 items-center justify-center">
                    <DialogClose asChild>
                        <MainModal
                            title="Konfirmasi"
                            description={`Apakah anda yakin untuk menjadikan ${user[0].nama} sebagai ${position} kontrakan?`}
                            trigger={
                                <Button
                                    variant={"primary"}
                                    disabled={processing || !isFormValid}
                                    className="w-full"
                                >
                                    Update Role
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

export default UserUpdateForm;
