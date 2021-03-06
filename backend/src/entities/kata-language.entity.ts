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
    solutionEntities: SolutionEntity[];

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
        const folderName: string = this.kataEntity.name.toLowerCase()
            .replace(/\s/g, '-');
        return `${CONFIG.root}/dist/solutions/${folderName}`;
    }

}
