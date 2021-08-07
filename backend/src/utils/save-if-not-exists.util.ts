import { BaseEntity } from 'typeorm';
import { db } from '../const/db.const';
import { FindConditions } from 'typeorm/find-options/FindConditions';

export async function saveIfNotExists<T extends BaseEntity>(entity: T, conditions: FindConditions<T>): Promise<T> {
    let dbEntity: T = await db.connection.getRepository(entity.constructor).findOne(conditions) as T;
    return dbEntity ?? await entity.save();
}
