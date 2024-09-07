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
import {
    AlertDialogAction,
    AlertDialogCancel,
} from "@/Components/ui/alert-dialog";
import UpdateUserForm from "./Partials/UpdateProfileInformationForm";
import { DialogClose } from "@radix-ui/react-dialog";
import MainModal from "@/Components/elements/MainModal";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { setTheme } = useTheme();
    const [darkMode, setDarkMode] = React.useState<boolean>(true);

    //modal hanlde
    const [isUpdateInformationOpen, setIsUpdateInformationOpen] =
        React.useState<boolean>(false);
    const [isPasswordUpdate, setIsPasswordUpdate] =
        React.useState<boolean>(false);

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
                            {auth.user.username}
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
                    <Button
                        variant={"primary"}
                        onClick={() =>
                            setIsUpdateInformationOpen(!isUpdateInformationOpen)
                        }
                    >
                        Edit Profile
                    </Button>
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

                        <button
                            className="flex items-center justify-between p-2 border-t border-b z-10"
                            onClick={() =>
                                setIsPasswordUpdate(!isPasswordUpdate)
                            }
                        >
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg  bg-gray-200 text-[#368CB6]">
                                    <i className="bx bx-key font-extrabold"></i>
                                </div>
                                <h1 className="font-semibold">Edit Password</h1>
                            </span>
                            <p className="bx bx-chevron-right"></p>
                        </button>

                        <MainModal
                            title="Logout"
                            description="Apakah anda yakin untuk keluar dari aplikasi?"
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
                            content={
                                <span className="py-2 border rounded-md bg-gray-300 shadow-inner">
                                    <i className="w-3/4 bx bx-ghost text-7xl animate-walk text-white/80"></i>
                                </span>
                            }
                            footer={
                                <span className="grid grid-cols-2 gap-2 items-center justify-center">
                                    <DialogClose asChild>
                                        <Button variant={"outline"}>
                                            Batal
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <span className="h-9 px-4 flex justify-center items-center border bg-red-500 bg-transparent text-white rounded-lg text-center">
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Logout
                                            </Link>
                                        </span>
                                    </DialogClose>
                                </span>
                            }
                        />
                    </div>
                </span>

                <footer className="text-center pt-5 text-black dark:text-white">
                    <p className="text-sm">&copy; By The Boys 5</p>
                    <small> Sept-2024</small>
                </footer>
            </div>

            {isUpdateInformationOpen && (
                <UpdateUserForm
                    isOpen={isUpdateInformationOpen}
                    setIsOpen={setIsUpdateInformationOpen}
                />
            )}

            {isPasswordUpdate && (
                <UpdatePasswordForm
                    isOpen={isPasswordUpdate}
                    setIsOpen={setIsPasswordUpdate}
                />
            )}
        </AuthenticatedLayout>
    );
}
