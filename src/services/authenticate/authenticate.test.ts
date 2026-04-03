// Dependencies
import { expect, describe, test } from "vitest";
import { hash } from "bcryptjs";

// Service
import { AuthenticateService } from "./authenticate.services";

// Repository
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

// Utils
import { InvalidCredentialsError } from "@/errors/invalid-credentials";

describe("Authenticate Service", () => {
    test("should be able to authenticate user", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateService = new AuthenticateService(usersRepository);

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@test.com",
            password_hash: await hash("123456", 6),
        });

        const { user } = await authenticateService.execute({
            email: "johndoe@test.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    test("shouldn't be able to authenticate user with wrong email", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateService = new AuthenticateService(usersRepository);

        expect(() =>
            authenticateService.execute({
                email: "johndoe@test.com",
                password: "123456",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    test("shouldn't be able to authenticate user with wrong password", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateService = new AuthenticateService(usersRepository);

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@test.com",
            password_hash: await hash("123456", 6),
        });

        expect(() =>
            authenticateService.execute({
                email: "johndoe@test.com",
                password: "123123",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
