import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { useTheme } from "@/Components/theme-provider";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/Components/elements/Modal";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { setTheme } = useTheme();
    const [darkMode, setDarkMode] = React.useState<boolean>(true);

    const handleTheme = () => {
        setDarkMode(!darkMode);
        setTheme(darkMode ? "dark" : "light");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="px-2 grid gap-2 pb-24">
                <span className="flex flex-col items-center justify-center gap-2">
                    <Avatar className="w-32 h-32">
                        <AvatarImage
                            src={`${
                                auth.user.image !== null
                                    ? auth.user.image
                                    : "https://github.com/shadcn.png"
                            }`}
                            alt="@shadcn"
                        />
                    </Avatar>
                    <div className="flex flex-col items-center justify-center text-sm">
                        <p className="font-semibold text-lg items-center flex gap-1">
                            {auth.user.name}
                            <i
                                className={`text-xl bx ${
                                    auth.user.role.toLocaleLowerCase() ==
                                    "anggota"
                                        ? "bx-group"
                                        : auth.user.role.toLocaleLowerCase() ==
                                          "bendahara"
                                        ? "bx-dollar-circle text-yellow-500"
                                        : "bx bx-user"
                                }`}
                            ></i>
                        </p>
                        <p>{auth.user.email}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"primary"}>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm sm:max-w-[425px] rounded-lg">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>-----</DialogDescription>
                            </DialogHeader>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="password">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder="username"
                                    leftAddon={<i className="bx bx-user"></i>}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="password">Lainnya</Label>
                                <Input
                                    type="number"
                                    id="number"
                                    placeholder="nomor whatsapp"
                                    leftAddon={
                                        <i className="bx bxl-whatsapp"></i>
                                    }
                                />
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="email"
                                    leftAddon={
                                        <i className="bx bx-envelope"></i>
                                    }
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant={"primary"}>
                                    Simpan
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </span>

                <span className="grid gap-2">
                    <h1>Setting</h1>
                    <div className="shadow rounded-lg grid border">
                        <div className="flex items-center justify-between p-2">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-200 text-[#368CB6]">
                                    <i
                                        className={`bx ${
                                            darkMode ? "bx-moon" : "bx-sun"
                                        } font-extrabold`}
                                    ></i>
                                </div>
                                <h1 className="font-semibold">Dark Mode</h1>
                            </span>
                            <Switch checked={darkMode} onClick={handleTheme} />
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center justify-between p-2 border-t border-b">
                                    <span className="flex gap-2 items-center">
                                        <div className="p-3 flex items-center justify-center rounded-lg  bg-gray-200 text-[#368CB6]">
                                            <i className="bx bx-key font-extrabold"></i>
                                        </div>
                                        <h1 className="font-semibold">
                                            Edit Password
                                        </h1>
                                    </span>
                                    <p className="bx bx-chevron-right"></p>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm sm:max-w-[425px] rounded-lg">
                                <DialogHeader>
                                    <DialogTitle>Edit Password</DialogTitle>
                                    <DialogDescription>
                                        Pastikan anda mengingat password baru
                                        yang anda masukan
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="password">
                                        Password Lama
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="password lama"
                                        leftAddon={
                                            <i className="bx bx-key"></i>
                                        }
                                    />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="password">
                                        Password Baru
                                    </Label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        placeholder="password baru"
                                        leftAddon={
                                            <i className="bx bx-key"></i>
                                        }
                                    />
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="konfirmasi password baru"
                                        leftAddon={
                                            <i className="bx bx-key"></i>
                                        }
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" variant={"primary"}>
                                        Simpan
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Modal
                            title="Logout"
                            description="Apakah anda yakin ingin keluar dari aplikasi?"
                            action="Logout"
                            trigger={
                                <button className="flex items-center justify-between p-2 text-red-500 border-t border-b">
                                    <span className="flex gap-2 items-center">
                                        <div className="p-3 flex items-center justify-center rounded-lg border bg-red-100 ">
                                            <i className="bx bx-log-out rotate-180 font-extrabold"></i>
                                        </div>
                                        <h1 className="font-semibold">
                                            Logout
                                        </h1>
                                    </span>
                                </button>
                            }
                        />
                    </div>
                </span>

                <span className="grid gap-2">
                    <h1>History Transaksi</h1>
                    <div className="flex items-center justify-between bg-gray-200 p-2">
                        <span className="flex gap-2 items-center">
                            <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6]">
                                <i className="bx bx-drink font-extrabold"></i>
                            </div>
                            <div className="grid">
                                <h1 className="font-semibold text-lg">
                                    Bayar Listrik
                                </h1>
                                <small>02-09-2024</small>
                            </div>
                        </span>
                        <div className="flex flex-col justify-center items-end">
                            <p className="font-semibold text-lg text-red-500">
                                - Rp.150.000
                            </p>
                            <small className="font-semibold">wahid</small>
                        </div>
                    </div>
                </span>

                <footer className="text-center pt-5 text-black dark:text-white">
                    <p className="text-sm">&copy; By The Boys 5</p>
                    <small> Sept-2024</small>
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
