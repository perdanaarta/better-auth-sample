import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { DatabaseSync } from 'node:sqlite';

const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    allowSignup: true,
    database: new DatabaseSync('database.sqlite'),
  },
  trustedOrigins: ['http://localhost:3000/', 'http://localhost:5000/', '*'],
  plugins: [organization()],
    advanced: {
        useSecureCookies: false
    }
  
});

export default auth;
