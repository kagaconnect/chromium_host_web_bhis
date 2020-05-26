CREATE TABLE "analysers" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT NOT NULL ,
	"Version"	TEXT,
	"ConfigFile"	TEXT,
	"LabSection"	TEXT,
	"CommunicationType"	TEXT,
	"FeedSource"	TEXT NOT NULL,
	UNIQUE("Name")
);