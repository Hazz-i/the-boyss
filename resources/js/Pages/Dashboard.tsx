import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { CarauselHome } from "@/Components/elements/CarauselHome";
import { Button } from "@/Components/ui/button";
import CardHome from "@/Components/elements/CardHome";
import { Card, CardContent } from "@/Components/ui/card";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Home</h2>}
        >
            <Head title="Home" />

            <div className="px-2 grid gap-2 pb-24">
                <h1 className="text-sm">
                    Selamat datang,{" "}
                    <span className="font-semibold">"{auth.user.name}"</span>
                </h1>

                {/* OVERVIEW */}
                <div>
                    <h1 className="text-xl font-bold">Overview</h1>
                    <CarauselHome />
                </div>
                {/* END OVERVIEW */}

                {/* GALON */}
                <div>
                    {/* <h1 className="text-xl font-bold">Galon</h1> */}
                    <span className="flex items-center justify-center gap-2">
                        <button className="px-10 py-5 border grid rounded-xl bg-[#5CA4C5] gap-2 shadow-lg">
                            <div className="py-2 px-2 flex items-center justify-center rounded-lg border bg-transparent text-white">
                                <i className="bx bx-droplet font-extrabold"></i>
                            </div>
                            <small className="text-white font-bold">
                                wahid
                            </small>
                        </button>

                        <button className="px-10 py-5 border grid rounded-xl gap-2 shadow-lg">
                            <div className="py-2 px-2 flex items-center justify-center rounded-lg border text-black">
                                <i className="bx bxs-phone-call font-extrabold"></i>
                            </div>
                            <small className="text-black font-bold">
                                Pesan
                            </small>
                        </button>

                        <button className="px-10 py-5 border grid rounded-xl bg-[#5CA4C5] gap-2 shadow-lg">
                            <div className="py-2 px-2 flex items-center justify-center rounded-lg border bg-transparent text-white">
                                <i className="bx bx-check font-extrabold"></i>
                            </div>
                            <small className="text-white font-bold">Done</small>
                        </button>
                    </span>
                </div>
                {/* END GALON */}

                {/* INFORMASI */}
                <div className="grid gap-2">
                    <h1 className=" text-xl font-bold">Informasi</h1>

                    <span className="grid grid-cols-1 lg:grid-cols-5">
                        <CardHome title="The Boys" />
                    </span>
                </div>
                {/* END INFORMASI */}

                {/* HISTORY */}
                <div>
                    <h1 className="text-xl font-bold">Transaksi Terakhir</h1>
                    <span className="grid grid-cols-1 rounded-lg border">
                        <div className="flex items-center justify-between p-2">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-200 text-[#368CB6]">
                                    <i className="bx bx-drink font-extrabold"></i>
                                </div>
                                <div className="grid">
                                    <h1 className="font-semibold text-lg">
                                        Kas
                                    </h1>
                                    <small>02-09-2024</small>
                                </div>
                            </span>
                            <div className="flex flex-col justify-center items-end">
                                <p className="font-semibold text-lg text-green-500">
                                    + Rp.150.000
                                </p>
                                <small className="font-semibold">wahid</small>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-200 p-2">
                            <span className="flex gap-2 items-center">
                                <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-100 text-[#368CB6]">
                                    <i className="bx bx-drink font-extrabold"></i>
                                </div>
                                <div className="grid">
                                    <h1 className="font-semibold text-lg">
                                        Bayar Listrik
                                    </h1>
                                    <small>02-09-2024</small>
                                </div>
                            </span>
                            <div className="flex flex-col justify-center items-end">
                                <p className="font-semibold text-lg text-red-500">
                                    - Rp.150.000
                                </p>
                                <small className="font-semibold">wahid</small>
                            </div>
                        </div>
                    </span>
                </div>
                {/* END HISTORY */}
            </div>
        </AuthenticatedLayout>
    );
}
