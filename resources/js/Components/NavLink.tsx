import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    icon_active = "",
    icon = "",
    name = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean } & { icon_active?: string } & {
    icon?: string;
    name: string;
}) {
    return (
        <Link
            {...props}
            className={
                "flex flex-col rounded-full items-center justify-center py-2 px-3 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none bx md:px-10 md:py-1 md:rounded-lg md:flex-row md:gap-2 md:justify-start " +
                (active
                    ? `bg-gray-300 text-gray-500 dark:text-[#EEEEEE] dark:bg-gray-950 `
                    : `text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 `) +
                className
            }
        >
            <i className={`text-xl bx ${active ? icon_active : icon}`}></i>
            {children}
        </Link>
    );
}
