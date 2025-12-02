import { UUID } from "crypto";
import { User } from "../../domain/entities/user.entity";
import { UserRole } from "../../domain/user-domain.types";

export interface UserRepositoryPort {
  save(user: User): Promise<void>;
  findById(id: UUID): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByRole(role: UserRole): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: UUID): Promise<void>;
  exists(email: string): Promise<boolean>;
}