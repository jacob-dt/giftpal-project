import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { RegistryContext, RegistryContextProps } from "../RegistryContext";

export default function GiftModal() {
    const router = useRouter();
    const params = useParams();
    const { setGiftOpenMode } =
        useContext<RegistryContextProps>(RegistryContext);

    useEffect(() => {
        if (params.giftId && setGiftOpenMode) {
            setGiftOpenMode(params.giftId.toString());
        }
    }, [params]);

    function giftBackgroundClickHandler() {
        router.back();
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
                test
            </div>
        </div>
    );
}
