import { useRoom } from "@/app/liveblocks.config";
import LiveblocksProvider from "@liveblocks/yjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Doc } from "yjs";
import GiftPurchaseEditSection from "./GiftPurchaseEditSection";

export default function GiftPurchaseLinkSection() {
    const [provider, setProvider] = useState<LiveblocksProvider<
        any,
        any,
        any,
        any
    > | null>(null);
    const [doc, setDoc] = useState<Doc | null>(null);
    const { giftId } = useParams();
    const roomInformation = useRoom();

    useEffect(() => {
        const yjsDoc = new Doc();
        const yjsPro = new LiveblocksProvider(roomInformation, yjsDoc);

        setDoc(yjsDoc);
        setProvider(yjsPro);

        return () => {
            yjsDoc.destroy();
            yjsPro.destroy();
        };
    }, [roomInformation]);

    if (!doc || !provider) {
        return null;
    }

    return (
        <div>
            <GiftPurchaseEditSection
                doc={doc}
                provider={provider}
                giftId={giftId.toString()}
            />
        </div>
    );
}
