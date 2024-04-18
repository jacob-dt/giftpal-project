"use client";

import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Sections from "./Sections";
import { RoomProvider } from "@/app/liveblocks.config";

export default function Registry({ id }: { id: string }) {
    return (
        <RoomProvider
            id={id}
            initialPresence={{}}
            initialStorage={{
                sections: new LiveList(),
                gifts: new LiveList(),
            }}
        >
            <ClientSideSuspense fallback={<div>loading...</div>}>
                {() => (
                    <>
                        <Sections />
                    </>
                )}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
