import { Router } from 'express';
import { auth } from '../middlewares/authMiddleware';
import OrderController from '../controllers/orderController';

class OrderRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    /**
     * @swagger
     *  /v1/order/all:
     *    get:
     *      tags: ['Order']
     *      responses:
     *        201:
     *          description: Successfully get all
     *        401:
     *          description: Not authorized
     *        400:
     *          description: Bad request
     *      parameters: [
     *        {
     *           name: status,
     *           in: query,
     *           description: status,
     *             schema: {
     *               type: string,
     *               enum: ['POR_ATENDER', 'EN_PROCESO', 'EN_DELIVERY', 'RECIBIDO'],
     *             }
     *         },
     *      ]
     */
    this.router.get(
      '/all',
      auth,
      OrderController.getAllOrders,
    );

    /**
     * @swagger
     *  /v1/order/create:
     *    post:
     *      tags: ['Order']
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/CreateOrder'
     *      responses:
     *        201:
     *          description: Successfully Created
     *        401:
     *          description: Not authorized
     *        400:
     *          description: Bad request
     */
    this.router.post(
      '/create',
      auth,
      OrderController.createOrder,
    );

    /**
     * @swagger
     *  /v1/order/update-status/{id}:
     *    put:
     *      tags: ['Order']
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/UpdateStatus'
     *      responses:
     *        201:
     *          description: Update successfully
     *        401:
     *          description: Not authorized
     *        400:
     *          description: Bad request
     *      parameters: [
     *       {
     *         name: id,
     *         in: path,
     *         description: ID del campo personalizado,
     *         required: true,
     *         schema: {
     *           type: string
     *         }
     *       },
     *      ]
     */
    this.router.put(
      '/update-status/:id',
      auth,
      OrderController.updateOrderStatus,
    );


    /**
     * @swagger
     * tags:
     *   name: Order
     *   description:
     * components:
     *   schemas:
     *      CreateOrder:
     *         type: object
     *         example:
     *           orderNumber: '0001'
     *           productList: ['Yogurt', 'Leche']
     *           sellerId: 'userId'
     *           delivererId: 'userId'
     *      UpdateStatus:
     *          type: object
     *          example:
     *            date: '2024-08-20'
     *            status: 'POR_ATENDER, EN_PROCESO, EN_DELIVERY, RECIBIDO'
     *      Error:
     *        type: object
     *        required:
     *          -status
     *          -message
     *        properties:
     *          status:
     *            type: integer
     *            description: HTTP status code
     *            example: 400
     *          message:
     *            type: object
     *            description: Error description
     *            example: { "name": "UnexpectedError", "message": "Cannot read properties of undefined (reading 'toString')", "context": "AppError" }
     */
  }
}

const authRoutes = new OrderRoutes();

export default authRoutes.router;
