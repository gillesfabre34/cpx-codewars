import { SolutionEntity } from '../entities/solution.entity';
import { getManager } from 'typeorm';

export class SolutionsEntityService {

    static async findAllSolutions(): Promise<SolutionEntity[]> {
        return await getManager().find(SolutionEntity);
    }

}
