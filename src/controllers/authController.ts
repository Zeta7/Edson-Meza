import { Response, Request, NextFunction } from 'express';
import AuthService from '../services/authService';

class AuthController {
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const rAuth = await AuthService.login(email, password);

            res.status(rAuth.getStatus()).json(rAuth.getData());
        } catch (error) {
            next(error);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            const rAuth = await AuthService.register(body);

            res.status(rAuth.getStatus()).json(rAuth.getData());
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();