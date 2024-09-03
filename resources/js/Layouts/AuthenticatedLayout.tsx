import React, { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Button } from "@/Components/ui/button";
import { ModeToggle } from "@/Components/mode-toogle";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [position, setPosition] = React.useState("bottom");

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* <nav className=" border-b border-gray-100 dark:border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current dark:text-gray-300 text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav> */}

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
                                className="flex gap-2 items-center justify-start ps-5 py-1"
                            >
                                <i className="bx bx-user-circle"></i>Profile
                            </Link>
                            <Link
                                href={route("notification.index")}
                                className="flex gap-2 items-center justify-start ps-5 py-1"
                            >
                                <i className="bx bx-bell"></i>Notification
                            </Link>
                            <Link
                                href={route("logout")}
                                className="flex gap-2 items-center justify-start ps-5 py-1 text-red-500"
                            >
                                <i className="bx bx-log-out rotate-180"></i>
                                Logout
                            </Link>
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
                <Link
                    href="/"
                    className="flex items-center justify-center w-14 h-14 rounded-full text-white bg-[#5CA4C5] dark:text-black dark:bg-white shadow-gray-200 shadow-lg dark:shadow-sm"
                >
                    <h1 className="text-3xl font-serif">+</h1>
                </Link>
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
