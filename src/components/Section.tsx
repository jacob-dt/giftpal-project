import { ReactSortable } from "react-sortablejs";
import { SetStateAction } from "react";
import { Gift, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import GiftCreationForm from "./forms/GiftCreationForm";

type SectionProps = {
    id: string;
    name: string;
};

export default function Section({ id, name }: SectionProps) {
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

    return (
        <div className="w-52 p-3 bg-zinc-800 rounded-lg">
            <h3>{name}</h3>
            {sectionGifts && (
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
            <GiftCreationForm sectionId={id} />
        </div>
    );
}
