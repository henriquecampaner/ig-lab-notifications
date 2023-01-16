import { ListAllNotifications } from '@app/useCases/listAllNotifications';
import { SendNotification } from '@app/useCases/sendNotification';
import { CreateNotificationBody } from '../inputs/createNotificationBody';
import { NotificationViewModel } from '@infra/http/viewModels/notificationViewModel';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationModelGraphql } from '../models/notification';
import { CancelNotification } from '@app/useCases/cancelNotification';
import { NotificationId } from '../inputs/notificationId';
import { ReadNotification } from '@app/useCases/readNotification';
import { UnreadNotification } from '@app/useCases/unreadNotification';
import { GetRecipientNotification } from '@app/useCases/getRecipientNotification';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotifications';

@Resolver()
class SendNotificationResolver {
  constructor(
    private listAllNotification: ListAllNotifications,
    private sendNotificationService: SendNotification,
    private cancelNotificationService: CancelNotification,
    private readNotificationService: ReadNotification,
    private unreadNotificationService: UnreadNotification,
    private getFromRecipientId: GetRecipientNotification,
    private countFromRecipientId: CountRecipientNotification,
  ) {}

  @Query(() => Number)
  async countFromRecipient(@Args('data') data: NotificationId) {
    const { count } = await this.countFromRecipientId.execute({
      recipientId: data.notificationId,
    });

    return count;
  }

  @Query(() => [NotificationModelGraphql])
  async getFromRecipient(@Args('data') data: NotificationId) {
    const { notifications } = await this.getFromRecipientId.execute({
      recipientId: data.notificationId,
    });

    return notifications.map((notification) =>
      NotificationViewModel.toHttp(notification),
    );
  }

  @Query(() => [NotificationModelGraphql])
  async getAllNotifications() {
    const { notifications } = await this.listAllNotification.execute();

    return notifications.map((notification) =>
      NotificationViewModel.toHttp(notification),
    );
  }

  @Mutation(() => NotificationModelGraphql)
  async sendNotification(@Args('data') data: CreateNotificationBody) {
    const { notification } = await this.sendNotificationService.execute({
      category: data.category,
      content: data.content,
      recipientId: data.recipientId,
    });

    return NotificationViewModel.toHttp(notification);
  }

  @Mutation(() => String)
  async cancelNotification(@Args('data') data: NotificationId) {
    await this.cancelNotificationService.execute({
      notificationId: data.notificationId,
    });

    return `${data.notificationId} canceled}`;
  }

  @Mutation(() => String)
  async readNotification(@Args('data') data: NotificationId) {
    await this.readNotificationService.execute({
      notificationId: data.notificationId,
    });

    return `${data.notificationId} read}`;
  }

  @Mutation(() => String)
  async unreadNotification(@Args('data') data: NotificationId) {
    await this.unreadNotificationService.execute({
      notificationId: data.notificationId,
    });

    return `${data.notificationId} unread}`;
  }
}

export { SendNotificationResolver };
