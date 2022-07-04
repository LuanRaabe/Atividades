import { Request, Response } from 'express';
import { SectionService } from '../services';
import { ResponseWriter } from '../utils';

class MakeLogout {
    private service = SectionService;
    private responseWriter = ResponseWriter;

    public async handle(req: Request, res: Response) {
        try {
            const response = await new this.service().delete();
            this.responseWriter.success(res, 200, response);
        } catch (err) {
            this.responseWriter.error(res, err as Error);
        }
    }
}

export { MakeLogout };
