import { routerConstant } from '../utils/constants/api.constant';
import express from 'express';

import { authenToken } from '../utils/middleware/jwt.middleware';
import { voucherController } from '../controllers';

const VoucherRouting = express.Router();

/**
 * @openapi
 * /api/v1/app/all-user:
 *   get:
 *     tags:
 *       - User
 *     description: Get all Data
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *
 */
VoucherRouting.get(`${routerConstant.GET_VOUCHER_ALL}`, authenToken, voucherController.getVoucherAll);
VoucherRouting.post(`${routerConstant.POST_VOUCHER}`,authenToken, voucherController.postVoucher);
VoucherRouting.post(`${routerConstant.PUT_VOUCHER}`, authenToken, voucherController.putVoucher);
VoucherRouting.delete(`${routerConstant.DELETE_VOUCHER}`, authenToken, voucherController.deleteVoucher);

export { VoucherRouting };
