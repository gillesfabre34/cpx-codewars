import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import { KataLanguageEntity } from '../db/entities/kata-language.entity';

const axios = require('axios').default;

@Injectable()
export class CWService {

    static async getKata(cwId: string): Promise<KataLanguageEntity> {
        console.log(chalk.yellowBright('GET KATA'), cwId);
        const html: string = await this.getHtml(cwId);
        return this.parseToKataEntity(cwId, html);
    }

    private static getHtml(cwId: string): Promise<string> {
        return axios.get(`https://www.codewars.com/kata/${cwId}/solutions`)
            .then(response => {
                return response?.data;
            });
    }

    private static parseToKataEntity(cwId: string, html: string): KataLanguageEntity {
        const kataEntity = new KataLanguageEntity(cwId);
        const afterHeader: string = html.split('</header>')[1];
        const kataStats: string = afterHeader.split('Choose language...')[0];
        // console.log(chalk.cyanBright('AFTER HEADER....'), kataStats);
        kataEntity.kyu = this.getKyu(kataStats);
        console.log(chalk.magentaBright('KATA ENTITYYYYY'), kataEntity);
        return kataEntity;
    }

    private static getKyu(text: string): number {
        const kyuRegex = /span>(.)+ kyu/;
        return +text.match(kyuRegex)[1];
    }
}
