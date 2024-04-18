import React from "react";

type PageProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
};

export default function RegistryLayout({ children, modal }: PageProps) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
