import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';
import { UnreadNotification } from './unreadNotification';

jest.mock('node:crypto', () => ({
  randomUUID: () => '123456',
}));

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      notificationsRepositoryMock,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepositoryMock.create(notification);

    expect(notificationsRepositoryMock.notifications[0].readAt).toEqual(
      expect.any(Date),
    );

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepositoryMock.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      notificationsRepositoryMock,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
