import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { RegistryContext, RegistryContextProps } from "../RegistryContext";
import { Gift, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import ConfirmGiftDelete from "../ConfirmGiftDelete";
import ButtonCancelGiftEdit from "../ButtonCancelGiftEdit";

export default function GiftModal() {
    const router = useRouter();
    const params = useParams();
    const { setGiftOpenMode } =
        useContext<RegistryContextProps>(RegistryContext);
    const [editorMode, setEditorMode] = useState(false);

    const gift = useStorage((root) => {
        return root.gifts.find((g) => g.id === params.giftId);
    }, shallow);

    const giftUpdater = useMutation(({ storage }, giftId, dataUpdate) => {
        const gifts = storage.get("gifts").map((gift) => gift.toObject());
        const index = gifts.findIndex((gift) => gift.id === giftId);
        const gift = storage.get("gifts").get(index);
        for (let keyUpdate in dataUpdate) {
            gift?.set(keyUpdate as keyof Gift, dataUpdate[keyUpdate]);
        }
    }, []);

    const giftDeletion = useMutation(({ storage }, id) => {
        const gifts = storage.get("gifts");
        const giftIndex = gifts.findIndex((gift) => gift.toObject().id === id);
        gifts.delete(giftIndex);
    }, []);

    useEffect(() => {
        if (params.giftId && setGiftOpenMode) {
            setGiftOpenMode(params.giftId.toString());
        }
    }, [params]);

    function deleteHandler() {
        giftDeletion(params.giftId);
        if (setGiftOpenMode) {
            setGiftOpenMode(null);
        }

        router.back();
    }

    function giftBackgroundClickHandler() {
        router.back();
    }

    function giftTitleChangeHandler(event: FormEvent) {
        event.preventDefault();
        const titleInput = (event.target as HTMLFormElement).querySelector(
            "input"
        );
        if (titleInput) {
            const newGiftTitleName = titleInput.value;
            giftUpdater(params.giftId, { name: newGiftTitleName });
            setEditorMode(false);
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/70"
            onClick={giftBackgroundClickHandler}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="mt-32 max-w-sm mx-auto bg-zinc-800 p-4 rounded-lg"
            >
                {!editorMode && (
                    <div className="flex justify-between items-center">
                        <h4>{gift?.name}</h4>
                        <button
                            onClick={() => setEditorMode(true)}
                            className="bg-green-600 py-1 px-3 rounded-lg"
                        >
                            Edit
                        </button>
                    </div>
                )}
                {editorMode && (
                    <div>
                        <form onSubmit={giftTitleChangeHandler}>
                            <input
                                type="text"
                                defaultValue={gift?.name}
                                className="mb-2"
                            />
                            <button className="bg-green-600 py-2 px-4 rounded-lg w-full mb-2">
                                Save
                            </button>
                        </form>
                        <ConfirmGiftDelete
                            onDeleteProperty={() => deleteHandler()}
                        />
                        <ButtonCancelGiftEdit
                            onClick={() => setEditorMode(false)}
                        />
                    </div>
                )}
                {!editorMode && <div></div>}
            </div>
        </div>
    );
}
