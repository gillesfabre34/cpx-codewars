import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { CONFIG } from '../const/config';
import * as chalk from 'chalk';
import { ensureDir, existsSync } from '../utils/file-system.util';

export class SolutionsFilesService {

    static async createFiles(): Promise<void> {
        await ensureDir(`${CONFIG.root}/dist/solutions`);
        const kataLanguageEntities: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        console.log(chalk.magentaBright('KLE LGTHHHH'), kataLanguageEntities?.length);
        for (const kle of kataLanguageEntities) {
            console.log(chalk.magentaBright('KLE IDDDD'), kle.path);
            if (!existsSync(kle.path)) {
                await this.createFile(kle);
            }
        }
    }

    static async createFile(kle: KataLanguageEntity): Promise<void> {
        console.log(chalk.cyanBright('KLE IDDDD'), kle.id);

    }
}
