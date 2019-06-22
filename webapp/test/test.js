var supertest = require('supertest');
var chai = require('chai');
var main = require('../app.js');

global.app = main.app;
global.expect = chai.expect;
global.request = supertest(app);

describe('Task API Routes', function() {
    // In this test it's expected a task list of two tasks
    describe('POST /encode', function() {
        it('encodes from ascii to base64', function(done) {
            request.post('/encode')
                .send({
                    data: 'Hello World!'
                })
                .expect(200)
                .end(function(err, res) {
                    expect(res.body.payload).to.equal('SGVsbG8gV29ybGQh')
                    done(err);
                });
        });
    });

    // Testing the save task expecting status 201 of success
    describe('POST /decode', function() {
        it('decode from base64 to ascii', function(done) {
            request.post('/decode')
            .send({
                data: 'SGVsbG8gV29ybGQh'
            })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.payload).to.equal('Hello World!')
                done(err);
            });
        });
    });

    after(function() {  
        main.server.close()
      })
});