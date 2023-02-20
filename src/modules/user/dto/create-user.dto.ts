export class CreateUserDto {
  email: string;
  name?: string | null;
  role?: 'USER' | 'ADMIN';
}
