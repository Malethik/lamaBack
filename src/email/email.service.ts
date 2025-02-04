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
      secure: this.configService.get<boolean>('SMTP_SECURE') === true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }
  private generateHtml(user: string, password: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Creato</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
              .container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .card {
                  background: #fff;
                  border-radius: 50%;
                  border: 4px solid #4CAF50;
                  width: 250px;
                  height: 250px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  padding: 20px;
              }
              .title {
                  color: #333;
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
              }
              .password-label {
                  color: #4CAF50;
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
                  display: inline-block;
                  margin-top: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="card">
                  <div class="title">ACCOUNT CREATO</div>
                  <div class="password-label">IL NOME UTENTE È:</div>
                  <div class="password">${user}</div>
                  <div class="password-label">LA PASSWORD È:</div>
                  <div class="password">${password}</div>
              </div>
          </div>
      </body>
      </html>
    `;
  }

  async sendEmail(
    from: string,
    to: string,
    subject: string,
    user: string,
    password: string,
  ) {
    const htmlContent = this.generateHtml(user, password);

    const mailOptions = {
      from: 'CRM LamaCANYONING <no-reply@emailaziendale>', // mittente con nome visualizzato
      to, // destinatario
      subject, // oggetto
      text: `Account creato per ${user}.\nLa password generata è: ${password}`, // versione testuale
      html: htmlContent, // versione HTML
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
