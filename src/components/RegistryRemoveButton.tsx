"use client";

import { removeRegistry } from "@/app/actions/registryActions";
import { useRouter } from "next/navigation";

export default function RegistryRemoveButton({
    registryId,
}: {
    registryId: string;
}) {
    const router = useRouter();
    async function removeRegistryHandler() {
        await removeRegistry(registryId);
        router.push("/");
    }

    return (
        <div>
            <button
                onClick={() => removeRegistryHandler()}
                className="bg-red-600 max-h-10 px-4 py-2 rounded-lg"
            >
                Remove Registry
            </button>
        </div>
    );
}
