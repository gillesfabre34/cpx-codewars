import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KataEntity } from './kata.entity';
import { CONFIG } from '../const/config';
import { SolutionEntity } from './solution.entity';

@Entity()
export class KataLanguageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => KataEntity, kata => kata.kataLanguageEntities, { onDelete: 'CASCADE' })
    kataEntity: KataEntity;

    @OneToMany(() => SolutionEntity, solution => solution.kataLanguageEntity, { cascade: true })
    solutions: SolutionEntity[];

    @Column('text')
    completions: number;

    @Column('text')
    language: string;

    @Column('text')
    testCases: string;

    constructor() {
        super();
        this.language = CONFIG.language;
    }

}
