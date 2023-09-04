import { connect } from "$lib/server/db"

const protectedUserRoutes = [
    "/chat",
    "/settings"
]

const protectedAdminRoutes = [
    "/admin",
    "/api/admin"
]

export const handle = async ({ resolve, event }) => {
    // await connect()

    return await resolve(event);
}
