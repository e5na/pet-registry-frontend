
export enum RoleEnum {
    OWNER = "OWNER",
    VET = "VET",
    ADMIN = "ADMIN"
}

export interface Role {
    id: number;
    name: RoleEnum;
}

// No create/update - OWNER assigned by default, ADMIN manages role elevation