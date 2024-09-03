import { format, parseISO } from "date-fns";

export const formatAmount = (amount: any) => {
    const numericAmount =
        typeof amount === "number" ? amount : parseFloat(amount);

    return numericAmount.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
};

export const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "dd-MM-yyyy");
};

export const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
