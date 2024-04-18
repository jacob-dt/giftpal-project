"use server";

import uniqid from "uniqid";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import { authorizationOptions } from "@/lib/authorizationOptions";
import { liveblocksClient, newLiveBlocksClient } from "@/lib/liveblocksClient";

export async function registryCreator(name: string): Promise<false | RoomInfo> {
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

export async function addUserToRegistry(registryId: string, userEmail: string) {
    const room = await liveblocksClient.getRoom(registryId);
    const usersAccesses = room.usersAccesses;
    usersAccesses[userEmail] = ["room:write"];
    await liveblocksClient.updateRoom(registryId, { usersAccesses });
    return true;
}

export async function updateRegistry(registryId: string, updateData: any) {
    await liveblocksClient.updateRoom(registryId, updateData);
    return true;
}

export async function deleteUserFromRegistry(
    registryId: string,
    userEmail: string
) {
    const room = await liveblocksClient.getRoom(registryId);
    const usersAccesses: any = room.usersAccesses;
    usersAccesses[userEmail] = null;
    await liveblocksClient.updateRoom(registryId, { usersAccesses });
    return true;
}

export async function removeRegistry(registryId: string) {
    await liveblocksClient.deleteRoom(registryId);
    return true;
}
