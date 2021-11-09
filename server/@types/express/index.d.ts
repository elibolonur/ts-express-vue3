import { IUser } from "@entities/User";

declare namespace Express {
    export interface Request  {
        body: {
            user: IUser
        };
    }
}
