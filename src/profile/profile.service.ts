import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  // Один запрос с include — никаких N+1 по вложенным коллекциям.
  getProfile() {
    return this.prisma.profile.findFirst({
      include: { skills: true, experience: true, projects: true },
    });
  }
}
