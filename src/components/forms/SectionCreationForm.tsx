"use client";

import { FormEvent } from "react";

export default function SectionCreationForm() {
    function newSectionHandler(event: FormEvent) {
        event.preventDefault();
        const sectionInput = (event.target as HTMLFormElement).querySelector(
            "input"
        );
        const sectionName = sectionInput?.value;
        alert("new section: " + sectionName);
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
