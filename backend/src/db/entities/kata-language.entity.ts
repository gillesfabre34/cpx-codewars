import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class KataLanguageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(() => DeclarationEntity, declaration => declaration.classUT)
    // declaration: DeclarationEntity;
    //
    // @ManyToOne(() => FileUTEntity, fileUT => fileUT.classUTs, { onDelete: 'CASCADE' })
    // fileUT: FileUTEntity;
    //
    // @OneToMany(() => MethodUTEntity, methodUT => methodUT.classUT, { cascade: true })
    // methodUTs: MethodUTEntity[];

    @Column('text')
    completions: number;

    @Column('text')
    cwId: string;

    @Column('text')
    kyu: number;

    @Column('text')
    language: string;

    @Column('text')
    name: string;

    @Column('text')
    stars: number;

    constructor(cwId: string) {
        super();
        this.cwId = cwId;
    }

}
