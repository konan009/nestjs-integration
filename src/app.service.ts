import { Injectable } from '@nestjs/common';
import { ConfigService,ConfigModule} from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
