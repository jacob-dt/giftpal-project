import { ReactSortable } from "react-sortablejs";
import { FormEvent, SetStateAction, useState } from "react";
import { Gift, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import GiftCreationForm from "./forms/GiftCreationForm";

type SectionProps = {
    id: string;
    name: string;
};

export default function Section({ id, name }: SectionProps) {
    const [sectionTitleRenameMode, setSectionTitleRenameMode] = useState(false);

    const sectionGifts = useStorage<Gift[]>((r) => {
        return r.gifts
            .filter((g) => g.sectionId === id)
            .map((g) => ({ ...g }))
            .sort((first, last) => first.index - last.index);
    }, shallow);

    const giftUpdate = useMutation(({ storage }, index, dataUpdate) => {
        const gift = storage.get("gifts").get(index);
        if (gift) {
            for (let k in dataUpdate) {
                gift?.set(k as keyof Gift, dataUpdate[k]);
            }
        }
    }, []);

    const sectionUpdater = useMutation(({ storage }, id, newSectionName) => {
        const sections = storage.get("sections");
        sections
            .find((section) => section.toObject().id === id)
            ?.set("name", newSectionName);
    }, []);

    const sectionDeletion = useMutation(({ storage }, id) => {
        const sections = storage.get("sections");
        const sectionIndex = sections.findIndex(
            (section) => section.toObject().id === id
        );
        sections.delete(sectionIndex);
    }, []);

    const setGiftOrderForSection = useMutation(
        ({ storage }, giftsSorted: Gift[], newSectionId) => {
            const sortedGiftsIds = giftsSorted.map((gift) =>
                gift.id.toString()
            );
            const allGifts: Gift[] = [
                ...storage.get("gifts").map((gift) => gift.toObject()),
            ];
            sortedGiftsIds.forEach((sortedGiftId, sectionIndex) => {
                const giftStorageIndex = allGifts.findIndex(
                    (gift) => gift.id.toString() === sortedGiftId
                );
                giftUpdate(giftStorageIndex, {
                    sectionId: newSectionId,
                    index: sectionIndex,
                });
            });
        },
        []
    );

    function sectionTitleRenameHandler(event: FormEvent) {
        event.preventDefault();
        const sectionTitleInputValue = (
            event.target as HTMLFormElement
        ).querySelector("input");
        if (sectionTitleInputValue) {
            const newSectionTitleValue = sectionTitleInputValue.value;
            sectionUpdater(id, newSectionTitleValue);
            setSectionTitleRenameMode(false);
        }
    }

    return (
        <div className="w-52 p-3 bg-zinc-800 rounded-lg">
            {!sectionTitleRenameMode && (
                <div className="flex justify-between items-center mb-2">
                    <h3>{name}</h3>
                    <button
                        onClick={() => setSectionTitleRenameMode(true)}
                        className="bg-green-600 px-3 py-1 rounded-lg"
                    >
                        edit
                    </button>
                </div>
            )}
            {sectionTitleRenameMode && (
                <div className="mb-4">
                    Change Title:
                    <form onSubmit={sectionTitleRenameHandler} className="mb-2">
                        <input
                            type="text"
                            defaultValue={name}
                            className="mb-2"
                        />
                        <div className="flex justify-center gap-3">
                            <button className="bg-green-600 py-2 px-4 rounded-lg">
                                Save
                            </button>
                            <button
                                onClick={() => sectionDeletion(id)}
                                className="bg-red-600 py-2 px-4 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={() => setSectionTitleRenameMode(false)}
                        className="w-full mt-2"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {!sectionTitleRenameMode && sectionGifts && (
                <>
                    <ReactSortable
                        list={sectionGifts}
                        setList={(items) => setGiftOrderForSection(items, id)}
                        group="gifts"
                    >
                        {sectionGifts.map((gift) => (
                            <div
                                key={gift.id}
                                className="border border-indigo-700 bg-zinc-900 my-2 p-4 rounded-lg"
                            >
                                <span>{gift.name}</span>
                            </div>
                        ))}
                    </ReactSortable>
                </>
            )}
            {!sectionTitleRenameMode && <GiftCreationForm sectionId={id} />}
        </div>
    );
}
