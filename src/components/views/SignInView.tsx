"use client";

import { signIn } from "next-auth/react";

export default function SignInView() {
    return (
        <div className="pt-20 w-full text-center">
            <button onClick={() => signIn("google")} className="primary">
                Sign In
            </button>
        </div>
    );
}
