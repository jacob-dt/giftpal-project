"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Sections from "./Sections";
import { RoomProvider } from "@/app/liveblocks.config";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { updateRegistry } from "@/app/actions/registryActions";
import { metadata } from "@/app/layout";
import { useRouter } from "next/navigation";

export default function Registry({ id, name }: { id: string; name: string }) {
    const [registryTitleRenameMode, setRegistryTitleRenameMode] =
        useState(false);
    const router = useRouter();
    async function registryTitleSubmitHandler(event: FormEvent) {
        event.preventDefault();
        const registryTitleInput = (
            event.target as HTMLFormElement
        ).querySelector("input");
        if (registryTitleInput) {
            const newRegistryTitleName = registryTitleInput.value;
            await updateRegistry(id, {
                metadata: { registryName: newRegistryTitleName },
            });
            registryTitleInput.value = "";
            setRegistryTitleRenameMode(false);
            router.refresh();
        }
    }

    return (
        <RoomProvider
            id={id}
            initialPresence={{}}
            initialStorage={{
                sections: new LiveList(),
                gifts: new LiveList(),
            }}
        >
            <ClientSideSuspense fallback={<div>pending</div>}>
                {() => (
                    <>
                        <div className="flex gap-2 items-center mb-5">
                            {!registryTitleRenameMode && (
                                <h1
                                    onClick={() =>
                                        setRegistryTitleRenameMode(true)
                                    }
                                    className="text-2xl"
                                >
                                    {name}
                                </h1>
                            )}
                            {registryTitleRenameMode && (
                                <form onSubmit={registryTitleSubmitHandler}>
                                    <input type="text" defaultValue={name} />
                                </form>
                            )}

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
