// Dependencies
import { expect, describe, test, beforeEach } from "vitest";

// Repository
import { InMemoryGymsRepository } from "@/repositories/in-memory-users-repository/in-memory-gyms-repository";

// Service
import { CreateGymService } from "./create-gym.services";

let gymsRepository: InMemoryGymsRepository;
let createGymService: CreateGymService;

describe("Register Service", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        createGymService = new CreateGymService(gymsRepository);
    });

    test("should be able to create gym", async () => {
        const { gym } = await createGymService.execute({
            title: "JavaScript Gym",
            description: null,
            phone: null,
            latitude: -22.4482152,
            longitude: -43.1440784,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
