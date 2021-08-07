import { BaseEntity, createConnection, getConnectionOptions } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import * as chalk from 'chalk';
import { TConstructor } from '../shared/types/constructor.type';
import { throwCustom } from '../shared/utils/errors.util';
import { DbLoggerService } from './src/services/db-logger.service';
import { db } from './src/const/db.const';
import { KataService } from './src/services/kata.service';

console.log('Launch backend...');

export function startBackend(clear: boolean) {
    getConnectionOptions().then(connectionOptions => {
        createConnection(Object.assign(connectionOptions, {
            logger: new DbLoggerService()
        })).then(async connection => {
            try {
                db.connect(connection);
                if (clear) {
                    await dropSystemUT();
                }
                // await bootstrap();
                await KataService.getKata(false);
                console.log(chalk.yellowBright('Launched backend'));
            } catch (err) {
                console.error(chalk.redBright("Error in process : "), err.message);
            }
        })
    });
}


// -----------------------------------------   Clear DB   -----------------------------------------


export async function dropSystemUT(): Promise<void> {
    try {
        // await deleteAll(StatementUTEntity);
        console.log(chalk.yellowBright('DATABASE CLEARED'));
    } catch (err) {
        throwCustom('Error clearing database', err);
    }
}


async function deleteAll(entity: TConstructor<BaseEntity>): Promise<void> {
    await db.connection.createQueryBuilder().delete().from(entity).execute();
}


// ------------------------------------   Launch NestJs app   -----------------------------------------


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
}

startBackend(false);
