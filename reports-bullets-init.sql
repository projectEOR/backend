-- Create Tables for Reports and bullets
-- Graham McLaughlin
-- Jan 2021

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

CREATE TABLE IF NOT EXISTS bullets (
	id		SERIAL PRIMARY KEY,
	user_id int NOT NULL,
	report_id int,
	content char(128),
	support text,
	editorial_notes text
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

INSERT INTO reports (user_id, pr_type)
VALUES (0,1),(1,1),(2,1);

INSERT INTO bullets (user_id, content)
VALUES (0, 'This is the greatest and best bullet in the world. Tribute.'),
(0, 'This is not the greatest bullet in the world, no. This is just a tribute');

	
		  