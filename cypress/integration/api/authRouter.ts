import StatusCodes from 'http-status-codes';
import { cookieProps, loginFailedErr, paramMissingError } from '@shared/constants';

describe('authRouter', () => {

    before(() => {
        cy.task('db:seed')
    })

    const apiUrl = 'http://localhost:3000';
    const authPath = `${apiUrl}/api/auth`;
    const loginPath = `${authPath}/login`;
    const logoutPath = `${authPath}/logout`;
    const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;    

    describe(`"POST - ${loginPath}"`, () => {
        
        it(`should return a response with a status of "${OK}" and a cookie with a jwt if the login was successful.`, (done) => {    
            cy.request('POST', loginPath, {
                email: 'sean.maxwell@gmail.com',
                password: 'Password@1',
            }).should((res : any) => {
                expect(res.status).equal(OK);
                expect(res.headers['set-cookie'][0]).contain(cookieProps.key);
                done();
            });
        });

        it(`should return a response with a status of "${UNAUTHORIZED}" and a json with the error "${loginFailedErr}" if the password failed.`, (done) => {
            cy.request({
                method : 'POST', 
                url: loginPath, 
                body: {
                    email: 'sean.maxwell@gmail.com',
                    password: 'someBadPassword',
                },
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(UNAUTHORIZED);
                expect(res.body.error).equal(loginFailedErr);
                done();
            });
        });

        it(`should return a response with a status of "${UNAUTHORIZED}" and a json with the error "${loginFailedErr}" if the email was not found.`, (done) => {
            cy.request({
                method : 'POST', 
                url: loginPath, 
                body: {
                    email: 'notfound@notfound.com',
                    password: 'Password@1',
                },
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(UNAUTHORIZED);
                expect(res.body.error).equal(loginFailedErr);
                done();
            });
        });

        it(`should return a response with a status of "${BAD_REQUEST}" and a json with an error for all other bad responses.`, (done) => {            
            cy.request({
                method : 'POST', 
                url: loginPath, 
                body: {},
                failOnStatusCode: false
            }).should((res : any) => {
                expect(res.status).equal(BAD_REQUEST);
                expect(res.body.error).equal(paramMissingError);
                done();
            });
        });
    });

    describe(`"GET - ${logoutPath}"`, () => {
        it(`should return a response with a status of "${OK}".`, (done) => {
            cy.request('GET', logoutPath)
            .should((res : any) => {
                expect(res.status).equal(OK);
                done();
            });
        });
    });
});

 