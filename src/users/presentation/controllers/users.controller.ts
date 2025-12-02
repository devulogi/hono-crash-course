import { Context } from "hono";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.use-case";
import { LoginUserUseCase } from "../../application/use-cases/login-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/update-user.use-case";
import { UserRepositoryPort } from "../../application/ports/user.repository.port";
import { CreateUserData, UpdateUserData, UserRole } from "../../domain/user-domain.types";

export class UsersController {
  constructor(private userRepository: UserRepositoryPort) {}

  async register(c: Context) {
    try {
      const userData: CreateUserData = await c.req.json();
      const registerUseCase = new RegisterUserUseCase(this.userRepository);
      const user = await registerUseCase.execute(userData);
      
      return c.json({ 
        success: true, 
        data: user.toJSON() 
      }, 201);
    } catch (error) {
      return c.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }, 400);
    }
  }

  async login(c: Context) {
    try {
      const credentials = await c.req.json();
      const loginUseCase = new LoginUserUseCase(this.userRepository);
      const user = await loginUseCase.execute(credentials);
      
      // TODO: Generate JWT token
      return c.json({ 
        success: true, 
        data: { 
          user: user.toJSON(),
          token: 'jwt_token_here'
        } 
      });
    } catch (error) {
      return c.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }, 401);
    }
  }

  async updateUser(c: Context) {
    try {
      const userId = c.req.param('id') as any;
      const updateData: UpdateUserData = await c.req.json();
      const requestingUserRole = UserRole.ADMIN; // TODO: Get from JWT
      
      const updateUseCase = new UpdateUserUseCase(this.userRepository);
      const user = await updateUseCase.execute(userId, updateData, requestingUserRole);
      
      return c.json({ 
        success: true, 
        data: user.toJSON() 
      });
    } catch (error) {
      return c.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Update failed' 
      }, 400);
    }
  }

  async getUsers(c: Context) {
    try {
      const users = await this.userRepository.findAll();
      return c.json({ 
        success: true, 
        data: users.map(user => user.toJSON()) 
      });
    } catch (error) {
      return c.json({ 
        success: false, 
        error: 'Failed to fetch users' 
      }, 500);
    }
  }
}