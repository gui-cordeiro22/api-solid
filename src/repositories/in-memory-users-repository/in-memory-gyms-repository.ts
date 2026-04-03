// Types
import { Gym } from "@prisma/client";
import { GymsRepositoryProps } from "../gym-repository/gym-repository.types";

export class InMemoryGymsRepository implements GymsRepositoryProps {
    public items: Gym[] = [];

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }
}
