import { AppService } from './app.service';
import type { UserSession } from '@thallesp/nestjs-better-auth';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getProfile(session: UserSession): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        } & {
            role?: string | string[];
        };
    }>;
    getPublic(): Promise<{
        message: string;
    }>;
    getOptional(session: UserSession): Promise<{
        authenticated: boolean;
    }>;
}
