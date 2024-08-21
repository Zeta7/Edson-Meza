import { HttpResponse } from '../bases/responses/http.response';
import boom from '@hapi/boom';
import database from '../../prisma';
import { createOrderDto, OrderStatus, updateOrderDto } from './types';
import { isStatusOrderValid } from '../utils/validate-status';

class OrderService {
  public async getAllOrders(status?: string) {
    try {
      let whereClause = {};

      if (status != 'undefined') {
        const statusEnumValue = status as OrderStatus;
        whereClause = { status: statusEnumValue };
      }

      const orders = await database.order.findMany({
        where: whereClause,
      });

      return new HttpResponse.postSuccessful(orders);
    } catch (error: any) {
      throw boom.badRequest(error);
    }
  };

  public async createOrder(orderData: createOrderDto) {
    try {
      const order = await database.order.create({
        data: {
          ...orderData,
          status: OrderStatus.POR_ATENDER,
          orderDate: new Date(),
        },
      });

      return new HttpResponse.postSuccessful({
        message: 'Successful Create Order',
        order,
      });
    } catch (error: any) {
      throw boom.badRequest(error);
    }
  };

  public async updateOrderStatus(
    orderId: string,
    body: updateOrderDto,
  ) {
    try {
      if (!orderId) throw boom.badRequest('orderId not found');

      const order: any = await database.order.findUnique({ where: { id: orderId } });
      if (!order) throw boom.notFound('Order not found');

      const validStatus = isStatusOrderValid(body.status, order.status, body.date);

      if (!validStatus.verified) throw boom.badRequest('Invalid status transition');

      delete validStatus.verified;

      const updateData: Partial<any> = { ...validStatus };

      const updatedOrder = await database.order.update({
        where: { id: orderId },
        data: updateData,
      });

      return new HttpResponse.putSuccessful({
        message: 'Successful Update',
        updatedOrder,
      }
      );
    } catch (error: any) {
      throw boom.badRequest(error);
    }
  };
}

export default new OrderService();