import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { CarauselHome } from "@/Components/elements/CarauselHome";
import CardHome from "@/Components/elements/CardHome";
import HistorySmWidth from "@/Components/elements/HistorySmWidth";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function Dashboard({
    auth,
    ledgers,
    kas,
    peopleRemaining,
    currentSaldo,
    users,
    defaulKas,
}: PageProps) {
    const userGalon = users.filter((user: any) => user.galon === true);

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
                    <CarauselHome
                        kas={kas}
                        peopleRemaining={peopleRemaining}
                        currentSaldo={currentSaldo}
                        defautlKas={defaulKas}
                    />
                </div>
                {/* END OVERVIEW */}

                {/* GALON */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                        className="px-10 py-5 border grid rounded-xl bg-[#5CA4C5] gap-2 shadow-lg"
                        onClick={() => (window.location.href = "#galon")}
                    >
                        <div className="py-2 px-2 flex items-center justify-center rounded-lg border bg-transparent text-white">
                            <i className="bx bx-droplet font-extrabold"></i>
                        </div>
                        <small className="text-white font-bold">
                            {userGalon.length > 0 ? userGalon : " --- "}
                        </small>
                    </button>

                    <button className="px-10 py-5 border grid rounded-xl gap-2 shadow-lg">
                        <div className="py-2 px-2 flex items-center justify-center rounded-lg border text-black">
                            <i className="bx bxs-phone-call font-extrabold"></i>
                        </div>
                        <small className="text-black font-bold">Pesan</small>
                    </button>

                    {auth.user.galon === false && (
                        <button className="px-10 py-5 border grid rounded-xl bg-[#5CA4C5] gap-2 shadow-lg">
                            <div className="py-2 px-2 flex items-center justify-center rounded-lg border bg-transparent text-white animate-bounce duration-1000">
                                <i className="bx bx-check font-extrabold"></i>
                            </div>
                            <small className="text-white font-bold">Done</small>
                        </button>
                    )}

                    <button className="px-10 py-5 border grid rounded-xl gap-2 shadow-lg">
                        <div className="py-2 px-2 flex items-center justify-center rounded-lg border text-black">
                            <i className="bx bx-user font-extrabold"></i>
                        </div>
                        <small className="text-black font-bold">User</small>
                    </button>
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
                <div className="grid gap-2">
                    <span className="flex w-full items-center justify-between py-1">
                        <h1 className="text-xl font-bold">
                            Transaksi Terakhir
                        </h1>

                        {ledgers.length !== 0 && (
                            <Link
                                href={route("history.index")}
                                className="flex items-center gap-2 text-[#5CA4C5] bg-gray-200 px-2 h-full rounded-md"
                            >
                                <i className="bx bx-dots-horizontal-rounded text-xl"></i>
                            </Link>
                        )}
                    </span>

                    {ledgers.length === 0 ? (
                        <div className="flex items-center justify-center h-20 rounded-lg shadow-md border">
                            tidak ada data
                        </div>
                    ) : (
                        <HistorySmWidth items={ledgers} />
                    )}
                </div>
                {/* END HISTORY */}

                {/* GALON */}
                <div
                    className="w-full grid p-5 border rounded-xl bg-[#5CA4C5] gap-3 shadow-lg mt-2"
                    id="galon"
                >
                    <span className="w-full flex items-center justify-between">
                        <div className=" flex items-center justify-center text-gray-200 gap-0.5">
                            <h1 className="text-xl font-bold">Galon</h1>
                            <i className="bx bxs-droplet font-extrabold text-lg"></i>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 text-[#5CA4C5] bg-gray-200 px-2 h-full rounded-md">
                                    <i className="bx bx-plus "></i>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm sm:max-w-[425px] rounded-lg">
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Nomor Galon
                                    </DialogTitle>
                                    <DialogDescription>
                                        --------
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="password">Nama Galon</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="username"
                                        leftAddon={
                                            <i className="bx bx-user"></i>
                                        }
                                    />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="number">Nomor Galon</Label>
                                    <Input
                                        type="number"
                                        id="number"
                                        placeholder="type number"
                                        leftAddon={
                                            <i className="bx bx-phone"></i>
                                        }
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" variant={"primary"}>
                                        Simpan
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </span>

                    <span className="flex flex-wrap gap-2 items-center justify-center pb-3">
                        {users.length === 1 ? (
                            <h1 className="text-gray-200 font-bold">
                                Belum ada data
                            </h1>
                        ) : (
                            users.map((user: any) => (
                                <button
                                    className={`py-1 px-3 ${
                                        user.galon === true
                                            ? "bg-gray-200 text-[#368CB6]"
                                            : "border text-gray-200"
                                    } rounded-md`}
                                    key={user.id}
                                >
                                    <small className="font-bold">
                                        {user.username}
                                    </small>
                                </button>
                            ))
                        )}
                    </span>
                </div>
                {/* GALON */}
            </div>
        </AuthenticatedLayout>
    );
}
