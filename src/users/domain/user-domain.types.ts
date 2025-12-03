import { UUID } from "crypto";

export enum UserRole {
  USER = 'user',
  STAFF = 'staff',
  ADMIN = 'admin'
}

export type UserType = { 
  id: UUID; 
  name: string; 
  email: string;
  role: UserRole;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type UpdateUserData = {
  name?: string;
  email?: string;
  role?: UserRole;
};
