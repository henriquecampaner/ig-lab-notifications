import { NotificationsRepository } from 'src/app/repositories/notificationsRepository';
import { Notification } from 'src/app/entities/notifications';

class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return Promise.resolve(null);
    }

    return Promise.resolve(notification);
  }

  findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return Promise.resolve(
      this.notifications.filter(
        (notification) => notification.recipientId === recipientId,
      ),
    );
  }

  countManyByRecipientId(recipientId: string): Promise<number> {
    return Promise.resolve(
      this.notifications.filter(
        (notification) => notification.recipientId === recipientId,
      ).length,
    );
  }

  create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
    return Promise.resolve();
  }

  save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }

    return Promise.resolve();
  }
}

export { InMemoryNotificationsRepository };
