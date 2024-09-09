import { formatAmount, formatDate } from "@/formater";
import PaginationItems from "./PaginationItems";

type HistorySmWidthProps = {
    items: any;
    links?: any;
    even?: string;
    odd?: string;
};

const HistorySmWidth = ({
    items,
    links,
    even = "",
    odd = "bg-gray-200 dark:bg-gray-800",
}: HistorySmWidthProps) => {
    return (
        <div className="grid grid-cols-1 rounded-lg shadow-md border dark:border-gray-700 overflow-hidden">
            {items.map((item: any, index: number) => (
                <span
                    key={index}
                    className={`flex items-center justify-between p-2 ${
                        (index + 1) % 2 === 0 ? even : odd
                    }`}
                >
                    <span className="flex gap-2 items-center">
                        <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6] dark:bg-gray-900 dark:text-[#76ABAE]">
                            {item.transaction_purpose ? (
                                <i
                                    className={`bx ${
                                        item.transaction_purpose
                                            .toLowerCase()
                                            .includes("listrik")
                                            ? "bx-power-off"
                                            : item.transaction_purpose
                                                  .toLowerCase()
                                                  .includes("kas")
                                            ? "bx-wallet"
                                            : item.transaction_purpose
                                                  .toLowerCase()
                                                  .includes("air") ||
                                              item.transaction_purpose
                                                  .toLowerCase()
                                                  .includes("pdam") ||
                                              item.transaction_purpose
                                                  .toLowerCase()
                                                  .includes("pam")
                                            ? "bx-water"
                                            : "bx-dots-horizontal-rounded"
                                    } font-extrabold`}
                                ></i>
                            ) : (
                                <i
                                    className={`bx ${
                                        item.tujuan
                                            .toLowerCase()
                                            .includes("listrik")
                                            ? "bx-power-off"
                                            : item.tujuan
                                                  .toLowerCase()
                                                  .includes("kas")
                                            ? "bx-wallet"
                                            : item.tujuan
                                                  .toLowerCase()
                                                  .includes("air") ||
                                              item.tujuan
                                                  .toLowerCase()
                                                  .includes("pdam") ||
                                              item.tujuan
                                                  .toLowerCase()
                                                  .includes("pam")
                                            ? "bx-water"
                                            : "bx-dots-horizontal-rounded"
                                    } font-extrabold`}
                                ></i>
                            )}
                        </div>
                        <div className="grid">
                            <h1 className="font-semibold text-lg">
                                {item.transaction_purpose
                                    ? item.transaction_purpose
                                    : item.tujuan}
                            </h1>
                            <small>{formatDate(item.created_at)}</small>
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
                </span>
            ))}

            {links !== undefined && links.length > 3 && (
                <PaginationItems Links={links} />
            )}
        </div>
    );
};

export default HistorySmWidth;
