import { formatAmount, formatDate } from "@/formater";
import React from "react";
import SubModal from "./SubModal";

type HistorySmWidthProps = {
    items: any;
    links?: any;
    even?: string;
    odd?: string;
    className?: string;
};

const HistorySmWidth = ({
    items,
    even = "",
    odd = "bg-gray-200 dark:bg-gray-800",
    className = "",
}: HistorySmWidthProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [data, setData] = React.useState<any>(null);

    const handleOpenModal = (item: any) => {
        setData(item); // Set the data
        setIsOpen(true); // Open the modal
    };

    return (
        <>
            <div
                className={
                    `grid grid-cols-1 rounded-lg shadow-md border dark:border-gray-700 ` +
                    className
                }
            >
                {items.map((item: any, index: number) => (
                    <button
                        key={index}
                        className={`flex items-center justify-between p-2 ${
                            (index + 1) % 2 === 0 ? even : odd
                        }`}
                        onClick={() => handleOpenModal(item)}
                    >
                        <span className="flex gap-2 items-center">
                            <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6] dark:bg-gray-900 dark:text-[#76ABAE]">
                                <i
                                    className={`bx ${
                                        item.transaction_purpose
                                            ?.toLowerCase()
                                            .includes("listrik")
                                            ? "bx-power-off"
                                            : item.transaction_purpose
                                                  ?.toLowerCase()
                                                  .includes("kas")
                                            ? "bx-wallet"
                                            : item.transaction_purpose
                                                  ?.toLowerCase()
                                                  .includes("air") ||
                                              item.transaction_purpose
                                                  ?.toLowerCase()
                                                  .includes("pdam") ||
                                              item.transaction_purpose
                                                  ?.toLowerCase()
                                                  .includes("pam")
                                            ? "bx-water"
                                            : "bx-dots-horizontal-rounded"
                                    } font-extrabold`}
                                ></i>
                            </div>
                            <div className="grid">
                                <h1 className="font-semibold text-sm text-start flex items-center gap-3">
                                    {item.transaction_purpose ?? item.tujuan}
                                    {item.dikembalikan !== undefined && (
                                        <small
                                            className={`px-1 ${
                                                item.dikembalikan
                                                    ? "bg-green-600 text-[#EEEEEE]"
                                                    : "bg-red-600 text-[#EEEEEE]"
                                            } rounded-md`}
                                        >
                                            {item.dikembalikan
                                                ? "Dikembalikan"
                                                : "Blm di balikin"}
                                        </small>
                                    )}
                                </h1>
                                <small className="text-start">
                                    {formatDate(item.created_at)}
                                </small>
                            </div>
                        </span>
                        <div className="flex flex-col justify-center items-end">
                            {item.status === "OUT" ? (
                                <p className="font-semibold text-red-500">
                                    - {formatAmount(item.amount)}
                                </p>
                            ) : (
                                <p className="font-semibold text-green-500">
                                    + {formatAmount(item.amount)}
                                </p>
                            )}
                            <small className="font-semibold dark:text-[#EEEEEE]">
                                {item.user.username}
                            </small>
                        </div>
                    </button>
                ))}
            </div>

            {isOpen && data && (
                <SubModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title="Detail Transaksi"
                    content={
                        <div className="flex flex-col justify-center gap-5">
                            <span className="flex items-center justify-between">
                                <span className="flex gap-2 items-center">
                                    <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6] dark:bg-gray-900 dark:text-[#76ABAE]">
                                        <i
                                            className={`bx ${
                                                data.transaction_purpose
                                                    ?.toLowerCase()
                                                    .includes("listrik")
                                                    ? "bx-power-off"
                                                    : data.transaction_purpose
                                                          ?.toLowerCase()
                                                          .includes("kas")
                                                    ? "bx-wallet"
                                                    : data.transaction_purpose
                                                          ?.toLowerCase()
                                                          .includes("air") ||
                                                      data.transaction_purpose
                                                          ?.toLowerCase()
                                                          .includes("pdam") ||
                                                      data.transaction_purpose
                                                          ?.toLowerCase()
                                                          .includes("pam")
                                                    ? "bx-water"
                                                    : "bx-dots-horizontal-rounded"
                                            } font-extrabold`}
                                        ></i>
                                    </div>
                                    <div className="grid">
                                        <h1 className="font-semibold text-sm text-start flex items-center gap-2">
                                            {data.transaction_purpose ??
                                                data.tujuan}
                                            {data.dikembalikan !==
                                                undefined && (
                                                <small
                                                    className={`px-1 ${
                                                        data.dikembalikan
                                                            ? "bg-green-600 text-[#EEEEEE]"
                                                            : "bg-red-600 text-[#EEEEEE]"
                                                    } rounded-md`}
                                                >
                                                    {data.dikembalikan
                                                        ? "Dikembalikan"
                                                        : "Blm di balikin"}
                                                </small>
                                            )}
                                        </h1>
                                        <small className="text-start">
                                            {formatDate(data.created_at)}
                                        </small>
                                    </div>
                                </span>
                                <div className="flex flex-col justify-center items-end">
                                    {data.status === "OUT" ? (
                                        <p className="font-semibold text-red-500">
                                            - {formatAmount(data.amount)}
                                        </p>
                                    ) : (
                                        <p className="font-semibold text-green-500">
                                            + {formatAmount(data.amount)}
                                        </p>
                                    )}
                                    <small className="font-semibold dark:text-[#EEEEEE]">
                                        {data.user.username}
                                    </small>
                                </div>
                            </span>
                            <span className="rounded-lg overflow-hidden max-h-[20rem] max-w-full overflow-y-scroll">
                                <img
                                    src={data.manual_prof ?? data.bukti}
                                    alt="gambar"
                                />
                            </span>
                        </div>
                    }
                />
            )}
        </>
    );
};

export default HistorySmWidth;
