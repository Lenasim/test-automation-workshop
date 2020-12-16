import { createTestClient } from 'apollo-server-testing';
import { createConnection, getConnection } from 'typeorm';
import Wilder from './models/Wilder';

import { getApolloServer } from './server';



describe('Apollo server', () => {
  let query, mutate;

  beforeEach(async()=>{
    //typeorm sqlite test in memory google에 검색
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Wilder],
      synchronize: true,
      logging: false,
    });
    const testClient = createTestClient(await getApolloServer());
    query = testClient.query;
    mutate = testClient.mutate;
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });
  
  describe('mutation createWilder', ()=>{
    //테스트용 서버이므로 진짜 서버에 데이터를 만들지는 않는다
    it('creates and returns a new wilder', async () => {
      const response = await mutate({
        mutation: `
          mutation {
            createWilder(
              input: {
                firstName: "Prune"
                lastName: "Banane"
              }
            ) {
              firstName
              lastName
            }
          }
      `,
      });

    //wilder is created?
    expect(await Wilder.count()).toEqual(1);
    expect(response.data).toMatchObject({
      createWilder: {
        firstName: 'Prune',
        lastName: 'Banane',
      },
    });
  });
});

  describe('query wilders', () => {
    // create => test
    it('returns all wilders', async () => {
      const wilder1 = Wilder.create({ firstName: 'John', lastName: 'Doe'})
      wilder1.save();
      const response = await query({
        query: `
          query {
            createWilder(
              input: {
                firstName: "John"
                lastName: "Doe"
              }
            ) {
              firstName
              lastName
            }
          }
      `,
      });

      expect(response.data).toMatchObject({
        "wilders": [
          {
            "firstName": "John",
            "lastName": "Doe"
          }
        ]
      });    
  })
})
