CREATE TABLE "drugs" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT NOT NULL,
	"Description"	TEXT,
	UNIQUE("Name")
);

INSERT INTO `drugs` (`Name`, `Description`) VALUES 
("Aspirate","Aspirate Sample"),
("CSF",NULL),
("Dried Blood Spot",NULL),
("Nasal Swab",NULL),
("Plasma",NULL),
("Plasma EDTA",NULL),
("Rectal Swab",NULL),
("Semen",NULL),
("Serum",NULL),
("SKIN","Skin"),
("Sputum",NULL),
("Stool",NULL),
("Throat Swab",NULL),
("U/S","Urethral Smear"),
("Urine",NULL),
("V/S","Vaginal Smear"),
("Whole Blood",NULL);
