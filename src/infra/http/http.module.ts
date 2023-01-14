import { CancelNotification } from '@app/useCases/cancelNotification';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotifications';
import { GetRecipientNotification } from '@app/useCases/getRecipientNotification';
import { ReadNotification } from '@app/useCases/readNotification';
import { UnreadNotification } from '@app/useCases/unreadNotification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
