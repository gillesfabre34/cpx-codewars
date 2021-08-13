import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { KataLanguageEntity } from './kata-language.entity';

@Entity()
export class SolutionEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => KataLanguageEntity, kle => kle.solutionEntities, { onDelete: 'CASCADE' })
    kataLanguageEntity: KataLanguageEntity;

    @Column('text')
    bestPractices: number;

    @Column('text')
    clever: number;

    @Column('text')
    code: string;

    @Column('text')
    cpx: number;

    constructor(code) {
        super();
        this.code = code;
    }

}
