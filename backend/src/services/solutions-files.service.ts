import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { CONFIG } from '../const/config';
import * as chalk from 'chalk';
import { ensureDir, existsSync, writeFile } from '../utils/file-system.util';
import { cleanHtml } from '../utils/html.util';

export class SolutionsFilesService {

    static async createFiles(): Promise<void> {
        await ensureDir(`${CONFIG.root}/dist/solutions`);
        const kataLanguageEntities: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        console.log(chalk.magentaBright('KLE LGTHHHH'), kataLanguageEntities?.length);
        for (const kle of kataLanguageEntities) {
            console.log(chalk.magentaBright('KLE IDDDD'), kle.path);
            console.log(chalk.cyanBright('KLE SOLSSSS'), kle.solutionEntities.length);

            // console.log(chalk.magentaBright('KLE CODDDDD'), this.getOutsideNodes(kle));
            await writeFile(kle.path, this.getCode(kle));
            // if (!existsSync(kle.path)) {
            //     await this.createFile(kle);
            // }
        }
    }

    static async createFile(kle: KataLanguageEntity): Promise<void> {
        console.log(chalk.cyanBright('KLE IDDDD'), kle.id);

    }

    static getCode(kle: KataLanguageEntity): string {
        const code: string = kle.solutionEntities.map(s => cleanHtml(s.code)).join('\n\n');
        return `${code} \n`;
    }
}
