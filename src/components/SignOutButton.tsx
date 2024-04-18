"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button type="button" onClick={() => signOut()} className="ml-4">
            Sign Out
        </button>
    );
}
