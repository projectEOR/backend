CREATE TABLE IF NOT EXISTS Ranks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    symbol VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    rank_id INTEGER NOT NULL REFERENCES Ranks(id),
    rater_id INTEGER NOT NULL,
    additional_rater_id INTEGER NOT NULL,
    closeout date NOT NULL
);

CREATE TABLE orgs (
    id SERIAL PRIMARY KEY,
    name char(255) NOT NULL,
    parentid int,
    address varchar(255) 
);

 CREATE TABLE IF NOT EXISTS reports (
	id      		SERIAL PRIMARY KEY,
	user_id			int NOT NULL,
	pr_type 		int NOT NULL,
	afsc 			char(7),
	org_id 			int,
	job_desc		text,
	period_start 	date,
	period_end 		date,
	sup_days 		int,
	non_rated_days 	int,
	last_feedback 	date,
	rater_id 		int,
	addl_rater_id 	int,
	reviewer_id 	int,
	func_id 		int,
	remarks 		text,
	referral_report text,
	pfactors 		int[7]
);

CREATE TABLE Actions(
  id BIGSERIAL PRIMARY KEY,
  status varchar(50));
    

CREATE TABLE Tracker(
  tracker_id SERIAL PRIMARY KEY,
  report_id INTEGER NOT NULL REFERENCES reports(id),
  closeout date NOT NULL, 
  sq_suspense date NOT NULL,
  gp_suspense date,
  wg_suspense date,
  member_role char(50) NOT NULL);

CREATE TABLE IF NOT EXISTS bullets (
	id		SERIAL PRIMARY KEY,
	user_id int NOT NULL,
	report_id int,
	content char(128),
	support text,
	editorial_notes text
);

CREATE TABLE IF NOT EXISTS pr_types (
	id SERIAL PRIMARY KEY,
	pr_type char(16)
);

CREATE TABLE senior_raters (
    org_id int,
    rater_id int
);


ALTER TABLE bullets
	ADD CONSTRAINT fk_user_id
		FOREIGN KEY(user_id)
			REFERENCES users(id)
			ON DELETE CASCADE,
	ADD CONSTRAINT fk_report_id
		FOREIGN KEY(report_id)
			REFERENCES reports(id)
			ON DELETE SET NULL
;
                 
ALTER TABLE Users
ADD COLUMN org_id INTEGER NOT NULL REFERENCES orgs(id);

ALTER TABLE reports
	ADD CONSTRAINT fk_user_id
		FOREIGN KEY(user_id)
			REFERENCES users(id)
			ON DELETE CASCADE,
	ADD CONSTRAINT fk_pr_type
		FOREIGN KEY(pr_type)
			REFERENCES pr_types(id)
			ON DELETE NO ACTION,
	ADD CONSTRAINT fk_org_id
		FOREIGN KEY(org_id)
			REFERENCES orgs(id)
			ON DELETE NO ACTION,
	ADD CONSTRAINT fk_rater_id
		FOREIGN KEY(rater_id)
			REFERENCES users(id)
			ON DELETE NO ACTION,
	ADD CONSTRAINT fk_addl_rater_id
		FOREIGN KEY(addl_rater_id)
			REFERENCES users(id)
			ON DELETE NO ACTION,
	ADD CONSTRAINT fk_reviewer_id
		FOREIGN KEY(reviewer_id)
			REFERENCES users(id)
			ON DELETE NO ACTION,
	ADD CONSTRAINT fk_func_id
		FOREIGN KEY(func_id)
			REFERENCES users(id)
			ON DELETE NO ACTION
;

ALTER TABLE Tracker ADD COLUMN ratee_id INTEGER NOT NULL REFERENCES Users(id);
ALTER TABLE Tracker ADD COLUMN rater_id INTEGER NOT NULL REFERENCES Users(id);
ALTER TABLE Tracker ADD COLUMN action_id INTEGER REFERENCES Actions(id);                 
ALTER TABLE Tracker ADD COLUMN org_name_id INTEGER NOT NULL REFERENCES orgs(id);

ALTER TABLE senior_raters ADD CONSTRAINT fk_rater_id FOREIGN KEY(rater_id) REFERENCES users(id);
ALTER TABLE senior_raters ADD CONSTRAINT fk_org_id FOREIGN KEY(org_id) REFERENCES orgs(id);

 INSERT INTO pr_types (id, pr_type)
 VALUES (0,'OPR'),(1,'EPR');

INSERT INTO Ranks (name, symbol) VALUES 
('Second Lieutenant', '2Lt'),
('First Lieutenant', '1Lt'),
('Captain', 'Capt'),
('Major', 'Maj'),
('Lieutenant Colonel', 'Lt Col'),
('Colonel', 'Col'),
('Brigadier General', 'Brig Gen'),
('Major General', 'Maj Gen'),
('Lieutenant Genereal', 'Lt Gen'),
('General', 'Gen');

INSERT INTO orgs (name, parentid, address) VALUES
    ('480th ISR Wing', NULL, 'Langley AFB,VA'),
    ('497th ISR Group', 1, 'Langley AFB,VA'),
    ('10th Intelligence Squadron', 2, 'Langley AFB,VA'),
    ('30th Intelligence Squadron', 2, 'Langley AFB,VA'),
    ('692nd ISR Group', 1, 'Joint Base Pearl Harbor-Hickam, Hawaii'),
    ('8th Intelligence Squadron', 5, 'Joint Base Pearl Harbor-Hickam, Hawaii'),
    ('324th Intelligence Squadron', 5, 'Joint Base Pearl Harbor-Hickam, Hawaii');


INSERT INTO Users (email, last_name, first_name, rank_id, org_id, rater_id, additional_rater_id, closeout) 
VALUES
('john.smith@spaceforce.mil', 'Smith', 'John', 10, 1, 1, 1, '2022-01-01'),
('jane.doe@spaceforce.mil', 'Doe', 'Jane', 8, 1, 1, 1, '2021-10-01'),
('chris.jenkins@spaceforce.mil', 'Jenkins', 'Chris', 6, 1, 2, 1, '2021-08-01'),
('sarah.johnson@spaceforce.mil', 'Johnson', 'Sarah', 4, 1, 3, 2, '2021-06-01'),
('james.franklin@spaceforce.mil', 'James', 'Franklin', 2, 1, 4, 3, '2021-04-01'),
('crystal.wilkes@spaceforce.mil', 'Crystal', 'Wilkes', 1, 1, 4, 3, '2021-02-01');


INSERT INTO reports (user_id, pr_type)
VALUES (1,1),(2,1),(3,1);

INSERT INTO bullets (user_id, content)
VALUES (1, 'This is the greatest and best bullet in the world. Tribute.'),
(1, 'This is not the greatest bullet in the world, no. This is just a tribute');

INSERT INTO Actions(status) VALUES ('Draft');
INSERT INTO Actions(status) VALUES ('Review');
INSERT INTO Actions(status) VALUES ('Edit');
INSERT INTO Actions(status) VALUES ('Sign');

INSERT INTO senior_raters(org_id,rater_id) VALUES (1,1),(2,2),(3,3);