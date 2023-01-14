import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notifications';

type OverRide = Partial<NotificationProps>;

export function makeNotification(override: OverRide = {}) {
  return new Notification({
    category: 'category',
    content: new Content('This is a valid content'),
    recipientId: 'recipient2',
    ...override,
  });
}
