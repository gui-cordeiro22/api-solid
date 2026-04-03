// Dependencies
import { expect, describe, test, beforeEach } from "vitest";
import { hash } from "bcryptjs";

// Service
import { GetUserProfileService } from "./get-user-profile.services";

// Repository
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

// Utils
import { ResourceNotFoundError } from "@/errors/resource-not-found";

let usersRepository: InMemoryUsersRepository;
let authenticateService: GetUserProfileService;

describe("Get User Profile Service", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        authenticateService = new GetUserProfileService(usersRepository);
    });

    test("should be able to get user profile", async () => {
        const createdUser = await usersRepository.create({
            name: "John Doe",
            email: "johndoe@test.com",
            password_hash: await hash("123456", 6),
        });

        const { user } = await authenticateService.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual("John Doe");
    });

    test("shouldn't be able to get user profile with wrong id", async () => {
        expect(() =>
            authenticateService.execute({
                userId: "non-existing-id",
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
