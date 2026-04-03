// Utils
import { ResourceNotFoundError } from "@/errors/resource-not-found";

// Types
import { UsersRepositoryProps } from "@/repositories/users-repositories.types";
import {
    GetUserProfileServiceRequest,
    GetUserProfileServiceResponse,
} from "./get-user-profile.types";

export class GetUserProfileService {
    constructor(private usersRepository: UsersRepositoryProps) {}

    async execute({
        userId,
    }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}
