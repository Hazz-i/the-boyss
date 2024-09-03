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
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                    </Avatar>
                    <div className="flex flex-col items-center justify-center text-sm">
                        <p className="font-semibold text-lg">
                            {auth.user.name}
                        </p>
                        <p>{auth.user.email}</p>
                    </div>
                    <Button className="bg-[#5CA4C5]">Edit Profile</Button>
                </span>

                <span className="grid gap-2">
                    <h1>Setting</h1>
                    <div className="shadow rounded-lg grid">
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
                                            Ubah Password
                                        </h1>
                                    </span>
                                    <p className="bx bx-chevron-right"></p>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm sm:max-w-[425px]">
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
                                    />
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="konfirmasi password baru"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Simpan</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center justify-between p-2 text-red-500"
                        >
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg border bg-red-100 ">
                                    <i className="bx bx-log-out rotate-180 font-extrabold"></i>
                                </div>
                                <h1 className="font-semibold">Logout</h1>
                            </span>
                        </Link>
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
