import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  if (await prisma.profile.count() > 0) {
    console.log('DB already seeded');
    return;
  }
  await prisma.profile.create({
    data: {
      name: 'Иван Решетило',
      description:
        'Full-cycle разработчик: Python/TypeScript, Telegram и Discord боты, парсеры, автоматизация. ИП, работаю на результат.',
      github: 'https://github.com/Ivanresetilo',
      linkedin: 'https://hh.ru',
      skills: {
        create: [
          { name: 'TypeScript' }, { name: 'Python' }, { name: 'Node.js' },
          { name: 'PostgreSQL' }, { name: 'Docker' }, { name: 'Git' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Собственное ИП',
            position: 'Full-stack разработчик',
            period: '2024 — настоящее время',
            achievements: 'Запустил и продаю Telegram-магазины и Discord-серверы под ключ для клиентов',
          },
        ],
      },
      projects: {
        create: [
          { name: 'shop-bot — Telegram-магазин цифровых товаров', url: 'https://github.com/Ivanresetilo/shop-bot' },
          { name: 'discord-server-bot — сервер под ключ', url: 'https://github.com/Ivanresetilo/discord-server-bot' },
          { name: 'docx-gen — генератор .docx по ГОСТ-стилю', url: 'https://github.com/Ivanresetilo/docx-gen' },
        ],
      },
    },
  });
  console.log('DB seeded');
}

main().finally(() => prisma.$disconnect());
