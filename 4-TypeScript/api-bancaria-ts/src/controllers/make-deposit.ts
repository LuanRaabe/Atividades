import { Request, Response } from 'express';
import { MakeDepositService } from '../services';
import { ResponseWriter } from '../utils';

class MakeDeposit {
    private service = MakeDepositService;
    private responseWriter = ResponseWriter;

    public async handle(req: Request, res: Response) {
        try {
            const response = await new this.service().execute(req.body);
            this.responseWriter.success(res, 200, response);
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export { MakeDeposit };
