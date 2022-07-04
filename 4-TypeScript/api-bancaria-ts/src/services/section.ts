import jwt from 'jsonwebtoken';
import { APIResponse, Section } from '../models';
import { ExceptionTreatment } from '../utils';
import { config } from '../config';
import { Request } from 'express';

class SectionService {
    private secret = config.SECRETKEY;

    public async create(section: Section): Promise<APIResponse> {
        try {
            console.log('cadidate to section', section);
            const token = jwt.sign(section, this.secret, { expiresIn: '1h' });
            console.log('token', token);
            return {
                data: {
                    auth: true,
                    token: token,
                },
                messages: ['section created'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while creating section',
            );
        }
    }

    public async update(section: Section): Promise<APIResponse> {
        try {
            const token = jwt.sign({ section }, this.secret, {
                expiresIn: '1h',
            });
            return {
                data: {
                    auth: true,
                    token: token,
                },
                messages: ['section updated'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while updating section',
            );
        }
    }

    public async delete(): Promise<APIResponse> {
        try {
            return {
                data: {
                    auth: false,
                    token: null,
                },
                messages: ['section deleted'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while deleting section',
            );
        }
    }

    public async get(req: Request): Promise<APIResponse> {
        try {
            const token = req.headers.cookie;

            if (!token) {
                return {
                    data: {
                        auth: false,
                        token: null,
                    },
                    messages: ['token not found'],
                } as APIResponse;
            }

            return {
                data: {
                    auth: true,
                    token: token,
                },
                messages: ['token'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while getting section',
            );
        }
    }

    public async verify(req: Request): Promise<APIResponse> {
        try {
            const token = req.headers.cookie;

            if (!token) {
                return {
                    data: {
                        auth: false,
                        token: null,
                    },
                    messages: ['token not found'],
                } as APIResponse;
            }

            try {
                const decoded = jwt.verify(token[0], this.secret);
                return {
                    data: {
                        auth: true,
                        token: token,
                    },
                    messages: ['token verified'],
                } as APIResponse;
            } catch (error) {
                return {
                    data: {
                        auth: false,
                        token: null,
                    },
                    messages: ['token invalid'],
                } as APIResponse;
            }
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while verifying section',
            );
        }
    }
}

export { SectionService };
