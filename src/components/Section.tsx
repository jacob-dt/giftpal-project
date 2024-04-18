import { ReactSortable } from "react-sortablejs";
import { GiftType } from "./Registry";
import { SetStateAction } from "react";
import { useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";

type SectionProps = {
    id: string;
    name: string;
};

export default function Section({ id, name }: SectionProps) {
    const sectionGifts = useStorage<GiftType[]>((r) => {
        return r.gifts.filter((g) => g.sectionId === id);
    }, shallow);

    function giftsForSectionSetter(
        sortedGifts: GiftType[],
        newSectionId: string
    ) {}
    return (
        <div className="w-52 p-3 bg-zinc-800 rounded-lg">
            <h3>{name}</h3>
            {sectionGifts && sectionGifts?.length > 0 && (
                <ReactSortable
                    list={sectionGifts}
                    setList={(items) => giftsForSectionSetter(items, id)}
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
            )}
        </div>
    );
}
