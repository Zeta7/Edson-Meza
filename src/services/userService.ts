import { HttpResponse } from '../bases/responses/http.response';
import boom from '@hapi/boom';
import database from '../../prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

class UserService {
  public async getAllUsers(role?: string) {
    try {
      let whereClause = {};

      if (role != 'undefined') {
        const roleEnumValue = role as Role;
        whereClause = { role: roleEnumValue };
      }

      const users = await database.user.findMany({
        where: whereClause,
      });

      return new HttpResponse.postSuccessful(users);
    } catch (error: any) {
      throw boom.badRequest(error);
    }
  };

  public async createUser(body: any) {
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

export default new UserService();