import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import React from "react";

const PaginationItems = ({ Links }: any) => {
    const MAX_VISIBLE_LINKS = 3; // Maximum number of pagination links to display
    const totalPages = Links.length; // Total number of pages
    const currentPageIndex = Links.findIndex((link: any) => link.active); // Find the index of the currently active page

    const getPaginationLinks = () => {
        // If the total number of pages is less than or equal to the maximum visible links, return all links
        if (totalPages <= MAX_VISIBLE_LINKS) {
            return Links;
        }

        // Determine the pagination links to display
        let displayedLinks = [];

        // If current page is near the start, show the first few pages
        if (currentPageIndex < 2) {
            displayedLinks = Links.slice(0, MAX_VISIBLE_LINKS);
        }
        // If current page is near the end, show the last few pages
        else if (currentPageIndex > totalPages - 3) {
            displayedLinks = Links.slice(
                totalPages - MAX_VISIBLE_LINKS,
                totalPages
            );
        }
        // If current page is in the middle, show the current page and two surrounding pages
        else {
            displayedLinks = Links.slice(
                currentPageIndex - 1,
                currentPageIndex + 2
            );
        }

        // Add ellipses if necessary
        if (currentPageIndex >= 2) {
            displayedLinks.unshift({ label: "...", url: null });
            displayedLinks.unshift(Links[0]); // Show the first page
        }
        if (currentPageIndex <= totalPages - 3) {
            displayedLinks.push({ label: "...", url: null });
            displayedLinks.push(Links[totalPages - 1]); // Show the last page
        }

        return displayedLinks;
    };

    const paginatedLinks = getPaginationLinks();

    return (
        <Pagination className="py-2">
            <PaginationContent>
                {paginatedLinks.map((link: any, index: number) => {
                    if (link.label.includes("Previous")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious href={link.url} />
                            </PaginationItem>
                        );
                    } else if (link.label.includes("Next")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext href={link.url} />
                            </PaginationItem>
                        );
                    } else if (link.label === "...") {
                        // Display ellipses without a link
                        return (
                            <PaginationItem key={index}>
                                <span className="ellipsis">...</span>
                            </PaginationItem>
                        );
                    } else {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={link.url}
                                    isActive={link.active}
                                >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                })}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationItems;
