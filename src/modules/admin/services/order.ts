import { Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: IOrder, currentUser: ICurrentUser): Promise<Order> {
    if (model.id) return this.update(model);
    return this.create(model, currentUser.id);
  }

  private async create(model: IOrder, userId: number): Promise<Order> {
    return this.orderRepository.insert({ ...model, userId });
  }

  private async update(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);

    if (!order) throw new NotFoundException('not-found');

    return this.orderRepository.update({ ...order, ...model, updatedDate: new Date() });
  }
}
