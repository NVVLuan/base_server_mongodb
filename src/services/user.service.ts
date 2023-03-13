import { UserUpdateDTO } from './../dtos/user.dto';
import user from '../models/model_noSQL/user';
import { varifyrefeshToken, generateToken } from '../utils/jwtSetup/jwtcommon';
const saltRounds = 10;
import bcrypt from 'bcrypt';

const getAllUser = async () => {
    return await user.find();
};

const postUser = async (username: string, password: string, email: string) => {
    // find user exit
    const userFind = await user.findOne({ username });

    if (userFind) return null;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    return await user.create({ username, password: passwordHash, email });
};

const getUserById = async (id: string) => {
    return await user.findById(id);
};

const postUserLogin = async (username: string, password: string, email: string) => {
    const userFind = await user.findOne({ username });
    if (!userFind) return null;
    const checkPassword = await bcrypt.compare(password, userFind.password as string);
    if (checkPassword) {
        // create accessToken
        return await generateToken({ id: userFind.id, username, email });
    } else {
        return null;
    }
};

const putUser = async (userUpdate: UserUpdateDTO) => {
    return new Promise((resolve) => {
        user.findOneAndUpdate({ id: userUpdate.id }, { userUpdate }, function (err: any) {
            if (err) resolve(null);
            resolve('update success');
        });
    });
};

const delteUser = async (id: string) => {
    return new Promise((resolve) => {
        user.findOneAndDelete({ id: id }, function (err: any, data: any) {
            if (err) resolve(null);
            generateToken(data, '1s');
            resolve('delete success');
        });
    });
};

const postUserRefeshtoken = async (refeshToken: string) => {
    const checkToken = await varifyrefeshToken(refeshToken);
    if (checkToken === null) return null;
    return await generateToken(checkToken);
};

export const userService = {
    getAllUser,
    postUser,
    getUserById,
    postUserLogin,
    putUser,
    delteUser,
    postUserRefeshtoken,
};
