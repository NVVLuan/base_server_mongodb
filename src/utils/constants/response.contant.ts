enum ErrorCode {
    BADREQUEST = 400,
    UNAUTHORIED = 401,
    NOTFUND = 404,
    FORBIDDEN = 403,
    CREATE = 500,
    SENDEMAIL = 500,
    EVENTERROR = 409,
}

class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    getError() {
        return { code: this.status, message: this.message };
    }
}

export class ResponseSuccess {
    data: object;

    constructor(data: object) {
        this.data = data;
    }

    getSuccess() {
        return { code: 200, data: this.data };
    }
}

export class ForbiddenException extends HttpException {
    constructor(status?: number, message?: string) {
        super(
            status ? status : status ? status : ErrorCode.FORBIDDEN,
            message ? message : 'You do not have permission to access this resource.'
        );
    }
}

export class NotFundException extends HttpException {
    constructor(status?: number, message?: string) {
        super(status ? status : ErrorCode.FORBIDDEN, message ? message : 'The requested resource was not found.');
    }
}

export class BadRequestException extends HttpException {
    constructor(status?: number, message?: string) {
        super(status ? status : ErrorCode.BADREQUEST, message ? message : 'The request is invalid.');
    }
}

export class AuthoriedException extends HttpException {
    constructor(status?: number, message?: string) {
        super(status ? status : ErrorCode.UNAUTHORIED, message ? message : 'UNAUTHORIED ');
    }
}

export class CreateException extends HttpException {
    constructor(status?: number, message?: string) {
        super(status ? status : ErrorCode.CREATE, message ? message : 'Create exception');
    }
}

export class SendEmailException extends HttpException {
    constructor(status?: number, message?: string) {
        super(status ? status : ErrorCode.SENDEMAIL, message ? message : 'Send email failed ');
    }
}

export class EventException extends HttpException {
    constructor(status?: number, message?: string) {
        super(status ? status : ErrorCode.EVENTERROR, message ? message : 'event editing');
    }
}
