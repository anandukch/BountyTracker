import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class Task extends AbstractEntity {
    // TODO
}

export default Task;
