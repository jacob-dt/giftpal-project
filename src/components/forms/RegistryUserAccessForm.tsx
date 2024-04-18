"use client";

import { addUserToRegistry } from "@/app/actions/registryActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function RegistryUserAccess({
    registryId,
}: {
    registryId: string;
}) {
    const inputReference = useRef<HTMLInputElement>(null);
    const router = useRouter();
    async function addUser(formData: FormData) {
        const userEmail = formData.get("email")?.toString() || "";
        await addUserToRegistry(registryId, userEmail);
        if (inputReference.current) {
            inputReference.current.value = "";
        }
        router.refresh();
    }
    return (
        <form action={addUser} className="max-w-sm">
            <input
                type="text"
                placeholder="username@example.com"
                name="email"
                ref={inputReference}
            />
            <button type="submit" className="mt-2">
                Share
            </button>
        </form>
    );
}
