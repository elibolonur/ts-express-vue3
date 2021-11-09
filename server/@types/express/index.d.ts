import { IUser } from '@entities/User';
import { IClientData } from '@shared/JwtService';

declare module 'express-serve-static-core' {
    interface ReqBody  {
        user: IUser
        email: string;
        password: string;
    }
    interface Response {
        sessionUser: IClientData;
    }
}