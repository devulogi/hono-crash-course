import { UUID } from "crypto";
import { User } from "../../domain/entities/user.entity";
import { UserRole } from "../../domain/user-domain.types";
import { UserRepositoryPort } from "../../application/ports/user.repository.port";

export class UserRepository implements UserRepositoryPort {
  private users: Map<UUID, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  async findById(id: UUID): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail() === email) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.getRole() === role);
  }

  async update(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  async delete(id: UUID): Promise<void> {
    this.users.delete(id);
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}