"use client";
import { RoomProvider } from "@/app/liveblocks.config";
import { RegistryContextProvider } from "@/components/RegistryContext";
import { LiveList } from "@liveblocks/core";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
};

export default function RegistryLayout({ children, modal }: PageProps) {
    const params = useParams();
    return (
        <RegistryContextProvider>
            <RoomProvider
                id={params.registryId.toString()}
                initialPresence={{}}
                initialStorage={{
                    sections: new LiveList(),
                    gifts: new LiveList(),
                }}
            >
                {children}
                {modal}
            </RoomProvider>
        </RegistryContextProvider>
    );
}
