import StatusCodes from 'http-status-codes';
import { cookieProps, loginFailedErr, paramMissingError } from '@shared/constants';

describe('userRouter', () => {

    beforeEach(() => {
        cy.task('db:seed')
        cy.login();
    })

    after(() => {
        cy.task('db:seed')
    })

    const apiUrl = 'http://localhost:3000';
    const usersPath = `${apiUrl}/api/users`;
    const getPath = `${usersPath}/all`;
    const updatePath = `${usersPath}/update`;
    const deletePath = `${usersPath}/delete`;
    const addPath = `${usersPath}/add`;
    const { BAD_REQUEST, OK, CREATED } = StatusCodes;    

    describe(`"GET - ${getPath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.login();
            cy.request('GET', getPath)
                .should((res : any) => {
                        expect(res.status).equal(OK);
                    done();
                });
        });
    });

    describe(`"PUT - ${updatePath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.login();
            cy.request('PUT', updatePath, {
                user : {
                    name:"Sean Maxwell",
                    email:"sean.maxwell@gmail.com",
                    pwdHash:"$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy",
                    role:1,
                    id:159123164363
                }
            }).should((res : any) => {
                expect(res.status).equal(OK);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.login();
            cy.request({
                method: 'PUT', 
                url: updatePath, 
                body: {
                    user : {
                        name:"unknown",
                        email:"unknown@gmail.com",
                        pwdHash:"hash",
                        role:0,
                        id:13231321
                    }
                },
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.login();
            cy.request({
                method: 'PUT', 
                url: updatePath, 
                body: {},
                failOnStatusCode: false
            }).should((res) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });

    describe(`"DELETE - ${deletePath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.request({
                method: 'DELETE',
                url: `${deletePath}/357437875835`,
            }).should((res : any) => {
                expect(res.status).equal(OK);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.request({
                method: 'DELETE',
                url: `${deletePath}/3577875835`,
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });

    describe(`"POST - ${addPath}"`, () => {
        it(`should return a response with a status of "${CREATED}".`, (done) => {
            cy.login();
            cy.request('POST', addPath, {
                user : {
                    name:"Test",
                    email:"testl@gmail.com",
                    pwdHash:"$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy",
                    role:1,
                }
            }).should((res : any) => {
                expect(res.status).equal(CREATED);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}".`, (done) => {
            cy.login();
            cy.request({
                method: 'POST', 
                url: addPath,
                body: {},
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                done();
            });
        });
    });
});
