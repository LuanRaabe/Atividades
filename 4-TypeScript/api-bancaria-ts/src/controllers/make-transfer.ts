import { Request, Response } from 'express';
import { MakeTransferService } from '../services';
import { ResponseWriter } from '../utils';

class MakeTransfer {
    private service = MakeTransferService;
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

export { MakeTransfer };
