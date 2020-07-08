import { validateBoards, validateUser } from '../../src/utils/controllerUtils';
import { BoardModel } from '../../src/models/boardModel';
import { UserModel } from '../../src/models/userModel';

describe('controller utilities', () => {
  describe('validateBoards', () => {
    const boardFind = jest.fn(() => {
      return new Promise(((resolve, reject) => resolve(1)));
    });
    // @ts-ignore
    BoardModel.Find = boardFind;

    it('should do a find operation once for each board id', async () => {
      await validateBoards(['1', '2', '3']);
      expect(boardFind.mock.calls.length).toBe(3);
    });

    it('should return true if boards are all found', async () => {
      const isValid = await validateBoards(['1', '2', '3']);
      expect(isValid).toBe(true);
    });

    it('should return false if not all boards are found', async () => {
      const boardFind = jest.fn(() => {
        return new Promise(((resolve, reject) => resolve(0)));
      });
      // @ts-ignore
      BoardModel.Find = boardFind;
      const isValid = await validateBoards(['1']);
      expect(boardFind.mock.calls.length).toBe(1);
      expect(isValid).toBe(false);
    });
  });

  describe('validateUser', () => {
    const userFind = jest.fn(() => {
      return new Promise(((resolve, reject) => resolve({ data: 1 })));
    });
    // @ts-ignore
    UserModel.Find = userFind;

    it('should do a find operation on the user id', async () => {
      await validateUser('1');
      expect(userFind.mock.calls.length).toBe(1);
    });

    it('should return true if the user is found', async () => {
      const isValid = await validateUser('1');
      expect(isValid).toBe(true);
    });

    it('should return false if the user is not found', async () => {
      // @ts-ignore
      UserModel.Find = jest.fn(() => {
        return new Promise(((resolve, reject) => resolve(undefined)));
      });

      const isValid = await validateUser(('1'));
      expect(isValid).toBe(false);
    });
  });
});
