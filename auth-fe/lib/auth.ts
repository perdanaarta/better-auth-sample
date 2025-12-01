import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react

const auth = createAuthClient({
    baseURL: "http://localhost:5000",
    plugins: [ 
        organizationClient() 
    ]
})

export default auth;