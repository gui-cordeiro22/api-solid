// Dependencies
import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";

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

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("should be able to check in", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        const { checkIn } = await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    test("shouldn't be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
        });

        await expect(() =>
            checkInService.execute({
                userId: "user-01",
                gymId: "gym-01",
            }),
        ).rejects.toBeInstanceOf(Error);
    });

    test("should be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
