import { User } from "../../domain/entities/user.entity";
import { CreateUserData, UserRole } from "../../domain/user-domain.types";
import { UserRepositoryPort } from "../ports/user.repository.port";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(userData: CreateUserData): Promise<User> {
    const { name, email, password, role = UserRole.CUSTOMER } = userData;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password (simplified - should use proper hashing)
    const password_hash = await this.hashPassword(password);

    // Create user
    const user = new User(name, email, password_hash, role);

    // Save user
    await this.userRepository.save(user);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    // TODO: Implement proper password hashing (bcrypt)
    return `hashed_${password}`;
  }
}