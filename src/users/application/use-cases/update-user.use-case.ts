import { UUID } from "crypto";
import { User } from "../../domain/entities/user.entity";
import { UpdateUserData, UserRole } from "../../domain/user-domain.types";
import { UserRepositoryPort } from "../ports/user.repository.port";
import { UserAggregate } from "../../domain/aggregates/user.aggregate";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(userId: UUID, updateData: UpdateUserData, requestingUserRole: UserRole): Promise<User> {
    // Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const userAggregate = new UserAggregate(user);

    // Update profile data
    if (updateData.name || updateData.email) {
      userAggregate.updateProfile(updateData.name, updateData.email);
    }

    // Update role if provided
    if (updateData.role) {
      userAggregate.changeRole(updateData.role, requestingUserRole);
    }

    // Save updated user
    await this.userRepository.update(user);

    return user;
  }
}