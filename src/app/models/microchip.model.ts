export interface Microchip {
  id: number;
  microchipNumber: string;
  supplier: string;
  inUse: boolean;
}

export interface CreateMicrochipRequest {
  microchipNumber: string;
  supplier: string;
}

export interface UpdateMicrochipRequest {
  microchipNumber?: string;
  supplier?: string;
  inUse?: boolean;
}
