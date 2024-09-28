-- Active: 1727179020532@@127.0.0.1@5432@ems@public
-- Create the table

-- Insert the data
-- Create the table with a password column before role
CREATE TABLE ClubInfo (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(50)
);

-- Insert the data with the password for all entries
INSERT INTO users (username, email, password, role)
VALUES 
('INSTITUTIONS INNOVATION COUNCIL (IIC)', 'iic_mptp.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('IPR CELL', NULL, '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('E-CELL', NULL, '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('INSTITUTE–INDUSTRY INTERACTION AND INTERNSHIP CELL (I4C)', NULL, '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('NATIONAL INNOVATION AND START-UP POLICY (NISP) CELL', NULL, '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('Saturday 10 am', 'saturday10am@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('EACH ONE SAVE ONE', 'socialforumshirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('The Writers Hub', 'thewritershub.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('RAW VISION CLUB', 'RAWVISION_MPTP.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('ATRANGI CLUB', NULL, '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('Computer Society of India (CSI)', 'CSI_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('NMMUN (Narsee Monjee Model United Nation)', 'Nmmun_mptp.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('Coding Club', 'CODINGCLUB_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('App Development Club', 'APPDEVCLUB_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('Google Developer''s Club', 'Gdsc_mpstme.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('TEAM UAS NMIMS (Drone Club)', 'DRONECLUB_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('ISTE', 'ISTE_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('IEEE', 'IEEE_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('Society 4DS', 'SOCIETY4Ds_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('AVINYA - IOT LAB', NULL, '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('Learn Tech with NMIMS Shirpur', 'LEARNTECH_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('FLAVIUM', 'FLAVIUM_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('AMBIORA - Technical Event', 'AMBIORA_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty'),
('PROTSAHAN', 'PROTSAHAN_MPSTME.shirpur@nmims.edu', '$2a$10$4qTzgZdVtr7NnecdCPBu9.zbm.wMCpJ5eSq5Z3OF4wABFygzYiMEa', 'faculty');


-- Alter the table to change the size of username to varchar(100)
ALTER TABLE users
ALTER COLUMN username TYPE VARCHAR(100);


ALTER TABLE users
ALTER COLUMN email DROP NOT NULL;