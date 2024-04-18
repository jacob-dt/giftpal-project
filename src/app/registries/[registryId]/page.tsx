"use server";

import Registry from "@/components/Registry";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { useParams } from "next/navigation";

type PageProps = {
    params: {
        registryId: string;
    };
};

export default async function RegistryPage(props: PageProps) {
    const registryId = props.params.registryId;
    const userEmail = await getUserEmail();
    const registryInformation = await liveblocksClient.getRoom(registryId);
    const accessForUsers = registryInformation.usersAccesses?.[userEmail];
    let accessGranted =
        accessForUsers && [...accessForUsers].includes("room:write");
    if (!accessGranted) {
        return <div>You Do Not Have Access To This Registry</div>;
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <Registry
                name={registryInformation.metadata.registryName.toString()}
                id={registryId}
            />
        </div>
    );
}
