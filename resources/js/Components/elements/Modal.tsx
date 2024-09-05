import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Link } from "@inertiajs/react";
import React from "react";

export function Modal({
    title,
    description,
    action,
    trigger,
}: {
    trigger: React.ReactElement;
    title: string;
    description: string;
    action: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent className="max-w-sm rounded-lg ">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-[#5CA4C5] text-white">
                        Batal
                    </AlertDialogCancel>

                    <Link href={route("logout")} method="post">
                        <AlertDialogAction className="border border-red-500 bg-transparent text-red-500 w-full">
                            {action}
                        </AlertDialogAction>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
