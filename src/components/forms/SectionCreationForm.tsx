"use client";

import uniqid from "uniqid";
import { useMutation } from "@/app/liveblocks.config";
import { FormEvent } from "react";
import { LiveObject } from "@liveblocks/core";

export default function SectionCreationForm() {
    const addNewSection = useMutation(({ storage }, sectionName) => {
        return storage.get("sections").push(
            new LiveObject({
                name: sectionName,
                id: uniqid.time(),
                index: 0,
            })
        );
    }, []);

    function newSectionHandler(event: FormEvent) {
        event.preventDefault();
        const sectionInput = (event.target as HTMLFormElement).querySelector(
            "input"
        );
        if (sectionInput) {
            const sectionName = sectionInput?.value;
            addNewSection(sectionName);
            sectionInput.value = "";
        }
    }

    return (
        <form onSubmit={newSectionHandler} className="max-w-xs">
            <label className="block mb-2">
                <span className="block">Section Name:</span>
                <input type="text" placeholder="'buy', 'purchased', etc.." />
            </label>
            <button type="submit" className="w-full block">
                Add Section
            </button>
        </form>
    );
}
