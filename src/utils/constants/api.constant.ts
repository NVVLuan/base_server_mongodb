interface ControllerConstant {
    User: string;
    Voucher: string;
    Email: string;
    Transaction: string;
    Event: string;
}

const BasePathConstant = '/api/v1';

export const ControllerConstant: ControllerConstant = {
    User: `${BasePathConstant}/user`,
    Voucher: `${BasePathConstant}/voucher`,
    Email: `${BasePathConstant}/email`,
    Transaction: `${BasePathConstant}/transaction`,
    Event: `${BasePathConstant}/event`,
};

export const enum routerConstant {
    //User api
    GET_USER_ALL = '/all-user',
    GET_USER_BY_ID = '/:id',
    POST_USER = '/signup',
    POST_USER_LOGIN = '/login',
    PUT_USER = '/update',
    DELETE_USER = '/delete/:id',
    REFESHTOKEN = '/refresh-token',

    //Event api
    EVENT_EDITABLE_MAINTAIN = '/:event_id/editable/maintain',
    EVENT_EDITABLE = '/:event_id/editable/me',
    EVENT_EDITABLE_RELEASE = '/:event_id/editable/release',
    POST_EVENT = '',
    EVENT_EDITABLE_MAINTAINS = '/:event_id/editable/maintains',
    EVENT_EDITABLES = '/:event_id/editable/mes',
    EVENT_EDITABLE_RELEASES = '/:event_id/editable/releases',

    // voucher api
    GET_VOUCHER_ALL = '/all-user-voucher',
    GET_VOUCHER_BY_ID = '/:id',
    POST_VOUCHER = '',
    PUT_VOUCHER = '/transaction',
    DELETE_VOUCHER = '/delete-voucher/:id',

    //send email
    SEND_EMAIL = '',

    //transaction api
    GET_TRANSACTION_ALL = '/all-transaction',
}
