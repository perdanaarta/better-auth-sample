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
    'https://localhost:3000',
    'https://localhost:5000',
    'https://116.193.190.167:3000',
    'https://116.193.190.167:5000',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://116.193.190.167:3000',
    'http://116.193.190.167:5000',
    'http://test.com',
    'http://test.com:3000',
    'http://test.com:5000'
  ],
  plugins: [organization()],
//   advanced: {
//       defaultCookieAttributes: {
//         sameSite: 'lax',
//         secure: false,
//         httpOnly: true,
//         partitioned: true,
//       },
//   }
});

export default auth;
