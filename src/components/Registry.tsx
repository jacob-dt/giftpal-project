"use client";

import { useState } from "react";
import Section from "./Section";
import SectionCreationForm from "./forms/SectionCreationForm";

const defaultSections = [
    { id: "sec1", name: "todo", index: 0 },
    { id: "sec2", name: "in progress", index: 1 },
    { id: "sec3", name: "done", index: 2 },
];

export type GiftType = {
    name: string;
    id: string | number;
    index: number;
    sectionId: string;
};

const defaultGifts = [
    { id: "asdf", name: "task 1", index: 0, sectionId: "sec1" },
    { id: "asdo", name: "task 5", index: 1, sectionId: "sec1" },
    { id: "asdx", name: "task 2", index: 1, sectionId: "sec2" },
    { id: "asdz", name: "task 3", index: 2, sectionId: "sec3" },
];

export default function Registry() {
    const [gifts, setGifts] = useState(defaultGifts);
    const [sections, setSections] = useState(defaultSections);
    return (
        <div className="gap-6 flex">
            {sections.map((section) => (
                <Section
                    key={section.id}
                    {...section}
                    setGifts={setGifts}
                    gifts={gifts
                        .sort((first, last) => first.index - last.index)
                        .filter((gift) => gift.sectionId === section.id)}
                />
            ))}
            <SectionCreationForm />
        </div>
    );
}
