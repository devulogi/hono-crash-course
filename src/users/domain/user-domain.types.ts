import { UUID } from "crypto";

<<<<<<< HEAD
type UserType = { id: UUID; name: string; email: string };

export { UserType };
=======
export enum UserRole {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  ADMIN = 'admin'
}

export type UserType = {
  id: UUID;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
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
>>>>>>> 5363109 (temp commit with current changes)
