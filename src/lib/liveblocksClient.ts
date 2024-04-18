import { Liveblocks } from "@liveblocks/node";

export const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || "",
});

export function newLiveBlocksClient() {
    return new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY || "",
    });
}
