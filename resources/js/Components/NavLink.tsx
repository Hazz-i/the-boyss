import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    icon_active = "",
    icon = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean } & { icon_active?: string } & {
    icon?: string;
}) {
    return (
        <Link
            {...props}
            className={
                "flex flex-col items-center px-1 pt-1 text-2xl font-medium leading-5 transition duration-150 ease-in-out focus:outline-none bx " +
                (active
                    ? ` text-gray-900 dark:text-gray-200 ${icon_active} `
                    : `text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 ${icon} `) +
                className
            }
        >
            {children}
        </Link>
    );
}
