// Types
import { CheckInsRepositoryProps } from "@/repositories/check-ins-repository/check-ins-repository.types";
import { CheckInRequest, CheckInResponse } from "./check-in.types";
import { GymsRepositoryProps } from "@/repositories/gym-repository/gym-repository.types";

// Utils
import { ResourceNotFoundError } from "@/errors/resource-not-found";
import { MaxNumberOfCheckInsError } from "@/errors/max-number-of-check-ins";
import { MaxDistanceError } from "@/errors/max-distance";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class CheckInService {
    constructor(
        private checkinsRepository: CheckInsRepositoryProps,
        private gymsRepository: GymsRepositoryProps,
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInRequest): Promise<CheckInResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude,
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            },
        );

        const MAX_DISTANCE_IN_KILOMETERS = 0.1;

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDay =
            await this.checkinsRepository.findByUserIdOnData(
                userId,
                new Date(),
            );

        if (!!checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError();
        }

        const checkIn = await this.checkinsRepository.create({
            user_id: userId,
            gym_id: gymId,
        });

        return { checkIn };
    }
}
