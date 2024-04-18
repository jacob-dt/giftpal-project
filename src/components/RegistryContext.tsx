import { Dispatch, createContext, useState } from "react";

export type GiftOpenId = string | null;

export type RegistryContextProps = {
    giftOpenMode?: GiftOpenId;
    setGiftOpenMode?: Dispatch<React.SetStateAction<GiftOpenId>>;
};

export type ProviderProps = {
    children: React.ReactNode;
};

export const RegistryContext = createContext<RegistryContextProps>({});

export function RegistryContextProvider({ children }: ProviderProps) {
    const [giftOpenMode, setGiftOpenMode] = useState<GiftOpenId>(null);

    return (
        <RegistryContext.Provider
            value={{
                giftOpenMode,
                setGiftOpenMode,
            }}
        >
            {children}
        </RegistryContext.Provider>
    );
}
