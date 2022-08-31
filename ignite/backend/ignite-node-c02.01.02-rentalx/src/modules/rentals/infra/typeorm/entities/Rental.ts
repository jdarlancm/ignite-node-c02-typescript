import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4 } from "uuid";
import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Car } from "../../../../cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    car_id: string;

    @ManyToOne(() => Car)
    @JoinColumn({name: "car_id"})
    car: Car;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;
    
    @Column("timestamp", {default: "now()", nullable: true})
    start_date: Date;

    @Column("timestamp")
    end_date: Date;

    @Column("timestamp")
    expected_return_date: Date;

    @Column({nullable: true})
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
    
}

export { Rental }