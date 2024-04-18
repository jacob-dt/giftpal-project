"use client";
import { useStorage } from "@/app/liveblocks.config";
import Section from "./Section";
import SectionCreationForm from "./forms/SectionCreationForm";

export default function Sections() {
    const sections = useStorage((root) => root.sections);

    if (!sections) {
        return;
    }

    return (
        <div className="gap-6 flex">
            {sections?.length > 0 &&
                sections.map((section) => (
                    <Section key={section.id} {...section} />
                ))}
            <SectionCreationForm />
        </div>
    );
}
