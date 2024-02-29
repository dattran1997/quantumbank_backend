import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferMoneyDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  fromAccount: string;

  @IsNotEmpty()
  @IsString()
  toAccount: string;
}
