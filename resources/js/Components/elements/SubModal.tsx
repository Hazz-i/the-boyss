import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import React from "react";

type SubModalProps = {
    title: string;
    description?: string;
    content?: React.ReactElement;
    footer?: React.ReactElement;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
};

const SubModal = ({
    title,
    description,
    content,
    footer,
    isOpen,
    setIsOpen,
}: SubModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

export default SubModal;
