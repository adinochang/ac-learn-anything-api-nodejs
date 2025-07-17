CREATE TABLE "topics" (
	"topic_id" serial PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"description" text NOT NULL,
	"status" integer DEFAULT 1 NOT NULL
);
