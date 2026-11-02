# Digital Card — цифровая визитка (backend)

GraphQL API, презентующее меня как специалиста: профиль, навыки, опыт, проекты.
Apollo Sandbox доступен по адресу `/graphql` сразу после запуска.

## Стек

TypeScript · Node.js · NestJS · GraphQL (code-first) · Prisma · PostgreSQL · Docker

## Запуск с нуля

```bash
docker compose up --build
```

После старта база автоматически мигрируется и заполняется моими данными.
Открой http://localhost:3000/graphql и выполни:

```graphql
query {
  profile {
    name
    description
    skills { name }
    experience { company position }
    projects { name }
  }
}
```

## Архитектурные решения

- **Code-first GraphQL** (`@nestjs/graphql`): схема генерируется из TypeScript-
  декораторов — единый источник правды для типов API и кода, нет рассинхрона
  schema.gql ↔ модели.
- **Слои**: `ProfileResolver` (транспорт/GraphQL) → `ProfileService` (бизнес-логика)
  → `PrismaService` (доступ к данным). Resolver не знает о SQL, service — о GraphQL.
- **N+1**: вложенные коллекции (skills/experience/projects) вытягиваются одним
  запросом через Prisma `include`, а не отдельными резолверами полей — один round-trip
  к БД на весь query.
- **Prisma + миграции**: схема БД версионируется в `prisma/migrations`, применяется
  `migrate deploy` при старте контейнера — БД всегда соответствует коду.
- **Seed idempotent**: заполняет БД только если она пуста — безопасен для рестартов.
- **Docker**: multi-stage build (сборка → лёгкий рантайм), PostgreSQL — отдельным
  сервисом в compose, данные в volume.
- **Apollo Sandbox** включён вместо устаревшего Playground — интерфейс доступен
  по тому же `/graphql` endpoint.

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | строка подключения PostgreSQL |
| `PORT` | порт HTTP (default 3000) |
