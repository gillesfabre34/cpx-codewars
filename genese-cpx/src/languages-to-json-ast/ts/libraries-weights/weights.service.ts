import { Weights } from './weights.interface';
import * as chalk from 'chalk';

/**
 * Manages the custom Node weights added with libraries-weights Json files
 */
export class WeightsService {

    /**
     * Merges the libraries-weights Json files
     */
    static merge(): Weights {
        try {
            console.log(chalk.blueBright('WILLLL REQUIRE INDEX'));
            const index = require('./index.json');
            console.log(chalk.blueBright(' REQUIREDDDD INDEX'));
            const weights: Weights = {};
            for (const library of Object.keys(index)) {
                console.log(chalk.blueBright('LIBRARYYYY'), library);
                weights[library] = require(index[library]);
            }
            return weights;
        } catch (err) {
            throw Error('Error merging libraries-weights : please verify paths in index.json and libraries-weights Json format');
        }
    }


    /**
     * Returns the names of the methods included in the libraries-weights Json files
     */
    static weightedMethods(): string[] {
        return [];
        // let methods: string[] = [];
        // for (const library of Object.keys(WEIGHTS)) {
        //     methods = methods.concat(Object.keys(WEIGHTS[library]));
        // }
        // return methods;
    }

}
