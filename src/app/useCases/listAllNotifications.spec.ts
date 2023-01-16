import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/notificationFactory';
import { ListAllNotifications } from './listAllNotifications';

describe('List Notifications', () => {
  it('should be able to list all notifications', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const listAllNotifications = new ListAllNotifications(
      notificationsRepositoryMock,
    );

    await notificationsRepositoryMock.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationsRepositoryMock.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationsRepositoryMock.create(
      makeNotification({ recipientId: 'recipient2' }),
    );

    const { notifications } = await listAllNotifications.execute();

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient2' }),
      ]),
    );
  });
});
