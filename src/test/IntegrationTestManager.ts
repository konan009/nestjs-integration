import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

export class IntegrationTestManager {
  private app: INestApplication;
  private indexName : any;

  private configService : ConfigService;
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
    this.configService = this.app.get<ConfigService>(ConfigService);
    this.indexName = this.configService.get('ES_PREFIX') + "_test_index";
  }

  async afterAll() {
    await this.app.close();
  }

  async beforeCheckDocumentPrivilegesAll(): Promise<void> {
    await this.createTestIndex();
  }

  async afterCheckDocumentPrivilegesAll() {
    this.deleteTestIndex();
  }

  public getTestIndexName(): any {
    return this.indexName;
  }

  public deleteTestIndex(){
    const result = this.esService.indices.delete({
      index: this.indexName
    });
    return result;
  }

  public createTestIndex(){
    const result = this.esService.indices.create({
      index: this.indexName,
      body: {
        mappings: {
          properties: {
            text: { type: 'text' },
            user: { type: 'keyword' },
            time: { type: 'date' }
          }
        }
      }
    });
    return result;
  }
}
