import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  confirmPassword: number;
}
