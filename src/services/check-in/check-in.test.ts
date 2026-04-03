// Dependencies
import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";

// Repository
import { InMemoryCheckInsRepository } from "@/repositories/in-memory-users-repository/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory-users-repository/in-memory-gyms-repository";

// Service
import { CheckInService } from "./check-in.services";

// Utils
import { MaxNumberOfCheckInsError } from "@/errors/max-number-of-check-ins";
import { MaxDistanceError } from "@/errors/max-distance";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe("Check-in Service", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        checkInService = new CheckInService(checkInRepository, gymsRepository);

        await gymsRepository.create({
            id: "gym-01",
            title: "JavaScript Gym",
            description: null,
            phone: null,
            latitude: -22.4682375,
            longitude: -43.1456466,
        });

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
            userLatitude: -22.4682375,
            userLongitude: -43.1456466,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    test("shouldn't be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -22.4682375,
            userLongitude: -43.1456466,
        });

        await expect(() =>
            checkInService.execute({
                userId: "user-01",
                gymId: "gym-01",
                userLatitude: -22.4682375,
                userLongitude: -43.1456466,
            }),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    test("should be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -22.4682375,
            userLongitude: -43.1456466,
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await checkInService.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -22.4682375,
            userLongitude: -43.1456466,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    test("shouldn't be able to check in on distant gym", async () => {
        await gymsRepository.create({
            id: "gym-02",
            title: "NodeJs Gym",
            description: null,
            phone: null,
            latitude: -22.4482152,
            longitude: -43.1440784,
        });

        await expect(() =>
            checkInService.execute({
                userId: "user-01",
                gymId: "gym-02",
                userLatitude: -22.4682375,
                userLongitude: -43.1456466,
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError);
    });
});
