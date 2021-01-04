CREATE TABLE orgs (
    PRIMARY KEY(org_id),
    name char(255) NOT NULL,
    parentid int,
    address varchar(255),    
);

ALTER TABLE orgs ADD COLUMN senior_rater FOREIGN KEY(id) REFERENCES users(id) NOT NULL;
    
INSERT INTO orgs (`name`, `parentid`, `address`, `senior_rater`) VALUES
    ('480th ISR Wing', NULL, 'Langley AFB,VA', 1),
    ('497th ISR Group', 1, 'Langley AFB,VA', 2),
    ('10th Intelligence Squadron', 2, 'Langley AFB,VA' 4),
    ('30th Intelligence Squadron', 2, 'Langley AFB,VA', 5)
    ('692nd ISR Group', 1, 'Joint Base Pearl Harbor-Hickam, Hawaii', 6),
    ('8th Intelligence Squadron', 5, 'Joint Base Pearl Harbor-Hickam, Hawaii', 7),
    ('324th Intelligence Squadron', 5, 'Joint Base Pearl Harbor-Hickam, Hawaii', 8)
;