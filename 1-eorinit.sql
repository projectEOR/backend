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
('jane.doe@spaceforce.mil', 'Doe', 'Jane', 9, 1, 1, 1, '2021-10-01'),
('chris.jenkins@spaceforce.mil', 'Jenkins', 'Chris', 9, 1, 1, 1, '2021-08-01'),
('sarah.johnson@spaceforce.mil', 'Johnson', 'Sarah', 8, 1, 2, 2, '2021-06-01'),
('james.franklin@spaceforce.mil', 'James', 'Franklin', 8, 1, 3, 3, '2021-04-01'),
('crystal.wilkes@spaceforce.mil', 'Crystal', 'Wilkes', 7, 1, 4, 3, '2021-02-01'),
('lkiddy0@spaceforce.mil', 'Kiddy', 'Lynett', 7, 1, 4, 10, '2021-06-12'),
('cnorssister1@spaceforce.mil', 'Norssister', 'Chandler', 7, 1, 5, 2, '2021-12-03'),
('dprosh2@spaceforce.mil', 'Prosh', 'Dugald', 6, 1, 6, 7, '2021-10-31'),
('grow3@spaceforce.mil', 'Row', 'Gabriellia', 6, 1, 6, 9, '2021-03-23'),
('dwotton4@spaceforce.mil', 'Wotton', 'Danita', 6, 1, 7, 10, '2021-02-02'),
('nsparke5@spaceforce.mil', 'Sparke', 'Nikolas', 6, 1, 7, 1, '2021-09-21'),
('cadlington6@spaceforce.mil', 'Adlington', 'Caritta', 5, 1, 9, 9, '2021-02-05'),
('jbinder7@spaceforce.mil', 'Binder', 'Josephine', 5, 1, 10, 5, '2021-12-04'),
('jparrington8@spaceforce.mil', 'Parrington', 'Justis', 4, 1, 13, 9, '2021-12-06'),
('tmorshead9@spaceforce.mil', 'Morshead', 'Town', 4, 1, 14, 1, '2021-04-05'),
('kseaka@spaceforce.mil', 'Seak', 'Kathy', 3, 1, 15, 3, '2021-11-20'),
('ltackleyb@spaceforce.mil', 'Tackley', 'Lem', 3, 1, 16, 8, '2021-08-26'),
('gwykesc@spaceforce.mil', 'Wykes', 'Glenine', 2, 1, 17, 4, '2021-03-27'),
('enellesd@spaceforce.mil', 'Nelles', 'Edwin', 2, 1, 17, 10, '2021-02-28'),
('khendrene@spaceforce.mil', 'Hendren', 'Karissa', 2, 1, 18, 4, '2021-06-16'),
('mmcindrewf@spaceforce.mil', 'McIndrew', 'Myrlene', 1, 1, 17, 3, '2021-10-13'),
('mmaragesg@spaceforce.mil', 'Marages', 'Melitta', 1, 1, 17, 2, '2021-04-14'),
('mandrellih@spaceforce.mil', 'Andrelli', 'Margette', 1, 1, 18, 9, '2021-08-31'),
('amulcocki@spaceforce.mil', 'Mulcock', 'Allie', 1, 1, 17, 9, '2021-11-05'),
('jlidgelyj@spaceforce.mil', 'Lidgely', 'Johan', 1, 1, 18, 4, '2021-05-03');

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