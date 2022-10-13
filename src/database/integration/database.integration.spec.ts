
import { IntegrationTestManager } from '../../test/IntegrationTestManager';
describe('Elastic Integration Testing', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('Elastic Index Operation Privileges', () => {
    it(`Check Create Index Privilege`,async () => {
      const index = integrationTestManager.getTestIndexName();
      const is_index_exists =  await integrationTestManager.esService.indices.exists( {  index } );

      if( is_index_exists.body ){
        await integrationTestManager.deleteTestIndex();
      }

      const result_created_index = await integrationTestManager.createTestIndex();
      expect(result_created_index.body.acknowledged).toBe(true);
    });

    it(`Check Delete Index Privilege`,async () => {
      const index = integrationTestManager.getTestIndexName();
      const is_index_exists =  await integrationTestManager.esService.indices.exists( {  index } );
      if( is_index_exists.body ){
        const result_delete_index = await integrationTestManager.deleteTestIndex();
        expect(result_delete_index.body.acknowledged).toBe(true);
      }
      else{
        await integrationTestManager.createTestIndex();
        const result_delete_index = await integrationTestManager.deleteTestIndex();
        expect(result_delete_index.body.acknowledged).toBe(true);
      }
    });
  });

  describe('Elastic Document Privileges', () => {

    beforeAll(async () => {
      await integrationTestManager.beforeCheckDocumentPrivilegesAll();
    });
  
    afterAll(async () => {
      await integrationTestManager.afterCheckDocumentPrivilegesAll();
    });

    it(`Check Create Index Documents`,async () => {
      const index = integrationTestManager.getTestIndexName();
      const dataset = [{
        _id: '1',
        text: 'If I fall, don\'t bring me back.',
        user: 'Jon Snow',
        date: new Date()
      }, {
        _id: '2',
        text: 'Winter is coming',
        user: 'Ned Stark',
        date: new Date()
      }, {
        _id: '3',
        text: 'A Lannister always pays his debts.',
        user: 'Tyrion Lannister',
        date: new Date()
      }, {
        _id: '4',
        text: 'I am going to break the wheel.',
        user: 'Daenerys Targaryen',
        date: new Date()
      }, {
        _id: '5', 
        text: 'The North Remembers',
        user: 'Arya Stark',
        date: new Date()
      }];
      const body = dataset.flatMap(doc => [{ index: { _index: index, _id: doc._id } }, { text : doc.text, user : doc.user, date : doc.date   }])
      const result_bulk_create = await integrationTestManager.esService.bulk({ refresh: true, body });
      expect(result_bulk_create.statusCode).toBe(200);
    });

    it(`Check Read Index Document`,async () => {
      const index = integrationTestManager.getTestIndexName();
      const { body } = await integrationTestManager.esService.get({
        index: index,
        id: '1'
      });
      const document = body._source;
      expect(document.user).toBe('Jon Snow');
    });

    it(`Check Update Index Documents`,async () => {
      const index = integrationTestManager.getTestIndexName();
      await integrationTestManager.esService.update({
        index: index,
        id: '1',
        body: {
          doc: {
            user: 'Petyr Baelish',
            text: 'Chaos is a ladder.',
            date: new Date()
          }
        }
      });
      const { body } = await integrationTestManager.esService.get({
        index: index,
        id: '1'
      });
      const document = body._source ;
      expect(document.user).toBe('Petyr Baelish');
      expect(document.text).toBe('Chaos is a ladder.');
    });

    it(`Check Delete Index Documents`,async () => {
      const index = integrationTestManager.getTestIndexName()
      const delete_response = await integrationTestManager.esService.delete({ 
        index: index,
        id: '1'
      });
      expect(delete_response.statusCode).toBe(200);
    });
  });
});
