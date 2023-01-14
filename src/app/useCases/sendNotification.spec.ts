import { SendNotification } from './sendNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';

jest.mock('node:crypto', () => ({
  randomUUID: () => '123456',
}));

describe('Send Notification', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('10 Dec 2020 00:12:00 GMT').getTime());
  });
  it('should be able to send a notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepositoryMock);

    await sendNotification.execute({
      content: 'This is a valid content',
      category: 'category',
      recipientId: '1234567890',
    });

    expect(notificationsRepositoryMock.notifications[0]).toEqual({
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
