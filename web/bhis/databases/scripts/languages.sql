CREATE TABLE "languages" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Code"	TEXT NOT NULL,
	"Name"	TEXT NOT NULL,
	"Category"	TEXT NOT NULL,
	"Value"	TEXT,
	UNIQUE("Code","Name","Category")
);