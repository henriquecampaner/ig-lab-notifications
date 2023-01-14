import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';
import { ReadNotification } from './readNotification';

jest.mock('node:crypto', () => ({
  randomUUID: () => '123456',
}));

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepositoryMock);

    const notification = makeNotification();

    await notificationsRepositoryMock.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepositoryMock.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepositoryMock);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
