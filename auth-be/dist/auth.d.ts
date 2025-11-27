import { DatabaseSync } from "node:sqlite";
declare const auth: import("better-auth", { with: { "resolution-mode": "import" } }).Auth<{
    emailAndPassword: {
        enabled: true;
        allowSignup: boolean;
        database: DatabaseSync;
    };
    trustedOrigins: string[];
}>;
export default auth;
