import bcrypt from 'bcrypt';

export class PasswordService {
    private static readonly SALT_ROUNDS = 10;

    static hash(plainPassword: string): string {
        return bcrypt.hashSync(plainPassword, this.SALT_ROUNDS);
    }

    static compare(plainPassword: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}
