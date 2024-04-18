import { ReactSortable } from "react-sortablejs";
import { GiftType } from "./Registry";
import { SetStateAction } from "react";

type SectionProps = {
    id: string;
    name: string;
    gifts: GiftType[];
    setGifts: SetStateAction<any>;
};

export default function Section({ id, name, gifts, setGifts }: SectionProps) {
    function giftsForSectionSetter(
        sortedGifts: GiftType[],
        newSectionId: string
    ) {
        setGifts((previousGifts: GiftType[]) => {
            const brandNewGifts = [...previousGifts];
            sortedGifts.forEach((giftSorted: GiftType, newIndex: number) => {
                const giftFound = brandNewGifts.find(
                    (brandNewGift) => brandNewGift.id === giftSorted.id
                );
                if (giftFound) {
                    giftFound.index = newIndex;
                    giftFound.sectionId = newSectionId;
                }
            });
            return brandNewGifts;
        });
    }
    return (
        <div className="w-52 p-3 bg-zinc-800 rounded-lg">
            <h3>{name}</h3>
            <ReactSortable
                list={gifts}
                setList={(items) => giftsForSectionSetter(items, id)}
                group="gifts"
            >
                {gifts.map((gift) => (
                    <div
                        key={gift.id}
                        className="border border-indigo-700 bg-zinc-900 my-2 p-4 rounded-lg"
                    >
                        <span>{gift.name}</span>
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
}
