import Registries from "@/components/Registries";
import SignInView from "@/components/views/SignInView";
import { authorizationOptions } from "@/lib/authorizationOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
    const sesh = await getServerSession(authorizationOptions);

    if (!sesh) {
        return <SignInView />;
    }
    return (
        <div>
            <h1 className="text-3xl mb-4">Registry List</h1>
            <Registries />
            <div>
                <Link className="mt-4 inline-block btn" href={"/new-registry"}>
                    Create a New Registry
                </Link>
            </div>
        </div>
    );
}
