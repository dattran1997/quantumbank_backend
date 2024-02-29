import { IsEnum, IsNotEmpty } from 'class-validator';
import { AccountType } from '../data/account-type.enum';

export class CreateAccountDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  type: string;

  @IsNotEmpty()
  username: string;
}
