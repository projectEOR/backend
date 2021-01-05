DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Ranks;

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

-- ADD AFTER CREATING ORGS TABLE
ALTER TABLE Users
ADD COLUMN org_id INTEGER NOT NULL REFERENCES Orgs(id);

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

INSERT INTO Users (email, last_name, first_name, rank_id, org_id, rater_id, additional_rater_id, closeout) 
VALUES
('john.smith@spaceforce.mil', 'Smith', 'John', 10, 1, 1, 1, '2022-01-01'),
('jane.doe@spaceforce.mil', 'Doe', 'Jane', 8, 1, 1, 1, '2021-10-01'),
('chris.jenkins@spaceforce.mil', 'Jenkins', 'Chris', 6, 1, 2, 1, '2021-08-01'),
('sarah.johnson@spaceforce.mil', 'Johnson', 'Sarah', 4, 1, 3, 2, '2021-06-01'),
('james.franklin@spaceforce.mil', 'James', 'Franklin', 2, 1, 4, 3, '2021-04-01'),
('crystal.wilkes@spaceforce.mil', 'Crystal', 'Wilkes', 1, 1, 4, 3, '2021-02-01');