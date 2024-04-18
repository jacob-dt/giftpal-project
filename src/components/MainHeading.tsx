import { authorizationOptions } from "@/lib/authorizationOptions";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default async function MainHeading() {
    const sesh = await getServerSession(authorizationOptions);

    return (
        <header className="p-7 bg-zinc-800 ">
            <div className="flex items-center justify-between ">
                <Link href="/" className="logo flex items-center">
                    <FontAwesomeIcon icon={faGift} className="h-6 pr-2" />
                    <div className="font-bold text-2xl">GiftPal</div>
                </Link>
                <div>
                    {sesh && (
                        <>
                            Username: {sesh?.user?.name}
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
