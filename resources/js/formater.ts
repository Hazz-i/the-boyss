// import { format, parseISO } from "date-fns";

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
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
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
