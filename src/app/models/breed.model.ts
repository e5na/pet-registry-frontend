
import { Species } from "./species.model";

export interface Breed {
    id: number;
    name: string;
    species: Species;
}

export interface CreateBreedRequest {
    name: string;
    speciesId: number;
}

export interface UpdateBreedRequest {
    name?: string,
    speciesId?: number;
}