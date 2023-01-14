import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { NotificationViewModel } from '../viewModels/notificationViewModel';
import { CancelNotification } from '@app/useCases/cancelNotification';
import { ReadNotification } from '@app/useCases/readNotification';
import { UnreadNotification } from '@app/useCases/unreadNotification';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotifications';
import { GetRecipientNotification } from '@app/useCases/getRecipientNotification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    try {
      await this.cancelNotification.execute({ notificationId });
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.NOT_FOUND);
    }
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });
    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    try {
      await this.readNotification.execute({ notificationId });
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    try {
      await this.unreadNotification.execute({ notificationId });
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.NOT_FOUND);
    }
  }
}
