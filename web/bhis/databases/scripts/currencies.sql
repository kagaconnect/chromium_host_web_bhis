CREATE TABLE "currencies" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT NOT NULL,
	"Delimiter"	TEXT,
	"ExchangeRate"	NUMERIC,
	"Enabled"	INTEGER NOT NULL,
	"IsRequired"	INTEGER NOT NULL,
	UNIQUE("Name")
);

INSERT INTO `currencies` (`Name`,`Delimiter`,`ExchangeRate`,`Enabled`,`IsRequired`) VALUES
("USD", ".", NULL, true, true);
