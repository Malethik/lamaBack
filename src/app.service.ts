import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ServerON(): string {
    return 'Hello devs im online';
  }
}
