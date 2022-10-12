
import { IntegrationTestManager } from '../../test/IntegrationTestManager';
import { Test } from "@nestjs/testing"

describe('createUser', () => {
  const integrationTestManager = new IntegrationTestManager();
  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  it(`/GET cats`,async () => {
    const index = "teesstt";
    const checkIndex =  await integrationTestManager.esService.indices.exists({ index });
    console.log(checkIndex.body);
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });



});
