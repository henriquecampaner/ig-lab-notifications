import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';

jest.mock('node:crypto', () => ({
  randomUUID: () => '123456',
}));

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationsRepositoryMock,
    );

    const notification = makeNotification();

    await notificationsRepositoryMock.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepositoryMock.notifications[0].cancelledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationsRepositoryMock,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
