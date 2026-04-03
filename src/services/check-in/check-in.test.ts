// Dependencies
import { expect, describe, test, beforeEach } from "vitest";

// Service
import { CheckInService } from "./check-in.services";

// Repository
import { InMemoryCheckInsRepository } from "@/repositories/in-memory-users-repository/in-memory-check-ins-repository";

let checkInRepository: InMemoryCheckInsRepository;
let checkInService: CheckInService;

describe("Check-in Service", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        checkInService = new CheckInService(checkInRepository);
    });

    test("should be able to check in", async () => {
        const { checkIn } = await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
