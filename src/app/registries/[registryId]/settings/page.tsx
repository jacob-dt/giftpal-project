"use server";

import RegistryRemoveButton from "@/components/RegistryRemoveButton";
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
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between">
                <Link
                    href={`/registries/${registryId}`}
                    className="mb-5 inline-flex items-center btn"
                >
                    ← Return To Registry
                </Link>
                <RegistryRemoveButton registryId={registryId} />
            </div>

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
