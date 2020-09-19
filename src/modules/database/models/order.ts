import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';
import { User } from './user';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public userId: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'integer' })
  public quantity: number;
  @ApiProperty({ type: 'decimal' })
  public price: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public user: User;

  public static get tableName(): string {
    return 'Orders';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'User.id',
          to: 'orders.userId'
        }
      }
    };
  }
}
