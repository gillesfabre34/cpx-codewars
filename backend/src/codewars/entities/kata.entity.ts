import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KataLanguageEntity } from './kata-language.entity';
import * as chalk from 'chalk';
import { CONFIG } from '../const/config';

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
    completions: number;

    @Column('text')
    cwId: string;

    @Column('text')
    description: string;

    @Column('text')
    kyu: number;

    @Column('text')
    name: string;

    @Column('text')
    stars: number;

    constructor() {
        super();
        this.cwId = CONFIG.cwId;
        this.kataLanguageEntities = [];
    }

}
