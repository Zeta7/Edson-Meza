import { Router } from 'express';
import AuthController from '../controllers/authController';

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    /**
     * @swagger
     *  /v1/auth/register:
     *    post:
     *      //summary: endpoint for register users
     *      security: [] # No Security
     *      tags: ['Security']
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Register'
     *      responses:
     *        201:
     *          description: Successfully registered
     *        401:
     *          description: Not authorized
     *        400:
     *          description: Bad request
     */
    this.router.post(
      '/register',
      AuthController.register,
    );

    /**
     * @swagger
     *  /v1/auth/login:
     *    post:
     *      //summary: login user
     *      security: [] # No Security
     *      tags: ['Security']
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Login'
     *      responses:
     *        201:
     *          description: Login successfully
     *        401:
     *          description: Not authorized
     *        400:
     *          description: Bad request
     */
    this.router.post(
      '/login',
      AuthController.login,
    );;


    /**
     * @swagger
     * tags:
     *   name: Security
     *   description:
     * components:
     *   schemas:
     *      Login:
     *         type: object
     *         example:
     *           email: "carlos.mendoza@example.com"
     *           password: "mypassword"
     *      Register:
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

const authRoutes = new AuthRoutes();

export default authRoutes.router;
