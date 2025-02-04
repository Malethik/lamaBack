import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('user') user: string,
    @Body('password') password: string,
  ) {
    return await this.emailService.sendEmail(
      'no-reply@azienda.com', // Mittente
      to, // Destinatario
      `Nuovo account creato: ${user}`, // Oggetto
      user, // Nome utente
      password, // Password generata
    );
  }
}
