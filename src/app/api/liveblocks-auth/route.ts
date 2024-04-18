import { authorizationOptions } from "@/lib/authorizationOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    // Get the current user from your database
    const sesh = await getServerSession(authorizationOptions);

    if (!sesh || !sesh.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user = sesh.user;
    const userEmail = user.email || "";

    // Identify the user and return the result
    const { status, body } = await liveblocksClient.identifyUser(
        {
            userId: userEmail,
            groupIds: [],
        },
        {
            userInfo: {
                name: user.name || "",
                email: userEmail,
                image: user.image,
            },
        }
    );

    return new Response(body, { status });
}
