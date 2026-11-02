CREATE TABLE "Profile" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "github" TEXT,
  "linkedin" TEXT
);
CREATE TABLE "Skill" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "profileId" INTEGER NOT NULL REFERENCES "Profile"("id")
);
CREATE TABLE "Experience" (
  "id" SERIAL PRIMARY KEY,
  "company" TEXT NOT NULL,
  "position" TEXT NOT NULL,
  "period" TEXT NOT NULL,
  "achievements" TEXT,
  "profileId" INTEGER NOT NULL REFERENCES "Profile"("id")
);
CREATE TABLE "Project" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "url" TEXT,
  "profileId" INTEGER NOT NULL REFERENCES "Profile"("id")
);
