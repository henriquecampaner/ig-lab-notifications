import { Injectable } from '@nestjs/common';
import { Notification } from 'src/app/entities/notifications';
import { NotificationsRepository } from '@app/repositories/notificationsRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async listAll(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}

export { PrismaNotificationRepository };
