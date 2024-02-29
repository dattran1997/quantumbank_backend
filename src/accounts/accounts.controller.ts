import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { DepositMoneyDto } from './dto/deposit-money.dto';
import { TransferMoneyDto } from './dto/transfer-money.dto';
import { Account } from './data/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post('/')
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Post('/deposit')
  deposit(@Body() depositMoney: DepositMoneyDto) {
    return this.accountsService.deposit(depositMoney);
  }

  @Post('/transfer')
  transferMoney(@Body() transferMoney: TransferMoneyDto) {
    return this.accountsService.transferMoney(transferMoney);
  }

  @Get('/search')
  searchAccount(
    @Param('accountNumber') accountNumber: string,
  ): Promise<Account[]> {
    return this.accountsService.searchAccount(accountNumber);
  }

  @Get('/searchByUserId')
  getAccountsByUserId(@Query('userId') userId: string): Promise<Account[]> {
    return this.accountsService.getAccountsByUserId(userId);
  }
}
