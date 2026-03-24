import { Role } from './role.model';

export interface User {
  id: number;
  personalCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  roles: Role[];
}

export interface CreateUserRequest {
  personalCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ownerProfile: {
    address: string;
  };
}

export interface UpdateUserRequest {
  personalCode?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}
