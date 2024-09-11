type CardProps = {
    title: string;
};

const CardHome = ({ title }: CardProps) => {
    return (
        <div className="py-5 shadow-md rounded-xl grid gap-5 border dark:bg-gray-800">
            <h1 className="text-center font-bold text-2xl">{title}</h1>
            <div className="flex items-start justify-between px-5 pb-3">
                <span className="grid gap-2">
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
                                <td>1samapi10</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
                <span className="grid gap-2">
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
                                <td>12615566</td>
                            </tr>
                            <tr>
                                <td className="text-left">Gambar Diterima</td>
                                <td className="w-4">:</td>
                                <td>PNG, JPG, JPEG</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
        </div>
    );
};

export default CardHome;
