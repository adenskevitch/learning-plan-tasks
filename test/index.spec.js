const axios = require('axios');
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const expect = require('chai').expect;
const config = require('../test/resources/config.js');

describe('Api tests', () => {
    describe('GET Test', () => {
        chai.use(require('chai-json-schema'));
        const schema = require('../test/resources/api/users/_get/rs.schema.json');
        let dateForValidate;

        it('shuld return status 200', () => {
            return axios.get(config.baseUrl + '/users')
                .then(response => {
                    expect(response.status).to.equal(200);
                    dateForValidate = response.data;
                });
        });

        it('Schema shuld be validate', (done) => {
            chai.assert.jsonSchema(dateForValidate, schema);
            done();
        });
    });

    describe('POST mising some fields test', () => {
        chai.use(require('chai-json-schema'));
        const request = require('../test/resources/api/users/_post/rq.json');
        const schema = require('../test/resources/api/users/_post/rs.schema.json');

        delete request.name;
        delete request.username;

        let dateForValidate;

        it('Shuld return status 201', () => {
            return axios.post(config.baseUrl + '/users', request)
                .then(response => {
                    dateForValidate = response.data;
                    expect(response.status).to.equal(201);
                });
        });

        it('Response shuld be validate by schema', (done) => {
            chai.assert.jsonSchema(dateForValidate, schema);
            done();
        });
    });


    describe('POST Test', () => {
        const request = require('../test/resources/api/users/_post/rq.json');
        const response = require('../test/resources/api/users/_post/rs.json');

        let dateForValidate;

        it('Shuld return status 201', () => {
            return axios.post(config.baseUrl + '/users', request)
                .then(response => {
                    dateForValidate = response.data;
                    expect(response.status).to.be.equal(201);
                });
        });

        it('Response shuld be validate', (done) => {
            expect(dateForValidate.name).to.equal(response.name);
            done();
        });
    });

    describe('DELETE user test', () => {
        const request = require('../test/resources/api/users/_delete/rq.json');

        let dateForValidate;

        it('Shuld return status 200', () => {
            return axios.delete(config.baseUrl + '/users/1', request)
                .then(response => {
                    dateForValidate = response.data;
                    expect(response.status).to.equal(200);
                });
        });

        it('Shuld return empty object', done => {
            expect(dateForValidate).to.empty;
            done();
        });
    });
});