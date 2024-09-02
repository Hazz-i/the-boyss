import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col gap-5 sm:justify-center items-start pt-6 sm:pt-0 container">
            <h1>
                <span className="text-2xl font-bold">Selamat Datang,</span>
                <br />
                <span className="dark:text-gray-300">
                    login untuk melanjutkan
                </span>
            </h1>
            <div className="flex items-center justify-center w-full h-[20rem]">
                <span className="border w-48 h-48 rounded-full border-white "></span>
                {/* <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link> */}
            </div>

            <div className="w-full sm:max-w-md sm:shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
