import { db } from '../const/db.const';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import * as chalk from 'chalk';

export class KataLanguageEntityService {

    static async findKataLanguage(kataEntityId: number, language: string): Promise<KataLanguageEntity> {
        return await db.connection.getRepository(KataLanguageEntity)
            .createQueryBuilder('kle')
            .having('kle.language = :language', { language: language })
            .innerJoinAndSelect('kle.kataEntity', 'kataEntity')
            .where(`kataEntity.id = ${kataEntityId}`)
            .getOne();
    }

    static async findAllKataLanguage(language: string): Promise<KataLanguageEntity[]> {
        console.log(chalk.blueBright('NAMEEEEE kataEntityId'), language);
        const zzz = await db.connection.getRepository(KataLanguageEntity)
            .find( { language: language })
        console.log(chalk.blueBright('NAMEEEEE zzzzz'), zzz);
        return zzz
    }
}
