import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { KataEntity } from './kata.entity';

@Entity()
export class KataLanguageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(() => DeclarationEntity, declaration => declaration.classUT)
    // declaration: DeclarationEntity;

    @ManyToOne(() => KataEntity, kata => kata.kataLanguageEntities, { onDelete: 'CASCADE' })
    kataEntity: KataEntity;

    // @OneToMany(() => MethodUTEntity, methodUT => methodUT.classUT, { cascade: true })
    // methodUTs: MethodUTEntity[];

    @Column('text')
    completions: number;

    @Column('text')
    language: string;

    constructor(language: string) {
        super();
        this.language = language;
    }

}
