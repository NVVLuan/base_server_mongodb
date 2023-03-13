import { routerConstant } from '../utils/constants/api.constant';
import express from 'express';
import { emailController } from '../controllers';
import { authenToken } from '../utils/middleware/jwt.middleware';

const EmailRouting = express.Router();

EmailRouting.post(`${routerConstant.SEND_EMAIL}`, authenToken, emailController.postEmail);

export { EmailRouting };
