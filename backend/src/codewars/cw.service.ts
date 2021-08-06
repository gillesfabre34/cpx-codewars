import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable()
export class CWService {

    static getKata(id: string): void {
        console.log(chalk.yellowBright('GET KATA'), id);
        const axios = require('axios').default;
        axios.get('https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/solutions')
            .then(response => {
                console.log(chalk.magentaBright('HTML KATA'), response);
            })
    }
}
