import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { DatabaseSync } from 'node:sqlite';

const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    allowSignup: true,
    database: new DatabaseSync('database.sqlite'),
  },
    trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://116.193.190.167:3000",
    "http://116.193.190.167:5000",
    ],
  plugins: [organization()],
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: false,
      httpOnly: true,
      partitioned: false,
    },
  },
});

export default auth;
