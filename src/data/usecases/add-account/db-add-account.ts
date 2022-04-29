import { AccountModel } from "../../../domain/models/account";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypt } from "../../protocols/encrypt";

export class DbAddAccount implements AddAccount {
  private readonly encrypted: Encrypt;

  constructor(encrypt: Encrypt) {
    this.encrypted = encrypt
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    this.encrypted.encrypt(account.password);
    return new Promise(resolve => resolve(null))
  }
}
