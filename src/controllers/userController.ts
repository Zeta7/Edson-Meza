import { Response, Request, NextFunction } from 'express';
import UserService from '../services/userService';

class UserController {
    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const role = req.query.role;

            const rUser = await UserService.getAllUsers(String(role));

            res.status(rUser.getStatus()).json(rUser.getData());
        } catch (error) {
            next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            const rUser = await UserService.createUser(body);

            res.status(rUser.getStatus()).json(rUser.getData());
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();