import { UserModel } from '../../../graphql/models/userModel';
import { connection } from '../../../data.source/cb.connection';

describe('userModel.ts', () => {
  const stubUserData = {
    id: '1',
    userName: 'ryan',
    email: '111@test.com',
    boards: ['123'],
  };

  const cbResponse = new Promise((resolve, reject) => {
    resolve({
      value: stubUserData
    });
  });

  connection.get = jest.fn(() => cbResponse);
  connection.upsert = jest.fn(() => cbResponse);

  it('User should contain expected properties', () => {
    const user = new UserModel(stubUserData);
    expect(user.id).toBe('1');
    expect(user.userName).toBe('ryan');
    expect(user.email).toBe('111@test.com');
    expect(user.boards[0]).toBe('123');
  });

  it('should return a user from static find method', async () => {
    const user = await UserModel.find('1');
    expect(user.userName).toBe('ryan');
  });

  it('should return updated user from static put method', async () => {
    const user = await UserModel.find('1');
    user.userName = 'steve';
    const updatedUser = UserModel.put(user);
    expect(user.id).toBe('1');
  });

  it('should return id from getId method', () => {
    const user = new UserModel(stubUserData);
    const id = user.getId();
    expect(id).toBe('1');
  });
});
