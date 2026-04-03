// Types
import { CheckInsRepositoryProps } from "@/repositories/check-ins-repository/check-ins-repository.types";
import {
    FetchCheckInsHistoryRequest,
    FetchCheckInsHistoryResponse,
} from "./fetch-member-check-ins-history.types";

// Utils
import { ResourceNotFoundError } from "@/errors/resource-not-found";

export class FetchCheckInsHistoryService {
    constructor(private checkinsRepository: CheckInsRepositoryProps) {}

    async execute({
        userId,
        page,
    }: FetchCheckInsHistoryRequest): Promise<FetchCheckInsHistoryResponse> {
        const checkIns = await this.checkinsRepository.findManyByUserId(
            userId,
            page,
        );

        if (!checkIns) {
            throw new ResourceNotFoundError();
        }

        return { checkIns };
    }
}
