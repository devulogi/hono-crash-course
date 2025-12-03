import { randomUUID, UUID } from "crypto";

import { UserType, UserRole } from "../user-domain.types";

export class User {
  private readonly id: UUID;
  private role: UserRole;
  
  constructor(
    private name: string,
    private email: string,
    role: UserRole = UserRole.USER
  ) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.role = role;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getId(): UUID {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): UserRole {
    return this.role;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isStaff(): boolean {
    return this.role === UserRole.STAFF || this.role === UserRole.ADMIN;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email address");
    }
    this.email = email;
  }

  toJSON(): UserType {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}

export default User;
