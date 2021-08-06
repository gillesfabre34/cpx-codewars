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
        const kataStats: string = afterHeader.split('Choose language...')[0];
        kataEntity.kyu = this.getKyu(kataStats);
        kataEntity.name = this.getName(kataStats);
        kataEntity.stars = this.getStars(kataStats);
        const kle = new KataLanguageEntity(language);
        kle.completions = this.getCompletions(kataStats);
        kataEntity.kataLanguageEntities.push(kle);
        console.log(chalk.magentaBright('KATA ENTITYYYYY'), kataEntity);
        return kataEntity;
    }

    // TODO: load Kata from db if already exists
    private static loadKata(cwId: string): KataEntity {
        return new KataEntity(cwId);
    }

    private static getCompletions(text: string): number {
        const regex = /icon-moon-bullseye[\w\s\d-]+"><\/i>([\w\s\d,]+) </;
        return +text.match(regex)[1].replace(',', '.');
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
