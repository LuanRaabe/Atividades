import { Request, Response } from 'express';
import { CreateUserService, CreateAccountService } from '../services';
import { UsersTable } from '../clients/dao/postgres/userts';
import { ResponseWriter } from '../utils';

class CreateAccount {
    private usersTable = UsersTable;
    private userService = CreateUserService;
    private accountService = CreateAccountService;
    private responseWriter = ResponseWriter;

    public async handle(req: Request, res: Response) {
        const existUser = await new this.usersTable().get(req.body);
        console.log('existUser', existUser);
        if (existUser) {
            try {
                const response = await new this.accountService().execute(
                    existUser.data,
                );
                console.log('response create user', response);
                this.responseWriter.success(res, 201, response);
            } catch (err) {
                this.responseWriter.error(res, err as Error);
            }
        } else {
            try {
                const newUser = await new this.userService().execute(req.body);
                const response = await new this.accountService().execute(
                    newUser.data ?? req.body,
                );
                this.responseWriter.success(res, 201, response);
            } catch (err) {
                this.responseWriter.error(res, err as Error);
            }
        }
    }
}

export { CreateAccount };
