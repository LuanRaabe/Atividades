import { Request, Response } from 'express';
import { LoginService } from '../services';
import { ResponseWriter } from '../utils';

class MakeLogin {
    private service = LoginService;
    private responseWriter = ResponseWriter;

    public async handle(req: Request, res: Response) {
        try {
            const response = await new this.service().login(req.body);
            this.responseWriter.cookie(res, 200, response);
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export { MakeLogin };
