"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Gift({ id, name }: { id: string; name: string }) {
    const params = useParams();

    useEffect(() => {
        if (params.giftId) {
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
