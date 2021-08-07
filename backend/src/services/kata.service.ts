import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataEntity } from '../entities/kata.entity';
import { readFile, writeFile } from '../utils/file-system.util';
import { CONFIG } from '../const/config';
import { SolutionEntity } from '../entities/solution.entity';

const axios = require('axios').default;

@Injectable()
export class KataService {

    static async getKata(sendRequest: boolean): Promise<KataEntity> {
        console.log(chalk.yellowBright('GET KATA'), CONFIG.cwId);
        const html: string = await this.getHtml(sendRequest);
        // console.log(chalk.blueBright('CONTENTTTT'), html);
        return this.parseToKataEntity(html);
    }

    private static async getHtml(sendRequest: boolean): Promise<string> {
        const filePath = `${CONFIG.root}/backend/src/mocks/kata.html`;
        if (sendRequest) {
            const html: string = await axios.get(`https://www.codewars.com/kata/${CONFIG.cwId}/solutions/${CONFIG.language}`, {headers: {'cookie': CONFIG.cookie}})
                .then(response => {
                    return response?.data;
                });
            await writeFile(filePath, html);
        }
        return await readFile(filePath);
    }

    private static parseToKataEntity(html: string): KataEntity {
        const kataEntity = this.loadKata();
        const afterHeader: string = html.split('</header>')[1];
        const stats: string = afterHeader.split('Choose language...')[0];
        kataEntity.kyu = this.getKyu(stats);
        kataEntity.name = this.getName(stats);
        kataEntity.stars = this.getStars(stats);
        kataEntity.description = this.getDescription(afterHeader);
        const kle = new KataLanguageEntity();
        kle.solutions = this.getSolutions(html);
        kle.testCases = this.getTestCases(afterHeader);
        this.setCompletions(kataEntity, kle, stats);
        kataEntity.kataLanguageEntities.push(kle);
        console.log(chalk.magentaBright('KATA ENTITYYYYY'), kataEntity);
        // console.log(chalk.magentaBright('KATA ENTITYYYYY'), kataEntity.kataLanguageEntities.map(k => k.solutions));
        return kataEntity;
    }

    // TODO: load Kata from codewars if already exists
    private static loadKata(): KataEntity {
        return new KataEntity();
    }

    private static setCompletions(kataEntity: KataEntity, kle: KataLanguageEntity, text: string): void {
        const regex = /icon-moon-bullseye[\w\s\d-]+"><\/i>([\w\s\d,]+) <span class='opacity-75'>of<\/span> ([\w\s\d,]+)</;
        kle.completions = +text.match(regex)[1].replace(',', '.');
        kataEntity.completions = +text.match(regex)[2].replace(',', '.');
    }

    private static getDescription(text: string): string {
        return this.getFirstMatch(text, /description\\":\\"(.*)",\\"activeLanguage/);
    }

    private static getKyu(text: string): number {
        return +this.getFirstMatch(text, /span>(.) kyu/);
    }

    private static getName(text: string): string {
        return this.getFirstMatch(text, />([\w\s\d]+)<\/h4>/);
    }

    private static getSolutions(text: string): SolutionEntity[] {
        const solutionEntities: SolutionEntity[] = [];
        const solutionsList = text.split('solutions_list')[1];
        let htmlSplit: string[] = solutionsList.split(`<code data-language="${CONFIG.language}">`);
        htmlSplit = htmlSplit.filter(h => h.includes('Best Practices'));
        for (const html of htmlSplit) {
            const endOfCode: number = html.indexOf('</code>');
            const code = html.slice(0, endOfCode);
            const solutionEntity = new SolutionEntity(code);
            solutionEntity.bestPractices = +this.getFirstMatch(html, /Best Practices<span>(\d+)<\/span>/s);
            solutionEntity.clever = +this.getFirstMatch(html, /Clever<span>(\d+)<\/span>/s);
            solutionEntities.push(solutionEntity);
        }
        return solutionEntities;
    }

    private static getStars(text: string): number {
        return +this.getFirstMatch(text, /total_stars'>([\w\s\d]+)</);
    }

    private static getTestCases(text: string): string {
        const match: string = this.getFirstMatch(text, /Test Cases:<\/h5><pre class="p-2 overflow-x-auto">(.+)<\/pre.+Suggest/s);
        const codeTagLength: number = `<code data-language="${CONFIG.language}">`.length;
        return match.slice(codeTagLength, -7);
    }

    private static getFirstMatch(text: string, regex: RegExp): string {
        return text.match(regex) ? text.match(regex)[1] : undefined;
    }
}
