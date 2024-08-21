import { Response, Request, NextFunction } from 'express';
import OrderService from '../services/orderService';

class OrderController {
    public async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const status = req.query.status;

            const rOder = await OrderService.getAllOrders(String(status));

            res.status(rOder.getStatus()).json(rOder.getData());
        } catch (error) {
            next(error);
        }
    }

    public async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const rOrder = await OrderService.createOrder(req.body);

            res.status(rOrder.getStatus()).json(rOrder.getData());
        } catch (error) {
            next(error);
        }
    }

    public async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const body = req.body;

            const rOrder = await OrderService.updateOrderStatus(id, body);

            res.status(rOrder.getStatus()).json(rOrder.getData());
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();