import { PropsWithChildren, ReactNode } from "react";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import KasForm from "@/Pages/Transaction/kas/Create";
import TalanganForm from "@/Pages/Transaction/talangan/Create";
import MainModal from "@/Components/elements/MainModal";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {header && (
                <header className="max-w-7xl mx-auto  flex items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
                    <span className="text-xl font-semibold flex gap-2 items-center">
                        <i className="bx bxs-cat text-2xl"></i>The Boys 5
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="w-10 h-10">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel className="flex items-center gap-2">
                                <i className="bx bxs-cat text-lg"></i>
                                {user.email}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link
                                href={route("profile.edit")}
                                className="flex gap-2 items-center justify-start ps-5 py-2"
                            >
                                <i className="bx bx-user-circle"></i>Profile
                            </Link>
                            <Link
                                href={route("notification.index")}
                                className="flex gap-2 items-center justify-start ps-5 py-2"
                            >
                                <i className="bx bx-bell"></i>Notification
                            </Link>

                            <MainModal
                                title="Logout"
                                description="Apakah anda yakin untuk keluar dari aplikasi?"
                                trigger={
                                    <button className="flex gap-2 items-center justify-start ps-5 py-2 text-red-500">
                                        <i className="bx bx-log-out rotate-180"></i>
                                        Logout
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
            )}

            <main>{children}</main>

            <div className="fixed bottom-0 w-full py-2 border flex items-center justify-center gap-8 bg-[#E5E6EC] dark:bg-gray-950 rounded-tl-3xl rounded-tr-3xl lg:hidden outline-1 outline outline-gray-400">
                <NavLink
                    href={"/dashboard"}
                    active={route().current("dashboard.index")}
                    icon={"bx-home-alt-2"}
                    icon_active={"bxs-home-alt-2"}
                    name={"Home"}
                />
                <NavLink
                    href={"/transaksi"}
                    active={route().current("transaksi.index")}
                    icon={"bx-transfer"}
                    icon_active={"bx-transfer"}
                    name={"Transaksi"}
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center justify-center w-14 h-14 rounded-full text-white bg-[#5CA4C5] dark:text-black dark:bg-white shadow-gray-200 shadow-lg dark:shadow-sm">
                            <i className="bx bx-plus text-2xl"></i>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm sm:max-w-[425px] rounded-lg">
                        <DialogHeader>
                            <DialogTitle>Opsi Cepat</DialogTitle>
                            <DialogDescription>
                                Shortcut untuk memasukan kas dan talangan
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="kas" className="w-sm">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="kas">Kas</TabsTrigger>
                                <TabsTrigger value="talangan">
                                    Talangan
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="kas" className="grid gap-2">
                                <KasForm user={user} />
                            </TabsContent>
                            <TabsContent
                                value="talangan"
                                className="grid gap-2"
                            >
                                <TalanganForm user={user} />
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>

                <NavLink
                    href={"/history"}
                    active={route().current("history.index")}
                    icon={"bx-notepad"}
                    icon_active={"bxs-notepad"}
                    name={"History"}
                />
                <NavLink
                    href={"/profile"}
                    active={route().current("profile.edit")}
                    icon={"bx-user-circle"}
                    icon_active={"bxs-user-circle"}
                    name={"Profile"}
                ></NavLink>
            </div>
        </div>
    );
}
