import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import UserForm from "./Create";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import React from "react";
import UserUpdateForm from "./Update";

const ShowUsers = ({ users }: any) => {
    const user = usePage<PageProps>().props.auth.user;

    const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
    const [addUser, setAddUser] = React.useState<boolean>(false);
    const [userid, setUserId] = React.useState<number>(0);

    return (
        <div
            className="w-full grid p-5 border rounded-xl gap-5 shadow-lg"
            id="member"
        >
            <span className="w-full flex items-center justify-between">
                <div className=" flex items-center justify-center gap-1">
                    <i className="bx bxs-group font-extrabold text-xl"></i>
                    <h1 className="text-lg font-semibold">List Member</h1>
                </div>

                {user.role.toLowerCase() === "developer" && (
                    <button
                        className="flex items-center gap-2 border border-[#5CA4C5] text-[#5CA4C5] px-2 h-full rounded-md animate-pulse"
                        onClick={() => setAddUser(!addUser)}
                    >
                        <i className="bx bx-plus "></i>
                    </button>
                )}
            </span>

            <span className="flex flex-col gap-1 items-center justify-center">
                {users.length === 0 ? (
                    <h1 className="font-bold">Belum ada data</h1>
                ) : (
                    users?.map((user: any, index: any) => (
                        <button
                            key={index}
                            className="w-full py-2 px-3 rounded-lg border bg-gray-200"
                            disabled={user.role.toLowerCase() === "developer"}
                            onClick={() => {
                                setIsUpdate(true);
                                setUserId(user.id);
                            }}
                        >
                            <span className="flex items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    <span className="px-3 py-1 border rounded-lg bg-gray-300">
                                        <small>{index + 1}</small>
                                    </span>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            src={`${
                                                user.image !== null
                                                    ? user.image
                                                    : "https://github.com/shadcn.png"
                                            }`}
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                    <span className="grid text-start">
                                        <h1 className="font-semibold">
                                            {user.name}
                                        </h1>
                                        <small>
                                            {user.whatsapp
                                                ? user.whatsapp
                                                : "-- blm ngisi --"}
                                        </small>
                                    </span>
                                </div>
                                <small className="font-bold flex items-center justify-center gap-1">
                                    <i
                                        className={`text-base bx ${
                                            user.role.toLowerCase() ===
                                            "anggota"
                                                ? "bx-group"
                                                : "bx-envelope "
                                        }`}
                                    ></i>
                                    {user.role}
                                </small>
                            </span>
                        </button>
                    ))
                )}
            </span>

            {isUpdate && (
                <UserUpdateForm
                    userId={userid}
                    users={users}
                    isOpen={isUpdate}
                    setIsOpen={setIsUpdate}
                />
            )}
            {addUser && <UserForm isOpen={addUser} setIsOpen={setAddUser} />}
        </div>
    );
};

export default ShowUsers;
