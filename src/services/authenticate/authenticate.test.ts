// Dependencies
import { expect, describe, test, beforeEach } from "vitest";
import { hash } from "bcryptjs";

// Service
import { AuthenticateService } from "./authenticate.services";

// Repository
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

// Utils
import { InvalidCredentialsError } from "@/errors/invalid-credentials";

let usersRepository: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe("Authenticate Service", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        authenticateService = new AuthenticateService(usersRepository);
    });

    test("should be able to authenticate user", async () => {
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
        await expect(() =>
            authenticateService.execute({
                email: "johndoe@test.com",
                password: "123456",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    test("shouldn't be able to authenticate user with wrong password", async () => {
        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@test.com",
            password_hash: await hash("123456", 6),
        });

        await expect(() =>
            authenticateService.execute({
                email: "johndoe@test.com",
                password: "123123",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
