// Types
import {
    CreateGymServiceRequest,
    CreateGymServiceResponse,
} from "./create-gym.types";
import { GymsRepositoryProps } from "@/repositories/gym-repository/gym-repository.types";

// Utils
import { ResourceNotFoundError } from "@/errors/resource-not-found";

export class CreateGymService {
    constructor(private gymsRepository: GymsRepositoryProps) {}

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        });

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        return {
            gym,
        };
    }
}
