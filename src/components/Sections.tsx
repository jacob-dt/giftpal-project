"use client";
import { Section, useMutation, useStorage } from "@/app/liveblocks.config";
import { default as RegistrySection } from "./Section";
import SectionCreationForm from "./forms/SectionCreationForm";
import { ReactSortable } from "react-sortablejs";
import { LiveList, LiveObject, shallow } from "@liveblocks/core";

export default function Sections() {
    const sections = useStorage(
        (root) => root.sections.map((section) => ({ ...section })),
        shallow
    );

    const sectionsUpdater = useMutation(
        ({ storage }, sections: LiveObject<Section>[]) => {
            storage.set("sections", new LiveList(sections));
        },
        []
    );

    function sectionOrderSetter(sectionsSorted: Section[]) {
        const newSections: LiveObject<Section>[] = [];
        sectionsSorted.forEach((sectionSorted, newIndex) => {
            const newSectionSorted = { ...sectionSorted };
            newSectionSorted.index = newIndex;
            newSections.push(new LiveObject(newSectionSorted));
        });
        sectionsUpdater(newSections);
    }

    if (!sections) {
        return;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <ReactSortable
                className="gap-6 flex"
                group={"registry-section"}
                list={sections}
                setList={sectionOrderSetter}
            >
                {sections?.length > 0 &&
                    sections.map((section) => (
                        <RegistrySection key={section.id} {...section} />
                    ))}
            </ReactSortable>
            <SectionCreationForm />
        </div>
    );
}
