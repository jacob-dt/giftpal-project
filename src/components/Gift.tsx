"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RegistryContext } from "./RegistryContext";

export default function Gift({ id, name }: { id: string; name: string }) {
    const params = useParams();
    const router = useRouter();
    const { giftOpenMode } = useContext(RegistryContext);

    useEffect(() => {
        if (params.giftId && !giftOpenMode) {
            const { registryId, giftId } = params;
            router.push(`/registries/${registryId}`);
            router.push(`/registries/${registryId}/gifts/${giftId}`);
        }
        if (!params.giftId && giftOpenMode) {
            router.push(`/registries/${params.registryId}`);
        }
    }, [params.giftId]);

    return (
        <Link
            href={`/registries/${params.registryId}/gifts/${id}`}
            className="border block border-indigo-700 bg-zinc-900 my-2 p-4 rounded-lg"
        >
            <span>{name}</span>
        </Link>
    );
}
