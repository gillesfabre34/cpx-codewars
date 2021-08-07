import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { KataEntity } from '../entities/kata.entity';
import { readFile, removeFile, writeFile } from '../utils/file-system.util';
import { CONFIG } from '../const/config';

const axios = require('axios').default;

@Injectable()
export class KataService {

    static async getKata(): Promise<KataEntity> {
        console.log(chalk.yellowBright('GET KATA'), CONFIG.cwId);
        const html: string = await this.getHtml();
        await this.writeKataFile(html);
        const zzz = html.split('TEST CASES');
        console.log(chalk.blueBright('ZZZZZ'), zzz.length);
        return this.parseToKataEntity(html);
    }

    private static async writeKataFile(text: string): Promise<void> {
        const folderPath = `${CONFIG.root}/backend/src/mocks`;
        const filePath = `${folderPath}/kata.html`;
        await writeFile(filePath, text);
    }

    private static getHtml(): Promise<string> {
        return axios.get(`https://www.codewars.com/kata/${CONFIG.cwId}/solutions/${CONFIG.language}`)
            .then(response => {
                return response?.data;
            });
    }

    private static parseToKataEntity(html: string): KataEntity {
        const kataEntity = this.loadKata();
        const afterHeader: string = html.split('</header>')[1];
        const stats: string = afterHeader.split('Choose language...')[0];
        kataEntity.kyu = this.getKyu(stats);
        kataEntity.name = this.getName(stats);
        kataEntity.stars = this.getStars(stats);
        kataEntity.description = this.getDescription(afterHeader);
        // kataEntity.testCases = this.getTestCases(afterHeader);
        const kle = new KataLanguageEntity();
        this.setCompletions(kataEntity, kle, stats);
        kataEntity.kataLanguageEntities.push(kle);
        // console.log(chalk.magentaBright('KATA ENTITYYYYY'), kataEntity);
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

    private static getStars(text: string): number {
        return +this.getFirstMatch(text, /total_stars'>([\w\s\d]+)</);
    }

    private static getTestCases(text: string): string {
        return this.getFirstMatch(text, /Test Cases/);
        // return this.getFirstMatch(text, /Test Cases:<\/h5><pre class="p-2 overflow-x-auto">(.+)<\/pre/s);
    }

    private static getFirstMatch(text: string, regex: RegExp): string {
        const zzz = text.match(regex);
        // console.log(chalk.magentaBright('REGEXXXXX'), text);
        // console.log(chalk.magentaBright('REGEXXXXX'), regex);
        // console.log(chalk.magentaBright('KATA ZZZZ'), zzz);
        return text.match(regex)[1];
    }
}
