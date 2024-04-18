import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
    authEndpoint: "/api/liveblocks-auth",
    throttle: 100,
});

type Presence = {};

export type Section = {
    name: string;
    id: string;
    index: number;
};

type Storage = {
    sections: LiveList<LiveObject<Section>>;
    gifts: LiveList<LiveObject<Gift>>;
};

export type Gift = {
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
    useSelf,
} = createRoomContext<Presence, Storage>(client);
