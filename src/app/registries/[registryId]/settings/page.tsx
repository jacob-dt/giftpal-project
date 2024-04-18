"use server";

import UsersWithAccess from "@/components/UsersWithAccess";
import RegistryUserAccess from "@/components/forms/RegistryUserAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import Link from "next/link";

type PageProps = {
    params: {
        registryId: string;
    };
};

export default async function RegistrySettings({ params }: PageProps) {
    const { registryId } = params;
    const registryInformation = await liveblocksClient.getRoom(registryId);
    const newUser = await getUserEmail();
    if (!registryInformation.usersAccesses[newUser]) {
        return "You Do Not Have Access To This Registry";
    }
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
                <UsersWithAccess
                    registryId={registryId}
                    usersAccesses={registryInformation.usersAccesses}
                />
            </div>

            <RegistryUserAccess registryId={registryId} />
        </div>
    );
}
