import { Notification } from '@app/entities/notifications';

class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      cancelledAt: notification.cancelledAt,
      readAt: notification.readAt,
    };
  }
}

export { NotificationViewModel };
