import { db } from '../const/db.const';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataEntity } from '../entities/kata.entity';
import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';

export class SolutionsEntityService {

    static async findSolutions(): Promise<SolutionEntity[]> {
        console.log(chalk.blueBright('FIND SOLSSSS'));
        return await db.connection.getRepository(SolutionEntity)
            .createQueryBuilder('kle')
            .having('kle.language = :language', { language: language })
            .innerJoinAndSelect('kle.kataEntity', 'kataEntity')
            .where(`kataEntity.id = ${kataEntityId}`)
            .getOne();
    }
}
