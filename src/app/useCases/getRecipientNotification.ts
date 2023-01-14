import { Notification } from '@app/entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationsRepository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

type GetRecipientNotificationResponse = {
  notifications: Notification[];
};

@Injectable()
class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}

export { GetRecipientNotification };
