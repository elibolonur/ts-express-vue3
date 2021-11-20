import StatusCodes from 'http-status-codes';
import { cookieProps, loginFailedErr, paramMissingError } from '@shared/constants';
import { JwtService } from '@shared/JwtService';
import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken';

const jwtService = new JwtService();

describe('middleware', () => {

    const apiUrl = 'http://localhost:3000';
    const usersPath = `${apiUrl}/api/users`;
    const getPath = `${usersPath}/all`;
    const { UNAUTHORIZED, OK, CREATED } = StatusCodes;    

    describe(`"GET - ${getPath}"`, () => {
        it(`should return a response with a status of "${UNAUTHORIZED}".`, (done) => {
            cy.request({
                method: 'GET', 
                url: getPath,
                failOnStatusCode: false
            }).should((res : any) => {
                    expect(res.status).equal(UNAUTHORIZED);
                    done();
                });
        });

        // it(`should return a response with a status of "${UNAUTHORIZED}".`, (done) => {
        //     jsonwebtoken.sign({
        //         id: 567,
        //         role: 1,
        //         name: "string"
        //     }, "xxxxxxxxxxxxxx", {expiresIn: "3d"}, (err, token) => {
        //         cy.setCookie(cookieProps.key, token || err?.message || '')
        //         .request({
        //             method: 'GET', 
        //             url: getPath,
        //             failOnStatusCode: false
        //         }).should((res) => {
        //                 expect(res.status).equal(UNAUTHORIZED);
        //                 done();
        //         }); 
        //     });
        // });
    });

});
