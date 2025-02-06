import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
    });
  }
  private generateHtml(user: string, password: string): string {
    return `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Creato</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #ffffff;
        margin: 50px;
      }
      h1 {
        color: #316d00;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      h2{
        color: #316d00;
        font-size: 25px;
        margin-bottom: 10px;
      }
      .card {
        background: #fff;
        border: 4px solid #4caf50;
        padding: 20px;
        margin-bottom: 20px;
      }
      .titleh1 {
        color: #316d00;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .titleh2 {
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .password-label {
        color: #4caf50;
        font-size: 14px;
        font-weight: bold;
      }
      .password {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        background: #f0f0f0;
        padding: 10px;
        border-radius: 5px;
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <h1 center>LAMA CANYON CMR</h1>
    <h2 center>ACCOUNT CREATO</h2>
    <div class="card">
      <div class="password-label">IL NOME UTENTE È:</div>
      <div class="password">${user}</div>
    </div>
    <div class="card">
      <div class="password-label">LA PASSWORD È:</div>
      <div class="password">${password}</div>
    </div>
  </body>
</html>


    `;
  }

  async sendEmail(user: string, password: string) {
    const htmlContent = this.generateHtml(user, password);

    const mailOptions = {
      from: 'CRM LamaCANYONING <no-reply@emailaziendale>', // mittente con nome visualizzato
      to: 'quintiliani.d@gmail.com',
      subject: 'Nuevo account creato!', // oggetto della mail
      text: `Account creato per ${user}.\nLa password generata è: ${password}`, // versione testuale
      html: htmlContent, // versione HTML
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
