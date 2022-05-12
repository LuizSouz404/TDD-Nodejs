import bcrypt from 'bcrypt';

describe('Bcrypt Adapter', () => {
  test('should call bcrypt wih correct value', async () => {
    const sut = new BcryptAdapter();
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value');
    expect(bcrypt.hash).toHaveBeenCalledWith('any_value')
  })
})
