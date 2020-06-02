CREATE TABLE "tests" (
	"ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT NOT NULL,
	"Description"	TEXT,
	"LabSection"	TEXT,
	"ClinicalData"	TEXT,
	"PanelTest"	INTEGER NOT NULL,
	"HidePatientName"	INTEGER NOT NULL,
	"PrevalenceThreshold" INTEGER,
	"TargetTAT"	NUMERIC,
	"CostToPatient"	NUMERIC
);

