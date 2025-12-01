import { betterAuth } from "better-auth"
import { organization } from "better-auth/plugins";
import { DatabaseSync } from "node:sqlite";

const auth = betterAuth({
    emailAndPassword: {    
        enabled: true,
        allowSignup: true,
        database: new DatabaseSync("database.sqlite"),
    },
    trustedOrigins: ["http://localhost:3000"],
    plugins: [ 
        organization()
    ] 

})

export default auth;