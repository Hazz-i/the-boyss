type CardProps = {
    title: string;
};

const CardHome = ({ title }: CardProps) => {
    return (
        <div className="py-5 shadow-lg rounded-lg grid gap-5 border ">
            <h1 className="text-center font-extrabold text-xl">{title}</h1>
            <div className="flex items-start justify-between px-5">
                <span className="grid">
                    <h1 className="text-center text-lg font-semibold">Wifi</h1>
                    <table className="text-sm">
                        <tbody>
                            <tr>
                                <td className="text-left">Id Pelanggan</td>
                                <td className="w-4">:</td>
                                <td>12615566</td>
                            </tr>
                            <tr>
                                <td className="text-left">Nama Wifi</td>
                                <td className="w-4">:</td>
                                <td> the Boys 5</td>
                            </tr>
                            <tr>
                                <td className="text-left">Password</td>
                                <td className="w-4">:</td>
                                <td>1samapai10</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
                <span className="grid">
                    <h1 className="text-center text-lg font-semibold">
                        Lain-lain
                    </h1>
                    <table className="text-sm">
                        <tbody>
                            <tr>
                                <td className="text-left">PLN</td>
                                <td className="w-4">:</td>
                                <td>12615566</td>
                            </tr>
                            <tr>
                                <td className="text-left">PDAM</td>
                                <td className="w-4">:</td>
                                <td> The Boys 5</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
        </div>
    );
};

export default CardHome;
