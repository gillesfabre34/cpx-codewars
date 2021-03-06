import { BaseEntity, createConnection, getConnectionOptions } from 'typeorm';
// import { StatementUTEntity } from '../backend/src/codewars/entities/statement-ut.entity';
import * as chalk from 'chalk';
import { DbLoggerService } from '../../backend/src/services/db-logger.service';
import { db } from '../../backend/src/const/db.const';
import { TConstructor } from '../types/constructor.type';

// -----------------------------------------   Clear DB   -----------------------------------------

// TODO : DELETE FILE







getConnectionOptions().then(connectionOptions => {
    createConnection(Object.assign(connectionOptions, {
        logger: new DbLoggerService()
    })).then(async connection => {
        try {
            db.connect(connection);
            // await deleteAll(StatementUTEntity);
            console.log(chalk.yellowBright('DATABASE CLEARED'));
            await db.connection.close();
        } catch (err) {
            console.error(chalk.red("Error in process : " + err.stack));
        }

    })
});


export async function deleteAll(entity: TConstructor<BaseEntity>): Promise<void> {
    await db.connection.createQueryBuilder().delete().from(entity).execute();
}

