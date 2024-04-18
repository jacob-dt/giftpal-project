"use server";
import { getUserEmail } from "@/lib/userClient";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Link from "next/link";

export default async function Registries() {
    const userEmail = await getUserEmail();
    const { data: rooms } = await liveblocksClient.getRooms({
        userId: userEmail,
    });
    return (
        <div>
            {rooms?.length > 0 &&
                rooms.map((r) => (
                    <Link
                        key={r.id}
                        href={`/registries/${r.id}`}
                        className="rounded-lg bg-zinc-800 p-4 block mb-3"
                    >
                        {r.metadata.registryName}
                    </Link>
                ))}
        </div>
    );
}
