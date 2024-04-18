"use client";

import {
    deleteUserFromRegistry,
    updateRegistry,
} from "@/app/actions/registryActions";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

export default function UsersWithAccess({
    registryId,
    usersAccesses,
}: {
    registryId: string;
    usersAccesses: RoomAccesses;
}) {
    const router = useRouter();
    async function deleteUserHandler(userEmailToDelete: string) {
        const usersAccessesCopy = { ...usersAccesses };
        usersAccessesCopy[userEmailToDelete] = ["room:write"];
        delete usersAccessesCopy[userEmailToDelete];
        await updateRegistry(registryId, { usersAccesses: usersAccessesCopy });
        router.refresh();
    }
    return (
        <div className="max-w-xs">
            {Object.keys(usersAccesses).map((e) => (
                <div
                    key={e}
                    className="flex pl-2 rounded-lg max-w-xs justify-between bg-zinc-800 my-3 items-center gap-5"
                >
                    {e}
                    <button
                        onClick={() => deleteUserHandler(e)}
                        className="btn"
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}
