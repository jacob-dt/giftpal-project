import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
    authEndpoint: "/api/liveblocks-auth",
    throttle: 100,
});

type Presence = {};

type Section = {
    name: string;
    id: string;
    index: number;
};

type Storage = {
    sections: LiveList<LiveObject<Section>>;
    gifts: LiveList<LiveObject<Gift>>;
};

type Gift = {
    name: string;
    id: string;
    index: number;
    sectionId: string;
};

export const {
    RoomProvider,
    useMyPresence,
    useStorage,
    useMutation,
    useRoom,
    /* ...all the other hooks you’re using... */
} = createRoomContext<
    Presence,
    Storage
    /* UserMeta, RoomEvent, ThreadMetadata */
>(client);
