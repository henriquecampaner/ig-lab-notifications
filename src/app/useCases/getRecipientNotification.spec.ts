import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/notificationFactory';
import { GetRecipientNotification } from './getRecipientNotification';

describe('Get Recipient Notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient1' }),
      ]),
    );
  });
});
