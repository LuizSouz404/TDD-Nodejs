import { AccountModel, AddAccount, AddAccountModel, Encrypt } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypted: Encrypt;

  constructor(encrypt: Encrypt) {
    this.encrypted = encrypt
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypted.encrypt(account.password);
    return new Promise(resolve => resolve(null))
  }
}
