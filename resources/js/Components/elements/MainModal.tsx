import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import React from "react";

type MainModalProps = {
    trigger: React.ReactElement;
    title: string;
    description?: string;
    content?: React.ReactElement;
    footer: React.ReactElement;
};

const MainModal = ({
    trigger,
    title,
    description,
    content,
    footer,
}: MainModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-[425px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {content}
                <DialogFooter>{footer}</DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MainModal;
