import request from 'supertest';
import mongoose from "mongoose";
import app from "../server.js";
import {expect,assert} from 'chai';

//dummy comment
describe('POST /api/auth/signin', () => {
  it('attempts to login an existing user', (done) => {
    request(app)
      .post('/api/auth/signin')
      .send({
        employeeId:"IMT2020051",
        password:"12345678"
      })
      .expect(200)
      done();
  });
});

describe('POST /api/books/addbook', () => {
  it('attempts to add a book', (done) => {
    request(app)
      .post('/api/books/addbook')
      .send({
        bookName: "testing",
        alternateTitle: "naitik",
        author: "naitik",
        language: "english",
        publisher: "naitik",
        bookCountAvailable: 20,
        categories: {},
      })
      .expect(200)
      done();
  });
});

describe('POST /api/auth/signin', () => {
    it('attempts to login an existing user', (done) => {
      request(app)
        .post('/api/auth/signin')
        .send({
          employeeId:"IMT2020051",
          password:"123639324"
        })
        .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message, 'Wrong Password');
        done();
      });
    });
  });
