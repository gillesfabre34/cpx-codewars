import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import { DeleteResult } from 'typeorm';
import { db } from '../db/const/db.const';
import { throwHttpException } from '../../../shared/utils/errors.util';

@Injectable()
export class KataService {

    // async getFileUTPaths(): Promise<string[]> {
    //     try {
    //         return (await FileUTEntity.find()).map(f => f.path);
    //     } catch (err) {
    //         return throwHttpException('Error getting FileUT', 400, err);
    //     }
    // }
    //
    //
    // async deleteFileUTPaths(fileUTPaths: string[]): Promise<number> {
    //     try {
    //         const response: DeleteResult = await db.connection.createQueryBuilder()
    //             .delete()
    //             .from(FileUTEntity)
    //             .where('path IN (:...paths)', {paths: fileUTPaths})
    //             .execute();
    //         console.log(chalk.yellowBright('Delete response : '), response);
    //         return response.affected;
    //     } catch (err) {
    //         return throwHttpException('Error deleting FileUT', 400, err);
    //     }
    // }


    // ----------------------------------------------   Save FileUT entities   -------------------------------------------------


    // private referencedClassOrEnumUTEntities: ReferencedClassOrEnumUTEntity[] = [];
    //
    //
    // async saveFileUTs(postFileUTsDto: PostFileUTsDto): Promise<number> {
    //     try {
    //         const systemUTEntity: SystemUTEntity = await SystemUTEntity.findOne(postFileUTsDto.systemId);
    //         let numberOfSavedFileUtEntities = 0;
    //         for (const fileUTDto of postFileUTsDto.fileUTs) {
    //             await this.saveFileUTEntity(fileUTDto, systemUTEntity);
    //             numberOfSavedFileUtEntities++;
    //         }
    //         await this.savePropertyEntities();
    //         this.referencedClassOrEnumUTEntities = [];
    //         return numberOfSavedFileUtEntities;
    //     } catch (err) {
    //         this.referencedClassOrEnumUTEntities = [];
    //         return throwHttpException('Error creating FileUTs', 400, err);
    //     }
    // }


}
