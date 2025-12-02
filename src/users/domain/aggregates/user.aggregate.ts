import { User } from "../entities/user.entity";
import { UserRole } from "../user-domain.types";

export class UserAggregate {
  constructor(private user: User) {}

  getUser(): User {
    return this.user;
  }

  changeRole(newRole: UserRole, requestingUserRole: UserRole): void {
    if (requestingUserRole !== UserRole.ADMIN) {
      throw new Error('Only admins can change user roles');
    }
    this.user.setRole(newRole);
  }

  updateProfile(name?: string, email?: string): void {
    if (name) {
      this.user.setName(name);
    }
    if (email) {
      this.user.setEmail(email);
    }
  }

  canManageTrips(): boolean {
    return this.user.isStaff();
  }

  canManageUsers(): boolean {
    return this.user.isAdmin();
  }
}