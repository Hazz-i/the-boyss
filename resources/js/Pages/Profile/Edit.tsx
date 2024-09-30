import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import React from "react";
import UpdateUserForm from "./Partials/UpdateProfileInformationForm";
import { DialogClose } from "@radix-ui/react-dialog";
import MainModal from "@/Components/elements/MainModal";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdatePhotoProfile from "./Partials/UpdatePhotoProfile";
import { SmModeToggle } from "@/Components/darkToogle/sm-mode-toogke";

export default function Edit({
    auth,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const [isUpdateInformationOpen, setIsUpdateInformationOpen] =
        React.useState<boolean>(false);
    const [isPasswordUpdate, setIsPasswordUpdate] =
        React.useState<boolean>(false);
    const [isUpdatePhoto, setIsUpdatePhoto] = React.useState<boolean>(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Profile</h2>}
        >
            <Head title="Profile" />

            <span className="md:w-full md:items-start md:justify-center md:flex md:h-[85vh]">
                <div className="px-2 md:px-5 md:py-10 flex flex-col justify-start gap-2 pb-24 md:pb-[5rem] md:gap-10 md:w-[35rem] md:border rounded-xl">
                    <span className="flex flex-col items-center justify-center gap-2">
                        <Avatar className="w-32 h-32">
                            <AvatarImage
                                src={`${
                                    auth.user.image ??
                                    "https://github.com/shadcn.png"
                                }`}
                                alt={auth.user.name}
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
                                            : "bx bx-code-alt"
                                    }`}
                                ></i>
                            </p>
                            <p>{auth.user.role}</p>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                variant={"primary"}
                                onClick={() =>
                                    setIsUpdateInformationOpen(
                                        !isUpdateInformationOpen
                                    )
                                }
                            >
                                Edit Profile
                            </Button>
                            <Button
                                variant={"primary"}
                                onClick={() => setIsUpdatePhoto(!isUpdatePhoto)}
                            >
                                Edit Photo
                            </Button>
                        </div>
                    </span>

                    <span className="grid gap-2">
                        <h1>Setting</h1>
                        <div className="shadow rounded-lg grid border">
                            <SmModeToggle />
                            <button
                                className="flex items-center justify-between p-2 border-t border-b z-10"
                                onClick={() =>
                                    setIsPasswordUpdate(!isPasswordUpdate)
                                }
                            >
                                <span className="flex gap-2 items-center">
                                    <div className="p-3 flex items-center justify-center rounded-lg bg-gray-200 text-[#368CB6]">
                                        <i className="bx bx-key font-extrabold"></i>
                                    </div>
                                    <h1 className="font-semibold">
                                        Edit Password
                                    </h1>
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
                                    <i className=" bx bx-door-open text-7xl  text-center animate-pulse"></i>
                                }
                                footer={
                                    <span className="grid grid-cols-2 gap-2 items-center justify-center">
                                        <DialogClose asChild>
                                            <Button variant={"outline"}>
                                                Batal
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <span className="h-9 px-4 flex justify-center items-center border bg-red-500 text-white rounded-lg text-center">
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

                    <footer className="text-center pt-5 md:pt-20 text-black dark:text-white">
                        <p className="text-sm">&copy; By The Boys 5</p>
                        <small> Sept-2024</small>
                    </footer>
                </div>
            </span>

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

            {isUpdatePhoto && (
                <UpdatePhotoProfile
                    isOpen={isUpdatePhoto}
                    setIsOpen={setIsUpdatePhoto}
                />
            )}
        </AuthenticatedLayout>
    );
}
