"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Sections from "./Sections";
import { RoomProvider } from "@/app/liveblocks.config";
import Link from "next/link";

export default function Registry({ id, name }: { id: string; name: string }) {
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
                        <div className="flex gap-2 items-center mb-5">
                            <h1 className="text-2xl">{name}</h1>
                            <Link href={`/registries/${id}/settings`}>
                                <FontAwesomeIcon icon={faGear} />
                            </Link>
                        </div>

                        <Sections />
                    </>
                )}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
