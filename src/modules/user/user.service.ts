import { getManager } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

export default class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const repository = getManager().getRepository(User);
    const newUser = repository.create(createUserDto);

    await repository.save(newUser);

    return newUser;
  }
}
