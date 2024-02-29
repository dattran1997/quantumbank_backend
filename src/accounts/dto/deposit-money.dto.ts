import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DepositMoneyDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}
