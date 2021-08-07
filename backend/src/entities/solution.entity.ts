import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { KataLanguageEntity } from './kata-language.entity';

@Entity()
export class SolutionEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => KataLanguageEntity, kle => kle.solutions, { onDelete: 'CASCADE' })
    kataLanguageEntity: KataLanguageEntity;

    @Column('text')
    bestPractices: number;

    @Column('text')
    clever: number;

    @Column('text')
    code: string;

    constructor(code) {
        super();
        this.code = code;
    }

}
