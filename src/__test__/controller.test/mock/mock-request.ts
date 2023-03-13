import { Request } from 'express';
import { Params } from 'express-serve-static-core';

interface User {
    username: string;
    password: string;
    email: string;
}

export function makeMockRequest({ params, query, user }: { params?: Params; query?: Params; user?: User | undefined }): Request {
    const req = {
        params: params || {},
        query: query || {},
        user,
    } as unknown;
    return req as Request;
}
