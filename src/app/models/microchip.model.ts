
export interface Microchip {
    id: number;
    chipNumber: number;
    supplier: string;
    inUse: boolean;
}

export interface CreateMicrochipRequest {
    chipNumber: number;
    supplier: string;
}

export interface UpdateMicrochipRequest {
    chipNumber?: number;
    supplier?: string;
    inUse?: boolean;
}