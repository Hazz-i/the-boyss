import { formatAmount, formatDate } from "@/formater";
import PaginationItems from "./PaginationItems";

type HistorySmWidthProps = {
    items: any;
    links?: any;
};

const HistorySmWidth = ({ items, links }: HistorySmWidthProps) => {
    return (
        <div className="grid grid-cols-1 rounded-lg shadow-md border">
            {items.map((item: any, index: number) => (
                <span
                    key={index}
                    className={`flex items-center justify-between p-2 ${
                        (index + 1) % 2 === 0 ? "" : "bg-gray-200"
                    }`}
                >
                    <span className="flex gap-2 items-center">
                        <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6]">
                            <i
                                className={`bx ${
                                    item.transaction_purpose.includes("Listrik")
                                        ? "bx-power-off"
                                        : item.transaction_purpose.includes(
                                              "Kas"
                                          )
                                        ? "bx-wallet"
                                        : "bx-water"
                                } font-extrabold`}
                            ></i>
                        </div>
                        <div className="grid">
                            <h1 className="font-semibold text-lg">
                                {item.transaction_purpose}
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
                        <small className="font-semibold">{item.user_id}</small>
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
