const request = require('supertest');

describe('server tests', () => {
  let db;
  let tables;
  let server;

  let clearTables = (connection, tables, done) => {

  }

  beforeEach((done) => {
    server = require('../src/server/index.js');
    let tables = [];

    //create connection here

    //connect
      //call clearTables function
      done()
  }) 

  afterEach(() => {
    server.close();
  });

  describe('basic server test', () => {
    it('responds to /', (done) => {
    request(server)
    .get('/')
    .expect(200, done)
    })
  })

})



  // describe('table schema should follow required data types', () => {
  //   //test that the tables are of correct functionality
  //   test('should ...', () => {

  //   })

  //   test('should ...', () => {
      
  //   })

  //   test('should ...', () => {
      
  //   })

  //   test('should ...', () => {
      
  //   })
  // })