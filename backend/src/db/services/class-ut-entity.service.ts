import { FileUTEntity } from '../entities/kata-language.entity';
import { SourceFile } from 'ts-morph';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { MethodUtEntityService } from './method-ut-entity.service';

export class ClassUtEntityService {

    // static async saveClassUTEntities(fileUTEntity: FileUTEntity, sourceFile: SourceFile): Promise<void> {
    //     for (const declaration of sourceFile.getClasses()) {
    //         const className: string = declaration.getName();
    //         let classUTEntity: KataLanguageEntity = await this.existingClass(fileUTEntity, className);
    //         if (!classUTEntity) {
    //             classUTEntity = await this.putAndReturnId(fileUTEntity, className);
    //         }
    //         await MethodUtEntityService.saveEach(classUTEntity, declaration);
    //     }
    // }


    // private static async existingClass(fileUTEntity: FileUTEntity, className: string): Promise<KataLanguageEntity> {
    //     return await db.connection.getRepository(KataLanguageEntity)
    //         .createQueryBuilder('classUT')
    //         .having('classUT.name = :name', { name: className })
    //         .innerJoinAndSelect('classUT.fileUT', 'fileUT')
    //         .where(`fileUT.id = ${fileUTEntity.id}`)
    //         .getOne();
    // }


    static async save(cwId: string): Promise<KataLanguageEntity> {
        return await new KataLanguageEntity(cwId).save();
    }


    // static getStatementUTs(classUTEntities: KataLanguageEntity[], filePath: string): StatementUT[] {
    //     const statementUTs: StatementUT[] = [];
    //     for (const classUTEntity of classUTEntities) {
    //         statementUTs.push(...MethodUtEntityService.getStatementUTs(classUTEntity.methodUTs, classUTEntity.name, filePath));
    //     }
    //     return statementUTs;
    // }
    //
    //
    // static async findClassUTEntity(className: string, filePath: string): Promise<KataLanguageEntity> {
    //     return await db.connection.getRepository(KataLanguageEntity)
    //         .createQueryBuilder('classUT')
    //         .leftJoinAndSelect('classUT.fileUT', 'fileUT')
    //         .leftJoinAndSelect('fileUT.systemUT', 'systemUT')
    //         .where(`classUT.name = '${className}'`)
    //         .andWhere('fileUT.path = :path', { path: filePath})
    //         .andWhere('systemUT.name = :name', { name: GLOBAL.appName })
    //         .getOne()
    // }

}
