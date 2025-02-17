import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { sendEmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly ConfigService: ConfigService) {}
  emailTransport() {
    const transport = nodemailer.createTransport({
      host: this.ConfigService.get<string>('EMAIL_HOST'),
      port: this.ConfigService.get<number>('PORT'),
      secure: false,
      auth: {
        user: this.ConfigService.get<string>('EMAIL_USER'),
        pass: this.ConfigService.get<string>('EMAIL_PASSWORD'),
      },
    });
    return transport;
  }

  async sendMail(dto: sendEmailDto) {
    const { recipients, subject, html } = dto;

    const transport = this.emailTransport();

    const options: nodemailer.sendEmailOptions = {
      from: this.ConfigService.get<string>('EMAIL_USER'),
      to: recipients,
      subject: subject,
      html: html,
    };
    try {
        await transport.sendMail(options);
        console.log('Email enviado exitosamente')

    }
    catch(error) {
        console.log('Error al enviar el email: ', error)
    }
  }
}
