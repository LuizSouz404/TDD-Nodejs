import { Encrypt } from "../../protocols/encrypt";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAccount
  encryptStub: Encrypt
}

const makeEncrypt = (): Encrypt => {
  class EncryptStub implements Encrypt {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncryptStub()
}

const makeSut = (): SutTypes => {
  const encryptStub = makeEncrypt()
  const sut = new DbAddAccount(encryptStub);

  return {
    sut,
    encryptStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call Encrypt with correct password', async () => {
    const { sut, encryptStub } = makeSut()

    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Encrypt throws', async () => {
    const { sut, encryptStub } = makeSut()

    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow()
  })
})
