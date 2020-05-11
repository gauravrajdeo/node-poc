'use strict';

const request = require('supertest');
const expect = require('chai').expect;
const { Course } = require('../../models/courseModel');

let server;

describe('GET /', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach( async () => {
    server.close();
    await Course.deleteMany({});
  });
  describe('# GET /api/courses', () => {
    it('should get empty result in the array', async () => {
      const res = await request(server).get('/api/courses');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.empty;
    })
  });
  describe('## GET /api/courses', () => {
    it('should get a document', async () => {
      await Course.collection.insertMany([
        { name: "python", author: "jack", tags:["backend"], isPublished: true },
      ]);
      const res = await request(server).get('/api/courses');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      expect(res.body[0].name).to.equal('python');
    })
  });
});