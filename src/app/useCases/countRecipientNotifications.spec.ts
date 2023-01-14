import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotification } from './countRecipientNotifications';
import { makeNotification } from '@test/factories/notificationFactory';

jest.mock('node:crypto', () => ({
  randomUUID: () => '123456',
}));

describe('Count Notification', () => {
  it('should count recipient notifications', async () => {
    const notificationsRepositoryMock = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(count).toBe(2);
  });
});
