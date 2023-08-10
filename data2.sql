CREATE TABLE IF NOT EXISTS "Candidate_Status_Table" (
	"Id "	INTEGER,
	"cid"	INTEGER,
	"status"	TEXT,
	"statusUpdatedAt"	INTEGER
);
CREATE TABLE IF NOT EXISTS "User Table" (
	"Id(uid)"	INTEGER,
	"name"	TEXT,
	FOREIGN KEY("Id(uid)") REFERENCES "Candidate_Table"("Uid")
);
CREATE TABLE IF NOT EXISTS "Candidate_Table" (
	"Id (cid)"	INTEGER,
	"Uid"	INTEGER,
	"candidateName"	TEXT,
	FOREIGN KEY("Id (cid)") REFERENCES "Candidate_Status_Table"
);
INSERT INTO "Candidate_Status_Table" ("Id ","cid","status","statusUpdatedAt") VALUES (1,1,' joined',' 24/03/2023'),
 (2,2,'joined','  12/12/2022'),
 (3,3,'interview','28/06/2023');
INSERT INTO "User Table" ("Id(uid)","name") VALUES (4,' Rahul');
INSERT INTO "Candidate_Table" ("Id (cid)","Uid","candidateName") VALUES (1,4,'Priyanka');
COMMIT;
