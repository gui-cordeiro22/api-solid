// Dependencies
import { hash } from "bcryptjs";

// Types
import { RegisterServiceProps } from "./register.types";
import { UsersRepositoryProps } from "@/repositories/users-repositories.types";

// Utils
import { UserAlreadyExistsError } from "@/errors/user-already-exists";

export class RegisterService {
    constructor(private usersRepository: UsersRepositoryProps) {}

    async execute({ name, email, password }: RegisterServiceProps) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (!!userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        });
    }
}
