import boom from '@hapi/boom';

export const isStatusOrderValid = (status1: string, status2: string, date: string): StatusValidationResult => {
    try {
        const statusOrder = ['POR_ATENDER', 'EN_PROCESO', 'EN_DELIVERY', 'RECIBIDO'];

        const index1 = statusOrder.indexOf(status1);
        const index2 = statusOrder.indexOf(status2);

        const isOrderValid = index1 >= index2;

        const result: StatusValidationResult = {
            verified: isOrderValid,
            status: status1,
        };

        if (isOrderValid) {
            switch (status1) {
                case 'POR_ATENDER':
                    result.orderDate = new Date(date);
                    break;
                case 'EN_PROCESO':
                    result.receptionDate = new Date(date);
                    break;
                case 'EN_DELIVERY':
                    result.dispatchDate = new Date(date);
                    break;
                case 'RECIBIDO':
                    result.deliveryDate = new Date(date);
                    break;
            }
        }

        return result;
    } catch (error: any) {
        throw boom.badRequest(error);
    }
}

type StatusValidationResult = {
    verified?: boolean;
    status: string;
    orderDate?: Date;
    receptionDate?: Date;
    dispatchDate?: Date;
    deliveryDate?: Date;
};