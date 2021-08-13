import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { getManager } from 'typeorm';

export class SolutionsEntityService {

    static async findAllSolutions(language: string): Promise<SolutionEntity[]> {
        console.log(chalk.blueBright('FIND SOLSSSS'));
        return await getManager().find(SolutionEntity);
    }
}
