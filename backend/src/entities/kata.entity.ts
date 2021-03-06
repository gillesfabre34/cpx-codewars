import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KataLanguageEntity } from './kata-language.entity';
import { CONFIG } from '../const/config';

@Entity()
export class KataEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(() => DeclarationEntity, declaration => declaration.classUT)
    // declaration: DeclarationEntity;

    @OneToMany(() => KataLanguageEntity, kataLanguage => kataLanguage.kataEntity, { cascade: true })
    kataLanguageEntities: KataLanguageEntity[];

    @Column('text')
    completions: string;

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
    }

}
