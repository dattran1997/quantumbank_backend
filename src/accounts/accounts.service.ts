import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './data/account.entity';
import { AccountsRepository } from './data/account.repository';
import { DepositMoneyDto } from './dto/deposit-money.dto';
import { TransferMoneyDto } from './dto/transfer-money.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountsRepository)
    private accountsRepository: AccountsRepository,
  ) {}

  createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsRepository.createAccount(createAccountDto);
  }

  deposit(depositMoney: DepositMoneyDto) {
    return this.accountsRepository.deposit(depositMoney);
  }

  transferMoney(transferMoney: TransferMoneyDto) {
    return this.accountsRepository.transferMoney(transferMoney);
  }

  getAccountsByUserId(userId: string): Promise<Account[]> {
    return this.accountsRepository.find({ userId });
  }

  searchAccount(accountNumber: string): Promise<Account[]> {
    return this.accountsRepository.searchAccount(accountNumber);
  }
}
