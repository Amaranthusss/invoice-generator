-- SQLite
DROP TABLE firmData;
CREATE TABLE firm_data (
	id TINYINT PRIMARY KEY,
	name VARCHAR,
	subname VARCHAR,
	address VARCHAR,
	city VARCHAR,
	phone VARCHAR,
	nip BIGINT,
	bankAcount VARCHAR,
	bankName VARCHAR
);
INSERT INTO firm_data
VALUES (
		1,
		'firm name',
		'second firm name',
		'address - street',
		'address - city',
		'phone number',
		0123456789,
		'00 0000 0000 0000 0000 0000 0000',
		'full bank name'
	);