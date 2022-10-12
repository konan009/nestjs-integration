import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class DatabaseService {
  constructor(private readonly esService: ElasticsearchService, private readonly configService: ConfigService) { }
  public async createIndex() {
      // const index = this.configService.get('ES_PREFIX') + "_test_index";


    // const test = await this.esService.indices.create({
    //   index: 'tweets',
    //   body: {
    //     mappings: {
    //       properties: {
    //         text: { type: 'text' },
    //         user: { type: 'keyword' },
    //         time: { type: 'date' }
    //       }
    //     }
    //   }
    // });

    const dataset = [{
      _id: '1',
      text: 'If I fall, don\'t bring me back.',
      user: 'jon',
      date: new Date()
    }, {
      _id: '2',
      text: 'Winter is coming',
      user: 'ned',
      date: new Date()
    }, {
      _id: '3',
      text: 'A Lannister always pays his debts.',
      user: 'tyrion',
      date: new Date()
    }, {
      _id: '4',
      text: 'I am the blood of the dragon.',
      user: 'daenerys',
      date: new Date()
    }, {
      _id: '5', 
      text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
      user: 'arya',
      date: new Date()
    }];

    const body = dataset.flatMap(doc => [{ index: { _index: 'tweets', _id: doc._id } }, { text : doc.text, user : doc.user, date : doc.date   }])

    const testss = await this.esService.bulk({ refresh: true, body })

    // const index = "tweets";
    // const checkIndex = await this.esService.indices.exists({ index });


    //   if( checkIndex.body ){
    //     const result = await this.esService.indices.delete({
    //       index: index
    //     });
    //     console.log("Index Deleted");
    //     console.log(result);
    //   }else{
    //     const result = await this.esService.indices.create({
    //       index: index
    //     });
    //     console.log(result);
    //     console.log("Index Created");
    //   }
  }

  public async updateIndex() {
    const testss = await this.esService.update({
      index: 'tweets',
      id: '1',
      body: {
        doc: {
          user: 'Petyr Baelish',
          text: 'Chaos is a ladder.',
          date: new Date()
        }
      }
    });



    console.log(testss);
  }


  public async deleteIndex() {
    const delete_respone = await this.esService.delete({ index: 'tweets',
    id: '1'
    });
    console.log(delete_respone.body.result);
  }

}
