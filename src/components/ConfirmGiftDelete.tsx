"use client";
import { useState } from "react";

type Props = {
    onDeleteProperty: () => void;
};
export default function ConfirmGiftDelete({ onDeleteProperty }: Props) {
    const [wantToDelete, setWantToDelete] = useState(false);

    if (wantToDelete) {
        return (
            <div className="grid grid-cols-2 gap-2">
                <div className="">
                    <button
                        onClick={() => setWantToDelete(false)}
                        className="btn block grow w-full"
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <button
                        onClick={onDeleteProperty}
                        className="bg-red-600 py-2 px-4 block grow w-full rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setWantToDelete(true)}
            className="bg-red-600 py-2 px-4 rounded-lg w-full"
        >
            Delete
        </button>
    );
}
