import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KataLanguageEntity } from './kata-language.entity';
import * as chalk from 'chalk';

@Entity()
export class KataEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(() => DeclarationEntity, declaration => declaration.classUT)
    // declaration: DeclarationEntity;
    //
    // @ManyToOne(() => FileUTEntity, fileUT => fileUT.classUTs, { onDelete: 'CASCADE' })
    // fileUT: FileUTEntity;

    @OneToMany(() => KataLanguageEntity, kataLanguage => kataLanguage.kataEntity, { cascade: true })
    kataLanguageEntities: KataLanguageEntity[];

    @Column('text')
    cwId: string;

    @Column('text')
    kyu: number;

    @Column('text')
    name: string;

    @Column('text')
    stars: number;

    constructor(cwId: string) {
        super();
        this.cwId = cwId;
        this.kataLanguageEntities = [];
    }

}