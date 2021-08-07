import { db } from '../const/db.const';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataEntity } from '../entities/kata.entity';
import * as chalk from 'chalk';

export class KataLanguageEntityService {

    static async getKataLanguage(kataEntity: KataEntity, language: string): Promise<KataLanguageEntity> {
        console.log(chalk.blueBright('NAMEEEEE'), kataEntity.name);
        return await db.connection.getRepository(KataLanguageEntity)
            .createQueryBuilder('kle')
            .having('kle.language = :language', { language: language })
            .innerJoinAndSelect('kle.kataEntity', 'kataEntity')
            .where(`kataEntity.name = "${kataEntity.name}"`)
            .getOne();
    }
}
