import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import { KataLanguageEntity } from '../db/entities/kata-language.entity';
import { KataEntity } from '../db/entities/kata.entity';

const axios = require('axios').default;

@Injectable()
export class CWService {

    static async getKata(cwId: string, language: string): Promise<KataEntity> {
        console.log(chalk.yellowBright('GET KATA'), cwId);
        const html: string = await this.getHtml(cwId, language);
        return this.parseToKataEntity(cwId, language, html);
    }

    private static getHtml(cwId: string, language: string): Promise<string> {
        return axios.get(`https://www.codewars.com/kata/${cwId}/solutions/${language}`)
            .then(response => {
                return response?.data;
            });
    }

    private static parseToKataEntity(cwId: string, language: string, html: string): KataEntity {
        const kataEntity = this.loadKata(cwId);
        const afterHeader: string = html.split('</header>')[1];
        const stats: string = afterHeader.split('Choose language...')[0];
        kataEntity.kyu = this.getKyu(stats);
        kataEntity.name = this.getName(stats);
        kataEntity.stars = this.getStars(stats);
        kataEntity.description = this.getDescription(afterHeader);
        const kle = new KataLanguageEntity(language);
        this.setCompletions(kataEntity, kle, stats);
        kataEntity.kataLanguageEntities.push(kle);
        console.log(chalk.magentaBright('KATA ENTITYYYYY'), kataEntity);
        return kataEntity;
    }

    // TODO: load Kata from db if already exists
    private static loadKata(cwId: string): KataEntity {
        return new KataEntity(cwId);
    }

    private static setCompletions(kataEntity: KataEntity, kle: KataLanguageEntity, text: string): void {
        const regex = /icon-moon-bullseye[\w\s\d-]+"><\/i>([\w\s\d,]+) <span class='opacity-75'>of<\/span> ([\w\s\d,]+)</;
        kle.completions = +text.match(regex)[1].replace(',', '.');
        kataEntity.completions = +text.match(regex)[2].replace(',', '.');
    }

    private static getDescription(text: string): string {
        const regex = /description\\":\\"(.*)",\\"activeLanguage/;
        return text.match(regex)[1];
    }

    private static getKyu(text: string): number {
        const regex = /span>(.) kyu/;
        return +text.match(regex)[1];
    }

    private static getName(text: string): string {
        const regex = />([\w\s\d]+)<\/h4>/;
        return text.match(regex)[1];
    }

    private static getStars(text: string): number {
        const regex = /total_stars'>([\w\s\d]+)</;
        return +text.match(regex)[1];
    }
}
