"use server";

import uniqid from "uniqid";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import { authorizationOptions } from "@/lib/authorizationOptions";

export async function registryCreator(
    name: string
): Promise<boolean | RoomInfo> {
    const liveblocksClient = new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY || "",
    });
    const sesh = await getServerSession(authorizationOptions);
    const userEmail = sesh?.user?.email || "";
    if (userEmail) {
        const roomId = uniqid.time();
        return await liveblocksClient.createRoom(roomId, {
            defaultAccesses: [],
            usersAccesses: {
                [userEmail]: ["room:write"],
            },
            metadata: {
                registryName: name,
            },
        });
    }

    return false;
}
