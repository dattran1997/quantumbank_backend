import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from './account.entity';
import { DepositMoneyDto } from '../dto/deposit-money.dto';
import { TransferMoneyDto } from '../dto/transfer-money.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const { userId, type, username } = createAccountDto;

    const uniqueNumber = Math.floor(100000 + Math.random() * 900000).toString();

    const account = this.create({
      userId,
      type,
      username,
      accountNumber: uniqueNumber,
    });

    const duplicateAccount = await this.findOne({
      accountNumber: uniqueNumber,
    });

    if (duplicateAccount) {
      return this.createAccount(createAccountDto);
    }

    await this.save(account);
    return account;
  }

  async deposit(depositMoney: DepositMoneyDto) {
    const { accountNumber, amount } = depositMoney;

    const account = await this.findOne({ accountNumber });

    if (!account) {
      return { error: 'Account not found' };
    }

    account.balance += amount;
    await this.save(account);
    return account;
  }

  async transferMoney(transferMoney: TransferMoneyDto) {
    const { fromAccount, toAccount, amount } = transferMoney;
    const fromAccountFound = await this.findOne({ accountNumber: fromAccount });
    const toAccountFound = await this.findOne({ accountNumber: toAccount });

    if (!fromAccountFound || !toAccountFound) {
      throw new BadRequestException('Account not found');
    }

    if (fromAccountFound.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    fromAccountFound.balance -= amount;
    toAccountFound.balance += amount;

    await this.save([fromAccountFound, toAccountFound]);
    return { fromAccount, toAccount };
  }

  async searchAccount(accountNumber: string) {
    const query = this.createQueryBuilder('account');

    if (accountNumber) {
      query.andWhere('account.accountNumber LIKE :accountNumber', {
        accountNumber: `%${accountNumber}%`,
      });
    }

    return query.getMany();
  }
}
