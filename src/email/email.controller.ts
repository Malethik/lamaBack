import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('user') user: string,
    @Body('password') password: string,
  ) {
    return await this.emailService.sendEmail(from, to, subject, user, password);
  }
}
