import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { HttpResponse } from '../bases/responses/http.response';
import database from '../../prisma/index';

class AuthService {
  public async login(email: string, password: string) {
    try {
      const user = await database.user.findUnique({ where: { email } });
      if (!user) throw boom.notFound('User not found');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw boom.badRequest('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      user.password = '';

      return new HttpResponse.postSuccessful({
        message: 'Successful login',
        token,
        user
      });
    } catch (error: any) {
      throw boom.badRequest(error);
    }
  };

  public async register(body: any) {
    const { code, name, email, phone, position, role, password } = body;

    try {
      const existingUser = await database.user.findUnique({ where: { email } });
      if (existingUser) throw boom.badRequest('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await database.user.create({
        data: {
          code,
          name,
          email,
          phone,
          position,
          role,
          password: hashedPassword,
        },
      });

      newUser.password = '';

      return new HttpResponse.postSuccessful(newUser);
    } catch (error: any) {
      throw boom.badRequest(error);
    }
  }
}

export default new AuthService();

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw new Error('Invalid token');
  }
};
