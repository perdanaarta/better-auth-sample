import { betterAuth } from "better-auth"
import { DatabaseSync } from "node:sqlite";

const auth = betterAuth({
    emailAndPassword: {    
        enabled: true,
        allowSignup: true,
        database: new DatabaseSync("database.sqlite"),
    },
    trustedOrigins: ["http://localhost:3000"],
})

export default auth;