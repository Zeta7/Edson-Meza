export enum OrderStatus {
  POR_ATENDER = 'POR_ATENDER',
  EN_PROCESO = 'EN_PROCESO',
  EN_DELIVERY = 'EN_DELIVERY',
  RECIBIDO = 'RECIBIDO'
}

// Order
export type updateOrderDto = {
  date: string;
  status: string;
};

export type createOrderDto = {
  orderNumber: string;
  productList: string[];
  sellerId: string;
  delivererId: string;
};