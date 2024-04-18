import Registry from "@/components/Registry";
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
            <h1 className="text-3xl">Registry List</h1>
            <div>
                <Link className="mt-4 inline-block btn" href={"/new-registry"}>
                    Create a New Registry
                </Link>
            </div>
        </div>
    );
}
