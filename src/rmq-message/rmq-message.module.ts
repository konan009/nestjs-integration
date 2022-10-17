import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqMessageService } from './rmq-message.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('AMQP_CONNECTION'),
      }),
    }),
  ],
  exports: [RabbitMQModule],
  controllers: [],
  providers: [RmqMessageService],
})
export class RmqMessageModule {}
