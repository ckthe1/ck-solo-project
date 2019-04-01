
-- create "user" table

CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "clearance_level" INTEGER DEFAULT 0
);


CREATE TABLE "books"
(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (80)
);

CREATE TABLE "date"
(
    "id" SERIAL PRIMARY KEY,
    "date_completed" DATE

);
-- create function table
CREATE TABLE "relationship"
(
    "id" SERIAL PRIMARY KEY,
    "student_id" INT REFERENCES "user",
    "book_id" INT REFERENCES "books",
    "date_id" INT REFERENCES "date",
    "initial" VARCHAR (4)
);
-- Register Teacher 1st, then students afterwards.
-- update teacher to clearance level 1, students stays 0
UPDATE "user" 
SET "clearance_level" = '1'
WHERE "id"='1';

