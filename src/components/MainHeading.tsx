import { authorizationOptions } from "@/lib/authorizationOptions";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

export default async function MainHeading() {
    const sesh = await getServerSession(authorizationOptions);

    return (
        <header className="p-7 bg-zinc-800 ">
            <div className="flex items-center justify-between ">
                <a href="" className="logo">
                    GiftPal
                </a>
                <div>
                    {sesh && (
                        <>
                            Signed In As: {sesh?.user?.name}
                            <SignOutButton />
                        </>
                    )}
                    {!sesh && (
                        <>
                            Not Signed In
                            <SignInButton />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
