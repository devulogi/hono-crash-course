import { User } from "../../domain/entities/user.entity";
import { UserRepositoryPort } from "../ports/user.repository.port";

export interface LoginCredentials {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    const { email, password } = credentials;

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.getPasswordHash());
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    // TODO: Implement proper password verification (bcrypt)
    return hash === `hashed_${password}`;
  }
}