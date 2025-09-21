import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    vehicleType!: string;

    @Column()
    brand!: string;

    @Column()
    modelName!: string;

    @Column({ nullable: true })
    color?: string;

    @Column({ nullable: true })
    engineSize?: string;

    @Column({ type: "int", nullable: true })
    year?: number;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    price!: number;

    @Column({ type: "simple-json", nullable: true })
    images?: string[];

    @Column({ type: "text", nullable: true })
    aiDescription?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
