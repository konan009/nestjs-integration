import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

import { ElasticsearchService } from '@nestjs/elasticsearch';

export class IntegrationTestManager {
  private app: INestApplication;
  public esService : ElasticsearchService;
  constructor() { }

  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule
      ]
    }).compile();
    this.app = moduleRef.createNestApplication();
    await this.app.init();
    this.esService = this.app.get<ElasticsearchService>(ElasticsearchService);
  }

  async afterAll() {
    await this.app.close();
  }
}
