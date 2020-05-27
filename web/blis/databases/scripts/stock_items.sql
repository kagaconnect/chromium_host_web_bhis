

CREATE TABLE "stock_items" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"StockID"	INTEGER NOT NULL,
	"LotNumber"	TEXT,
	"ExpiryDate"	TEXT,
	"Manufacturer"	TEXT,
	"Supplier"	TEXT,
	"QuantitySupplied"	INTEGER NOT NULL,
	"CostPerUnit"	NUMERIC,
	"DateReceived"	TEXT,
	"Remarks"	TEXT,
	FOREIGN KEY(StockID) REFERENCES stocks(ID),
	UNIQUE("LotNumber")
);