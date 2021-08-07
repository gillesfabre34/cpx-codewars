import { db } from '../const/db.const';
import { KataLanguageEntity } from '../entities/kata-language.entity';

export class KataLanguageEntityService {

    static async findKataLanguage(kataEntityId: number, language: string): Promise<KataLanguageEntity> {
        return await db.connection.getRepository(KataLanguageEntity)
            .createQueryBuilder('kle')
            .having('kle.language = :language', { language: language })
            .innerJoinAndSelect('kle.kataEntity', 'kataEntity')
            .where(`kataEntity.id = ${kataEntityId}`)
            .getOne();
    }
}
