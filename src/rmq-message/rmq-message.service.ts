import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RmqMessageService {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) {}

  private async publish(
  ) {
 
  }

}
