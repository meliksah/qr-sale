import * as supertest from 'supertest';

import {} from 'jasmine';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { SuperTest, Test } from 'supertest';
import { Logger } from '@overnightjs/logger';

import TestServer from '../shared/TestServer.test';
import QrPaymentController from './QrPaymentController';


describe('QrPaymentController', () => {

    const qrPaymentController = new QrPaymentController();
    let agent: SuperTest<Test>;


    beforeAll(done => {
        const server = new TestServer();
        server.setController(qrPaymentController);
        agent = supertest.agent(server.getExpressInstance());
        done();
    });


    describe('API: "/api/qr-payment/:amount"', () => {

        const amount = '100';
        it(`should return a JSON object with the message and a status code
            of "${OK}" if message was successful`, done => {

            agent.get('/api/qr-payment/' + amount)
                .end((err, res) => {
                    if (err) {
                        Logger.Err(err, true);
                    }
                    expect(res.status).toBe(OK);
                    done();
                });
        });

        it(`should return a JSON object with the "error" param and a status code of "${BAD_REQUEST}"
            if message was unsuccessful`, done => {

            agent.get('/api/say-hello/make_it_fail')
                .end((err, res) => {
                    if (err) {
                        Logger.Err(err, true);
                    }
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBeTruthy();
                    done();
                });
        });
    });
});
