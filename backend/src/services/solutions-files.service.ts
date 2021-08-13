import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { CONFIG } from '../const/config';
import { ensureDir, writeFile } from '../utils/file-system.util';
import { cleanHtml } from '../utils/html.util';
import { SolutionEntity } from '../entities/solution.entity';

export class SolutionsFilesService {

    static async createFiles(): Promise<void> {
        await ensureDir(`${CONFIG.root}/dist/solutions`);
        const kataLanguageEntities: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        for (const kle of kataLanguageEntities) {
            await this.createFilesByKataLanguage(kle);
        }
    }

    private static async createFilesByKataLanguage(kle: KataLanguageEntity): Promise<void> {
        for (const solutionEntity of kle.solutionEntities) {
            const path: string = `${kle.path}/${solutionEntity.id}.ts`;
            await writeFile(path, this.getCode(solutionEntity));
        }
    }

    private static getCode(solutionEntity: SolutionEntity): string {
        const appreciations: string = `// Best practices : ${solutionEntity.bestPractices} / Clever : ${solutionEntity.clever}\n\n`;
        const code: string = cleanHtml(solutionEntity.code);
        return `${appreciations}${code} \n`;
    }
}
