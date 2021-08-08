import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KataEntity } from './kata.entity';
import { CONFIG } from '../const/config';
import { SolutionEntity } from './solution.entity';
import * as chalk from 'chalk';

@Entity()
export class KataLanguageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => KataEntity, kata => kata.kataLanguageEntities, { onDelete: 'CASCADE' })
    kataEntity: KataEntity;

    @OneToMany(() => SolutionEntity, solution => solution.kataLanguageEntity, { cascade: true })
    solutions: SolutionEntity[];

    @Column('text')
    completions: string;

    @Column('text')
    language: string;

    @Column('text')
    testCases: string;

    constructor() {
        super();
        this.language = CONFIG.language;
    }

    get path(): string {
        console.log(chalk.blueBright('this.kataEntityyyy'), this.kataEntity);
        const fileName: string = this.kataEntity.name.toLowerCase()
            .replace(' ', '-');
        return `${CONFIG.root}/dist/solutions/${fileName}`;
    }

}
