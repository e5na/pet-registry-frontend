
import { Species } from "./species.model";
import { Breed } from "./breed.model";
import { Microchip } from "./microchip.model";
import { User } from "./user.model";

export interface Pet {
    id: number;
    name: string;
    sex: string;
    birthDate: string;
    color: string;
    species: Species;
    breed: Breed;
    microchip: Microchip;
    owner: User;
    picture: string | null;
}

export interface CreatePetRequest {
    name: string;
    sex: string;
    birthDate: string;
    color: string;
    speciesId: number;
    breedId: number;
    microchipId?: number;
    ownerId?: number;
    picture?: string | null;
}

export interface UpdatePetRequest {
    name?: string;
    sex?: string;
    birthDate?: string;
    color?: string;
    speciesId?: number;
    breedId?: number;
    microchipId?: number;
    ownerId?: number;
    picture?: string | null;
}