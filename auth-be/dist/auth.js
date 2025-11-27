"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_auth_1 = require("better-auth");
const node_sqlite_1 = require("node:sqlite");
const auth = (0, better_auth_1.betterAuth)({
    emailAndPassword: {
        enabled: true,
        allowSignup: true,
        database: new node_sqlite_1.DatabaseSync("database.sqlite"),
    },
    trustedOrigins: ["http://localhost:3000"],
});
exports.default = auth;
//# sourceMappingURL=auth.js.map