import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { DatabaseService } from './database.service'

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        maxRetries: 10,
        requestTimeout: 60000,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [ElasticsearchModule,DatabaseService],
})
export class DatabaseModule implements OnModuleInit  {
  constructor(private readonly databaseService: DatabaseService){}
  public async onModuleInit() {
    //  await this.databaseService.deleteIndex();
  }
}