// Dependencies
import { compare } from "bcryptjs";

// Error
import { InvalidCredentialsError } from "@/errors/invalid-credentials";

// Types
import { UsersRepositoryProps } from "@/repositories/users-repositories.types";
import {
    AuthenticateRequest,
    AuthenticateResponse,
} from "./authenticate.types";

export class AuthenticateService {
    constructor(private usersRepository: UsersRepositoryProps) {}

    async execute({
        email,
        password,
    }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
