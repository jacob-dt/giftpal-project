"use client";
import uniqid from "uniqid";
import { FormEvent } from "react";
import { Gift, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/core";

export default function GiftCreationForm({ sectionId }: { sectionId: string }) {
    const addNewGift = useMutation(
        ({ storage }, giftName) => {
            return storage.get("gifts").push(
                new LiveObject<Gift>({
                    name: giftName,
                    id: uniqid.time(),
                    sectionId: sectionId,
                    index: 9999,
                })
            );
        },
        [sectionId]
    );

    function giftCreationHandler(event: FormEvent) {
        event.preventDefault();
        const giftInput = (event.target as HTMLFormElement).querySelector(
            "input"
        );
        if (giftInput) {
            const giftName = giftInput?.value;
            addNewGift(giftName);
            giftInput.value = "";
        }
    }

    return (
        <form onSubmit={giftCreationHandler}>
            <input type="text" placeholder="Add Gift" />
        </form>
    );
}
