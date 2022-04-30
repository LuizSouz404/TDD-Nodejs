import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypt } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypted: Encrypt;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(encrypt: Encrypt, addAccountRepository: AddAccountRepository) {
    this.encrypted = encrypt
    this.addAccountRepository = addAccountRepository
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypted.encrypt(account.password);
    await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
