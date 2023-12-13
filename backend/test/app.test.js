const request = require('supertest');
const index = require('../app');
const mongoose = require("mongoose");
const { expect, assert } = require('chai');

const app = index.app;

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
        categories: {fiction},
      })
      .expect(200)
      done();
  });
});


describe('POST /api/transactions/add-transaction', () => {
  it('attempts to add a trasaction', (done) => {
    request(app)
      .post('/api/transactions/add-transaction')
      .send({
        bookId: "1",
        borrowerId: "22",
        bookName: "something",
        borrowerName: "me",
        transactionType: "Issue",
        fromDate: "01/02/2003",
        toDate: "02/03/2005"
      })
      .expect(504)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message, 'Book not found!');
        done();
      });
  });
});