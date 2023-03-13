import { routerConstant } from '../utils/constants/api.constant';
import express from 'express';
import { userController } from '../controllers/';
import { authenToken } from '../utils/middleware/jwt.middleware';

const UserRouting = express.Router();

/**
 * @openapi
 * /api/v1/user/all-user:
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
UserRouting.get(`${routerConstant.GET_USER_ALL}`, userController.getAllUsers);

/**
 * @openapi
 * '/api/v1/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
UserRouting.post(`${routerConstant.POST_USER}`, userController.postUser);
UserRouting.get(`${routerConstant.GET_USER_BY_ID}`, authenToken, userController.getUser);
UserRouting.post(`${routerConstant.POST_USER_LOGIN}`, userController.postUserLogin);
UserRouting.put(`${routerConstant.PUT_USER}`, authenToken, userController.putUser);
UserRouting.delete(`${routerConstant.DELETE_USER}`, authenToken, userController.deleteUser);
UserRouting.post(`${routerConstant.REFESHTOKEN}`, userController.postUserRefeshtoken);

export { UserRouting };
