import { getServerSession } from "next-auth";
import { authorizationOptions } from "./authorizationOptions";

export async function getUserEmail() {
    const sesh = await getServerSession(authorizationOptions);
    const userEmail = sesh?.user?.email || "";
    return userEmail;
}
