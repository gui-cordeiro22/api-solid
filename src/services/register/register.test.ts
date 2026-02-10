// Dependencies
import { compare } from "bcryptjs";
import { expect, describe, test } from "vitest";

// Repository
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

// Service
import { RegisterService } from "./register.services";

// Utils
import { UserAlreadyExistsError } from "@/errors/user-already-exists";

describe("Register Service", () => {
    test("should hash user password upon registration", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(usersRepository);

        const { user } = await registerService.execute({
            name: "John Doe",
            email: "johndoe@test.com",
            password: "123456",
        });

        const isPasswordCorrectlyHashed = await compare(
            "123456",
            user.password_hash,
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    test("should not be able to register user with same email twice", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(usersRepository);

        const email = "johndoe@test.com";

        await registerService.execute({
            name: "John Doe",
            email,
            password: "123456",
        });

        await expect(
            registerService.execute({
                name: "John Doe",
                email,
                password: "123456",
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });

    test("should be able to register", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(usersRepository);

        const { user } = await registerService.execute({
            name: "John Doe",
            email: "johndoe@test.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });
});
