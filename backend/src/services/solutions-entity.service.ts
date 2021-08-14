import { SolutionEntity } from '../entities/solution.entity';
import { getManager } from 'typeorm';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import * as chalk from 'chalk';
import { db } from '../const/db.const';

export class SolutionsEntityService {

    static async findAllSolutions(): Promise<SolutionEntity[]> {
        return await getManager().find(SolutionEntity);
    }
    //
    // static async findAllSolutionEntitiesByKle(): Promise<KataLanguageEntity[]> {
    //     console.log(chalk.blueBright('findAllSolutionEntitiesByKleeeee'));
    //     return await db.connection.getRepository(KataLanguageEntity)
    //         .createQueryBuilder('kle')
    //         .having('kle.language = :language', { language: language })
    //         .innerJoinAndSelect('kle.kataEntity', 'kataEntity')
    //         .innerJoinAndSelect('kle.solutionEntities', 'solutionEntities')
    //         .getMany();
    // }
}
