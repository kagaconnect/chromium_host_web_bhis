CREATE TABLE "users" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT,
	"Email"	TEXT NOT NULL,
	"PhoneMobile"	TEXT,
	"Username"	TEXT,
	"Password"	TEXT,
	"Role"	TEXT NOT NULL,
	"DiplayNameAtResult"	INTEGER,
	"Language"	TEXT,
	UNIQUE("Email","PhoneMobile")
);

INSERT INTO `users` (`Name`,`Email`,`PhoneMobile`,`Username`,`Password`,`Role`,`DiplayNameAtResult`,`Language`) VALUES
("Fredrick L Mwasekaga", "fmwasekaga@gmail.com", "0757745767", "fmwasekaga", "admin123$", "", true, "English");