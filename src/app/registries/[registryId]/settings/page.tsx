"use server";

import RegistryUserAccess from "@/components/forms/RegistryUserAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Link from "next/link";

type PageProps = {
    params: {
        registryId: string;
    };
};

export default async function RegistrySettings({ params }: PageProps) {
    const { registryId } = params;
    const registryInformation = await liveblocksClient.getRoom(registryId);

    return (
        <div>
            <Link
                href={`/registries/${registryId}`}
                className="mb-5 inline-flex items-center btn"
            >
                ← Return To Registry
            </Link>
            <h1 className="text-2xl">Share Your Registry:</h1>
            <div className="mb-10">
                {Object.keys(registryInformation.usersAccesses).map(
                    (userEmail) => (
                        <div>{userEmail}</div>
                    )
                )}
            </div>

            <RegistryUserAccess registryId={registryId} />
        </div>
    );
}
