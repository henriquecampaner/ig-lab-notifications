import { Notification } from '@app/entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationsRepository';

type ListAllNotificationsResponse = {
  notifications: Notification[];
};

@Injectable()
class ListAllNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(): Promise<ListAllNotificationsResponse> {
    const notifications = await this.notificationsRepository.listAll();

    return {
      notifications,
    };
  }
}

export { ListAllNotifications };
