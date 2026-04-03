// Dependencies
import { expect, describe, test, beforeEach, vi } from "vitest";

// Repository
import { InMemoryCheckInsRepository } from "@/repositories/in-memory-users-repository/in-memory-check-ins-repository";

// Service
import { FetchCheckInsHistoryService } from "./fetch-member-check-ins-history.services";

let checkInRepository: InMemoryCheckInsRepository;
let fetchCheckInsHistoryService: FetchCheckInsHistoryService;

describe("Fetch User Check-in History Service", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        fetchCheckInsHistoryService = new FetchCheckInsHistoryService(
            checkInRepository,
        );
    });

    test("should be able to fetch check-in history", async () => {
        await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        });

        await checkInRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        });

        const { checkIns } = await fetchCheckInsHistoryService.execute({
            userId: "user-01",
            page: 1,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym-01" }),
            expect.objectContaining({ gym_id: "gym-02" }),
        ]);
    });

    test("should be able to fetch paginated user check-in history", async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: "user-01",
            });
        }

        const { checkIns } = await fetchCheckInsHistoryService.execute({
            userId: "user-01",
            page: 2,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym-21" }),
            expect.objectContaining({ gym_id: "gym-22" }),
        ]);
    });
});
