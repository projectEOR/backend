CREATE TABLE Actions(
  id BIGSERIAL PRIMARY KEY,
  status varchar(50));
    

CREATE TABLE Tracker(
  tracker_id SERIAL PRIMARY KEY,
  closeout date NOT NULL, 
  sq_suspense date NOT NULL,
  gp_suspense date,
  wg_suspense date,
  member_role char(50) NOT NULL);
                 

                 
                                     
  
                                   
  -- ALTER TABLE Tracker ADD COLUMN org_id INTEGER NOT NULL REFERENCES Orgs(id)
     ALTER TABLE Tracker ADD COLUMN ratee_id INTEGER NOT NULL REFERENCES Users(id);
     ALTER TABLE Tracker ADD COLUMN rater_id INTEGER NOT NULL REFERENCES Users(id);
     ALTER TABLE Tracker ADD COLUMN action_id INTEGER REFERENCES Actions(id);                 
     ALTER TABLE Tracker ADD COLUMN org_name_id INTEGER NOT NULL REFERENCES Orgs(id);

     INSERT INTO Actions(status) VALUES ('Draft');
     INSERT INTO Actions(status) VALUES ('Review');
     INSERT INTO Actions(status) VALUES ('Edit');
     INSERT INTO Actions(status) VALUES ('Sign');


      INSERT INTO Tracker(closeout, sq_suspense, gp_suspense, wg_suspense, title) VALUES ('03/31/2021', '03/10/2021', '03/17/2021','03/24/2021', 'rater')

      INSERT INTO Tracker(closeout, sq_suspense, gp_suspense, wg_suspense, title) VALUES ('01/31/2021', '01/10/2021', '01/17/2021','01/24/2021', 'A-rater')