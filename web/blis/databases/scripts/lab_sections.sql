CREATE TABLE "lab_sections" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT NOT NULL,
	UNIQUE("Name")
);

INSERT INTO `lab_sections` (`Name`) VALUES 
("Serology"),
("Hematology"),
("HIV"),
("CD4"),
("Chemistry"),
("Microscopy"),
("Hormonal"),
("Bacteriology"),
("Parasitology"),
("Other");