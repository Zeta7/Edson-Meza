import { Router } from 'express';
import { auth } from '../middlewares/authMiddleware';
import UserController from '../controllers/userController';

class UserRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    /**
     * @swagger
     *  /v1/user/all:
     *    get:
     *      tags: ['User']
     *      responses:
     *        201:
     *          description: Successfully get all
     *        401:
     *          description: Not authorized
     *        400:
     *          description: Bad request
     *      parameters: [
     *        {
     *           name: role,
     *           in: query,
     *           description: role,
     *             schema: {
     *               type: string,
     *               enum: ['ENCARGADO', 'VENDEDOR', 'DELIVERY', 'REPARTIDOR'],
     *             }
     *         },
     *      ]
     */
    this.router.get(
      '/all',
      auth,
      UserController.getAllUsers,
    );

    /**
     * @swagger
     *  /v1/user/create:
     *    post:
     *      tags: ['User']
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/CreateUser'
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
      UserController.createUser,
    );

    /**
     * @swagger
     * tags:
     *   name: User
     *   description:
     * components:
     *   schemas:
     *      CreateUser:
     *          type: object
     *          example:
     *            code: "U003"
     *            name: "Carlos Mendoza"
     *            email: "carlos.mendoza@example.com"
     *            phone: "123456789"
     *            position: "Vendedor"
     *            role: "ENCARGADO, VENDEDOR, DELIVERY, REPARTIDOR"
     *            password: "mypassword"
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

const authRoutes = new UserRoutes();

export default authRoutes.router;
