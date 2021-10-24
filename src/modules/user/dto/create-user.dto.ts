export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}
