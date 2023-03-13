import { userService } from './../../services/user.service';
import user from '../../models/model_noSQL/user';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MockMongoose } from 'mock-mongoose';
const mockMongoose = new MockMongoose(mongoose);
dotenv.config();
const { URLDATABASE } = process.env;

describe('Test user service', () => {
    beforeAll(function (done) {
        mockMongoose.prepareStorage().then(function () {
            mongoose.connect(URLDATABASE as string, function (err) {
                done(err);
            });
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should data create user return not  null', async () => {
        const data = await userService.postUser('anhbaHieu', 'foo', 'foo@example.com');
        expect(data).not.toEqual(null);
    }, 70000);

    it('should data return null', async () => {
        const data = await userService.postUser('anhbaHieu', 'foo', 'foo@example.com');
        expect(data).toEqual(null);
    }, 70000);

    it('should return all user', async () => {
        const data = await userService.getAllUser();
        expect(data).not.toEqual(null);
    }, 70000);

    it('should return null user ', async () => {
        const data = await userService.getUserById('63f83b17d67a76a1084335b0');
        expect(data).toEqual(null);
    }, 70000);

    it('should return user ', async () => {
        const userfind = await user.findOne({ username: 'anhbaHieu' });
        const data = await userService.getUserById(userfind?.id);
        expect(data).not.toEqual(null);
    }, 70000);

    it('should data  return not  null with login', async () => {
        const data = await userService.postUserLogin('anhbaHieu', 'foo', 'foo@example.com');
        expect(data).not.toEqual(null);
    }, 70000);

    it('should data  return null with login', async () => {
        const data = await userService.postUserLogin('anhbaHieus', 'foo', 'foo@example.com');
        expect(data).toEqual(null);
    }, 70000);

    it('should data  return  null with update user', async () => {
        const userfind = await user.findOne({ username: 'anhbaHieu' });
        const data = await userService.putUser({
            id: userfind?.id,
            username: 'anhbaHieus',
            password: 'foo1',
            email: 'foo3@example.com',
        });
        expect(data).not.toEqual(null);
    }, 70000);

    it('should data  return update success with update user', async () => {
        const data = await userService.putUser({
            id: 'dssfsd32423',
            username: 'anhbaHieus',
            password: 'foo1',
            email: 'foo3@example.com',
        });
        expect(data).toEqual('update success');
    }, 70000);

    it('should data  return success with delete user', async () => {
        const data = await userService.delteUser('safasdfa');
        expect(data).toEqual('delete success');
    }, 70000);

    it('should data  return null with delete user', async () => {
        const userfind = await user.findOne({ username: 'anhbaHieu' });
        await userService.delteUser(userfind?.id);
        const findDelete = await user.findById(userfind?.id);
        expect(findDelete).toEqual(null);
    }, 70000);
});
