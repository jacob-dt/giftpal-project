"use client";

import { redirect } from "next/navigation";
import { registryCreator } from "../actions/registryActions";

export default function NewRegistryPage() {
    async function newRegistryButtonHandler(formData: FormData) {
        const nameOfRegistry = formData.get("name")?.toString() || "";
        const { id } = await registryCreator(nameOfRegistry);
        redirect(`/registries/${id}`);
    }

    return (
        <div>
            <form className="block max-w-sm" action={newRegistryButtonHandler}>
                <h1 className="mb-4 text-xl">Create a New Registry</h1>
                <input
                    type="text"
                    placeholder="enter a registry name"
                    name="name"
                />
                <button className="mt-3" type="submit">
                    Create a New Registry
                </button>
            </form>
        </div>
    );
}
