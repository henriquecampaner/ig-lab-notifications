import { Content } from './content';
import { Notification } from './notifications';
import { jest } from '@jest/globals';

jest.mock('node:crypto', () => ({
  randomUUID: () => '123456',
}));

describe('Notification', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('10 Dec 2020 00:12:00 GMT').getTime());
  });

  it('should be able to create a new notification', () => {
    const notification = new Notification({
      content: new Content('This is a valid content'),
      category: 'category',
      recipientId: '1234567890',
    });

    expect(notification).toEqual({
      _id: '123456',
      props: {
        content: { content: 'This is a valid content' },
        category: 'category',
        recipientId: '1234567890',
        createdAt: new Date(),
      },
    });
  });
});
