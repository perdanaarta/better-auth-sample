import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous, OptionalAuth, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }

  @Get('public')
  @AllowAnonymous()
  async getPublic() {
    return { message: 'Public route' };
  }

  @Get('optional')
  @OptionalAuth()
  async getOptional(@Session() session: UserSession) {
    console.log('Optional session:', session);

    return { authenticated: !!session };
  }
}
