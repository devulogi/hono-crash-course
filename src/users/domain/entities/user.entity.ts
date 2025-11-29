import { randomUUID, UUID } from "crypto";

import { UserType } from "../user-domain.types";

class User {
    private readonly id: UUID;
    constructor(
        private name: string,
        private email: string,
    ) {
        this.id = randomUUID();
        this.name = name;
        this.email = email;
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
        };
    }
}

export default User;
